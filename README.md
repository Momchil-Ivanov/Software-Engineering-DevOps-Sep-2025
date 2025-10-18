# Student Registry App Docker

A Node.js web application for managing student records with Docker containerization and CI/CD pipeline using Jenkins.

## Features

- Student registration and management
- Web interface built with Pug templates
- RESTful API endpoints
- Automated testing with Mocha
- Docker containerization
- CI/CD pipeline with Jenkins

## Prerequisites

- Node.js 14+
- npm
- Docker
- Docker Compose

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Momchil-Ivanov/Software-Engineering-DevOps-Sep-2025.git
cd Software-Engineering-DevOps-Sep-2025
git checkout 12-02-Student-Registry-App-Docker
```

2. Install dependencies:
```bash
npm install
```

## Running the Application

### Local Development
```bash
npm start
```
The application will be available at `http://localhost:8888`

### Using Docker
```bash
# Build the Docker image
docker build -t student-registry-app .

# Run the container
docker run -p 8888:8888 student-registry-app
```

### Using Docker Compose
```bash
docker-compose up
```

## Testing

Run the test suite:
```bash
npm test
```

## API Endpoints

- `GET /` - Home page
- `GET /about` - About page
- `GET /students` - View all students
- `GET /add-student` - Add student form
- `POST /add-student` - Create new student

## CI/CD Pipeline

This project includes a Jenkins CI/CD pipeline that:
- Clones the repository
- Installs dependencies
- Runs tests
- Builds Docker images
- Deploys the application

## Project Structure

```
├── controllers/          # Route controllers
├── models/              # Data models
├── views/               # Pug templates
├── tests/               # Test files
├── Dockerfile           # Docker configuration
├── docker-compose.yml   # Docker Compose configuration
├── package.json         # Node.js dependencies
└── index.js            # Application entry point
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests
5. Submit a pull request

## License

This project is part of the Software Engineering and DevOps course.
