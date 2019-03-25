import * as express from 'express';
// import * as crypto from 'crypto';
import { User } from '../models/User';
import * as encryptor from '../helper/Encryptor';
const passport = require('../config/passport');
const router = express.Router();

export const userRoute = router
  .get('/', (req, res) => {
    console.log('req.session', req.session);
    console.log('req.user', req.user);
    if (req.user) {
      res.send('your logged in');
    } else {
      res.send('Bruh you not logged in');
    }
  })
  .post('/login', (req, res, next) => {
    console.log('req.body', req.body);
    next()
  },
    passport.authenticate('local'),
    (req, res) => {
      console.log('req.user', req.user);
      res.send({ loggedIn: true });
    })
  .post('/signup', (req, res) => {
    const { username, email, password } = req.body;
    console.log('req.body', req.body);
    User.findOne({ username })
      .then((user) => {
        if (!user) {
          const newUser = new User({ username, email, password });
          newUser.save()
            .then(result => console.log(result))
            .catch(err => console.log(err));
        } else {
          res.send('Username already exists');
        }
      });
  },
    passport.authenticate('local'),
    (req, res) => {
      console.log('req.user', req.user);
      if (req.user) {
        res.send({ loggedIn: true });
      } else {
        res.send({ loggedIn: false });
      }
    })
  .get('/logout', (req, res, next) => {
    console.log('logging out user....');
    req.logout();
    res.send('Logged out!');
  });
