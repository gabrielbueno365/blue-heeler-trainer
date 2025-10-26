# 🐕‍🦺 Blue Heeler Trainer Pro

Progressive Web App para treinamento de Blue Heelers com sincronização em nuvem.

## ✨ Features

- 📱 PWA instalável
- 🔄 Sincronização multi-device
- 📊 8 exercícios de treinamento
- 📚 6 guias científicos
- 🏆 12 badges/conquistas
- 💾 Funciona offline

## 📁 Estrutura

```
├── index.html
├── app.js
├── styles.css
├── manifest.json
├── staticwebapp.config.json
└── api/
    ├── host.json
    ├── requirements.txt
    └── sync-progress/
        ├── __init__.py
        └── function.json
```

## 🚀 Deploy no Azure

### ⚡ Opção 1: Script Automatizado (RECOMENDADO)

```powershell
# Execute o script que cria TUDO automaticamente
.\DEPLOY_COMPLETO.ps1
```

**O que faz:**

- ✅ Cria Cosmos DB Serverless
- ✅ Cria Azure Static Web App
- ✅ Configura variáveis de ambiente
- ✅ Faz deploy completo
- ✅ Retorna URL do app funcionando

**Tempo:** 8-12 minutos

---

### 📋 Opção 2: Deploy Manual

Veja instruções completas em: **[DEPLOY_MANUAL.md](DEPLOY_MANUAL.md)**

---

## 📦 Pré-requisitos

```bash
# Azure Static Web Apps
swa deploy . --app-name blue-heeler-app

# Configurar variável de ambiente
COSMOS_CONNECTION_STRING=<sua-connection-string>
```

## 🛠️ Stack

- **Frontend:** HTML5, CSS3, Vanilla JS
- **Backend:** Azure Functions (Python 3.10)
- **Database:** Azure Cosmos DB (Serverless)
- **Hosting:** Azure Static Web Apps
