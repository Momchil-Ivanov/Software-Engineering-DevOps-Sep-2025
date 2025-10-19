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
                echo "Detecting Chrome browser version..."
                powershell -Command "$chromeVersion = (Get-ItemProperty 'HKLM:\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\App Paths\\chrome.exe' -ErrorAction SilentlyContinue).'(Default)'; if ($chromeVersion) { $version = (Get-ItemProperty $chromeVersion).VersionInfo.ProductVersion; $majorVersion = $version.Split('.')[0]; Write-Output $majorVersion } else { Write-Output 'Chrome not found in registry' }" > chrome_major_version.txt
                
                echo "Reading Chrome major version..."
                for /f %%i in (chrome_major_version.txt) do set CHROME_MAJOR=%%i
                echo Chrome major version: %CHROME_MAJOR%
                
                echo "Getting ChromeDriver version for Chrome %CHROME_MAJOR%..."
                powershell -Command "try { $response = Invoke-RestMethod -Uri 'https://chromedriver.storage.googleapis.com/LATEST_RELEASE_%CHROME_MAJOR%'; Write-Output $response } catch { Write-Output 'LATEST_RELEASE' }" > chromedriver_version.txt
                
                for /f %%i in (chromedriver_version.txt) do set CHROMEDRIVER_VERSION=%%i
                echo ChromeDriver version to download: %CHROMEDRIVER_VERSION%
                
                echo "Downloading ChromeDriver %CHROMEDRIVER_VERSION%..."
                powershell -Command "Invoke-WebRequest -Uri 'https://chromedriver.storage.googleapis.com/%CHROMEDRIVER_VERSION%/chromedriver_win32.zip' -OutFile 'chromedriver.zip'"
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
