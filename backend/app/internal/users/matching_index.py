from ..database import sync_user_col
import hnswlib
import numpy as np
from uuid import UUID


def create_index(dim=768):
    book_vec = []
    _ids = []
    users = sync_user_col
    for user in users.find({}):
        if "book_vector" in user:
            book_vec.append(np.array(user["book_vector"]))
            _ids.append(int(user["index_id"]))
    p = hnswlib.Index(space='cosine', dim=dim)
    p.init_index(max_elements=len(book_vec)*2, ef_construction=200, M=16)
    if len(book_vec) == 768:
        p.add_items(book_vec, _ids)
    return p


def query_top_k_by_book(p, vector):
    print(len(vector))
    labels, distances = p.knn_query(np.array(vector), k=6)
    return labels[0][1:]


BOOK_INDEX = create_index()


def add_user_to_tree(p, vector, _id):
    global BOOK_INDEX
    p.add_items(vector, int(_id))
    if p.get_max_elements() == p.get_current_count():
        BOOK_INDEX = create_index()