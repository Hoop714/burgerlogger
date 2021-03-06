var express = require("express");
var burger = require("../models/burger.js");
var router = express.Router();

router.get("/", function(req, res) {
    burger.all(function(data) {
        var hbsObject = {
          burgers: data
        };
    res.render("index", hbsObject);
})
});

router.post("/api/burgers", function(req, res) {
  console.log(req.body.burger_name)
    burger.create([
      "burger_name", "devoured"
    ], [
      req.body.burger_name, req.body.devoured
    ], function(result) {
      console.log("New burger: " + result)
      res.json({ id: result.insertId });
    });
  });
  
  router.put("/api/burgers/:id", function(req, res) {
    var condition = "id = " + req.params.id;
  
    console.log("condition", condition);
  
    burger.update({
      devoured: 1
    }, condition, function(result) {
      if (result.changedRows == 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      } else {
        res.status(200).end();
      }
    });
  });
  
  // Export routes for server.js to use.
  module.exports = router;