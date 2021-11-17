from pydantic import BaseModel, PrivateAttr
from typing import List, TypeVar
from bson.objectid import ObjectId


class Book(BaseModel):
    id: str
    title: str
    author: str
    genres: List[str]
    description: str

    class Config:
        fields = {'id': '_id'}


class BookDB(Book):
    _book_vector: List[float] = PrivateAttr()

    class Config:
        orm_mode = True
        fields = {'id': '_id', '_book_vector': 'book_vector'}




class BookCreate(BaseModel):
    _book_vector: List[float] = PrivateAttr(default=[])
    title: str
    author: str
    description: str
    genres: List[str]

    class Config:
        fields = {'_book_vector': 'book_vector'}


class BookUpdate(Book):
    pass


B = TypeVar("B", bound=Book)
BC = TypeVar("BC", bound=BookCreate)
BU = TypeVar("BU", bound=BookUpdate)
BD = TypeVar("BD", bound=BookDB)
