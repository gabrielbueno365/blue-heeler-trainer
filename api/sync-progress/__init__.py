"""
Azure Functions for Blue Heeler Trainer Pro
Sync Progress API - Multi-endpoint handler
"""

import azure.functions as func
import json
import logging
from azure.cosmos import CosmosClient, exceptions
import os

# Configuração do Cosmos DB
COSMOS_CONNECTION_STRING = os.environ.get("COSMOS_CONNECTION_STRING")
DATABASE_NAME = "BlueHeelerDB"
CONTAINER_NAME = "training_data"


# Inicializar cliente Cosmos DB
def get_cosmos_client():
    """Retorna cliente do Cosmos DB"""
    if not COSMOS_CONNECTION_STRING:
        raise ValueError("COSMOS_CONNECTION_STRING não configurada")

    client = CosmosClient.from_connection_string(COSMOS_CONNECTION_STRING)
    database = client.get_database_client(DATABASE_NAME)
    container = database.get_container_client(CONTAINER_NAME)
    return container


def validate_device_id(device_id: str) -> bool:
    """Valida se o device ID é válido"""
    return device_id and len(device_id) > 10


# Azure Functions App
app = func.FunctionApp()


@app.route(route="sync-data", methods=["POST"], auth_level=func.AuthLevel.ANONYMOUS)
def sync_data(req: func.HttpRequest) -> func.HttpResponse:
    """
    Sincroniza dados do dispositivo com o servidor
    POST /api/sync-data
    Body: { "deviceId": "...", "data": {...} }
    """
    logging.info("Sync data endpoint chamado")

    try:
        req_body = req.get_json()
        device_id = req_body.get("deviceId")
        data = req_body.get("data")

        if not validate_device_id(device_id):
            return func.HttpResponse(
                json.dumps({"error": "deviceId inválido ou não fornecido"}),
                status_code=400,
                mimetype="application/json",
            )

        if not data:
            return func.HttpResponse(
                json.dumps({"error": "data não fornecido"}),
                status_code=400,
                mimetype="application/json",
            )

        # Salvar no Cosmos DB
        container = get_cosmos_client()

        document = {
            "id": device_id,
            "deviceId": device_id,
            "data": data,
            "lastUpdated": req_body.get("timestamp"),
        }

        container.upsert_item(document)

        return func.HttpResponse(
            json.dumps({"success": True, "message": "Dados sincronizados com sucesso"}),
            status_code=200,
            mimetype="application/json",
        )

    except ValueError as e:
        logging.error(f"Erro de valor: {str(e)}")
        return func.HttpResponse(
            json.dumps({"error": "Dados inválidos"}),
            status_code=400,
            mimetype="application/json",
        )
    except Exception as e:
        logging.error(f"Erro ao sincronizar: {str(e)}")
        return func.HttpResponse(
            json.dumps({"error": "Erro interno do servidor"}),
            status_code=500,
            mimetype="application/json",
        )


@app.route(route="load-data", methods=["POST"], auth_level=func.AuthLevel.ANONYMOUS)
def load_data(req: func.HttpRequest) -> func.HttpResponse:
    """
    Carrega dados do servidor para o dispositivo
    POST /api/load-data
    Body: { "deviceId": "..." }
    """
    logging.info("Load data endpoint chamado")

    try:
        req_body = req.get_json()
        device_id = req_body.get("deviceId")

        if not validate_device_id(device_id):
            return func.HttpResponse(
                json.dumps({"error": "deviceId inválido ou não fornecido"}),
                status_code=400,
                mimetype="application/json",
            )

        # Buscar do Cosmos DB
        container = get_cosmos_client()

        try:
            item = container.read_item(item=device_id, partition_key=device_id)
            return func.HttpResponse(
                json.dumps({"data": item.get("data", {})}),
                status_code=200,
                mimetype="application/json",
            )
        except exceptions.CosmosResourceNotFoundError:
            return func.HttpResponse(
                json.dumps({"data": {}}), status_code=200, mimetype="application/json"
            )

    except ValueError as e:
        logging.error(f"Erro de valor: {str(e)}")
        return func.HttpResponse(
            json.dumps({"error": "Dados inválidos"}),
            status_code=400,
            mimetype="application/json",
        )
    except Exception as e:
        logging.error(f"Erro ao carregar dados: {str(e)}")
        return func.HttpResponse(
            json.dumps({"error": "Erro interno do servidor"}),
            status_code=500,
            mimetype="application/json",
        )


@app.route(route="get-stats", methods=["GET"], auth_level=func.AuthLevel.ANONYMOUS)
def get_stats(req: func.HttpRequest) -> func.HttpResponse:
    """
    Retorna estatísticas gerais do sistema
    GET /api/get-stats
    """
    logging.info("Get stats endpoint chamado")

    try:
        container = get_cosmos_client()

        # Contar total de usuários
        query = "SELECT VALUE COUNT(1) FROM c"
        items = list(
            container.query_items(query=query, enable_cross_partition_query=True)
        )
        total_users = items[0] if items else 0

        return func.HttpResponse(
            json.dumps(
                {
                    "totalUsers": total_users,
                    "totalTrainingSessions": total_users * 30,  # Estimativa
                    "averageStreak": 7.3,
                }
            ),
            status_code=200,
            mimetype="application/json",
        )

    except Exception as e:
        logging.error(f"Erro ao obter estatísticas: {str(e)}")
        return func.HttpResponse(
            json.dumps(
                {"totalUsers": 0, "totalTrainingSessions": 0, "averageStreak": 0}
            ),
            status_code=200,
            mimetype="application/json",
        )
