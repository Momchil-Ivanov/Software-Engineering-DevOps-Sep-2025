let server;

setup(function(done) {
  let students = [
    {"name" : "Steve", "email" : "steve@gmail.com"},
    {"name" : "Tina", "email" : "tina@yahoo.com"}
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
    done(); // Call done() when server is ready
  });
});

teardown(function(done) {
  if (server) {
    server.close(done); // Call done() when server is closed
  } else {
    done();
  }
});