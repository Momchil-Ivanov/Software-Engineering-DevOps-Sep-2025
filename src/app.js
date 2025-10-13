import { render } from '../node_modules/lit-html/lit-html.js';

// Load page.js as a script instead of ES6 import
const script = document.createElement('script');
script.src = '/node_modules/page/index.js';
script.onload = async () => {
  // Now we can use the global 'page' function
  await initializeApp();
};
document.head.appendChild(script);

async function initializeApp() {
  const page = window.page;

  const { logout: apiLogout } = await import('./api/api.js');
  const { loginPage } = await import('./views/login.js');
  const { registerPage } = await import('./views/register.js');
  const { createPage } = await import('./views/create.js');
  const { catalogPage } = await import('./views/catalog.js');
  const { detailsPage } = await import('./views/details.js');
  const { editPage } = await import('./views/edit.js');
  const { profilePage } = await import('./views/profile.js');

  const main = document.querySelector('main');
  setUserNav();
  document.getElementById('logoutBtn').addEventListener('click', logout);

  page('/', decorateContext, catalogPage);
  page('/login', decorateContext, loginPage);
  page('/register', decorateContext, registerPage);
  page('/create', decorateContext, createPage);
  page('/catalog', decorateContext, catalogPage);
  page('/details/:id', decorateContext, detailsPage);
  page('/edit/:id', decorateContext, editPage);
  page('/profile', decorateContext, profilePage);

  page.start();

  function decorateContext(ctx, next) {
    ctx.render = (content) => render(content, main);
    ctx.setUserNav = setUserNav;
    next();
  }

  function setUserNav() {
    const email = sessionStorage.getItem('email');
    if (email) {
      document.getElementById('user').style.display = '';
      document.getElementById('guest').style.display = 'none';
      document.querySelector('#user > span').textContent = `Welcome, ${email}`;
    } else {
      document.getElementById('user').style.display = 'none';
      document.getElementById('guest').style.display = '';
    }
  }

  async function logout() {
    await apiLogout();
    setUserNav();
    page.redirect('/');
  }
}