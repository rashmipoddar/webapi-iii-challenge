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

router.get('/:id', validateUserId, (req, res) => {
  res.status(200).send(req.user);
});

router.get('/:id/posts', (req, res) => {

});

router.delete('/:id', validateUserId, (req, res) => {
  db.remove(req.user.id)
    .then(response => {
      console.log(response);
      res.status(200).send(req.user);
    })
    .catch(error => {
      console.log(error);
      res.status(500).send({message: 'The user could not be deleted.'});
    })
});

router.put('/:id', validateUserId, (req, res) => {
  const updateUserData = req.body;
  if (!updateUserData.name) {
    res.status(400).send({message: 'User name is required'});
  } else {
    db.update(req.user.id, updateUserData)
      .then(response => {
        console.log(response);
        res.status(200).send(updateUserData);
      })
      .catch(error => {
        console.log(error);
        res.status(500).send({message: 'The user could not be updated. Please try again later.'});
      })
  }
});

//custom middleware

function validateUserId(req, res, next) {
  const id = req.params.id;
  // console.log(id);

  db.getById(id)
    .then(response => {
      // console.log(response);
      if (response) {
      // {...req, user : response}
      req.user = response;
      next();
      } else {
        res.status(404).send({message: 'Invalid user id'});
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).send({message: 'There was an error in getting users from the database'});
    })
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
