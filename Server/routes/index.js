// [READ] Again requiring package 'express' to use the module called Router, this is like the url paths examples ['/profile', '/contact-us', '/about-us'] are the different pages
const express = require('express');
const router = express.Router();
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var bodyParser = require("body-parser");


express().use(bodyParser.json());
express().use(bodyParser.urlencoded({ extended: true }));


// [READ] Here, a mapping is created for which url will call which function from which file in controllers folder (these functions are called actions)

// [READ] We've imported the controllers here (take note of the naming convention!)
const eventsController = require('../controllers/events_controller');
// const registrationsController = require('../controllers/registrations_controller');



// [TODO 1] create a route for displaying the home page of events (it'll contain the form to create an event and list of events)
//router.get('/',eventsController.home);

router.get('/',function(req,res){
    res.render('basic');
});
 
router.get('/feedback',function(req,res){
    res.render('home');
});
// user

router.get('/user_login',eventsController.User_Login);

router.post('/user_login',eventsController.UserLogin_C);

//feedback
router.get('/recieving',eventsController.feedbackinfo1);

router.post('/recieving',eventsController.feedbackinfo);


// Agency
router.get('/BreakdownsInfo',eventsController.Brakdown);


router.get('/DemandAnalysis',eventsController.DemandAnalysis);

router.get('/FeedBackForm',eventsController.FeeadbackforAgency);

// For the routes
router.get('/showRoutes',eventsController.Routes);

router.post('/showRoutes',eventsController.ShowRoutes);

// router.post('/scrape',
// );
router.get('/DemandAnalysis',function(req,res){
    res.render('DemandAnalysis');
});

router.get('/FeedbackInfo',function(req,res){
    res.render('FeedbackFormInfo');
});


router.get('/conductor_login',eventsController.BusLogin);

router.post('/conductor_login',eventsController.BusDetails1);

// router.get('/routes',function(req,res){
//     res.render('user2');
// });

module.exports = router;
