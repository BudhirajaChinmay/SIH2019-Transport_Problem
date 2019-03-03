// [READ] this is a controller, each function (exported from here) is called an action
// [TODO 2] import the model Event from models/event
const Event = require('../models/event');
var UserLoginCred;
var AgencyLoginCred;
var ConductorLoginCred;
var UserInput;
var BusDetails;
var feedback;

var Database = require("../index");

// [TODO 1] change this action to include the list of events too
module.exports.home = function(req, res){
    Event.find({}, function(err, events){
        if (err){
            console.log('error in finding events');
        }
        return res.render('home', {
            title: "GDG Events Home",
        })
    });
} 

module.exports.User_Login = function(req,res){
    return  res.render('user_login');
}

module.exports.UserLogin_C = function(req,res){
    
    UserLoginCred = req.body;
    return res.render('user');
}

// For routes
module.exports.Routes = function(req,ress){
    return res.render('user');
}

module.exports.ShowRoutes = function(req,res){
    UserInput = req.body;
    Database.Database(UserInput.sname,UserInput.fname,UserInput.tname);
    // return res.render('user2', {rb = required_buses});
}

//For feedback
module.exports.feedbackinfo1 = function(req, res){
    return res.render('home');
}

module.exports.feedbackinfo = function(req,res){
    feedbackinfo = req.body;
    return res.render('user');
}

// For Conductor
module.exports.BusLogin = function(req,res){
    return res.render('conductor_login');
}

module.exports.BusDetails1 = function(req,res){
    ConductorLoginCred = req.body;
    return res.render('conductor');
}


// For Agency ***********TO BE DONE*************
module.exports.Brakdown = function(req,res){
    return res.render('BreakdownsInfo');
}

module.exports.FeeadbackforAgency = function(req,res){
    return res.render('FeedbackFormInfo');
}

module.exports.DemandAnalysis = function(req,res){
    return res.render('DemandAnalysis');
}

// [TODO 3] create action to create an event from the submitted data
module.exports.createEvent = function(req, res){
    console.log(req.body);

    Event.create({
        Ques1: req.body.Ques1,
        Ques2: req.body.Ques2,
        Ques3: req.body.Ques3,
        Review: req.body.Review,
        description: req.body.description,
        //date: req.body.date
    }, function(err, event){
        if (err){
            console.log('Error in creating an event');
        }

        console.log('Event Created : ', event);
        return res.redirect('/');
    });
}

module.exports.UserLoginCred = UserLoginCred;
module.exports.UserInput = UserInput;
module.exports.ConductorLoginCred = ConductorLoginCred;
module.exports.AgencyLoginCred = AgencyLoginCred;
module.exports.BusDetails = BusDetails;
module.exports.feedback = feedback;


