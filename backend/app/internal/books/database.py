from typing import Callable, Generic, Optional, Type, List

from .models import BD
from motor.motor_asyncio import AsyncIOMotorCollection
from pymongo import TEXT
from bson.objectid import ObjectId

class MongoDBBookDatabase(Generic[BD]):
    """
    Base adapter for retrieving, creating and updating books from a database.

    :param book_db_model: Pydantic model of a DB representation of a book.
    :param collection: Collection instance from `motor`.
    """

    book_db_model: Type[BD]

    collection: AsyncIOMotorCollection

    def __init__(
        self,
        book_db_model: Type[BD],
        collection: AsyncIOMotorCollection
    ):
        self.book_db_model = book_db_model
        self.collection = collection
        self.collection.create_index(("title", TEXT), name='title_text', background=True)

    async def get(self, id: str) -> Optional[BD]:
        book = await self.collection.find_one({"_id": ObjectId(id)})
        book['_id'] = str(book['_id'])
        return self.book_db_model(**book) if book else None

    async def search(self, search_string: str) -> List[BD]:
        book_cursor = self.collection.find({'$text': {'$search': search_string}}, { "score": { "$meta": "textScore" } })#
        book_cursor.sort([('score', {'$meta': 'textScore'})])
        book_list = []
        async for book in book_cursor:
            book['_id'] = str(book['_id'])
            # print(book['title'])
            book_obj = self.book_db_model(**book)
            book_list.append(book_obj)
        return book_list

    async def create(self, book: BD) -> BD:
        insert_data = book.dict()
        insert_data['book_vector'] = []
        insertone = await self.collection.insert_one(insert_data)
        insert_id = insertone.inserted_id
        insert_id = str(insert_id)
        new_book = self.book_db_model(_id=insert_id, **book.dict())
        return new_book

    async def update(self, book: BD) -> BD:
        await self.collection.replace_one({"_id": book.id}, book.dict())
        return book

    async def delete(self, book: BD) -> None:
        await self.collection.delete_one({"_id": book.id})


BookDatabaseDependency = Callable[..., MongoDBBookDatabase]
