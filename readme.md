# <img src="./public/favicon.ico" width="30" height="30" /> SkyRadio Frontend

Frontend to SkyRadio app.

Backend: [SkyRadio Backend](https://github.com/carum98/skyradio-api?tab=readme-ov-file)

Mobile: [SkyRadio Mobile](https://github.com/carum98/skyradio_mobile)

## Description
This project is a web application, built with [Nuxt.js](https://nuxtjs.org/), to consume the [SkyRadio Backend](https://github.com/carum98/skyradio-api?tab=readme-ov-file) API, use [Nitro](https://nitro.unjs.io/) like proxy server. The project is dockerized, and has a docker-compose file to run the project in development mode, and another docker-compose file to run the project in production mode. 

## Environment variables
The project has a `.env` file, which contains the environment variables, which are:

| Variable | Description |
| --- | --- |
| `PORT` | Port where the API will run |
| `NUXT_API_BASE_URL` | Port of the database |
| `ANALYTICS_HOST` | Host of the analytics server |
| `ANALYTICS_KEY` | Key of the analytics server |
| `CORS_ALLOW_ORIGIN` | Origin allowed by the CORS policy |

> Note that the `ANALYTICS_HOST` and `ANALYTICS_KEY` variables are used to send the analytics data to the analytics server. This project uses [SkyAnalytics](https://github.com/carum98/skyanalytics) as the analytics server.

> Note that the proxy server is [Nitro](https://nitro.unjs.io/), and the `CORS_ALLOW_ORIGIN` variable is used to set the `Access-Control-Allow-Origin` header.

## Generate Docker image to production
To generate the Docker image, you must run the following command:

```bash
docker build -t <name-container> -f ./docker/Dockerfile.prod .
```

To reduce the image size, the build process has 2 stages, the first one is to install the dependencies and build the project, when the build is done, prune the dependencies to remove the development dependencies, and the second stage is to copy the compiled files and production dependencies to the container.

## To run the project on a server
To run the project on a server, you must have [Docker](https://www.docker.com/) installed, and pull the image generated in the previous step. Copy the `docker-compose.prod.yml` file to the server, and create a `.env` file with the [environment variables](#environment-variables), and run the following commands:

```bash
docker network create skyradio-network
```

```bash
docker-compose -f docker-compose.prod.yml -d --build
```

Important, this docker-compose files don't expose the ports, so you must expose the ports manually, or use a reverse proxy container like [Nginx](https://hub.docker.com/_/nginx), connecting the containers to the same network.