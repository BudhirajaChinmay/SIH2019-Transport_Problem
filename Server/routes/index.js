// [READ] Again requiring package 'express' to use the module called Router, this is like the url paths examples ['/profile', '/contact-us', '/about-us'] are the different pages
const express = require('express');

const router = express.Router();
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
// [READ] Here, a mapping is created for which url will call which function from which file in controllers folder (these functions are called actions)

// [READ] We've imported the controllers here (take note of the naming convention!)
const eventsController = require('../controllers/events_controller');
// const registrationsController = require('../controllers/registrations_controller');



// [TODO 1] create a route for displaying the home page of events (it'll contain the form to create an event and list of events)
//router.get('/',eventsController.home);

router.get('/',function(req,res){
    res.render('basic');
});
 
router.get('/Feedback',function(req,res){
    res.render('home');
});

router.get('/user',function(req,res){
    res.render('user');
});

router.get('/agency',function(req,res){
    res.render('BreakdownsInfo');
});
router.get('/showRoutes',function(req,res){
    res.render('user2');
});
// router.post('/scrape',
// );
router.get('/DemandAnalysis',function(req,res){
    res.render('DemandAnalysis');
});

router.get('/FeedbackInfo',function(req,res){
    res.render('FeedbackFormInfo');
});
router.get('/scrape',function(req,res){
    // res.render('user');

        url = 'http://www.imdb.com/title/tt1229340/';
        
        request(url, function(error, response, html){
        
            //console.log("startinggg");
            if(!error){
                var $ = cheerio.load(html);
        
            var title, release, rating;
            var json = { title : "", release : "", rating : ""};
        
            $('.header').filter(function(){
                var data = $(this);
                title = data.children().first().text();            
                release = data.children().last().children().text();
        
                json.title = title;
                json.release = release;
            });
            $('.star-box-giga-star').filter(function(){
                var data = $(this);
                rating = data.text();
        
                json.rating = rating;
            });
        
            //console.log("comminggg");
        }else{
            console.log("erroorrr");
        };
        
        // To write to the system we will use the built in 'fs' library.
        // In this example we will pass 3 parameters to the writeFile function
        // Parameter 1 :  output.json - this is what the created filename will be called
        // Parameter 2 :  JSON.stringify(json, null, 4) - the data to write, here we do an extra step by calling JSON.stringify to make our JSON easier to read
        // Parameter 3 :  callback function - a callback function to let us know the status of our function
        
        fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){
        
            console.log('File successfully written! - Check your project directory for the output.json file');
        
        });
        
        // Finally, we'll just send out a message to the browser reminding you that this app does not have a UI.
        res.send('Check your console!');
    });
});

router.get('/conductor',function(req,res){
    res.render('conductor');
});

router.get('/routes',function(req,res){
    res.render('user2');
});
// [TODO 2] create a route for receiving the data from new event form and send it to an action in the eventsController
router.post('/events/eate', eventsController.createEvent);

// [TODO 3] create a route for api of events list and map it to corresponding action from eventsController
//router.get('/api/events/', eventsController.eventsList);


// [READ] route to show the details of an event, it has a variable part
//router.get('/api/events/:id', eventsController.eventDetailsApi);

// [READ] route to create a registration for an event
//router.post('/api/registrations/create/:event_id', registrationsController.createRegistrationApi);


module.exports = router;
