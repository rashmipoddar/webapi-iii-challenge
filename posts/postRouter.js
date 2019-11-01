const express = require('express');

const postDb = require('./postDb');

const router = express.Router();

router.get('/', (req, res) => {
  postDb.get()
  .then(response => {
    // console.log(response);
    res.status(200).send(response);
  })
  .catch(error => {
    console.log(error);
    res.status(500).send({error: 'There was an error getting posts from database.'});
  })
});

router.get('/:id', validatePostId, (req, res) => {
  res.status(200).send(req.post);
});

router.delete('/:id', validatePostId, (req, res) => {
  postDb.remove(req.post.id) 
    .then(response => {
      console.log('-----', response, '------');
      res.status(200).send(req.post);
      // res.status(200).send(response) will not work because response is a number
      // res.status(200).json(response) will work because we convert number to json.
    })
    .catch(error => {
      console.log(error);
      res.status(500).send({message: 'The post could not be deleted'});
    })
});

router.put('/:id', validatePostId, (req, res) => {
  const postUpdate = req.body;

  if (postUpdate.text) {
    postDb.update(req.post.id, postUpdate)
    .then(response => {
      console.log(response);
      res.status(200).send({message: 'The post has been updated'});
    })
    .catch(error => {
      console.log(error);
      res.status(500).send({message: 'The post could not be updated'});
    })
  } else {
    res.status(404).send({message: 'Please provide text for post'});
  }  
});

// custom middleware

function validatePostId(req, res, next) {
  const postId = req.params.id;
  // console.log(postId);

  postDb.getById(postId)
    .then(response => {
      // console.log(response);
      if (response) {
        req.post = response;
        next();
      } else {
        res.status(400).send({message: 'Invalid post id'});
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).send({message: 'There was an error getting post data from the database'});
    })
};

module.exports = router;