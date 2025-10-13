# Selenium WebDriver CI/CD Project

This project demonstrates Continuous Integration and Continuous Delivery (CI/CD) using GitHub Actions for Selenium WebDriver test automation.

## Project Structure

The solution contains three test projects:

- **TestProject1**: Calculator tests using Selenium WebDriver
- **TestProject2**: Web table extraction tests
- **TestProject3**: Dropdown interaction tests

## Prerequisites

- .NET 6.0 SDK
- Visual Studio 2022 or VS Code
- Chrome browser (for local testing)

## Local Development

### Building the Solution

```bash
dotnet build SeleniumBasicExercise.sln
```

### Running Tests Locally

```bash
dotnet test SeleniumBasicExercise.sln
```

**Note**: Local testing requires Chrome browser and ChromeDriver to be properly installed. The CI/CD pipeline handles this automatically.

## CI/CD Pipeline

The project includes a GitHub Actions workflow (`.github/workflows/selenium-ci.yml`) that:

1. **Triggers**: Runs on push and pull requests to main/master branches
2. **Environment**: Uses Windows latest runner
3. **Setup**: Installs .NET 6.0 and Chrome browser
4. **Build**: Restores dependencies and builds the solution
5. **Test**: Runs all Selenium tests with proper Chrome setup
6. **Reporting**: Uploads test results and coverage reports as artifacts

### Workflow Features

- ✅ Automated Chrome browser setup
- ✅ Cross-platform .NET 6.0 support
- ✅ Test result reporting and artifacts
- ✅ Code coverage collection
- ✅ Build optimization with `--no-restore` and `--no-build` flags

## Test Projects Details

### TestProject1 - Calculator Tests
- Tests basic calculator operations (addition, subtraction, multiplication, division)
- Includes edge cases like division by zero and invalid input
- Uses parameterized tests with `[TestCase]` attributes

### TestProject2 - Web Table Tests
- Extracts product information from web tables
- Saves data to CSV files
- Tests file creation and content validation

### TestProject3 - Dropdown Tests
- Tests dropdown selection functionality
- Extracts manufacturer information
- Saves results to text files

## GitHub Actions Workflow

The CI pipeline automatically:
- Sets up the Windows environment
- Installs Chrome browser
- Builds the .NET solution
- Runs all Selenium tests
- Collects and reports test results
- Uploads artifacts for review

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Ensure tests pass locally (if Chrome is available)
5. Push to your fork
6. Create a pull request

The CI pipeline will automatically run tests and report results.

## Troubleshooting

### Local Test Failures
If tests fail locally with ChromeDriver errors, this is expected behavior. The GitHub Actions environment has Chrome properly configured. Focus on ensuring your code compiles and the logic is correct.

### CI Pipeline Issues
- Check that all dependencies are properly referenced in `.csproj` files
- Ensure test methods are properly decorated with `[Test]` attributes
- Verify that web elements are correctly identified in test code
