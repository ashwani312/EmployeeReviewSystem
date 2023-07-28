const express = require('express');
const router = express.Router();
const passport = require('passport');
const userController = require('../controllers/user_controller');

// ---------------THis is for render a sign in page---------
router.get('/sign-in' , userController.signIn);

// ---------------THis is for render a sign up page---------
router.get('/sign-up' , userController.signUp);

//---------------It will create a session after login---------
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'},
), userController.createSession);

// ----------------THis is for creating a new admin
router.post('/create' , userController.create);

// ----------------This is for logout functionality----------------
router.get('/sign-out', userController.destroySession);

// ----------------THis both for forget the password functionanlty-------------
router.get('/forgetPassword', userController.forgetPasswordPage);
router.post('/forgetPasswordLink' , userController.forgetPasswordLink);

//-----------------This is an add employee route
router.post('/addEmployee', userController.addEmployeee);


//----------------- this is a makeadmin route--------------------
router.post('/makeAdmin', userController.makeAdmin);


module.exports = router;
