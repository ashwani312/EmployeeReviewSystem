const Users = require('../models/user');

//------------------- This  is for assigning Work, and sending some data to it.------------------
module.exports.assignWork = async function(req, res){
    let employe = await Users.find({});

    return res.render('admin',  {
        title : 'ERS | Assign Work',
        employe : employe
    });
}

//---------------------- This will show the list of employee woking in the company.-----------------
module.exports.showEmployeeList = async function(req, res){
    if(!req.isAuthenticated()){
        req.flash('error' , ' oh! You are not Authorized !');
        return res.redirect('/users/sign-in');
    }
    if(req.user.isAdmin == false){
        req.flash('error' , 'You are not Authorized');
        return res.redirect('/');
    }
    let employeeLists = await Users.find({});

    return res.render('employee', {
        title : "ERS | Employe-List",
        employes : employeeLists
    });
}

//---------------------------- This  will set the reviewer and reviewer.---------------------------
module.exports.setReviewrAndReviewe = async function(req, res){
    try{
  
        if(!req.isAuthenticated()){
            // flash messege to the screen
            req.flash('success' , 'Please Login !');

            return res.redirect('/users/sign-in');
        }else{
            let employee = await Users.findById(req.user.id);
    
            if(employee.isAdmin == false){
                // flash messege to the screen
                req.flash('error' , 'Opps ! Not Authorized ');
                return res.redirect('/users/sign-in');
            }
        
            else if(req.body.sender == req.body.reciver){
                // flash messege to the screen

                req.flash('error' , 'Sender and reciver should not be same !');
                return res.redirect('back');
            }
            else{
                let sender = await Users.findById(req.body.sender);
                let reciver = await Users.findById(req.body.reciver);
                //console.log(sender + " " + reciver);
                sender.userToReview.push(reciver);
                sender.save();
                reciver.reviewRecivedFrom.push(sender);
                reciver.save();
                // flash messege to the screen
                req.flash('success', 'Task Assigned !');
                return res.redirect('back');
            }
        }
    
        
    }catch(err){
        console.log("Errror in setting up the user " + err);
    }

}
//------------------------------- This is for making the new Admin--------------------------
module.exports.newAdmin = async function(req, res){
    try{
        // checking the authentication part.
        if(!req.isAuthenticated()){
            console.log('Please LogIn');
            // flash messege to the screen
            req.flash("success" , 'Please LogIn !');
            return res.redirect('/users/sign-in');
        }
        // Checking for authorization
        if(req.user.isAdmin == false){
            // flash messege to the screen
            req.flash('error' , 'You are not Admin !');
            return res.redirect('/');
        }
        // Making the user admin.
        if(req.user.isAdmin){
            let user = await Users.findById(req.body.selectedUser);
            if(!user){
                // flash messege to the screen
                
                return res.redirect('back');
            }
            req.flash('success' , 'New Admin Added');
            user.isAdmin = "true";
            user.save();
            return res.redirect('back');
        }
        
    }catch(err){
        console.log(err);
        return res.redirect('back');
    }
}

//------------------------------ This is for deleting the employee---------------------------
module.exports.deleteEmployee = async function(req, res){
    try{
        // Authentication and Authoriztion chekcing
        if(!req.isAuthenticated()){
            // flash messege to the screen
            req.flash('error' , 'Please Login !')
            return res.redirect('users/sign-in');
        }

        if(!req.user.isAdmin){
            // flash messege to the screen
            req.flash('error' , 'You are not admin !')
            return res.redirect('/');
        }
        //--------------- Deleting the user.-----------
        let employee = await Users.deleteOne({_id : req.params.id});
        // flash messege to the screen
        req.flash('success' , 'User Deleted!')
        return res.redirect('back');

    }catch(err){
        console.log(err);
        return res.redirect('back');
    }
}


//---------------------THis is for add an Employee------------------
module.exports.addEmployee = function(req, res){
    return res.render('addEmployee', {
        title : 'ERS | Add Employee'
    });
}