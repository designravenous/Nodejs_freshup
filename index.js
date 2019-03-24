// begin project with npm init
// install 
// to start the application enter: node index.js
// install nodemon to be able to run in development environment so you do not need to restart the server to see all changes. (package that will monitor our server and we do not need to restart to see new content)
// npm i -D nodeman  (-D to install it as a DEV dependency, it will not be used in production )
// After added the script to the package.json ("dev") start the server with. after that run: npm run dev
// import the path module, which to deal with paths, Express (webserver) and the json from Member.js:
const express = require('express');
const path = require('path');
const members = require('./Members');
const logger = require('./middleware/logger')

// Initialize variable called app:
const app = express();

//To create some simple middleware function.
//We also want to see date and time, importing module moment (npm install moment) checkout format at: https://momentjs.com/

//to initialize The written middleware we need to use app.use:
app.use(logger) 

// creating the route for / and /about
/*
app.get('/', function(req,res){
    //__dir is the current directory
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})
app.get('/about', (req,res)=>{
    res.send('<h2>This is the About page again</h2>')
})
*/

//creating API with Express, and with the imported Json:

app.get('/api/members', (req,res)=>{
    res.json(members);
})

//Get by member id. The :id is a URL parameter.
app.get('/api/members/:id', (req,res)=>{
    const found = members.some(member => member.id ===parseInt(req.params.id));
    if(found){
    res.json(members.filter(member => member.id === parseInt(req.params.id)));
    }
    else{ //we want to request to be not found if the found variable is none
        res.status(400).json({msg:`No Member With ID: ${req.params.id} Found.`})
    }
})

//instead of specifying every route you can set a static folder: app.use (use is used when you want to use middleware)
app.use(express.static(path.join(__dirname, 'public')));


//intialize listen to be able to run the webserver on port 5000, reason why we state process.env.PORT is that the server running the code will might have a Variable for the PORT.
const PORT = process.env.PORT || 5000;
//we also do a callback to console.log when the server has started
app.listen(PORT, ()=> console.log(`Server has started on port ${PORT}`));


