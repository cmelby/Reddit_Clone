var db = require("../models");

module.exports = function(app) {
  //get all subs
  app.get("/api/subs", function(req, res) {
    console.log("hey");
    db.Sub.findAll({ include: [db.Post, db.User] }).then(function(dbSub) {
      res.json(dbSub);
    });
  });
  // get specific Sub
  app.get("/api/subs/:id", function(req, res) {
    db.Sub.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Post, db.User]
    }).then(function(dbSub) {
      res.json(dbSub);
    });
  });
  //create new Sub
  app.post("/api/subs", function(req, res) {
    //need body to be object with correct params for
    db.Sub.create(req.body).then(function(dbSub) {
      res.json(dbSub);
    });
  });

  //add a sub
  app.put("/api/subs/:subId/:userId", function(req, res) {
    let theSub;
    let theUser;
    db.Sub.findOne({
      where: {
        id: req.params.subId
      }
    }).then(function(dbSub) {
      theSub = dbSub.dataValues.userId;
      console.log(dbSub.dataValues);
      db.User.findOne({
        where: {
          id: req.params.the
        }
      }).then(function(dbUser) {
        theUser = dbUser;
        theUser.addSub(theSub);
      });
      // db.User.addSub(dbSub.dataValues);
    });
  });

  // delete Sub
  app.delete("/api/subs/:id", function(req, res) {
    db.Sub.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbSub) {
      res.json(dbSub);
    });
  });
};
