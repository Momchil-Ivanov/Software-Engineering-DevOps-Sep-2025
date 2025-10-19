pipeline {
    agent any
    stages {
        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }
        stage('Run security Tests') { 
            steps {
                bat 'npm audit'
            }
        }
                stage('Run Integration Tests') { 
            steps {
                bat 'npm run test'
            }
        }
    }
}