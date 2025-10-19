pipeline {
    agent any
    stages {
        stage("Verify .NET Installation"){
            steps{
                bat 'dotnet --version'
                bat 'dotnet --list-runtimes'
                bat 'dotnet --list-sdks'
            }
        }
        stage("Restore project dependencies"){
            steps{
                bat 'dotnet restore'
            }
        }
        stage("Build the project"){
            steps{
                bat 'dotnet build --no-restore'
            }
        }
        stage ("Run tests"){
            steps{
                bat 'dotnet test --no-build --verbosity normal'
            }
        }
    }
}
