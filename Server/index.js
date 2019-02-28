
/*

        FUNCTIONS 

*/

// Query from the database
function Database(con, source, destination){

    con.connect()


    /* 

        ********************IMPORTANT**********************
        CHANGE IN DATABASE. INCLUDE RELATIONS FOR RANGES AS WELL.
        ***************************************************
        TODO :- 1. Route from source to destination via all the required buses
                2. Synchronously search all buses for most appropriate route

    */



    // Intersection of all the busses at Source and Destination given by user
    con.query("SHOW TABLES", function(err,result,fields){

        if(err) throw err;

        var output = result;

        var BusStop = [];
        for(var i = 0 ; i < result.length ; i++){
            BusStop.push(result[i].Tables_in_my_db);
        }

        //console.log(BusStop);

        // Buses from source 
        var buses_from_source = [];
        for(var i = 0; i < BusStop.length ; i ++){
            if(BusStop[i].includes(source)){
                buses_from_source.push(BusStop[i].substr(0,BusStop[i].indexOf('S')));
            }
        }

        // Buses from destination
        var buses_from_destination = [];
        for(var i = 0; i < BusStop.length ; i++){
            if(BusStop[i].includes(destination)){
                buses_from_destination.push(BusStop[i].substr(0,BusStop[i].indexOf('S')));
            }
        }


        // Busses from sourse to destination
        var required_buses = [];
        for(var i = 0; i < buses_from_source.length ; i++){
            if(buses_from_destination.includes(buses_from_source[i])){
                required_buses.push(buses_from_source[i]);
            }
        }

        // Route calculation
        var routes = [];        // Dictionary for storing routes corresponding to each bus
        var temproute = [];     // Temporary route to assign value in the dictionary
       
        var flag_push = false;
        // for(var i = 0 ; i < required_buses.length ; i++){

        //     if(required_buses)
        // }
        //console.log(required_buses);
        something();
    });

    con.query("SELECT Monday FROM B1S1 where TOA = \"2:00:00\" ", function (err, result, fields) {
        if (err) throw err; 

        // output of query is an array
        // array is the dictionaries of that particular time
        // where key is the day of the week
        var output=result;
        var temparray = output[0].Monday.split(",");

        // Assigning integer calues in the data array

        var datatemp = [];
        for(var i = 0 ; i < temparray.length ; i++){
            datatemp.push(parseInt(temparray[i]));
        }

        //console.log(datatemp);
        // TODO :- ** CALL RANGE FUNCTION **
    });

    //console.log(datatemp);
    con.end()

}

// Algorithm to give the range for seats

function RangeOfSeats(data) {
    var Slopes=[];

    for(var i = 0; i < data.length-1; i++) {
        Slopes.push(data[i+1] - data[i]);
    }

    var mean = 0;
    for(var i = 0; i < data.length-1; i++) {
        mean += Slopes[i];
    }
    mean = mean/(data.length-1);
    //console.log(mean);

    var variance = 0;
    
    for(var i = 0; i < data.length-1; i++) {
        variance += (Slopes[i] - mean)*(Slopes[i] - mean);
    }

    variance = variance/(data.length-1);

    var standard_daviation = Math.sqrt(variance);

    var newSlope1 = mean + standard_daviation;
    var newSlope2 = mean - standard_daviation;

    var range = [data[data.length-1] + newSlope1 , data[data.length-1] + newSlope2];

    return range;

}


/*

        MAIN CODE 

*/

const express = require("express");
var mysql = require('mysql');
const Route = require('./Routes');

const app = express();
const port = 8000;

// Input by the user
var source,destination;


// Code for gmaps and other stufff
/*

2

*/

// Establishing connection to the database
var con = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'goodluckall',
  database : 'my_db'
});

// Query from the database 

    // Temp Query
    source = 'S2';
    destination = 'S4';

var data = Database(con, source, destination);
console.log(data);

// Compute the number of seats

// Listening to the mentioned port
app.listen(port, function(err){
    if (err){
        console.log('Error in running server');
        return;
    }

    console.log('Server is up and running on http://localhost:' + port);
});