# 🚀 Guia de Deploy Manual - Blue Heeler Trainer Pro

> **Pré-requisito**: Você já tem o Resource Group `Pesquisa_Desenvolvimento` criado

---

## ⚡ Opção 1: Deploy Automatizado (RECOMENDADO)

Execute o script PowerShell que cria TUDO automaticamente:

```powershell
.\DEPLOY_COMPLETO.ps1
```

**O que o script faz:**

1. ✅ Cria Cosmos DB Serverless
2. ✅ Cria database `BlueHeelerDB` e container `training_data`
3. ✅ Cria Azure Static Web App
4. ✅ Configura variável `COSMOS_CONNECTION_STRING`
5. ✅ Faz deploy do aplicativo
6. ✅ Retorna a URL do app funcionando

**Tempo estimado:** 8-12 minutos

---

## 🔧 Opção 2: Deploy Manual (Passo a Passo)

### **Etapa 1: Criar Cosmos DB Serverless**

```powershell
# Criar Cosmos DB account (3-5 minutos)
az cosmosdb create `
    --name blue-heeler-cosmos-db `
    --resource-group Pesquisa_Desenvolvimento `
    --locations regionName=eastus `
    --capabilities EnableServerless `
    --kind GlobalDocumentDB `
    --default-consistency-level Session

# Criar database
az cosmosdb sql database create `
    --account-name blue-heeler-cosmos-db `
    --resource-group Pesquisa_Desenvolvimento `
    --name "BlueHeelerDB"

# Criar container com partition key
az cosmosdb sql container create `
    --account-name blue-heeler-cosmos-db `
    --resource-group Pesquisa_Desenvolvimento `
    --database-name "BlueHeelerDB" `
    --name "training_data" `
    --partition-key-path "/deviceId" `
    --throughput 400

# Obter connection string (SALVE ESTE VALOR!)
az cosmosdb keys list `
    --name blue-heeler-cosmos-db `
    --resource-group Pesquisa_Desenvolvimento `
    --type connection-strings `
    --query "connectionStrings[0].connectionString" -o tsv
```

---

### **Etapa 2: Criar Azure Static Web App**

```powershell
az staticwebapp create `
    --name blue-heeler-trainer `
    --resource-group Pesquisa_Desenvolvimento `
    --location eastus `
    --sku Free `
    --source . `
    --api-location "api" `
    --app-location "/" `
    --output-location ""
```

---

### **Etapa 3: Configurar Variável de Ambiente**

```powershell
# Substitua <CONNECTION_STRING> pelo valor da Etapa 1
az staticwebapp appsettings set `
    --name blue-heeler-trainer `
    --resource-group Pesquisa_Desenvolvimento `
    --setting-names COSMOS_CONNECTION_STRING="<CONNECTION_STRING>"
```

---

### **Etapa 4: Fazer Deploy**

```powershell
# Instalar SWA CLI (só precisa fazer 1x)
npm install -g @azure/static-web-apps-cli

# Obter deployment token
$token = az staticwebapp secrets list `
    --name blue-heeler-trainer `
    --resource-group Pesquisa_Desenvolvimento `
    --query "properties.apiKey" -o tsv

# Deploy
swa deploy . `
    --deployment-token $token `
    --app-location "/" `
    --api-location "api"
```

---

### **Etapa 5: Obter URL do App**

```powershell
az staticwebapp show `
    --name blue-heeler-trainer `
    --resource-group Pesquisa_Desenvolvimento `
    --query "defaultHostname" -o tsv
```

---

## 🎯 Após o Deploy

### **Testar o Aplicativo**

1. Abra a URL do app no navegador
2. Configure as informações do cachorro
3. Marque um treino como completo
4. Verifique se aparece "✅ Sincronizado com servidor"

### **Verificar Azure Functions**

```powershell
# Ver logs das functions
az staticwebapp functions show `
    --name blue-heeler-trainer `
    --resource-group Pesquisa_Desenvolvimento
```

### **Ver dados no Cosmos DB**

Portal Azure → Cosmos DB → `blue-heeler-cosmos-db` → Data Explorer → `BlueHeelerDB` → `training_data`

---

## 🔍 Troubleshooting

### Erro: "Azure CLI não encontrado"

```powershell
# Instalar Azure CLI
winget install Microsoft.AzureCLI
```

### Erro: "Not authenticated"

```powershell
az login
```

### Erro: "Static Web App CLI not found"

```powershell
npm install -g @azure/static-web-apps-cli
```

### Erro: "Failed to connect to Cosmos DB"

- Verifique se a variável `COSMOS_CONNECTION_STRING` está configurada
- Confirme que o Cosmos DB foi criado com sucesso

---

## 📊 Custos Estimados

| Recurso              | Plano           | Custo/Mês             |
| -------------------- | --------------- | --------------------- |
| Azure Static Web App | Free            | **$0**                |
| Cosmos DB Serverless | Pay-as-you-go   | **~$1-5** (uso baixo) |
| Azure Functions      | Incluído no SWA | **$0**                |
| **TOTAL**            |                 | **~$1-5/mês**         |

---

## 🎉 Pronto!

Após o deploy, seu aplicativo estará acessível em:

```
https://blue-heeler-trainer-XXXXX.azurestaticapps.net
```

✅ **100% funcional e sincronizando com Cosmos DB!**
