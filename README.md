# Book friending app[![CI/CD](https://github.com/screemix/map_book_friending_app/actions/workflows/docker-image.yml/badge.svg)](https://github.com/screemix/map_book_friending_app/actions/workflows/docker-image.yml)

## Context
Friending app that can match you with your potential friends based on your book taste.
Developed as a part of MAP course, Innopolis University, F21.

## Run
```bash

echo "YOUR_MONGODB_URL" >> backend/database_url
docker-compose up --build
```
Site will work on:
```
http://127.0.0.1:3000
```

## Team 
- Daniil - backend, devops
- Alla - ml, backend
- Nikita - backend
- Idel - frontend

## Technical details

- Backend - Python, FastApi, MongoDB
- Frontend - React
- ML - Pytorch, Sklearn, HuggingFace
- CI\CD - Docker, Github Actions, AWS, Jenkins

## Branching policy
Gitflow

<img width="611" alt="Снимок экрана 2021-11-01 в 20 57 08" src="https://user-images.githubusercontent.com/43718473/139717929-2c3c87a6-7dae-4a46-bfbd-11ac198f1029.png">

## Workflow organization

All user stories are written in form of issues (see issues template). And divided on the sub-tasks that are assigned for one or more person. Each issue is also assigned to milestone and has due date. For project management we use github project board with all the issues (subtasks of user stories) as tasks. The form of the project dashbord is a simple Kanban board.

## User Documentation

For finding new friends based on your book taste you should:
1. Go to http://3.120.99.44:3000/login
2. Register and provide your contact info: 
<img width="586" alt="Снимок экрана 2021-11-22 в 18 23 09" src="https://user-images.githubusercontent.com/43718473/142887813-77a8edaa-26bf-417d-ac99-3224cfc9340e.png"> 

Or log in if you already used our service: 

<img width="600" alt="Снимок экрана 2021-11-22 в 18 23 36" src="https://user-images.githubusercontent.com/43718473/142887888-deb75081-e48a-40ca-98b8-ea6dfd656145.png">

3. Then you can start by choosing your favorite books - just write the name of the book in the field:
<img width="1269" alt="Снимок экрана 2021-11-22 в 18 25 17" src="https://user-images.githubusercontent.com/43718473/142888201-d71c5438-65c3-4659-afe7-f3667d014ecd.png">
<img width="1263" alt="Снимок экрана 2021-11-22 в 18 25 42" src="https://user-images.githubusercontent.com/43718473/142888260-c65fe458-9709-469e-88a3-da624b24a89b.png">

## Technical documentation
Backend Swagger is available at 
```bash
http://{YOUR_BACKEND_HOST}/docs
```
CI/CD is deploying code from dev/ops branch to AWS Server.
Server is available at: 
```bash
http://3.120.99.44:3000/
```
### Run Backend locally
```bash
cd backend
pip install -r requirements.txt
echo "YOUR_MONGODB_URL" >> database_url
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

### Run Frontend locally
```bash
cd frontend
yarn install (can be done just once)
yarn start
```
### Test Frontend locally
```bash
cd frontend
yarn test
```
### Run All in Docker
```bash

echo "YOUR_MONGODB_URL" >> backend/database_url
docker-compose up --build
```
Site will work on:
```
http://127.0.0.1:3000
```


## Sprint 1 results

- Done with 2 User stories - #5 - [US0 As a user I want to sign up in the APP MUST](https://github.com/screemix/map_book_friending_app/issues/5), #10 - [US1 As a user I want to sign in in the APP MUST](https://github.com/screemix/map_book_friending_app/issues/10), #17 - [US4 As a user, I want to fill in my contacts MUST](https://github.com/screemix/map_book_friending_app/issues/17), additionaly we did research and write the code for ml embeddings to vectorize books and [collected book datset](https://github.com/screemix/map_book_friending_app/issues/2)

- Did not managed to finish - Task #11, it was planned as we thought we'll have extra time on finishing it, but there occured several errors which we needed to fix.

- [Plans for the 2nd sprint](https://github.com/screemix/map_book_friending_app/milestone/3) - book adding/searching, addting CI/CD+tests

## Sprint 2 results
Done with all [planned tasks](https://github.com/screemix/map_book_friending_app/milestone/3?closed=1)
- Done with US2 As a user I want to add my favorite book to APP library MUST #4
- Done with US3 As a user, I want to search for my favorite book in the APP library MUST #14
- Done with US16 As a developer I want to have CI/CD MUST #49

[Plans for the 3nd sprint](https://github.com/screemix/map_book_friending_app/milestone/4) - Backend and Frontend for user profile + user matching algorithm

## Sprint 3 results
Done with - US5 As a user I want to my contact information be displayed for other users MUST
Fixed CI/CD
Wrote base backend for search

## Sprint 4 results 
Integrated ML algotthm with backend for US6

## Sprint 5 results
