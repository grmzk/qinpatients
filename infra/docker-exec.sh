#!/bin/bash

docker-compose down
docker-compose up -d --build
docker-compose exec backend python manage.py migrate
#docker-compose exec backend python manage.py createsuperuser --username admin --email admin@fake.fake
#docker-compose exec backend python manage.py collectstatic --no-input
#docker-compose exec backend bash
