from pydantic import BaseModel, PrivateAttr
from typing import List, TypeVar, Optional
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
    book_vector: List[float] = []

    class Config:
        orm_mode = True




class BookCreate(BaseModel):
    book_vector: Optional[List[float]]
    title: str
    author: str
    description: str
    genres: List[str]


class BookUpdate(Book):
    pass


B = TypeVar("B", bound=Book)
BC = TypeVar("BC", bound=BookCreate)
BU = TypeVar("BU", bound=BookUpdate)
BD = TypeVar("BD", bound=BookDB)
