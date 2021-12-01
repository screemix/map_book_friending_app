from fastapi import FastAPI, Depends, Query
from fastapi_users import FastAPIUsers
from .internal.users.manager import get_user_manager
from .internal.users.models import User, UserDB, UserCreate, UserUpdate
from fastapi_users.authentication import JWTAuthentication
from fastapi.middleware.cors import CORSMiddleware
from .internal.books.models import BookCreate, Book, BookDB
from typing import List
from .internal.users.manager import UserManager
from .internal.books.manager import get_book_manager, BookManager

origins = [
    "*",
]

SECRET = "SECRET"

jwt_authentication = JWTAuthentication(secret=SECRET, lifetime_seconds=3600)

fastapi_users = FastAPIUsers(
    get_user_manager,
    [jwt_authentication],
    User,
    UserCreate,
    UserUpdate,
    UserDB,
)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(
    fastapi_users.get_auth_router(jwt_authentication),
    prefix="/auth/jwt",
    tags=["auth"],
)

app.include_router(
    fastapi_users.get_register_router(),
    prefix="/auth",
    tags=["auth"],
)

app.include_router(
    fastapi_users.get_users_router(),
    prefix="/users",
    tags=["users"],
)

current_user = fastapi_users.current_user()

@app.get("/books/", response_model=List[Book])
async def read_items(
    q: str = Query(
        None,
        title="Book query string",
        description="Query string for the books to search in the database that have a good match by title",
        min_length=3,
    ), book_manager: BookManager = Depends(get_book_manager)
):
    return await book_manager.search(q)

@app.post("/books/", response_model=Book)
async def post_book(
        book: BookCreate,
        book_manager: BookManager = Depends(get_book_manager),
        user: User = Depends(current_user),
        user_manager: UserManager = Depends(get_user_manager)
):
    book_obj = await book_manager.create(book)
    print(book_obj.dict())
    upd_user = UserUpdate(**user.dict())
    upd_user.favourite_books_ids.append(book_obj.id)
    user_manager.update(upd_user, user)
    return book_obj