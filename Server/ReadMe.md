**index.js:**

This file runs the local host and make the laptop a server.From here all the other files like html files are called.
Connection is build with sql database here.It call routes/index.js with input '/' which runs the main webpage(basic.ejs).

**package-json and package-lock-json:**

It has all dependices that need to be installed to run this project.It needs to install before running the project by command npm install.

**View:**

This folder contains all the ejs and html files required for our website.It contains-

*basic.ejs-our webpage main page

*user.ejs-It is the page for user for entering source and destination.

*user2.ejs-This page shows all the possible roots from source to destination entered by the user.

*feedback.ejs-This page allows the user to enter feedback about the bus they travelled through.

*conductor.ejs-It provides a interface for bus conductors to enter the no. of passangers deboarding and boarding as well as report any breakdown.

*BreakdownInfo.html-It provides agency information about any breakdown in any of the agencies buses.

*FeedbackAnalysis-It provides agency with feedbacks submitted by the users in the form of a cumulative.

*DemandAnalysis-It helps the agency to know about the buses whose frequency need to increased or the buses whose seats need to increased.

**Models:**

For storing data on sql, it has schema defined for all the the different objects that need to stored on the database.

**Controller:**

For all the models, it has controller that creates the object of the model type and stores it on the sql databse.


**Route:**

It contains the index.js file that helps in routing in website.It uses express.route and get and post for routing.

**Feedbacksql.js**

The responses we get from feedback forms are for 3 different parameters ( Safety of Travel, Accuracy of our Prediction of Vacant Seats and Measure of Cleanliness of that mode of transportation ) for judging the convenience of travelling via that mode of transportation. 
These responses are stored in the MySQL database and the average response is calculated for each data entry and which is then used to rate that mode of transportation.
