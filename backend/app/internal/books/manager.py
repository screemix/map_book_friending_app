from typing import Type, Generic, Optional, Callable, List
from fastapi import Request, Depends
from .database import MongoDBBookDatabase
from . import models
from bson.objectid import ObjectId
from ..database import get_book_db


class FastAPIBooksException(Exception):
    pass


class BookNotExists(FastAPIBooksException):
    pass


class BookManager():
    """
    User management logic.

    :attribute book_db_model: Pydantic model of a DB representation of a book.
    :param book_db: Database adapter instance.
    """

    book_db_model: Type[models.BD]
    book_db: MongoDBBookDatabase[models.BD]

    def __init__(self, book_db: MongoDBBookDatabase[models.BD]):
        self.book_db = book_db
        self.book_db_model = book_db.book_db_model

    async def get(self, id: str) -> models.BD:
        """
        Get a book by id.

        :param id: Id. of the book to retrieve.
        :raises BookNotExists: The book does not exist.
        :return: A book.
        """
        book = await self.book_db.get(id)

        if book is None:
            raise BookNotExists()

        return book

    async def create(
        self, book: models.BC, request: Optional[Request] = None
    ) -> models.BD:
        """
        Create a user in database.

        Triggers the on_after_register handler on success.

        :param book: The BookCreate model to create.
        :param request: Optional FastAPI request that
        triggered the operation, defaults to None.
        :return: A new book.
        """

        # book_dict = book.dict()
        # db_book = models.BookCreate(**book_dict)
        created_book = await self.book_db.create(book)

        return created_book

    async def delete(self, book: models.BD) -> None:
        """
        Delete a user.

        :param book: The user to delete.
        """
        await self.book_db.delete(book)

    async def search(self, search_string: str) -> List[models.BD]:
        """
        Delete a user.

        :param search_string: The string for books' title matching.
        """
        return await self.book_db.search(search_string)


async def get_book_manager(book_db=Depends(get_book_db)):
    yield BookManager(book_db)

BookManagerDependency = Callable[..., BookManager]
