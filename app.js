const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// static / public dir
app.use(express.static(path.join(__dirname, '/public'))); 

// connection configurations
const mc = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password1',
    database: 'world'
});
 
// connect to database
mc.connect();

const apiDefaultURL = '/api/world';
 
// default route
app.get('/', function (req, res) {
    //res.send({ name: "Julian", surname: "hansby", age: 33 })
    res.sendFile(path.join(__dirname, '/public/' + "index.html"));
});

/* ======================= CITIES ===================== */

// routes
const cities = apiDefaultURL+'/cities';
const citiesByID = apiDefaultURL+'/cities/:id';
const citiesSearchKeyword = apiDefaultURL+'/cities/search/:keyword';

// queries
const q_getAllCities = 'SELECT * FROM city limit 40';
const q_getCityById = 'SELECT * FROM city where id = ?';
const q_searchCityKeyword = 'select * from city where name like ?'

// ALL
app.get(cities, function (req, res) {
    mc.query(q_getAllCities, function (error, results, fields) {
        if (error) throw error;
        res.send({ error: false, data: results, message: 'Get all cities' });
    });
});

// by ID
app.get(citiesByID, function (req, res) {

    let taskId = req.params.id;

    if(!taskId){ return res.status(400).send({ error: true, message: "This task ID does not exist!!"}) }

    mc.query(q_getCityById, [taskId], function (error, results, fields) {
        if (error) throw error;
        res.send({ error: false, data: results, message: 'Get City By Id' });
    });
});

// search by keyword
app.get(citiesSearchKeyword, function(req, res){

    let keyword = req.params.keyword;

    mc.query(q_searchCityKeyword, ['%'+keyword+'%'], function(error, results, fields){
        if (error) throw error;
        res.send({ error: false, data: results, message: 'Get City By Id' });
    });
});
 
// port must be set to 8080 because incoming http requests are routed from port 80 to port 8080
app.listen(8080, function () {
    console.log('Node app is running on port 8080');
});

// allows "grunt dev" to create a development server with livereload
module.exports = app;