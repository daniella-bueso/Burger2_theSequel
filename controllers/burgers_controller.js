var express = require("express");

var router = express.Router();

var db = require("../models");

router.get("/", function(req, res) {
    res.redirect("/burgers");
});

router.get("/burgers", function(req, res) {
    db.Burger.findAll({
        order: [
            ["burger_name", "ASC"]
        ],
        // include: [{
        //     model: db.Customer,
        //     attributes: ["customer_name"]
        // }]
    }).then(function(allBurgers) {
        var hbsObject = {
            burgers: allBurgers
        };
        res.render("index", hbsObject);
    });
});

router.post("/api/burgers", function(req, res) {
    return db.Burger.create({
        burger_name: req.body.name
    }).then(function() {
        res.redirect("/burgers");
    });
});

router.put("/api/burgers/:id", function(req, res) {
    return db.Burger.update({
        devoured: req.body.devoured
    }, {
        where: {
            id: req.params.id
        }
    }).then(function() {
        res.redirect("/burgers");
    });
});

router.delete("/burgers/delete/:id", function(req, res) {
    return db.Burger.destroy({
        where: {
            id: req.params.id
        }
    }).then(function() {
        res.redirect("/burgers");
    });
});

module.exports = router;