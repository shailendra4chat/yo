var hbs = require('hbs')
var fs = require('fs')

module.exports = function(router, passport){
    router.get("/recipes", function(req, res){
      res.render('partials/recipes', {
        recipes: "yo recipes"
      })
    })

}