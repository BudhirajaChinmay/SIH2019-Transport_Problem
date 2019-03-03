# SIH2019-Transport_Problem

Prerequistes:

    HTML
    CSS
    JavaScript
    A little familiarity with the Terminal/Powershell/Command Prompt
    Node.js

Setting up the project

  For the project, to install the required packages, 'npm install' command is used.
  SQL Server needs to be installed.

This web application gives the general user providing source and destination in the app, all the routes available for that user and gives us a predicted no. of seats available in the bus when the bus comes on the stop from where user will board the bus.It gives the government agencies data for all the buses whose frequency needs to be increased as well as buses whose no. of seats need to be increased.

Our algorithm stores the no. of vacant seats available for all stops for all buses at every time interval a particular bus operates and for every day of the week. It then calculates the change in no. of vacant seats and plots it's graph(For eg- no of vacant seats on Monday1 of stop1 of bus1 at time t1 was 10 and no. of vacant seats on Monday2 of stop1 at time t1 was 15, then change in no. of seats in 5).We calculate the average and standard deviation of the change in the no. of vacant seats.

Every change would lie between average change + standard deviation and average change - standard deviation. 

So,when we have to predict the data of Monday3 we take the range of no. of vacant seats as :

(no. of vacant seats on Monday2 + mean change - standard deviation) to (no. of vacant seats on Monday2+mean change + standard deviation)

Storing data of no. of vacant seats:
![picture](/Graphs.png-page-0.png)

From no. of vacant seats we calculate the change in no. of seats:
![picture](/Presentation1.png)

From this example we can see that mean change is approximately 4.

If for a particular stop our prediction of no. of vacant seats comes out to be wrong. For eg- predicted range for a stop-i was 5-10 but no. of vacants available were only 3.Then to make it consistent for all the subsequent stops in route we would add delta change=3-5=-2 to ranges of subsequent stops.If predicted range for stop2 was 3-8 then new range would become 1-6.By this we can make our prediction consistent with dynamic data coming.
