import datetime
from fastapi_users import models
from typing import List, Optional
from pydantic import validator
from bson import ObjectId
from uuid import UUID


def is_valid_UUID(string: str) -> bool:
    try:
        UUID(string)
        return True
    except ValueError:
        return False


class User(models.BaseUser):
    index_id: int
    favourite_books_ids: List[str]
    matched_users: List[str]
    age: int
    gender: str
    name: str
    city: str
    book_vector: Optional[List[float]]

    @validator('favourite_books_ids')
    def check_favourite_books_ids(cls, v):
        return [i for i in v if ObjectId.is_valid(i)]

    @validator('matched_users')
    def check_matched_users(cls, v):
        return [i for i in v if is_valid_UUID(i)]


User.update_forward_refs()


class UserCreate(models.BaseUserCreate):
    index_id: Optional[int]
    age: int
    gender: str
    name: str
    city: str
    favourite_books_ids: Optional[List[str]]
    matched_users: Optional[List[str]]

    class Config:
        extra = 'ignore'

    @validator('favourite_books_ids')
    def check_favourite_books_ids(cls, v):
        return [i for i in v if ObjectId.is_valid(i)]

    @validator('matched_users')
    def check_matched_users(cls, v):
        return [i for i in v if is_valid_UUID(i)]


class UserUpdate(models.BaseUserUpdate):
    favourite_books_ids: Optional[List[str]]
    matched_users: Optional[List[str]]
    age: Optional[int]
    gender: Optional[str]
    name: Optional[str]
    city: Optional[str]
    book_vector: Optional[List[float]]

    @validator('favourite_books_ids')
    def check_favourite_books_ids(cls, v):
        return [i for i in v if ObjectId.is_valid(i)]

    @validator('matched_users')
    def check_matched_users(cls, v):
        return [i for i in v if is_valid_UUID(i)]


class UserDB(User, models.BaseUserDB):
    pass