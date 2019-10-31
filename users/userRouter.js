const express = require('express');

const db = require('./userDb');

const router = express.Router();

router.post('/', validateUser, (req, res) => {
  const newUser = req.body;
  db.insert(newUser)
    .then(response => {
      console.log(response);
      res.status(201).send(response);
    })
    .catch(error => {
      console.log(error);
      res.status(500).send({message: 'There was an error in creating the user. Please try again.'})
    })
});

router.post('/:id/posts', (req, res) => {

});

router.get('/', (req, res) => {
  db.get()
    .then(response => {
      // console.log(response);
      res.status(200).send(response);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({message: 'There was an error in getting users from the database'});
    })

});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  console.log(id);

  db.getById(id)
    .then(response => {
      console.log(response);
      if (response) {
        res.status(200).send(response);
      } else {
        res.status(404).send({message: 'User with the given id does not exist'});
      }
      
    })
    .catch(error => {
      console.log(error);
      res.status(500).send({message: 'There was an error in getting users from the database'});
    })

});

router.get('/:id/posts', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {

});

//custom middleware

function validateUserId(req, res, next) {

};

function validateUser(req, res, next) {
  if (Object.keys(req.body).length === 0) {
    res.status(400).send({message: 'Missing user data'});
  } else if (!req.body.name) {
    res.status(400).send({message: 'Missing required name field'});
  } else {
    next()
  }
};

function validatePost(req, res, next) {

};

module.exports = router;
