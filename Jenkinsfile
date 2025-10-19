pipeline {
    agent any
    stages {
        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }
        stage('Test') { 
            steps {
                bat 'npm run test'
            }
        }
    }
}