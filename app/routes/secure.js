module.exports = function(router, passport){
    router.use(function(req, res, next){
        if(req.isAuthenticated()){
            return next();
        }

        res.redirect('/auth');
    })

    router.get('/profile', function(req, res){
		res.render('profile.ejs', { 
            user: req.user,
            displayName: req.user._doc.facebook.name || req.user._doc.google.name || req.user._doc.local.name
        });
	});

    router.get('/*', function(req, res){
		res.redirect('/profile');
	});
}