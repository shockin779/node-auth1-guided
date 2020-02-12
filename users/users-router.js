const router = require('express').Router();
const bcrypt = require('bcryptjs');
const Users = require('./users-model.js');

router.get('/', auth, (req, res) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});


function auth(req, res, next) {
  let {username, password} = req.headers;
  console.log(username, password)
  Users.findBy({username}).first()
    .then(user => {
      console.log(user)
      if(user && bcrypt.compareSync(password, user.password)) {
        next();
      } else {
        res.status(401).json({message: 'Invalid credentials'});
      }
    })
    .catch(err =>  res.status(500).json({message: `An internal server error occured: ${err}`}))
}

module.exports = router;
