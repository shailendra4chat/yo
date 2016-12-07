var express           =     require('express')
  , passport          =     require('passport')
  , FacebookStrategy  =     require('passport-facebook').Strategy
  , session           =     require('express-session')
  , cookieParser      =     require('cookie-parser')
  , bodyParser        =     require('body-parser')
  , config            =     require('../config/config')
  , path 			        =  	  require('path')
  , app               =     express()
  , routes 			      = 	  express.Router()

var recipes = require('./routes/recipes');

// Passport session setup.
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

// Use the FacebookStrategy within Passport.
passport.use(new FacebookStrategy({
    clientID: config.facebook_api_key,
    clientSecret:config.facebook_api_secret ,
    callbackURL: config.callback_url
  },
  function(accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
      //Check whether the User exists or not using profile.id
      if(config.use_database==='true')
      {
      connection.query("SELECT * from user_info where user_id="+profile.id,function(err,rows,fields){
        if(err) throw err;
        if(rows.length===0)
          {
            console.log("There is no such user, adding now");
            connection.query("INSERT into user_info(user_id,user_name) VALUES('"+profile.id+"','"+profile.username+"')");
          }
          else
            {
              console.log("User already exists in database");
            }
          });
      }
      return done(null, profile);
    });
  }
));

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: 'keyboard cat', key: 'sid'}));
app.use(passport.initialize());
app.use(passport.session());

//route to your static folder
var assetFolder = path.resolve(__dirname, '../client/');
routes.use(express.static(assetFolder));

app.use(express.static(__dirname + '/../bower_components/'))

// User authentication
app.get('/api/is_auth', ensureAuthenticated, function(req, res){
  res.send(true);
});

app.get('/auth/facebook', passport.authenticate('facebook', {scope:'email'}));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect : '/#/home', failureRedirect: '/#/' }),
  function(req, res) {
    res.redirect('/#/home');
  });

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/#/');
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.send(false)
}
// authentication till here

// JSON endpoints
routes.get('/api/getcall', recipes.getRecipes);

// Mount our main router
app.use('/', routes);

// Start the server!
var port = process.env.PORT || 3000;
app.listen(port);

console.log("Listening on port", port);
