
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const MongoStore = require('connect-mongo');
const session = require('express-session');
const { MongoClient } = require('mongodb');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');
const ExpressError = require('./utils/expressError');
const listingRoutes = require('./routes/listing');
const userRoutes = require("./routes/user");

const app = express();
const port = 3000;

// ✅ CONNECT TO MONGODB
const DBurl = process.env.ATLASDB_URL;
const client = new MongoClient(DBurl);


async function main() {
  try {
    await mongoose.connect(DBurl, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('✅ Connected to MongoDB');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  }
}
main();

// ✅ SETUP EJS & STATIC FILES
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

// ✅ SESSION CONFIGURATION

const store = MongoStore.create({
  mangoUrl : DBurl,
  crypto:{
    secret:process.env.SECRET
  },
  touchAfter: 24 * 3600,
  client: client,
});
store.on("error",()=>{
  console.log("Error in Mongo Session store",err)
})

const sessionOptions = {
  store,
  secret: process.env.SECRET,
  resave: false,
    saveUninitialized: true,
    cookie: { 
      httpOnly: true,
      secure: false,
      expire: 1000*60*60*24, // Change to true if using HTTPS
      maxAge: 1000 * 60 * 60 * 24

    },
};
app.use((req, res, next) => {
  console.log(`📩 Request received: ${req.method} ${req.url}`);
  console.log('📦 Request Body:', req.body);
  console.log('👥 User:', req.user);
  console.log('📝 Session:', req.session);
  next();
});


app.use(session(sessionOptions));
app.use(flash());

// ✅ PASSPORT CONFIGURATION
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ✅ FLASH & USER GLOBAL VARIABLES
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user || null;
  next();
});

// ✅ LOG REQUESTS FOR DEBUGGING
app.use((req, res, next) => {
  console.log(`📩 Request received: ${req.method} ${req.url}`);
  console.log('📦 Request Body:', req.body);
  next();
});

// ✅ ROUTES
app.use('/listing', listingRoutes);
app.use("/", userRoutes);

// ✅ ERROR HANDLING
app.all('*', (req, res, next) => next(new ExpressError('Page Not Found', 404)));
app.use((err, req, res, next) => {
  let { statusCode = 500, message = 'Something went wrong' } = err;
  res.status(statusCode).render('error', { message });
});

// ✅ START SERVER
app.listen(port, () => console.log(`🚀 Server running on http://localhost:${port}`));

