### Scrum Stuff:

* Group members: Tandra Malm @tmalm_ , Robin Fleur @saintsappho 
* Chosen Project: Quiz App
* What your team is working on today: planning!
* What was a struggle yesterday: there was no yesterday O.O
* Est Project Completion: 00 % * 

# THE GOAL:

* Build a web app from start to finish using the tech and approaches learned to date
* Turn requirements into a working product
* Practice architecting an app in terms of UI/UX, Routes/API and Database
* Manage a multi-developer project with git
* Simulate the working world where you do not always get to completely cherry pick your team, stack or product features
* Practice demoing an app to help prepare for the final project and employer interviews

### Functionality Requirements:
* ES6 for server-side (NodeJS) code

* NodeJS

* Express:
    * RESTful routes

* One or more CSS or UI "framework"s:
    * jQuery
    * A CSS preprocessor such as SASS, Stylus, or PostCSS for styling -- or CSS Custom properties and no CSS preprocessor

* PostgreSQL and pg (with promises) for DBMS

* git for version control

### Stretch Functionality: 
* SPA (Single-Page Application) Behaviour

* Hosting, such as Railway.app, netlify, github pages, AWS, or Azure


# THE PLAN:

### MVD Features 
* users can create quizzes
  * constructive forms for creating quizzes
  * multiple choice forms and text forms available
  * privacy: users can make their quiz unlisted (url can be visited)

* users can attempt a quiz
  * users can see the results of their recent attempt
  * users can share a link to the result of their attempt

* tumblr/pinterest style homepage/dashboard of all extant quizzes 
  * users can share a link to a single quiz
  * users can see a list of public quizzes
  * users can see a list of public quizzes on the home page

* ajax the quizzes to remove scrolling
* account locked edit and delete for quizzes
* 1000% gotta be a Multi Page App combo thingy


###  Stretch Features
* search bar for public quizzes and users
* like/share/report buttons
* quiz custom styles through SASS
* ai based quiz inspiration widget
* account profile pictures attached to quiz

###  User Stories 
* as a ________ i can _________ because ________

###  Be RESTFUL 
* BROWSE:  GET   -->  /quiz
* READ:    GET   -->  /quiz/:id
* EDIT:    POST  -->  /quiz/:id
* ADD:     POST  -->  /quiz
* DELETE:  POST  -->  /quiz/:id/delete


users can share a link to a single quiz
users can see a list of public quizzes
users can see a list of public quizzes on the home page


### skip the login,

### `http://localhost:3000/login/2
### app.get('/login:id', (req,res) => {
###   req.session.user_id = req.params.id
### });`