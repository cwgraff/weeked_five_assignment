
var express = require('express');
var pg = require('pg');
var bodyParser = require('body-parser');

var router = express.Router();
var connectionString = 'postgres://localhost:5432/weekend_five_db';

router.get('/retrieve', function(request, response){
    var returnData = [];


    pg.connect(connectionString, function(err, client){

        var query = client.query("SELECT * FROM users ORDER BY id ASC");

        query.on('row', function(row) {
            returnData.push(row);
        });


        query.on('end', function(){
            client.end();
            return response.json(returnData);

        });

    });
});

router.get('/getAddresses/:id', function(request, response){
    var returnData = [];

    var id = request.params.id;


    pg.connect(connectionString, function(err, client){

        var query = client.query("SELECT name, address_type, address_street, address_city, address_state FROM addresses JOIN users ON users.id = addresses.user_id WHERE user_id = " + id);

        query.on('row', function(row) {
            returnData.push(row);
        });


        query.on('end', function(){
            client.end();
            return response.json(returnData);

        });

    });
});

router.get('/getOrders/:id', function(request, response){
    var returnData = [];

    var id = request.params.id;


    pg.connect(connectionString, function(err, client){

        var query = client.query("SELECT * FROM addresses LEFT OUTER JOIN orders ON addresses.address_id = orders.ship_address_id WHERE orders.user_id = " + id);

        query.on('row', function(row) {
            returnData.push(row);
        });


        query.on('end', function(){
            client.end();
            return response.json(returnData);

        });

    });
});

module.exports = router;


//var express = require('express');
//var router = express.Router();
//var pg = require('pg');
//var bodyParser = require('body-parser');
//
//var connectionString = 'postgres://localhost:5432/talent_skills';
//
//router.post('/addSkills', function(request, response){
//    var skillsList = [];
//
//    var data = {text: request.body.skills};
//
//    pg.connect(connectionString, function(err, client){
//        client.query("INSERT INTO skills(name) values($1)", [data.text]);
//
//        var query = client.query("SELECT * FROM skills ORDER BY id ASC");
//
//        query.on('row', function(row) {
//            skillsList.push(row);
//        });
//
//
//        query.on('end', function(){
//            client.end();
//            return response.json(skillsList);
//
//        });
//
//    });
//});