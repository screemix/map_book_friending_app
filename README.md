# Book friending app

## Context

Friending app that can match you with your potential friends based on your book taste. Application uses the features of your favorite books to find the people with most similar taste.
Developed as a part of MAP course, Innopolis University, F21.

Also you can try our telegram bot written with the same functionality. Bot's repo is [here](url). The bot is available [here](https://t.me/book_friending_bot). 

### Team 
- [Daniil](https://github.com/Frodan) - backend, devops
- [Alla](https://github.com/screemix) - ml, backend
- [Nikita](https://github.com/pakrentos) - backend
- [Idel](https://github.com/IdelIshbaev) - frontend

### Project stack

- Backend - Python, FastApi, MongoDB
- Frontend - React
- ML - Pytorch, Sklearn, HuggingFace
- CI\CD - Docker, Github Actions, AWS, Jenkins

### Branching policy
Gitflow

<img width="400" alt="Снимок экрана 2021-11-01 в 20 57 08" src="https://user-images.githubusercontent.com/43718473/139717929-2c3c87a6-7dae-4a46-bfbd-11ac198f1029.png">

### Workflow organization

All user stories are written in form of issues (see issues template). And divided on the sub-tasks that are assigned for one or more person. Each issue is also assigned to milestone and has due date. For project management we use github project board with all the issues (subtasks of user stories) as tasks. The form of the project dashbord is a simple Kanban board.

## User Documentation

For finding new friends based on your book taste you should:
1. Go to http://3.120.99.44:3000/login
2. Register and provide your contact info: 
<img width="400" alt="Снимок экрана 2021-11-22 в 18 23 09" src="https://user-images.githubusercontent.com/43718473/142887813-77a8edaa-26bf-417d-ac99-3224cfc9340e.png"> 

Or log in if you already used our service: 

<img width="400" alt="Снимок экрана 2021-11-22 в 18 23 36" src="https://user-images.githubusercontent.com/43718473/142887888-deb75081-e48a-40ca-98b8-ea6dfd656145.png">

3. Then you can start by choosing your favorite books - press the button "search" and write the name of you favorite book in the search window:
 
<img width="500" alt="1" src="https://user-images.githubusercontent.com/43718473/145601984-0e0005ed-2677-4124-b9a0-bc77d7b50f11.jpg">
<img width="500" alt="2" src="https://user-images.githubusercontent.com/43718473/145601995-fa0ab344-c39a-43d6-8bf4-b0cdf4ef1e3b.jpg">


Also, you can add your own book in the database if you can not find it on the site by search. You just need to add the following information about it:

<img width="500" alt="2" src="https://user-images.githubusercontent.com/43718473/145602139-32a19990-d495-4f6e-9d90-5234898c675d.jpg">


4. Now you would be able to see the books in your profile:

<img width="500" alt="2" src="https://user-images.githubusercontent.com/43718473/145602263-dba02859-8249-4e16-bce6-940ffb10e268.jpg">

5. Then, to find new friends press the button "search user" and application will provide you top-5 similar users to you.

<img width="500" alt="2" src="https://user-images.githubusercontent.com/43718473/145602293-9ee0fc0d-a08e-440e-a050-c132ea5b032f.jpg">

## Technical documentation

### Component diagram
<img width="600" alt="Снимок экрана 2021-12-10 в 15 36 27" src="https://user-images.githubusercontent.com/43718473/145575222-fccdff9f-b1be-4c43-8b2b-6da4ed7927b8.png">


### API documentation
API documentation  (Swagger) is available at: 
```bash
http://{YOUR_BACKEND_HOST}/docs
```

### Deployment (CI\CD)
Technologies such as Docker, Github-Actions, AWS are used for deployment. For the backend and frontend of the project a Dockerfile exists. With its help, it is easy to launch individual parts of the project. With the help of docker-compose.yml there is no problem to run full project quickly. In our project all commits to main and dev-ops branches activates github actions script. It runs test stage, and if everything is okay, than it deploys the updated application to AWS server.

### How to run

Preparation:
```bash
echo "YOUR_MONGODB_URL" >> backend/database_url
echo "REACT_APP_API_DOMAIN=http://{YOUR_HOST}:{PORT}/" >> frontend/.env
```
##### Run only backend
```bash
cd backend
docker build . --file Dockerfile -t backend && docker run backend
```
##### Run only frontend
```bash
cd frontend
docker build . --file Dockerfile -t frontend && docker run frontend
```
##### Run whole project
```bash
docker-compose -f docker-compose.yml up --build -d
```
### How to use:
Frontend default at:
```
http://127.0.0.1:3000
```
Backend default at:
```
http://127.0.0.1:8000
```

### Tests
Tests are implemented as a stage of pipeline in CI\CD. With the help of pytest, the main functionality, such as authorization, adding books, searching is analyzed.

#### Tests running
```bash
cd project
python3 -m venv .
pip install -r backend/requirements.txt
pytest
```

## Sprint reports

### Sprint 1 results

- Done with #5 - [US0 As a user I want to sign up in the APP MUST](https://github.com/screemix/map_book_friending_app/issues/5) (https://github.com/screemix/map_book_friending_app/issues/17)
- Done with #10 - [US1 As a user I want to sign in in the APP MUST](https://github.com/screemix/map_book_friending_app/issues/10)
- Done with #17 - [US4 As a user, I want to fill in my contacts MUST]
-   Additionaly we did research and write the code for ml embeddings to vectorize books and [collected book datset(https://github.com/screemix/map_book_friending_app/issues/2)
- Did not managed to finish - Task #11, it was planned as we thought we'll have extra time on finishing it, but there occured several errors which we needed to fix.

### Sprint 2 results
Done with all [planned tasks](https://github.com/screemix/map_book_friending_app/milestone/3?closed=1)
- Done with US2 As a user I want to add my favorite book to APP library MUST #4
- Done with US3 As a user, I want to search for my favorite book in the APP library MUST #14
- Done with US16 As a developer I want to have CI/CD MUST #49

### Sprint 3 results
Done with [all planned tasks](https://github.com/screemix/map_book_friending_app/milestone/4)
- Done with - [US5 As a user I want to my contact information be displayed for other users MUST](https://github.com/screemix/map_book_friending_app/issues/21)
- Fixed CI/CD
- Wrote base backend for search

### Sprint 4 results 
- Wrote ML algotthm and integrated it with backend pre written code for [US6 - As a user I want to search for users with similar book tastes MUST](https://github.com/screemix/map_book_friending_app/issues/23)
- Fixed issue with frontend and ml algorithm compatibility

## How to proceed with this project
Futher step to make complete this project is adding a chat ([US8 As a user I want to write messages to other users MUST #25](https://github.com/screemix/map_book_friending_app/issues/25)) to provide users possibilty to communicate. Now this project performs as an good MVP, but of course future additional features and better UI/UX could be nice things to have.
