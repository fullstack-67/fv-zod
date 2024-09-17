# Form and Validation

## Building

- `docker compose --env-file ./.env up -d --force-recreate --build`

## Push to dockerhub

- `docker tag fv-frontend nnnpooh/fv-frontend:latest`
- `docker push nnnpooh/fv-frontend:latest`
- `docker tag fv-backend nnnpooh/fv-backend:latest`
- `docker push nnnpooh/fv-backend:latest`
