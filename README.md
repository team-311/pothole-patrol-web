# Pothole Patrol

Pothole Patrol is a comprehensive pothole management system for Chicago, built using real data from 30,000 pothole service requests submitted this year. With it, residents can report potholes, Chicago administrators can oversee pothole repair, and city crew members can access their daily repair assignments and update admins on their progress.

* View our backend and web repo: https://github.com/team-311/pothole-patrol-web
* See our deployed app on Heroku: https://pothole-patrol-fullstack.herokuapp.com

## Why

Pothole Patrol was created by four city of Chicago residents as their capstone project at FullStack Academy. As city residents, they were all too familiar with the condition of Chicago's asphalt-patchworked streets and were excited to develop a tool that could be used to address the issue. 


## Getting started

* For our web repo, download the code, run `npm install` and `npm run start-dev`. 
* For our native repo, you will need to download the Expo app for your phone or the Expo XDE. Run `npm install`, and `npm start`, and follow the instructions from there. 

## Unique Features 

* Users have the chance to upvote potholes that already exist in the city of Chicago's database, which helps provide visibility into which ones are the most urgent. 
* Pothole Patrol's scheduling system finds the most urgent potholes and sends them for repair most quickly. It was implemented by using an algorithm that ranks potholes based on their upvotes and the number of days they’ve been open and sends them to work crews who are nearby. 

## Tech and Frameworks

* React / Redux
* React Native
* Expo 
* Victory JS 
* Node JS
* Sequelize 
* PostgreSQL
* PostGIS
* Google Maps Platform APIs 

## Using the App

#### For residents 

* Using our app, residents can report new potholes.

![Submit pothole](https://media.giphy.com/media/8wfogB7dvAEoLKfO62/giphy.gif)

* Or upvote potholes that already exist. 

![Resident upvote pothole](https://media.giphy.com/media/1xVbZLOuN0cytDtM6O/giphy.gif)

* They can also view potholes that they've already reported or upvoted to keep track of their status. 

![View orders](https://media.giphy.com/media/WvkS0ZrnKQkMO8Fsrw/giphy.gif)

#### For city administrators 

City admins can view high-level analytics regarding potholes in Chicago. 

![View orders](https://media.giphy.com/media/13QenvhyjNytbYQOS0/giphy.gif)

They can also navigate to view individual potholes and check and update their status or view orders for pothole repair and contact the crews assigned.

![View orders](https://media.giphy.com/media/vguSSk1pxCOTvY1J5B/giphy.gif)

#### For city crew members 

Crew members can view their orders assignments for the day and the first pothole they have been assigned. 

![View crew order](https://media.giphy.com/media/7TewpuNRRm5FneKmh6/giphy.gif)

They can view directions to the pothole, see its details, and mark it as completed when it is done. 

![Crew view directions](https://media.giphy.com/media/cCam8kx0dVCSnSw8Fj/giphy.gif)

They can request the next pothole, which will be assigned to them based on its priority level. At the end of the day, they can close out their work order. At any time, they can view their completed work orders and their details. 

![View previous orders](https://media.giphy.com/media/YX62QTQz7tlLlu8aqm/giphy.gif)

Thanks for checking out pothole patrol! Keep on patrolling! 
