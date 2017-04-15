var hbs = require('hbs')
var fs = require('fs')

var User = require('../models/user');

module.exports = function(router, passport){
	router.get('/', function(req, res){
		hbs.registerPartial('content', fs.readFileSync(__dirname + '/../../views/social.html', 'utf8'))
		res.render('layout', {	
		})
	});

	router.get('/login', function(req, res){
		hbs.registerPartial('content', fs.readFileSync(__dirname + '/../../views/login.html', 'utf8'))
		res.render('layout', {
			message: req.flash('loginMessage')	
		})
	});
	router.post('/login', passport.authenticate('local-login', {
		successRedirect: '/profile',
		failureRedirect: '/login',
		failureFlash: true
	}));

	router.get('/signup', function(req, res){
		hbs.registerPartial('content', fs.readFileSync(__dirname + '/../../views/signup.html', 'utf8'))
		res.render('layout', {
			message: req.flash('signupMessage')	
		})
	});

	router.post('/signup', passport.authenticate('local-signup', {
		successRedirect: '/',
		failureRedirect: '/signup',
		failureFlash: true
	}));

	router.get('/facebook', passport.authenticate('facebook', {scope: ['email']}));

	router.get('/auth/facebook/callback', 
	  passport.authenticate('facebook', { successRedirect: '/profile',
	                                      failureRedirect: '/' }));

    router.get('/google', passport.authenticate('google', {scope: ['profile', 'email']}));

	router.get('/auth/google/callback', 
	  passport.authenticate('google', { successRedirect: '/profile',
	                                      failureRedirect: '/' }));										  


	router.get('/logout', function(req, res){
		req.logout();
		res.redirect('/');
	})
};