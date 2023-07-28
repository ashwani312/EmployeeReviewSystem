const express = require('express');
const router = express.Router();
const passport = require('passport');
const adminController = require('../controllers/admin_controller');




// ---------------This is for assign a new work----------------
router.get('/assignWork' , passport.checkAuthentication , adminController.assignWork);

//----------------This is for view the employee------------
router.get('/view-employee' , passport.checkAuthentication , adminController.showEmployeeList);

//------------- This is for setting the review----------
router.post('/setReviewes' , passport.checkAuthentication , adminController.setReviewrAndReviewe);

// --------------THis is for making a new employee----------------
router.post('/newAdmin' , passport.checkAuthentication , adminController.newAdmin);

// -------------THis is for deleting the employee--------------
router.get('/deleteEmployee/:id', passport.checkAuthentication , adminController.deleteEmployee);

// --------------This is for adding the emloyee-------------
router.get('/add-employee' , passport.checkAuthentication , adminController.addEmployee);

module.exports = router;