module.exports = function(router, passport){
    router.get("/testapi", function(req, res){
        res.json({secretData: "abc123"});
    })

}