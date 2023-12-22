$(document).ready(function() {
  loginStatus();

  // handling login button
  $('#loginButton').on('click', function(event) {
    event.preventDefault();
    // Check if the user is logged in
    if ($('#loginButton').text() === 'Logout') {
      // If logged in, redirect to the dashboard
      window.location.href = '/dashboard';
    } else {
      // If not logged in, redirect to the index page
      window.location.href = '/index';
    }
  });

  // handling logout button
  $('#logoutButton').on('click', function (event) {
    event.preventDefault();
    logoutUser();
  });

  
  //quiz-card links!
  $(".quiz-card").on("click", function ()  {
    const quizId = $(this).attr("class").split(" ")[1]
    window.location.href = `/quiz/${quizId}`;
  })

  // grading quiz
  $('#submitButton').on("click", () => {    
    submitQuiz()
  });

});


// check login status to deny access
function loginStatus() {
  $.ajax({
    method: 'GET',
    url: '/checkLogin',
    success: function(data) {
      if (data.user) {
        $('#quizzesLink').attr('href', '/quizzes');
        $('#quizzesLink').show();
        $('#logoutButton').show();
      } 
    },
    error: function(error) {
      console.log('Error:', error);
    },
  });
}



const submitQuiz = function() {
  
  let selectedOptionIds = [];
  let selectedOptionScores = [];
  let temp;
  $("#myform input[type=radio]:checked").each(function() {
    if(this["data-correct"]){
      temp = "true";
    } else {
      temp = "false";
    }
    selectedOptionIds.push(this.id);
    selectedOptionScores.push(temp);
    for ()
  });
  const data = {
    selectedOptionIds,
    selectedOptionScores,
  }
  
  $.ajax({
    url: "http://localhost:8080/quiz/2",
    data: data,
    type: "POST",
    success: function(result){
      console.log("We are in the success function ", result);
    },
    error: function(err){
      console.log("We are in the error function ", err);
    }
  });

};

