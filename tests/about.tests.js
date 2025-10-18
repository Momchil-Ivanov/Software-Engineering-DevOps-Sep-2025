const assert = require('assert');
const fetch = require('node-fetch');

suite('About page', function() {
  test('Page title', async function() {
    this.timeout(10000); // 10 seconds instead of 3
    let res = await fetch("http://localhost:8888/about");
    let body = await res.text();
    assert.ok(body.includes("<title>About</title>"));
    assert.ok(body.includes("<h1>About</h1>"));
  });
});
