
// // Require Express to run server and routes
// const express= require("express");

// // Start up an instance of app
// const app = express();

// /* Dependencies */
// const bodyParser = require('body-parser')

// /* Middleware*/
// //Here we are configuring express to use body-parser as middle-ware.
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// // Cors for cross origin allowance
// const cors = require('cors');
// app.use(cors());


// // Setup empty JS object to act as endpoint for all routes
// projectData = {};
  
// //  Initializing the main project folder 
// app.use(express.static('website'));


// // Setup Server

// const port = 8000;

// const listening = () => {
//     console.log('server running');
//    console.log(`running on localhost: http://localhost:${port}`);
//  };

// /* Spin up the server*/
// app.listen(port, listening);


// // GET route
// app.get('/all', (req, res) => {
//     res.send(projectData);

//   });
// // POST method route
// app.post('/add', (req, res) => {
//     console.log(req.body);
//     newEntry = {
//        temperature: req.body.temperature,
//        date: req.body.date,
//        content: req.body.userResponse
//     }
//     projectData.push(newEntry);
//   });
let projectData = {};

// Requiring Express to run server and routes
const express = require('express');

// Starting up an instance of app
const app = express();

//Dependencies
const bodyParser = require('body-parser');

/* Middleware*/
//Configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Requiring Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const PORT = 8000;
const server = app.listen(PORT, () => {
    console.log('The server is running...');
    console.log(`Running on localhost: http://localhost:${PORT}`);
});

app.get('/data', function (req,res) {
    res.send(projectData)
})

app.post('/add', function (req, res) {
    let newData = req.body;
    let newReception = {
       temperature: newData.temperature,
       date: newData.date,
       userResponse: newData.userResponse
    };
    
    projectData = newReception;
    res.send(projectData);
    console.log(projectData);
});