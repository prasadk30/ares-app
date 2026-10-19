# ARES App

A containerized web application built using **Python Flask, Node.js, Express.js, EJS, and Docker Compose**. The application separates the frontend and backend into independent services that communicate through a REST API.

## Overview

ARES App demonstrates a multi-container web application architecture. The Flask backend provides API endpoints and retrieves application data, while the Express.js frontend fetches that data and renders the user interface using EJS templates.

## Tech Stack

- **Backend:** Python, Flask
- **Frontend:** Node.js, Express.js, EJS
- **API:** REST API, JSON
- **Containerization:** Docker, Docker Compose
- **Networking:** Docker bridge network

## Architecture

```text
                 User / Browser
                       |
                       v
              Frontend (Express.js)
                   Port 3000
                       |
                       | HTTP Request
                       v
                Backend (Flask)
                   Port 8000
                       |
                       v
                 Business Logic
                   get_data()
```

The frontend communicates with the backend through the `BACKEND_URL` environment variable. Docker Compose connects both services through a shared Docker network.

## Project Structure

```text
ares-app/
├── backend/
│   ├── Dockerfile
│   └── Flask application and business logic
├── frontend/
│   ├── Dockerfile
│   └── Express.js application and EJS views
├── docker-compose.yml
└── README.md
```

*Note: The structure above is a high-level overview. Adjust the filenames to match your repository.*

## Prerequisites

Install the following tools before running the application:

- [Git](https://git-scm.com/)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- Docker Compose (included with current Docker Desktop installations)

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/prasadk30/ares-app.git
```

### 2. Navigate to the project directory

```bash
cd ares-app
```

### 3. Build and start the application

Ensure Docker Desktop is running, then execute:

```bash
docker compose up --build
```

To run the containers in the background:

```bash
docker compose up -d --build
```

Docker Compose builds the frontend and backend images, creates the application network, and starts both services.

### 4. Access the application

Once the containers are running, open:

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:8000/api

The frontend uses the backend API to retrieve data and render the page.

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Returns a basic backend welcome message |
| GET | `/api` | Returns application data as a JSON response |

### Example API Response

The `/api` endpoint wraps the data returned by the backend business logic in a JSON object.

```json
{
  "data": []
}
```

The contents of the `data` array depend on the implementation of `get_data()`.

### Test the API

You can test the endpoint in your browser or using curl:

```bash
curl http://localhost:8000/api
```

## Environment Configuration

The frontend uses the `BACKEND_URL` environment variable to locate the backend API.

For Docker Compose, the configured URL is:

```text
BACKEND_URL=http://backend-host:8000/api
```

This URL is intended for communication between containers. From your host machine, use `http://localhost:8000/api` to access the backend.

Ensure the backend hostname matches the hostname or network alias configured in your Docker Compose file.

## Docker Commands

| Command | Purpose |
|---|---|
| `docker compose up --build` | Build and start the application |
| `docker compose up -d` | Start services in the background |
| `docker compose ps` | Check service status |
| `docker compose logs -f` | View application logs |
| `docker compose logs backend` | View backend logs |
| `docker compose logs frontend` | View frontend logs |
| `docker compose restart` | Restart services |
| `docker compose down` | Stop and remove containers and the Compose network |

## Troubleshooting

**1. Frontend cannot connect to the backend**

- Verify that both containers are running.
- Check the `BACKEND_URL` environment variable.
- Confirm that the backend listens on `0.0.0.0:8000` inside its container.
- Verify that the backend hostname is resolvable on the shared Docker network.

**2. Docker build fails**

- Confirm that each service has a valid Dockerfile.
- Run `docker compose build --no-cache` to rebuild the images.
- Review the build output for missing files or dependencies.

**3. API returns an error**

- Check the backend logs using `docker compose logs backend`.
- Verify the implementation of `get_data()`.
- Test `http://localhost:8000/api` independently.

## Learning Objectives

This project demonstrates:

- Building a REST API with Flask.
- Developing a server-rendered frontend with Express.js and EJS.
- Connecting frontend and backend services over HTTP.
- Configuring applications with environment variables.
- Containerizing applications using Docker.
- Managing multiple services with Docker Compose.
- Understanding container networking and service communication.

## Author

**Prasad Kumbhar**

GitHub: [@prasadk30](https://github.com/prasadk30)

## Repository

[https://github.com/prasadk30/ares-app](https://github.com/prasadk30/ares-app)
