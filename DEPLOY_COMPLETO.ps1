# ═══════════════════════════════════════════════════════════════
# SCRIPT DE DEPLOYMENT COMPLETO - BLUE HEELER TRAINER PRO
# Azure Static Web App + Cosmos DB + Azure Functions
# ═══════════════════════════════════════════════════════════════

param(
    [string]$ResourceGroup = "Pesquisa_Desenvolvimento",
    [string]$Location = "eastus",
    [string]$AppName = "blue-heeler-trainer",
    [string]$CosmosName = "blue-heeler-cosmos-db"
)

Write-Host "`n╔════════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║       🐶 BLUE HEELER TRAINER PRO - DEPLOYMENT AZURE          ║" -ForegroundColor Green
Write-Host "╚════════════════════════════════════════════════════════════════╝`n" -ForegroundColor Cyan

# Verificar se Azure CLI está instalado
Write-Host "🔍 Verificando Azure CLI..." -ForegroundColor Yellow
try {
    az --version | Out-Null
    Write-Host "✅ Azure CLI instalado`n" -ForegroundColor Green
} catch {
    Write-Host "❌ Azure CLI não encontrado!" -ForegroundColor Red
    Write-Host "Instale em: https://aka.ms/installazurecliwindows`n" -ForegroundColor Yellow
    exit 1
}

# Verificar autenticação
Write-Host "🔍 Verificando autenticação Azure..." -ForegroundColor Yellow
$account = az account show 2>$null | ConvertFrom-Json
if (-not $account) {
    Write-Host "⚠️  Você não está autenticado. Fazendo login..." -ForegroundColor Yellow
    az login
    $account = az account show | ConvertFrom-Json
}
Write-Host "✅ Autenticado como: $($account.user.name)" -ForegroundColor Green
Write-Host "📋 Assinatura: $($account.name)`n" -ForegroundColor Cyan

# Confirmar Resource Group
Write-Host "📦 Resource Group: $ResourceGroup" -ForegroundColor Cyan
Write-Host "🌍 Região: $Location`n" -ForegroundColor Cyan

$confirm = Read-Host "Continuar com o deployment? (S/N)"
if ($confirm -ne "S" -and $confirm -ne "s") {
    Write-Host "❌ Deployment cancelado pelo usuário" -ForegroundColor Red
    exit 0
}

Write-Host "`n═══════════════════════════════════════════════════════════════" -ForegroundColor DarkGray
Write-Host "ETAPA 1/4: Criando Cosmos DB Serverless" -ForegroundColor Yellow
Write-Host "═══════════════════════════════════════════════════════════════`n" -ForegroundColor DarkGray

Write-Host "⏳ Criando Cosmos DB account (isso pode levar 3-5 minutos)..." -ForegroundColor Cyan
az cosmosdb create `
    --name $CosmosName `
    --resource-group $ResourceGroup `
    --locations regionName=$Location `
    --capabilities EnableServerless `
    --kind GlobalDocumentDB `
    --default-consistency-level Session `
    --enable-automatic-failover false

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erro ao criar Cosmos DB" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Cosmos DB criado com sucesso`n" -ForegroundColor Green

Write-Host "⏳ Criando database 'BlueHeelerDB'..." -ForegroundColor Cyan
az cosmosdb sql database create `
    --account-name $CosmosName `
    --resource-group $ResourceGroup `
    --name "BlueHeelerDB"

Write-Host "✅ Database criado`n" -ForegroundColor Green

Write-Host "⏳ Criando container 'training_data'..." -ForegroundColor Cyan
az cosmosdb sql container create `
    --account-name $CosmosName `
    --resource-group $ResourceGroup `
    --database-name "BlueHeelerDB" `
    --name "training_data" `
    --partition-key-path "/deviceId" `
    --throughput 400

Write-Host "✅ Container criado`n" -ForegroundColor Green

Write-Host "⏳ Obtendo connection string..." -ForegroundColor Cyan
$cosmosKeys = az cosmosdb keys list `
    --name $CosmosName `
    --resource-group $ResourceGroup `
    --type connection-strings | ConvertFrom-Json

$connectionString = $cosmosKeys.connectionStrings[0].connectionString
Write-Host "✅ Connection string obtida`n" -ForegroundColor Green

Write-Host "`n═══════════════════════════════════════════════════════════════" -ForegroundColor DarkGray
Write-Host "ETAPA 2/4: Criando Azure Static Web App" -ForegroundColor Yellow
Write-Host "═══════════════════════════════════════════════════════════════`n" -ForegroundColor DarkGray

Write-Host "⏳ Criando Static Web App..." -ForegroundColor Cyan
az staticwebapp create `
    --name $AppName `
    --resource-group $ResourceGroup `
    --location $Location `
    --sku Free `
    --source . `
    --api-location "api" `
    --app-location "/" `
    --output-location "" `
    --branch main

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erro ao criar Static Web App" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Static Web App criado com sucesso`n" -ForegroundColor Green

Write-Host "`n═══════════════════════════════════════════════════════════════" -ForegroundColor DarkGray
Write-Host "ETAPA 3/4: Configurando variáveis de ambiente" -ForegroundColor Yellow
Write-Host "═══════════════════════════════════════════════════════════════`n" -ForegroundColor DarkGray

Write-Host "⏳ Configurando COSMOS_CONNECTION_STRING..." -ForegroundColor Cyan
az staticwebapp appsettings set `
    --name $AppName `
    --resource-group $ResourceGroup `
    --setting-names COSMOS_CONNECTION_STRING="$connectionString"

Write-Host "✅ Variável de ambiente configurada`n" -ForegroundColor Green

Write-Host "`n═══════════════════════════════════════════════════════════════" -ForegroundColor DarkGray
Write-Host "ETAPA 4/4: Deploy do aplicativo" -ForegroundColor Yellow
Write-Host "═══════════════════════════════════════════════════════════════`n" -ForegroundColor DarkGray

# Obter deployment token
Write-Host "⏳ Obtendo deployment token..." -ForegroundColor Cyan
$token = az staticwebapp secrets list `
    --name $AppName `
    --resource-group $ResourceGroup `
    --query "properties.apiKey" -o tsv

if (-not $token) {
    Write-Host "❌ Erro ao obter deployment token" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Token obtido`n" -ForegroundColor Green

Write-Host "⏳ Instalando Azure Static Web Apps CLI..." -ForegroundColor Cyan
npm install -g @azure/static-web-apps-cli 2>$null

Write-Host "`n⏳ Fazendo deploy do aplicativo..." -ForegroundColor Cyan
swa deploy . `
    --deployment-token $token `
    --app-location "/" `
    --api-location "api" `
    --output-location ""

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erro durante o deploy" -ForegroundColor Red
    exit 1
}

Write-Host "`n╔════════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║                  ✅ DEPLOYMENT CONCLUÍDO!                      ║" -ForegroundColor Green
Write-Host "╚════════════════════════════════════════════════════════════════╝`n" -ForegroundColor Cyan

# Obter URL do app
Write-Host "⏳ Obtendo URL do aplicativo..." -ForegroundColor Cyan
$appDetails = az staticwebapp show `
    --name $AppName `
    --resource-group $ResourceGroup | ConvertFrom-Json

$appUrl = $appDetails.defaultHostname

Write-Host "`n📊 INFORMAÇÕES DO DEPLOYMENT" -ForegroundColor Yellow
Write-Host "═══════════════════════════════════════════════════════════════`n" -ForegroundColor DarkGray
Write-Host "  🌐 URL do App: https://$appUrl" -ForegroundColor Green
Write-Host "  📦 Resource Group: $ResourceGroup" -ForegroundColor Cyan
Write-Host "  🗄️  Cosmos DB: $CosmosName" -ForegroundColor Cyan
Write-Host "  🚀 Static Web App: $AppName" -ForegroundColor Cyan
Write-Host "`n═══════════════════════════════════════════════════════════════`n" -ForegroundColor DarkGray

Write-Host "🎉 Acesse o app em: " -NoNewline -ForegroundColor Yellow
Write-Host "https://$appUrl" -ForegroundColor Green -BackgroundColor DarkGreen
Write-Host "`n✅ Deploy completo! O app está LIVE!`n" -ForegroundColor Green

# Salvar informações
$deployInfo = @{
    AppUrl = "https://$appUrl"
    ResourceGroup = $ResourceGroup
    CosmosDB = $CosmosName
    StaticWebApp = $AppName
    DeployDate = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
} | ConvertTo-Json

$deployInfo | Out-File "deployment-info.json" -Encoding UTF8

Write-Host "📄 Informações salvas em: deployment-info.json`n" -ForegroundColor Cyan
