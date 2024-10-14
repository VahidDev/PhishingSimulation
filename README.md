# Phishing Simulation and Awareness Web Application

## Project Description

This application is a phishing simulation and awareness web platform designed to demonstrate and test users' susceptibility to phishing attacks. It consists of a full-stack implementation using the following technologies:

- **Backend**: 
  - .NET server for handling phishing simulations.
  - NestJS server for managing phishing attempts and user authentication.
- **Frontend**: React for the web interface.
- **DevOps (Bonus)**: Docker for containerization and deployment.
- **Database**: MongoDB for storing user and phishing attempt data.

## Features

### 1. Phishing Simulation (.NET Server)
- The .NET server manages phishing simulations.
- A `POST /phishing/send` endpoint is used to send phishing emails to provided email addresses.
- Emails contain a link that, when clicked, notifies the server, tracking whether the user clicked the phishing link.
- The phishing attempt status is updated in the MongoDB database when the link is clicked.

### 2. Phishing Attempts Management (NestJS Server)
- User registration and login functionality with JWT-based authentication.
- A route to retrieve all phishing attempts, which is displayed on the client side.
- A route to send a phishing attempt from the client, which communicates with the .NET phishing simulation server for sending emails.

### 3. Frontend (React)
- React-based web application to interact with the backend services.
- **Login and Registration Pages**: Allows admin users to register and log in using JWT authentication.
- **Phishing Simulation Page**:
  - Enables users to input an email address and trigger a phishing attempt.
  - Displays a table of all phishing attempts, including recipient email, email content, and status.

### 4. Docker and DevOps
- Dockerfiles for the .NET server, NestJS server, and React frontend are provided.
- The entire application can be deployed using Docker Compose.

## Running the Application

### Prerequisites
- Docker and Docker Compose installed
- Ensure the following ports are not in use: 27017 for MongoDB, 3000, 3001, and 7198

### Steps to Run

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-directory>

2. Start the application using Docker Compose
   ```bash
   docker-compose up

## Internal Communication Between Services

Docker services communicate using their service names within the Docker network.

**.NET service** is reachable from the NestJS container via: `http://dotnetapp:7198/` 

## Application URLs 
- **Mongo DB** is accessible at: `mongodb://localhost:27017`
- **UI (React) app** is accessible at: `http://localhost:3000/`
- **.NET app** is accessible at: `http://localhost:7198/`
- **NestJS app** is accessible at: `http://localhost:3001/`

Please navigate to the UI (React) app at `http://localhost:3000/`

