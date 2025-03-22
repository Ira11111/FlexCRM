FROM python:3.12

ENV PYTHONUNBUFFERED=1

WORKDIR /app/backend
RUN mkdir ./flexcrm

RUN apt-get update && apt-get install -y python3-dev supervisor nginx  \
    && rm -rf /var/lib/apt/lists/*

RUN pip install --upgrade pip && \
    pip install "poetry==2.1.1"

RUN poetry config virtualenvs.create false --local

COPY poetry.lock pyproject.toml ./

COPY flexcrm ./flexcrm

RUN poetry run pip install --no-binary :all: uwsgi==2.0.28
RUN poetry install

EXPOSE 8000