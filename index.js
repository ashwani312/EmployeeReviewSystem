const express = require('express'); 
const app = express(); 
const expressLayout = require('express-ejs-layouts');
const db = require('./config/mongoose');
const bodyParser = require('body-parser');

// Requiring passport and session
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local');

//-- requiring mongo-store
const MongoStore = require('connect-mongo');

//task or action popup messeges
const flash = require('connect-flash'); 
const flashMiddleWare = require('./config/flashMiddleware');


app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static('./assets'));

app.set('view engine','ejs');
app.set('views','./views');

app.use(expressLayout);


app.use(session({
    name: "ERS",
    secret: "employeeReviewSystem",
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: MongoStore.create({
        mongoUrl: 'mongodb+srv://ashwani04:ash04wani31@cluster0.bsg0u6y.mongodb.net/EmplyeeReviewSystemDB',
        autoRemove: 'disabled'
    },
        (err) => {
            console.log(err || 'connect-mongo setup ok');
        }
    )
}))

//----------------- Using passport
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

//----------------- Using Connect flash
app.use(flash());
app.use(flashMiddleWare.setFlash);

//---------------------- setting up the router, following MVC structure.
app.use('/' , require('./routes/index'));


//------------------ Setting up the server at the given port
app.listen(3000, function(err){
    if(err){
        console.log("Error in running the app.");
        return ;
    }
    console.log("Server is up and running at port 3000");
});