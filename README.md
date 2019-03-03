# SIH2019-Transport_Problem

Prerequisites:
HTML
CSS
JavaScript
A little familiarity with the Terminal/Powershell/Command Prompt
Node.js
SQL
MongoDB


Setting up the project
To install the required packages for the project, 'npm install' command is used.
SQL Server needs to be installed.


Description
This web application gives all possible routes from source to destination entered by the user and gives a predicted number of seats available in the bus when it arrives on the stop from where user will board the bus. It gives the government agencies data for all the buses whose frequency needs to be increased as well as metros for which number of seats needs to be increased.

Our algorithm works on providing a passenger with sufficient information about a public transport media. Our major focus is on the number of vacant seats available, for any passenger at any stop, for all buses, that operate within given time intervals; computed weekly. It then calculates the change in number of vacant seats and plots it's graph with respect to the given time intervals. (For example, number of vacant seats on Monday1 of stop1 of bus1 at time t1 was 10 and number of vacant seats on Monday2 of stop1 at time t1 was 15, then change in number of seats in 5). We calculate the average and standard deviation of the change in the number of vacant seats. Every change would lie between (average change + standard deviation) and (average change - standard deviation). 

So, for instance, when we have to predict the data of Monday3 we calculate the upper and lower bounds for the range of number of vacant seats as :

Upper Bound: number of vacant seats on Monday2 + mean change + standard deviation
Lower Bound: number of vacant seats on Monday2 + mean change - standard deviation

Storing data of number of vacant seats:
![picture](/Graphs.png-page-0.png)

From number of vacant seats we calculate the change in number of seats:
![picture](/Presentation1.png)

From this example we can see that mean change is approximately 4.

If for a particular stop our prediction of number of vacant seats comes out to be wrong, for example, predicted range for ith stop was 5-10 but number of vacant seats available were only 3. then to make it consistent for all the subsequent stops in route we would add delta change, which equals 3 - 5 = -2  in this example, to ranges of subsequent stops. If predicted range for stop2 was 3-8 then new range would become 1-6. By this, we can make our prediction consistent with dynamic data coming.


