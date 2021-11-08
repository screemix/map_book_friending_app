from typing import Optional

from fastapi import Depends, Request
from fastapi_users import BaseUserManager

from app.internal.database import get_user_db
from .models import UserCreate, UserDB

SECRET = "SECRET"


class UserManager(BaseUserManager[UserCreate, UserDB]):
    user_db_model = UserDB
    reset_password_token_secret = SECRET
    verification_token_secret = SECRET

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


async def get_user_manager(user_db=Depends(get_user_db)):
    yield UserManager(user_db)