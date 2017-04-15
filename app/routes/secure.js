var hbs = require('hbs')
var fs = require('fs')

module.exports = function(router, passport){
    router.use(function(req, res, next){
        if(req.isAuthenticated()){
            return next();
        }

        res.redirect('/');
    })

    router.get('/profile', function(req, res){
        hbs.registerPartial('content', fs.readFileSync(__dirname + '/../../views/profile.html', 'utf8'))
		res.render('layout', {
			user: req.user,
            displayName: req.user._doc.facebook.name || req.user._doc.google.name || req.user._doc.local.name	
		})
	});

    router.get('/yomommy', function(req, res){
		hbs.registerPartial('content', fs.readFileSync(__dirname + '/../../views/yomommy.html', 'utf8'))
		res.render('layout', {
			user: req.user,
            displayName: req.user._doc.facebook.name || req.user._doc.google.name || req.user._doc.local.name	
		})
	});

    router.get('/yomusic', function(req, res){
		hbs.registerPartial('content', fs.readFileSync(__dirname + '/../../views/yomusic.html', 'utf8'))
		res.render('layout', {
			user: req.user,
            displayName: req.user._doc.facebook.name || req.user._doc.google.name || req.user._doc.local.name	
		})
	});

    router.get('/*', function(req, res){
		res.redirect('/profile');
	});
}