const express = require('express');
const owlRoutes = express.Router();

// Require owl model in our routes module
let Owl = require('./owl.model');
let User = require('./owl.user');

//add user
owlRoutes.route('/addUser').post(function (req, res) {
  let owl = new User(req.body);
  owl.save()
    .then(owl => {
      res.status(200).json({'owl': 'User in added successfully'});
    })
    .catch(err => {
    res.status(400).send("unable to save user to database");
    });
});

//get user by ID
owlRoutes.route('/user/:id').get(function(req, res) {
  let id = req.params.id;
  User.findById(id, function(err, owl) {
      res.json(owl);
  });
});

// Defined store route
owlRoutes.route('/add').post(function (req, res) {
  let owl = new Owl(req.body);
  owl.save()
    .then(owl => {
      res.status(200).json({'owl': 'owl in added successfully'});
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
});

owlRoutes.route('/:id').get(function(req, res) {
  let id = req.params.id;
  Owl.findById(id, function(err, owl) {
      res.json(owl);
  });
});

//get max idThread from record
owlRoutes.route('/get/max').get(function (req, res) {
     Owl.findOne().sort({idThread:-1})
    .exec()
    .then(owl => res.json(owl.idThread));
});

// Defined get data(index or listing) route
owlRoutes.route('/').get(function (req, res) {
  Owl.find(function(err, owls){
  if(err){
    console.log(err);
  }
  else {
    res.json(owls);
  }
});
});

// Defined edit route
owlRoutes.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  Owl.findById(id, function (err, owl){
      res.json(owl);
  });
});

//find max idThread
owlRoutes.route('/maxthread/').get(function (req, res) {
  var sort = { idThread: -1 }
  var limit = 1
  Owl.find().sort(sort).limit(limit).toArray(function (err, owl){
      if(err){
        console.log(err);
      }
      else {
      res.json(owl);
      }
  });
});


//find records by title, description
owlRoutes.route('/search/:q').get(function (req, res) {
  var q = req.params.q;
  Owl.find( 
    { 
      $text: { $search: q } 
    }, function (err, owls){
        if(err){
          console.log(err);
        }
        else {
        res.json(owls);
        }
    });
});

//add files to record
owlRoutes.route('/:id/files').post(function (req, res) {
  const file = {};
  file.url = req.body.cloudinaryURLFile[0];
  file.id = req.body.cloudinaryURLFile[1];
     Owl.findByIdAndUpdate(req.params.id,
    {
      $push: { cloudinaryURLFile: file }
    },
    { new: true }
  )
    .exec()
    .then(owl => res.json(owl));
});



//  Defined update route
owlRoutes.route('/update/:id').post(function (req, res) {
    Owl.findById(req.params.id, function(err, owl) {
    if (!owl)
      res.status(404).send("data is not found");
    else {
        owl.title = req.body.title;
        owl.description = req.body.description;
        owl.createdAt = req.body.createdAt;
        owl.blobsize = req.body.blobsize;
        owl.startTime = req.body.startTime;
        owl.stopTime = req.body.stopTime;
        owl.cloudinaryURL = req.body.cloudinaryURL;
        owl.cloudinaryURLFile = req.body.cloudinaryURLFile;

        owl.save().then(owl => {
          res.json('Update complete');
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});

// Defined delete | remove | destroy route
owlRoutes.route('/delete/:id').get(function (req, res) {
    Owl.findByIdAndRemove({_id: req.params.id}, function(err, owl){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

module.exports = owlRoutes;