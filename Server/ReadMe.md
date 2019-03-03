index.js:

This file runs the local host and make the laptop a server.From here all the other files like html files are called.

package-json and package-lock-json:

It has all dependices that need to be installed to run this project.

View:

This folder contains all the ejs files for our website.It contains-

1)basic.ejs-our webpage main page

2)user.ejs-It is the page for user for entering source and destination.

3)user2.ejs-This page shows all the possible roots from source to destination entered by the user.

4)feedback.ejs-This page allows the user to enter feedback about the bus they travelled through.

5)conductor.ejs-It provides a interface for bus conductors to enter the no. of passangers deboarding and boarding as well as report any breakdown.

6)BreakdownInfo.ejs-It provides agency information about any breakdown i the bus.

7)FeedbackAnalysis-It provides agency of feedbacks submitted by the users in the form of graphs.

8)DemandAnalysis-It heps the agency to know about the buses ehose frequency need to increased or the buses whose seats need to increased.

Models:

For storing data on MongoDB,it has schema defined for all the the different objects that need to stored on the database.

Controller:

For all the models, it has controller that creates the object of the model type and stores it on the MongoDB databse.

Mongoose.js:

Mongoose is package in node.js that helps in building conncetion with MongoDB database.This files helps in making connection with the database.

Route:

It contains the index.js file that helps in routing in website.
