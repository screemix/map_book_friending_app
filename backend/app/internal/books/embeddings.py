import re
import numpy as np
from nltk.tokenize import sent_tokenize
import nltk
from sentence_transformers import SentenceTransformer
import re
import torch

nltk.download('punkt')
sbert_model = SentenceTransformer('all-mpnet-base-v2')#,  device='cuda')


def tokenize_book(book_description):
    tokenizer = sent_tokenize
    sentences =  tokenizer(book_description)
    sentences = [ re.sub(' +', ' ', x) for x in sentences]
    return sentences


def embed_book(book_sentences):
    model = sbert_model
    embs = torch.tensor(model.encode(book_sentences))
    emb = torch.mean(embs, axis=0)
    return emb


def process_description(book_desc):
    sentences = tokenize_book(book_desc)
    return np.array(embed_book(sentences)).tolist()