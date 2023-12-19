// $(document).ready(function () {
//   checkLoginStatus();

//   $('#loginButton').on('click', function (event) {
//     event.preventDefault();
//     // Send request to server to handle login/out
//     $.ajax({
//       method: 'GET',
//       url: '/login',
//       success: function (data) {
//         checkLoginStatus();
//       },
//       error: function (error) {
//         console.log('Login/logout fail:', error);
//       },
//     });
//   });

//   function checkLoginStatus() {
//     $.ajax({
//       method: 'GET',
//       url: '/checkLogin',
//       success: function (data) {
//         if (data.user) {
//         // if logged in display these
//         $('#user-info').html('Welcome, ' + data.user.username);
//         $('#loginButton').text('Logout');
//         $('#loginButton').attr('href', '/logout');
//       } else {
//         $('#user-info').html('');
//         $('#loginButton').text('Login');
//         $('#loginButton').attr('href', '/login');
//       }
//     },
//     error: function (error) {
//       console.log('Error:', error);
//     },
//   });
// }
// });

// // my results
const express = require('express');
const router = express.Router();

const allowAccess = (req, res, next) => {
  if (req.session && (req.session.user || req.cookies.user_id)) {
    next();
  } else {
    res.redirect('/login');
  }
};

router.get('/login/:id', (req, res) => {
  req.session.user_id = req.params.id;
  res.cookie('user_id', req.params.id);
  res.redirect('/');
});

router.get('/', allowAccess, (req, res) => {
  const user = req.session.user || req.cookies.user_id;
  res.render('dashboard', { user: user });
});

router.get('/', allowAccess, (req, res) => {
  res.render('index', { user_id: req.session.user || req.cookies.user_id });
});

router.get('/checkLogin', (req, res) => {
  const user = req.session.user;
  res.json({ user });
});

module.exports = router;
