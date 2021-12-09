FROM python:3.8.2-slim-buster

RUN apt-get update && apt-get install build-essential -y

WORKDIR /usr/src/app_python

COPY requirements.txt ./

RUN pip install --no-cache-dir -r requirements.txt

COPY . ./

EXPOSE 8000

CMD [ "uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000" ]