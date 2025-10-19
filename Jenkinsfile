pipeline {
    agent any
    stages {
        stage("Restore project dependencies") {
            steps {
                bat 'dotnet restore'
            }
        }
        stage("Build the project") {
            steps {
                bat 'dotnet build --no-restore'
            }
        }
        stage("Setup ChromeDriver") {
            steps {
                bat '''
                echo "Setting up ChromeDriver..."
                powershell -Command "Invoke-WebRequest -Uri 'https://chromedriver.storage.googleapis.com/LATEST_RELEASE' -OutFile 'chrome_version.txt'"
                for /f %%i in (chrome_version.txt) do set CHROME_VERSION=%%i
                echo Chrome version: %CHROME_VERSION%
                powershell -Command "Invoke-WebRequest -Uri 'https://chromedriver.storage.googleapis.com/%CHROME_VERSION%/chromedriver_win32.zip' -OutFile 'chromedriver.zip'"
                powershell -Command "Expand-Archive -Path 'chromedriver.zip' -DestinationPath '.' -Force"
                echo "ChromeDriver setup completed"
                echo "Current directory contents:"
                dir
                echo "ChromeDriver version check:"
                chromedriver.exe --version
                '''
            }
        }
        stage ("Run tests") {
            steps {
                bat '''
                echo "Adding ChromeDriver to PATH..."
                set PATH=%CD%;%PATH%
                echo "PATH updated: %PATH%"
                echo "Testing ChromeDriver version:"
                chromedriver.exe --version
                dotnet test --no-build --verbosity normal
                '''
            }
        }
    }
}
