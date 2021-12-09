# Book friending app[![CI/CD](https://github.com/screemix/map_book_friending_app/actions/workflows/docker-image.yml/badge.svg)](https://github.com/screemix/map_book_friending_app/actions/workflows/docker-image.yml)

## Context
Friending app that can match you with your potential friends based on your book taste.
Developed as a part of MAP course, Innopolis University, F21.

## Tests
Tests are implemented as a stage of pipeline in CI\CD. With the help of pytest, the main functionality, such as authorization, adding books, searching is analyzed.
### Tests running
```bash
cd project
python3 -m venv .
pip install -r backend/requirements.txt
pytest
```
## Deployment (CI\CD)
Technologies such as Docker, Github-Actions, AWS are used for deployment. For the backend and frontend of the project a Dockerfile exists. With its help, it is easy to launch individual parts of the project. With the help of docker-compose.yml there is no problem to run full project quickly. In our project all commits to main and dev-ops branches activates github actions script. It runs test stage, and if everything is okay, than it deploys the updated application to AWS server.
### How to run
Preparation:
```bash
echo "YOUR_MONGODB_URL" >> backend/database_url
echo "REACT_APP_API_DOMAIN=http://{YOUR_HOST}:{PORT}/" >> frontend/.env
```
#### Run only backend
```bash
cd backend
docker build . --file Dockerfile -t backend && docker run backend
```
#### Run only frontend
```bash
cd frontend
docker build . --file Dockerfile -t frontend && docker run frontend
```
#### Run whole project
```bash
docker-compose -f docker-compose.yml up --build -d
```
## How to use:
Frontend default at:
```
http://127.0.0.1:3000
```
Backend default at:
```
http://127.0.0.1:8000
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

## Sprint 1 results

## Sprint 2 results

## Sprint 3 results

## Sprint 4 results 

## Sprint 5 results
