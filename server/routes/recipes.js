/*
 * Serve JSON to our AngularJS client
 */

// GET

exports.getRecipes = function (req, res) {
  res.send(['node', 'express', 'angular'])
};
