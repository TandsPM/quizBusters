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

const collectSubmissionData = function() {
  const quizTitle = $("#thisQuizTitle").text();
  const quizAuthor = $("#thisQuizAuthor").text();
  
  ////////RD

   
// }

//     var section = $('input:radio[name="sec_num"]:checked').val();
//     var question = $('input:radio[name="qst_num"]:checked').val();
    
//     var selectedVal = checkVal(section, question);
//     $('#show_val_div').text(selectedVal);
//     $('#show_val_div').show();
//   });
  
//   function checkVal(section, question) {
//     var value = $('input:radio[name="sec'+section+'_r'+question+'"]:checked').val() || "Selection Not Made";
//     return value;
//   }


  //////////////CODE ENDS HERE
  
  
  // const questions = $(".quiz-content").find(".individual-question");
  

  // const questionNamesArray = [];
  // const optionsCountArray = [];
  // const optionsArray = [];
  // console.log("questions: ", questions)
  // // get Question Info
  // questions.each(function() {
    
  //   const questionElement = $(this);
  //   const questionName = questionElement.find(".question-input").val();
    
  //   questionNamesArray.push(questionName);
    
  //   // Get Options Info
  //   const options = questionElement.find(".question-options").find(".new-question-options-box");
  //   const indvOptions = options.find(".new-question-option");
  //   let optionsCount = 0
  //   indvOptions.each(function() {
  //     optionsCount++
  //     const optionElement = $(this);
  //     const optionText = optionElement.find("input[type='text']").val();
  //     const isCorrect = optionElement.find("input[type='radio'].correct").prop("checked");
  //     optionsArray.push({ optionText, isCorrect })
  //   });
  //   optionsCountArray.push(optionsCount)
  // });
  
  const data = {
    quizTitle,
    quizAuthor,
    questionNamesArray,
    optionsCountArray,
    optionsArray
  };
  return data;
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

