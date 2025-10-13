const { test, expect } = require('@playwright/test');

test('Verify "All Books" link is visible', async ({ page }) => {
  await page.goto('/');

  await page.waitForSelector('nav.navbar');

  const allBooksLink = page.locator('a[href="/catalog"]');
  await expect(allBooksLink).toBeVisible();
});

test('Verify "Login" button is visible', async ({ page }) => {
  await page.goto('/');

  await page.waitForSelector('nav.navbar');

  const loginButton = page.locator('a[href="/login"]');
  await expect(loginButton).toBeVisible();
});

test('Verify "All Books" link is visible after user login', async ({ page }) => {
  // Listen for console errors
  const errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
    }
  });

  await page.goto('/login');

  // Wait for the page to be fully loaded
  await page.waitForLoadState('networkidle');
  
  // Check for JavaScript errors
  if (errors.length > 0) {
    console.log('JavaScript errors:', errors);
  }
  
  // Check if the main element exists (it should exist but be hidden)
  const mainElement = await page.locator('#site-content');
  await expect(mainElement).toBeAttached();
  
  // The main element is hidden, which means JavaScript isn't loading
  // Let's check if the page object exists
  const pageObjectExists = await page.evaluate(() => {
    return typeof window.page !== 'undefined';
  });
  
  console.log('Page object exists:', pageObjectExists);
  
  // If page object doesn't exist, there's a JavaScript loading issue
  if (!pageObjectExists) {
    console.log('JavaScript modules failed to load - checking for import errors');
    
    // Check if the script tag is loading
    const scriptLoaded = await page.evaluate(() => {
      const scripts = Array.from(document.querySelectorAll('script'));
      return scripts.some(script => script.src.includes('app.js'));
    });
    
    console.log('Script tag found:', scriptLoaded);
  }

  // For now, let's just wait for the login form to appear
  await page.waitForSelector('#login-form', { timeout: 30000 });

  await page.fill('input[name="email"]', 'peter@abv.bg');
  await page.fill('input[name="password"]', '123456');
  await page.click('input[type="submit"]');

  const allBooksLink = page.locator('a[href="/catalog"]');
  await expect(allBooksLink).toBeVisible();
});

test('Login with valid credentials', async ({ page }) => {
  await page.goto('/login');

  // Wait for the login form to be rendered
  await page.waitForSelector('#login-form');

  await page.fill('input[name="email"]', 'peter@abv.bg');
  await page.fill('input[name="password"]', '123456');

  await page.click('input[type="submit"]');

  await page.waitForURL('/catalog');
  expect(page.url()).toBe('http://localhost:3000/catalog');
});

test('Login with empty input fields', async ({ page }) => {
  await page.goto('/login');
  
  // Wait for the login form to be rendered
  await page.waitForSelector('#login-form');
  
  page.on('dialog', async dialog => {
    expect(dialog.type()).toContain('alert');   
    expect(dialog.message()).toContain('All fields are required!');
    await dialog.accept();
  });

  await page.click('input[type="submit"]');
  
  const loginLink = page.locator('a[href="/login"]');
  await expect(loginLink).toBeVisible();
  expect(page.url()).toBe('http://localhost:3000/login');
});

test('Add book with correct data', async ({ page }) => {
  await page.goto('/login');

  // Wait for the login form to be rendered
  await page.waitForSelector('#login-form');

  await page.fill('input[name="email"]', 'peter@abv.bg');
  await page.fill('input[name="password"]', '123456');

  await Promise.all([
    page.click('input[type="submit"]'), 
    page.waitForURL('/catalog')
  ]);

  await page.click('a[href="/create"]');

  await page.waitForSelector('#create-form');

  await page.fill('#title', 'Test Book');
  await page.fill('#description', 'This is a test book description');
  await page.fill('#image', 'https://example.com/book-image.jpg');
  await page.selectOption('#type', 'Fiction');

  await page.click('#create-form input[type="submit"]');

  await page.waitForURL('/catalog');
  expect(page.url()).toBe('http://localhost:3000/catalog');
});

test('Add book with empty title field', async ({ page }) => {
  await page.goto('/login');

  // Wait for the login form to be rendered
  await page.waitForSelector('#login-form');

  await page.fill('input[name="email"]', 'peter@abv.bg');
  await page.fill('input[name="password"]', '123456');

  await Promise.all([
    page.click('input[type="submit"]'), 
    page.waitForURL('/catalog')
  ]);

  await page.click('a[href="/create"]');

  await page.waitForSelector('#create-form');

  await page.fill('#description', 'This is a test book description');
  await page.fill('#image', 'https://example.com/book-image.jpg');
  await page.selectOption('#type', 'Fiction');

  page.on('dialog', async dialog => {
    expect(dialog.type()).toContain('alert');   
    expect(dialog.message()).toContain('All fields are required!');
    await dialog.accept();
  });

  await page.click('#create-form input[type="submit"]');

  const createLink = page.locator('a[href="/create"]');
  await expect(createLink).toBeVisible();
  expect(page.url()).toBe('http://localhost:3000/create');
});

test('Login and verify all books are displayed', async ({ page }) => {
  await page.goto('/login');

  // Wait for the login form to be rendered
  await page.waitForSelector('#login-form');

  await page.fill('input[name="email"]', 'peter@abv.bg');
  await page.fill('input[name="password"]', '123456');

  await Promise.all([
    page.click('input[type="submit"]'), 
    page.waitForURL('/catalog') 
  ]);

  await page.waitForSelector('.dashboard');

  const bookElements = page.locator('.other-books-list li');
  await expect(bookElements).toHaveCount({ min: 1 });
});

test('Login and navigate to Details page', async ({ page }) => {
  await page.goto('/login');

  // Wait for the login form to be rendered
  await page.waitForSelector('#login-form');

  await page.fill('input[name="email"]', 'peter@abv.bg');
  await page.fill('input[name="password"]', '123456');

  await Promise.all([
    page.click('input[type="submit"]'), 
    page.waitForURL('/catalog')
  ]);

  await page.click('a[href="/catalog"]');

  await page.waitForSelector('.otherBooks');

  await page.click('.otherBooks a.button');

  await page.waitForSelector('.book-information');

  const detailsPageTitle = page.locator('.book-information h3');
  await expect(detailsPageTitle).toHaveText('Test Book'); 
});

test('Verify visibility of Logout button after user login', async ({ page }) => {
  await page.goto('/login');

  // Wait for the login form to be rendered
  await page.waitForSelector('#login-form');

  await page.fill('input[name="email"]', 'peter@abv.bg');
  await page.fill('input[name="password"]', '123456');
  await page.click('input[type="submit"]');

  const logoutLink = page.locator('a[href="javascript:void(0)"]');
  await expect(logoutLink).toBeVisible();
});

test('Verify redirection of Logout link after user login', async ({ page }) => {
  await page.goto('/login');

  // Wait for the login form to be rendered
  await page.waitForSelector('#login-form');

  await page.fill('input[name="email"]', 'peter@abv.bg');
  await page.fill('input[name="password"]', '123456');
  await page.click('input[type="submit"]');

  const logoutLink = page.locator('a[href="javascript:void(0)"]');
  await logoutLink.click();

  await page.waitForURL('/catalog');
  expect(page.url()).toBe('http://localhost:3000/catalog');
});