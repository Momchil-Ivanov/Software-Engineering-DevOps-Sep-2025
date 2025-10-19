pipeline {
    agent any
    
    stages {
        stage("Restore dependencies") {
            steps {
                bat 'dotnet restore SeleniumBasicExercise.sln'
            }
        }
        stage("Build") {
            steps {
                bat 'dotnet build SeleniumBasicExercise.sln --no-restore'
            }
        }
        stage("Run Project1 Tests") {
            steps {
                bat 'dotnet test TestProject1 --no-build --verbosity normal'
            }
        }
        stage("Run Project2 Tests") {
            steps {
                bat 'dotnet test TestProject2 --no-build --verbosity normal'
            }
        }
        stage("Run Project3 Tests") {
            steps {
                bat 'dotnet test TestProject3 --no-build --verbosity normal'
            }
        }
    }
}
