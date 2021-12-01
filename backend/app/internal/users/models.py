import datetime
from fastapi_users import models
from typing import List, Optional


class User(models.BaseUser):
    index_id: int
    favourite_books_ids: List[str]
    matched_users: List[str]
    age: int
    gender: str
    name: str
    city: str
    book_vector: Optional[List[float]]


User.update_forward_refs()


class UserCreate(models.BaseUserCreate):
    index_id: Optional[int]
    favourite_books_ids: Optional[List[str]]
    matched_users: Optional[List[str]]
    age: int
    gender: str
    name: str
    city: str


class UserUpdate(models.BaseUserUpdate):
    favourite_books_ids: Optional[List[str]]
    matched_users: Optional[List[str]]
    age: Optional[int]
    gender: Optional[str]
    name: Optional[str]
    city: Optional[str]
    book_vector: Optional[List[float]]


class UserDB(User, models.BaseUserDB):
    pass