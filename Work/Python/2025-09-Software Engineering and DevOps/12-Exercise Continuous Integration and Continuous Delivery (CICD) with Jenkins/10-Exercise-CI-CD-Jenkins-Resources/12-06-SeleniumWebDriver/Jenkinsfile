pipeline {
    agent any
    
    stages {
        stage("Restore dependencies") {
            steps {
                bat 'dotnet restore SeleniumWebDriver'
            }
        }
        stage("Build") {
            steps {
                bat 'dotnet build SeleniumWebDriver --no-restore'
            }
        }
        stage("Run Project1 Tests") {
            steps {
                bat 'dotnet test SeleniumWebDriver/TestProject1 --no-build --verbosity normal'
            }
        }
        stage("Run Project2 Tests") {
            steps {
                bat 'dotnet test SeleniumWebDriver/TestProject2 --no-build --verbosity normal'
            }
        }
        stage("Run Project3 Tests") {
            steps {
                bat 'dotnet test SeleniumWebDriver/TestProject3 --no-build --verbosity normal'
            }
        }
    }
}
