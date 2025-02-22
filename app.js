require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const session = require('express-session');
const {MongoClient} = require('mongodb');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');
const ExpressError = require('./utils/expressError');
const listingRoutes = require('./routes/listing');
const userRoutes = require("./routes/user");
const MongoStore = require('connect-mongo');

const app = express();
const port = 3000;

// ✅ Ensure DBurl is defined before using it
const DBurl =process.env.ATLASDB_URL;

// ✅ CONNECT TO MONGODB
async function main() {
  try {
    mongoose.connect(DBurl, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('✅ Connected to MongoDB');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  }
}
main();

// ✅ MongoClient Initialization (Only if Needed)
const client = new MongoClient(DBurl, { useNewUrlParser: true, useUnifiedTopology: true });
app.get("", (req, res)=>{
  res.redirect("/listing")
})


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
  mongoUrl: DBurl,
  crypto: { secret: process.env.SECRET },
  touchAfter: 24 * 3600,
});

const sessionOptions = {
  store,
  secret: process.env.SECRET || 'fallbacksecret',
  resave: false,
  saveUninitialized: true,
  cookie: { 
    httpOnly: true,
    secure: false, // Set to true if using HTTPS
    maxAge: 1000 * 60 * 60 * 24, // 1 Day
  },
};

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
