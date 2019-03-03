# SIH2019-Transport_Problem

This web application provides the general user who provides source and destination in the app all the routes available for that user and destination and gives us a predicted no. of seats available in the bus when the bus comes on the stop from where user will board the bus.It all gives the government agencies data for all the buses whoes frequency needs to be increases as well as buses whoses no. of seats need to be increased.

Our algorithm stores no. of vacant seats of available for all stopes for all stops at all the time for every day of the week.It then calculates the change in no. of vacant seats at plots it's graph(For eg- no of vacant seats on Monday1 of stop1 of bus1 at time t1 was 10 and no. of vacant seats on Monday2 of stop1 at time t1 was 15, then change in no. of seats in 5).We calculate the average mean of changes and standard deviation of changes.Every change would lie between average change + standard deviation and average change-standard deviation.So,when we have to predict the data of Monday3 when we have data till Monday2 then-

range of no. of vacant seats on Monday3 = (no. of vacant seats on Monday2+mean change-standard deviation) to (no. of vacant seats on Monday2+mean change + standard deviation)

Storing data of no. of vacant seats:
![picture](/Graphs.png-page-0.png)


If from stop our prediction of no. of vacant seats comes out to be wrong.For eg- predicted range for the stop1 was 5-10 but no. of vacants available were only 3.Then to make it consistent for all the subsequent stops in route we would add delta change=3-5=-2 to ranges of subsequent stops.If predicted range for stop2 was 3-8 then new range would become 1-6.By this we can make our prediction consistent with dynamic data coming.

Our project consists of 2 folders-database and server.Database stores all the dat we require like no. of vacant seats in the sql database.Server database consists of our node.js server that hosts our website.
