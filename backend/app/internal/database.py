import motor.motor_asyncio
from pymongo import MongoClient
from fastapi_users.db import MongoDBUserDatabase

from .books.database import MongoDBBookDatabase
from .users.models import UserDB
from .books.models import BookDB

file = open('database_url')
DATABASE_URL = file.readline().strip()
file.close()
client = motor.motor_asyncio.AsyncIOMotorClient(
    DATABASE_URL, uuidRepresentation="standard"
)
db = client["test"]
user_collection = db["users"]
book_collection = db["books"]

pym_client = MongoClient(DATABASE_URL)
pym_db = pym_client.test
sync_user_col = pym_db['users']
sync_books_col = pym_db['books']


async def get_user_db():
    yield MongoDBUserDatabase(UserDB, user_collection)


async def get_book_db():
    yield MongoDBBookDatabase(BookDB, book_collection)