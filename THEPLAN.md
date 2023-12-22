### Scrum Template:

* Group members: Tandra Malm @tmalm_ , Robin Fleur @saintsappho 
* Chosen Project: Quiz App
* What your team is working on today: implementing quiz submission, grading and view results, and making css lovely site wide
* What was a struggle yesterday: loops and queries with shifting data, nav bar organization and sitwide styling
* Est Project Completion: 75% (of what we can get to)  

# THE GOAL:

* Build a web app from start to finish using the tech and approaches learned to date
* Turn requirements into a working product
* Practice architecting an app in terms of UI/UX, Routes/API and Database
* Manage a multi-developer project with git
* Simulate the working world where you do not always get to completely cherry pick your team, stack or product features
* Practice demoing an app to help prepare for the final project and employer interviews

### Functionality Requirements: ALL COMPLETE
* ES6 for server-side (NodeJS) code (COMPLETE) 

* NodeJS (COMPLETE) 

* Express:
    * RESTful routes (COMPLETE) 

* One or more CSS or UI "framework"s:
    * jQuery (COMPLETE) 
    * A CSS preprocessor such as SASS, Stylus, or PostCSS for styling -- or CSS Custom properties and no CSS preprocessor (COMPLETE)

* PostgreSQL and pg (with promises) for DBMS (COMPLETE) 

* git for version control (COMPLETE) 

### Stretch Functionality: 
* SPA (Single-Page Application) Behaviour (SEMI COMPLETE)

* Hosting, such as Railway.app, netlify, github pages, AWS, or Azure


# THE PLAN:

### MVD Features 
* Registered users can create quizzes (COMPLETE)
  * constructive forms for creating quizzes (COMPLETE)
  * multiple choice forms and text forms available (COMPLETE)
  * privacy: users can make their quiz unlisted (url can be visited) (SEMI-COMPLETE)

* all users can attempt a quiz (COMPLETE)
  * users can see the results of their recent attempt (COMPLETE)
  * users can share a link to the result of their attempt // quiz/:id 

* tumblr/pinterest style homepage/dashboard of all extant quizzes (COMPLETE)
  * users can share a link to a single quiz (COMPLETE)
  * users can see a list of public quizzes on the home page (COMPLETE)

* account locked edit and delete for quizzes 



###  Stretch Features
* search bar for public quizzes and users
* ajax the quizzes to remove scrolling (SPA behaviour i guess)
* like/share/report buttons
* quiz custom styles through SASS
* ai based quiz inspiration widget
* account profile pictures attached to quiz

###  User Stories 
* as a ________ i can _________ because ________
* as a ________ this is what i want _________ so that ________

* as a REGISTERED USER 
  - i can make a quiz with many questions in different formats  
            --> because to attract users the app needs to be appealing to multiple individuals and their sensibilities

  - i can do anything an unregistered user can do  
            --> because we will only add more functionalities for registered Users 

  - i can not see the link to register as a new user  
            --> because i am already a user

  - i can edit and delete my own quizzes but am unable to edit or delete quizzes by others  
            --> because login security is important

* as a NEW USER 
  - i can take quizzes,                      
            --> because to attract users the app needs to be flexible

  - i can share quizzes,                     
            --> because to attract users the app needs to be flexible

  - i can share results,                     
            --> because to attract users the app needs to be flexible

  - i can log in,                           
            --> because to attract users the app needs to be flexible

  - i can register as a registered user      
            --> because to attract users the app needs to be flexible



###  Be RESTFUL 
* BROWSE:  GET   -->  /quiz
* READ:    GET   -->  /quiz/:id
* EDIT:    POST  -->  /quiz/:id
* ADD:     POST  -->  /quiz
* DELETE:  POST  -->  /quiz/:id/delete


