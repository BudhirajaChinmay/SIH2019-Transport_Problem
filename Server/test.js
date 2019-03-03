// VARIABLES AND CONSTANTS
const express = require("express");
var mysql = require('mysql');
const bodyparser = require('body-parser');
var http = require('http');

const Route = require('./Routes');
const app = express();
const port = 8000;

// Input by the user
var source,destination;

// Current Day and Date 
var date = new Date();
var intday = date.getDay();
var day;


// Variable to store the stops encounteredsudo netstat -plnt

var stops = [];

if(intday == 0){
    day = "Sunday";
}
else if(intday == 1){
    day = "Monday";
}
else if(intday == 2){
    day = "Tuesday";
}
else if(intday == 3){
    day = "Wedneday";
}
else if(intday == 4){
    day = "Thursday";
}
else if(intday == 5){
    day = "Friday";
}
else{
    day = "Saturday";
}



// Establishing connection to the SQL database
var con = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'goodluckall',
    database : 'my_db'
  });

  con.connect();
  app.use('/',require('./routes/index'));

  var connected = 0;

  function Database(con, source, destination){

    connected = 1;
    /* 

        ********************IMPORTANT**********************
        CHANGE IN DATABASE. INCLUDE RELATIONS FOR RANGES AS WELL.
        ***************************************************
        TODO :- 1. Route from source to destination via all the required buses
                2. Synchronously search all buses for most appropriate route

    */



    // Intersection of all the busses at Source and Destination given by user

        var buses_from_source = [];
        for(var key in Route)
        {
            
            if(key.includes(source))
            {
                buses_from_source.push(key); 
            }
        }

        var buses_from_destination = [];
        for(var key in Route)
        {
            
            if(key.includes(destination))
            {
                buses_from_destination.push(key); 
            }
        }
        var required_buses = [];
        for(var i = 0; i < buses_from_source.length ; i++){
            if(buses_from_destination.includes(buses_from_source[i])){
                required_buses.push(buses_from_source[i]);
            }
        }


        /*  
            ** IN CASE IF WE DON'T GET THE ROUTES FROM GOOGLE MAP **

            // Route calculation
            var routes = [];        // Dictionary for storing routes corresponding to each bus
            var temproute = [];     // Temporary route to assign value in the dictionary
            
            var flag_push = false;
            // for(var i = 0 ; i < required_buses.length ; i++){
    
            //     if(required_buses)
            // }
            //console.log(required_buses);
            something();
         */
    

         // Temporary query
    con.query("SELECT Monday FROM B1S1 where TOA = \"14:00:00\" ", function (err, result, fields) {
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

        console.log(datatemp);
        // TODO :- ** CALL RANGE FUNCTION **
    });

    // console.log(datatemp);
    connected = 0;
}

// Algorithm to give the range for seats

function RangeOfSeats(data1) {

    var data = [];

    for(var i = 0 ; i < data1.length ; i++ ){
        data.push(parseInt(data1[i]));
    }

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



function updateintodb(output){


    output = ",12,21,11,22,11";
    // var BusNumber = request.body.user.busnumber.toString(10);
    // var timeofArrival  = request.body.user.toa;
    // var Boarding  = request.body.user.boarded.toString(10);
    // var Deboarding = request.body.user.deboarded.toString(10);

    //  **TODO :- Add the value of the current stop** 
    // var currentstop = request.body.user.stop;

    // Old valuen to update the new value
    con.query("SELECT Monday FROM B1S1 where + TOA = \"14:00:00\" ", function (err, result, fields) {
        if (err) throw err;
        var entry = result;
        // var seatsAtPreviosStop;
        
        // if(stops.length == 0){
        //     seatsAtPreviosStop = 0;
        // }
        // else{
        //     seatsAtPreviosStop = stops[stops.length-1];
        // }

        // var currentSeats = Boarding - Deboarding + seatsAtPreviosStop;
        // stops.push(currentSeats);

        var temp = entry[0].Monday.split(":");
        var data = temp[0] + output;
        // data.push(currentSeats.toString(10));
        console.log(data + " dfnjakdsfjnjasnfdjknasrd   " + output);
        var nd = data.split(",");
        var updatedrange = RangeOfSeats(nd);
        updatedrange[0] = Math.floor(updatedrange[0]);
        updatedrange[1] = Math.floor(updatedrange[1]);

        var range = updatedrange[1].toString(10) + "-" + updatedrange[0].toString(10);

        var updateddatapoint = data+":"+range;
        // Update the value

        console.log(nd);
        console.log(updatedrange);
        con.query("UPDATE B1S1 SET Monday = \"" + updateddatapoint + "\" where TOA = \"14:00:00\"", function (err, result, fields) {
            if (err) throw err;

        });
    });
}

source = 'S2';
destination = 'S4';

var data = Database(con, source, destination);

console.log(data);

updateintodb();

// app.listen(port, function(err){
//     if (err){
//         console.log('Error in running server');
//         return;
//     }

//     console.log('Server is up and running on http://localhost:' + port);
// });

// const readline = require("readline");
// var response = readline();


