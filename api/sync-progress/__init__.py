import azure.functions as func
import json
import os
from azure.cosmos import CosmosClient

# Configurar Cosmos DB
COSMOS_ENDPOINT = os.environ.get("COSMOS_ENDPOINT")
COSMOS_KEY = os.environ.get("COSMOS_KEY")
DATABASE_NAME = "blue-heeler-trainer"
CONTAINER_NAME = "user-data"


def main(req: func.HttpRequest) -> func.HttpResponse:
    try:
        # Get data from request
        user_data = req.get_json()

        # Initialize Cosmos client
        client = CosmosClient(COSMOS_ENDPOINT, COSMOS_KEY)
        database = client.get_database_client(DATABASE_NAME)
        container = database.get_container_client(CONTAINER_NAME)

        # Upsert data
        user_data["id"] = user_data.get("passwordHash", "default-user")
        container.upsert_item(user_data)

        return func.HttpResponse(
            json.dumps({"status": "success"}),
            mimetype="application/json",
            status_code=200,
        )
    except Exception as e:
        return func.HttpResponse(
            json.dumps({"error": str(e)}), mimetype="application/json", status_code=500
        )
