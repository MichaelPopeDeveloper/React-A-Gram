import * as express from 'express';
// import * as crypto from 'crypto';
import { User } from '../models/User';
import * as Encryptor from '../helper/Encryptor';
import { runInNewContext } from 'vm';
const passport = require('../config/passport');
const router = express.Router();

export const userRoute = router
  .get('/', (req, res) => {
    console.log('req.session', req.session);
    console.log('req.sessionID', req.sessionID);
    console.log('req.user', req.user);
    if (req.user) {
      res.send({user: {username: req.user.username, posts: req.user.posts}});
    } else {
      res.status(401).send({user: false});
    }
  })
  .post('/login', (req, res, next) => {
    console.log('req.body', req.body);
    next()
  },
    passport.authenticate('local'),
    (req, res) => {
      console.log('req.user', req.user);
      if (req.user) {
        const {username, email, posts} = req.user;
        res.send({user: {username, email, posts}});
      } else {
        res.sendStatus(401);
      }
    })
  .post('/signup', (req, res, next) => {
    const { username, email, password } = req.body;
    console.log('req.body', req.body);
    User.findOne({ username })
      .then((user) => {
        if (!user) {
          const newUser = new User({ username, email, password: Encryptor.encryptString(password) });
          newUser.save()
            .then(result => {
              console.log('saved user result', result);
              next()
            })
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
        const {username, email, posts} = req.user;
        res.send({user: {username, email, posts}});
      } else {
        res.sendStatus(401);
      }
    })
  .get('/logout', (req, res, next) => {
    if (req.user) {
      req.session.destroy(null);
      res.clearCookie('connect.sid');
      console.log('logout user', req.user);
      return res.json({msg: 'logged user out'});
    } else {
      res.json({msg: 'no user to log out'});
    }
   // req.logout();
    //res.send('Logged out!');
  });
