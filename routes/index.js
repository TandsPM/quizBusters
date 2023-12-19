$(document).ready(function () {
  checkLoginStatus();

  $('#loginButton').on('click', function (event) {
    event.preventDefault();
    // Send request to server to handle login/out
    $.ajax({
      method: 'GET',
      url: '/login',
      success: function (data) {
        checkLoginStatus();
      },
      error: function (error) {
        console.log('Login/logout fail:', error);
      },
    });
  });

  function checkLoginStatus() {
    $.ajax({
      method: 'GET',
      url: '/checkLogin',
      success: function (data) {
        if (data.user) {
        // if logged in display these
        $('#user-info').html('Welcome, ' + data.user.username);
        $('#loginButton').text('Logout');
        $('#loginButton').attr('href', '/logout');
      } else {
        $('#user-info').html('');
        $('#loginButton').text('Login');
        $('#loginButton').attr('href', '/login');
      }
    },
    error: function (error) {
      console.log('Error:', error);
    },
  });
}
});

// // my results
// const express = require('express');
// const router = express.Router();

// router.get('/login/:id', (req, res) => {
//   // using encrypted cookies
//   req.session.user_id = req.params.id;

//   // or using plain-text cookies
//   res.cookie('user_id', req.params.id);

//   console.log('Testing:', req.params.id);

//   // send the user somewhere
//   res.redirect('/');
// });

// router.get('/', (req, res) => {
//   res.render('/', { user_id: req.session.user_id || req.cookies.user_id });
// });

// module.exports = router;
