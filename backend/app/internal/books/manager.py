from typing import Type, Generic, Optional, Callable, List
from fastapi import Request, Depends
from .database import MongoDBBookDatabase
from . import models
from bson.objectid import ObjectId
from ..database import get_book_db
from .embeddings import process_description
from ..users.models import User, UserUpdate
from ..users.manager import UserManager


class FastAPIBooksException(Exception):
    pass


class BookNotExists(FastAPIBooksException):
    pass


class BookManager():
    """
    Book management logic.

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
        self, book: models.BC, user: Optional[User] = None, user_manager: Optional[UserManager] = None
    ) -> models.BD:
        """
        Create a book in database.

        Triggers the on_after_register handler on success.

        :param book: The BookCreate model to create.
        :param request: Optional FastAPI request that
        triggered the operation, defaults to None.
        :return: A new book.
        """

        book_dict = book.dict()
        book_dict['book_vector'] = process_description(book.description)
        book = models.BookCreate(**book_dict)
        created_book = await self.book_db.create(book)
        if user is not None and user_manager is not None:
            await self.on_after_upload(created_book, user, user_manager)
        return created_book

    async def on_after_upload(self, book: models.BD, user: User, user_manager: UserManager):
        liked_books_ids = user.favourite_books_ids
        liked_books_ids.append(book.id)
        user_update = UserUpdate(favourite_books_ids=liked_books_ids)
        await user_manager.update(user_update, user)



    async def delete(self, book: models.BD) -> None:
        """
        Delete a book.

        :param book: The book to delete.
        """
        await self.book_db.delete(book)

    async def search(self, search_string: str) -> List[models.BD]:
        """
        Delete a book.

        :param search_string: The string for books' title matching.
        """
        return await self.book_db.search(search_string)


async def get_book_manager(book_db=Depends(get_book_db)):
    yield BookManager(book_db)

BookManagerDependency = Callable[..., BookManager]
