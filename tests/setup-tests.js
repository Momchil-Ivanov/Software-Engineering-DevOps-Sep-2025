const { before, after } = require('mocha');

let server;
let isServerRunning = false;

before(function(done) {
  // Only start server if it's not already running
  if (!isServerRunning) {
    let students = [
      {"name" : "Marry", "email" : "marry@gmail.com"},
      {"name" : "Steve" , "email" : "steve@yahoo.com"},
      {"name" : "Teddy" , "email" : "teddy@mail.ru"}
    ];
    const express = require('express');
    const app = express();
    server = require('http').createServer(app);
    app.set('view engine', 'pug');
    app.use(require('body-parser')
      .urlencoded({extended:true}));
    const studentsController = 
      require("../controllers/students-controller");
    studentsController.setup(app, students);
    
    server.listen(8888, function() {
      console.log('Test server started on port 8888');
      isServerRunning = true;
      done(); // Call done() when server is ready
    });
  } else {
    console.log('Test server already running on port 8888');
    done(); // Server already running, continue
  }
});

after(function(done) {
  if (server && isServerRunning) {
    server.close(function() {
      console.log('Test server closed');
      isServerRunning = false;
      done(); // Call done() when server is closed
    });
  } else {
    done();
  }
});