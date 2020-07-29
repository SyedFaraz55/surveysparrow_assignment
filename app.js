require("dotenv")
const express = require("express");
const app = express();
const routes = require("./routes/index");
const mongoose = require("mongoose");
const db = require("./config/keys").mongoURI;
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");
require("./config/passport")(passport);
// middleware for authentication
const { ensureAuthenticated } = require("./config/auth");

const PORT = process.env.PORT || 8080

// Db config 
const connection = 
mongoose.connect(db,{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>console.log("connected to mongodb atlas"))
.catch((err)=>console.log(err))

app.use(express.static('public'))
app.set("view engine","ejs");
app.use(express.urlencoded({extended:false}));
// express session middle ware
app.use(session({
	secret:"ilovecat",
	resave:true,
	saveUninitialized:true,
}));

// connect flash messages
app.use(flash());

// global var
app.use((req,res,next)=> {
	res.locals.success_msg = req.flash('success_msg');
	res.locals.error_msg = req.flash('error_msg');
	res.locals.error = req.flash("error");
	next();
});

// passportjs 
app.use(passport.initialize());
app.use(passport.session());

app.get("/",routes.index);
app.get("/login",routes.login);
app.get("/register",routes.register);
app.get("/dashboard", ensureAuthenticated ,routes.dashboard);
app.get("/logout",routes.logout);

app.post("/register",routes.postRegister);
app.post("/login",routes.postLogin);
app.post("/create",routes.postCreate)
app.post("/dashboard",routes.postDashboard)

app.listen(PORT,function() {
	console.log(`Server listening at port ${PORT}`);
});