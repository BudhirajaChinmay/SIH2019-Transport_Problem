// VARIABLES AND CONSTANTS
const express = require("express");
var mysql = require('mysql');
const bodyparser = require('body-parser');
var http = require('http');
const cors = require("cors");
const Route = require('./Routes');
const app = express();
const port = 8000;
const  numberofseats = 60;
app.use(cors());

// Input by the user
var source,destination;

// Current Day and Date 
var date = new Date();
var intday = date.getDay();
var day;

var datasets = require('./controllers/events_controller');
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

  
// setup the connection with db by requiring it from config/mongoose.js

const db=require('./config/mongoose');

// install ejs and set the template engine
app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: false}));

// add middleware to use the router by requiring it from routes/index.js
app.use('/',require('./routes/index'));

// Connecting to the sql database
con.connect();


/*

        FUNCTIONS 

*/


// Get the buses from source to destination
var Database = function(source, destination){

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

        console.log(required_buses);
       return required_buses;
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

app.use(bodyparser.urlencoded({extended: false}));

// Update in the database when conductor adds the input

function updatedb_sql(){

}

app.post('/',function(request,response){

    /*  &&&&&&&&&&& get the data &&&&&&&&&&&*/

    var BusNumber = request.body.user.busnumber.toString(10);
    var timeofArrival  = request.body.user.toa;
    var Boarding  = request.body.user.boarded.toString(10);
    var Deboarding = request.body.user.deboarded.toString(10);

    var currentstop = request.body.user.stop;


    // Old valuen to update the new value
    con.query("SELECT " + day + " FROM " + BusNumber + currentstop + " where + TOA = " + timeofArrival, function (err, result, fields) {
        if (err) throw err;
        var entry = result;
        var seatsAtPreviosStop;
        
        if(stops.length == 0){
            seatsAtPreviosStop = 0;
        }
        else{
            seatsAtPreviosStop = stops[stops.length-1];
        }

        var currentSeats = Boarding - Deboarding + seatsAtPreviosStop;
        stops.push(currentSeats);

        var temp = entry[0].day.split(":");
        var data = temp[0].split(",");
        data.push(currentSeats.toString(10));

        var updatedrange = RangeOfSeats(data);
        var range = updatedrange[0].toString(10) + "-" + updatedrange[1].toString(10);

        var updateddatapoint = data+":"+range;
        // Update the value

        con.query("UPDATE \"" + BusNumber + currentstop + "\" SET \""+ day + "\" = \"" + updateddatapoint + "\" where TOA = \"" + timeofArrival, function (err, result, fields) {
            if (err) throw err;
        });

        // Encorporating  the change if the current seat is outside the given range
        if(currentSeats > updatedrange[1] || currentSeats < updatedrange[0]){

            var diff = currentSeats - updatedrange[1];
            var delta;
            if(diff > 0){
                delta = diff;
            }
            else{
                delta = updatedrange[0] - currentSeats;
            }

            for(var key in Route){
                if(k == BusNumber && key.includes(currentstop)){

                    for(var i in Route[key]){
                        if(Route[key].indexOf(i) > Route[key].indexOf(currentstop)){

                            con.query("SELECT " + day + " FROM " + BusNumber + currentstop + " where + TOA = " + timeofArrival, function (err, result, fields) {
                                if (err) throw err;
                                var entry = result;
                                var temp2 = entry[0].split(":");
                                var temp = temp2.split("-");
                                var range = [];
                                range.push(parseInt(temp[0]));
                                range.push(parseInt(temp[1]));
                                if(diff > 0){
                                    range[0] += delta;
                                    range[1] += delta;
                                }
                                else{
                                    range[0] -= delta;
                                    range[1] -= delta;
                                }
                                var ans = temp2[0] + ":" + range[0].toString() + "-" + range[-1].toString;
                                con.query("UPDATE \"" + BusNumber + i + "\" SET \""+ day + "\" = \"" + ans + "\" where TOA = \"" + timeofArrival, function (err, result, fields) {
                                    if (err) throw err;
                                });
                            });
                        }
                        
                    }
                }
            }

        }

    });

});


// Query from the database 

    // source = datasets.UserInput;
    // while(source != undefined){
    //     source = datasets.UserInput;
    //     console.log(source);

    // }
    // destination = 'S4';

// var data = Database(con, source, destination);
// console.log(data);

module.exports.Database=Database;
// module.exports.required_buses = required_buses;

// Compute the number of seats

// Listening to the mentioned port
app.listen(port, function(err){
    if (err){
        console.log('Error in running server');
        return;
    }

    console.log('Server is up and running on http://localhost:' + port);
});

var avgAccuracy;
var avgCleanliness;
var avgSafety;

con.query("select avg(PredictedSeats) from fb",function(err,result,fields)
{
    if(err) throw err;
    avgAccuracy=result;
    console.log(result);

});
con.query("select avg(Cleanliness) from fb",function(err,result,fields)
{
    if(err) throw err;
    avgCleanliness=result;
    console.log(result);

});
con.query("select avg(Safety) from fb",function(err,result,fields)

{
    if(err) throw err;
    avgSafety=result;
    console.log(result);

});
con.query("insert into fb values(accuracy,cleanliness,safety)",function(err,result,fields)
{
    if(err) throw err;
    console.log(result);
    
});