from typing import Optional, List

from fastapi import Depends, Request
from fastapi_users import BaseUserManager

from ..database import book_collection, user_collection, get_user_db, get_book_db
from .models import UserCreate, UserDB, UserUpdate, User
from bson.objectid import ObjectId
from .matching_index import add_user_to_tree, BOOK_INDEX

import numpy as np

SECRET = "SECRET"


class UserManager(BaseUserManager[UserCreate, UserDB]):
    user_db_model = UserDB
    reset_password_token_secret = SECRET
    verification_token_secret = SECRET

    async def create(
        self, user: UserCreate, safe: bool = False, request: Optional[Request] = None
    ) -> UserDB:
        max_ind_user = await user_collection.find_one(sort=[("index_id", -1)])
        if max_ind_user is None:
            ind = 0
        else:
            ind = max_ind_user['index_id'] + 1
        user.index_id = ind
        return await super().create(user, safe, request)

    async def on_after_register(self, user: UserDB, request: Optional[Request] = None):
        pass

    async def on_after_forgot_password(
        self, user: UserDB, token: str, request: Optional[Request] = None
    ):
        pass

    async def on_after_request_verify(
        self, user: UserDB, token: str, request: Optional[Request] = None
    ):
        pass

    async def on_after_update(self, user: UserDB, update_dict, request: Optional[Request] = None):
        if update_dict.get('favourite_books_ids', None) is not None:
            upd_user = await self.vectorize_user_by_book(user)
            user_vec, user_id = upd_user.book_vector, upd_user.index_id
            add_user_to_tree(BOOK_INDEX, user_vec, user_id)


    async def vectorize_user_by_book(self, user: UserDB):
        vec = []
        book_list = [ObjectId(i) for i in user.favourite_books_ids]
        books_db = book_collection
        book_cursor = books_db.find({'_id': {'$in': book_list}})
        async for book in book_cursor:
            vec.append(book['book_vector'])
        vec = np.array(vec)
        vec = list(np.mean(vec, axis=0))
        user_upd = UserUpdate(book_vector=vec)
        return await self.update(user_upd, user)

    async def get_many(self, ids = List[str]):
        db = user_collection
        user_cursor = db.find({'index_id': {'$in': ids}})
        res = []
        async for user_dict in user_cursor:
            user_dict['book_vector'] = []
            res.append(User(**user_dict))
        return res



async def get_user_manager(user_db=Depends(get_user_db)):
    yield UserManager(user_db)