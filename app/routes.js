var User = require("./models/user");

module.exports = function(app, password){
	app.get("/", function(req, res){
		res.render("index.ejs")
	})

	app.get("/signup", function(req, res){
		res.render("signup.ejs", {message: req.flash("signupMessage")})
	})

	app.post("/signup", password.authenticate("local-signup", {
		successRedirect: "/",
		failureRedirect: "/signup",
		failureFlash: true
	}))

	app.get("/:username/:password", function(req, res){
		var newUser = new User();

		newUser.local.username = req.params.username;
		newUser.local.password = req.params.password;

		console.log(newUser)

		newUser.save(function(err){
			if(err){
				throw err;
			}
		})
		res.send("success")
	})
}