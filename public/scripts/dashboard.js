$(document).ready(function() {
  loginStatus();

  // handling login button
  $('#loginButton').on('click', function(event) {
    event.preventDefault();
    // Check if the user is logged in
    if ($('#loginButton').text() === 'Logout') {
      // If logged in, redirect to the dashboard
      window.location.href = '/index';
    } else {
      window.location.href = '/dashboard';
    }
  });

  // handling logout button
  $('#logoutButton').on('click', function (event) {
    event.preventDefault();
    res.session = null
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
  
    // Scroll to the top of the page with animation
    $('html, body').animate({ scrollTop: 0 }, 'slow');
  });

  // delete quiz
  $('#deleteButton').on("click", function() {    
    // Extract quiz ID from the URL path
    const pathSegments = window.location.pathname.split('/');
    const quizId = pathSegments[pathSegments.indexOf('quiz') + 1];

    // Call deleteQuiz function with the extracted quiz ID
    deleteQuiz(quizId);
  })
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
  let trueCorrects = [];
  $("#myform input[type=radio]").each(function() {
    if ($(this).data("correct")){
      trueCorrects.push(this.value)
    }
  })
  let selectedOptionIds = [];
  let selectedOptionScores = [];
  let total = Number($('#questionCounter').text())
  console.log("total: ", total)
  $("#myform input[type=radio]:checked").each(function() {
    const temp = $(this).data("correct") ? "true" : "false";
    
    selectedOptionIds.push(this.id);
    selectedOptionScores.push(temp);
  });
  const data = {
    selectedOptionIds,
    selectedOptionScores,
    trueCorrects,
    total
  }
  console.log(data)
  $.ajax({
    url: "http://localhost:8080/quiz/quiz_id",
    data: data,
    type: "POST",
    success: function(result){
      $('#score').slideDown(900).css("display", "block").text(`Your Score is ${result.score}`)
      $('#correctAnswers').slideDown(900).css("display", "block").text(`The right answers were ${formatAnswers(trueCorrects)}`)
    },
    error: function(err){
      console.log("Error:", err);
    }
  });
};

function formatAnswers(answerArray) {
  const formattedAnswers = [];

  answerArray.forEach(item => {
    formattedAnswers.push(String(item));
  });

  if (formattedAnswers.length === 0) {
      return "";
  } else if (formattedAnswers.length === 1) {
      return formattedAnswers[0];
  } else {
      const lastAnswer = formattedAnswers.pop();
      const formattedString = formattedAnswers.join(', \n') + ', \nand ' + lastAnswer;
      return formattedString;
  }
}

function deleteQuiz(quizId) {
  const quizIdToDelete = quizId;
  // Send AJAX request to delete quiz
  $.ajax({
    url: `http://localhost:8080/quiz/${quizIdToDelete}/delete`, // Update with the correct URL
    method: 'POST',
    success: function(data) {
      // Handle success
      if (data.redirect) {
          window.location.href = data.redirect;
      } else {
          console.error('Missing redirect URL in server response.');
      }
  },
    error: function(error) {
      console.log("ajax fail ")
      // Handle error
      console.error('An error occurred while deleting the quiz:', error.responseJSON.error);
    }
  });
}

// function deleteQuiz(quizId) {
//   // Replace `baseUrl` with the actual base URL of your application.
//   const baseUrl = 'http://localhost:8080/';

//   // Construct the full URL to include the `quizId` parameter.
//   const url = `${baseUrl}quiz/${quizId}/delete`;

//   // Create a new XMLHttpRequest object
//   var xhr = new XMLHttpRequest();

//   // Configure it: 'POST' - method; `url` - the URL.
//   xhr.open('POST', url, true);

//   // Set up the request headers if needed. For example:
//   xhr.setRequestHeader('Content-Type', 'application/json');
//   // xhr.setRequestHeader('Authorization', 'Bearer your-auth-token'); // Uncomment and replace with your token if needed.

//   // Send the request over the network
//   xhr.send();

//   // This will be called after the response is received
//   xhr.onload = function() {
//     if (xhr.status != 200) { // analyze HTTP response status code
//       console.error(`Error ${xhr.status}: ${xhr.statusText}`); // e.g. 404: Not Found
//     } else { // show the result
//       console.log(`Success: ${xhr.response}`); // response is the server
//     }
//   };

//   xhr.onerror = function() {
//     console.error('Request failed');
//   };
// }
