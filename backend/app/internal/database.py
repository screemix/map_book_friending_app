import motor.motor_asyncio
from fastapi_users.db import MongoDBUserDatabase

from app.internal.users.models import UserDB

file = open('../../database_url')
DATABASE_URL = file.readline().strip()
file.close()
client = motor.motor_asyncio.AsyncIOMotorClient(
    DATABASE_URL, uuidRepresentation="standard"
)
db = client["test"]
collection = db["users"]


async def get_user_db():
    yield MongoDBUserDatabase(UserDB, collection)