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
      const user = Object.assign({}, req.user._doc);
      delete user.password;
      delete user._id;
      console.log('assign user', user);
      res.send({ user });
    } else {
      res.status(401).send({ user: false });
    }
  })
  .post('/login', (req, res, next) => {
    const { username } = req.body;
    console.log('req.body', req.body);
    User.findOne({ username })
      .then((user) => {
        if (user) return next();
        return res.send({ loginError: 'Username or Email Already Exists (Try Another One or Sign In)' });
      });
  },

    passport.authenticate('local'),
    (req, res) => {
      console.log('req.user', req.user);
      if (req.user) {
        const user = Object.assign({}, req.user._doc);
        delete user.password;
        delete user._id;
        console.log('assign user', user);
        console.log('did login');
        return res.send({ user });
      }
      console.log('did not login');
      return res.send({ loginError: 'Username or Password was Incorrect' });
    })
  .post('/signup', (req, res, next) => {
    const { username, email, password } = req.body;
    console.log('req.body', req.body);
    User.findOne({ username })
      .then((user) => {
        if (!user) {
          const newUser = new User({ username, email, password: Encryptor.encryptString(password) });
          return newUser.save()
            .then(result => {
              console.log('saved user result', result);
              next()
            })
            .catch(err => console.log(err));
        } else {
          res.send({ loginError: 'Username or Email Already Exists (Try Another One or Sign In)' });
        }
      });
  },
    passport.authenticate('local'),
    (req, res) => {
      console.log('req.user', req.user);
      if (req.user) {
        const user = Object.assign({}, req.user._doc);
        delete user.password;
        delete user._id;
        console.log('assign user', user);
        return res.send({ user });
      }
    })
  .get('/logout', (req, res, next) => {
    if (req.user) {
      req.session.destroy(null);
      res.clearCookie('connect.sid');
      console.log('logout user', req.user);
      return res.json({ msg: 'logged user out' });
    }
    return res.json({ msg: 'no user to log out' });
    // req.logout();
    // res.send('Logged out!');
  })
  .post('/createPost', (req, res) => {
    const { username, imageURL, postDescriptionText } = req.body;
    if (req.user) {
      User.findByIdAndUpdate({ _id: req.user._id },
        {
          $push:
          {
            posts:
            {
              imageURL,
              description: postDescriptionText,
              created_at: new Date(),
              comments: [],
            },
            newsfeed:
            {
              username,
              imageURL,
              description: postDescriptionText,
              created_at: new Date(),
              comments: [],
            },
          },
        })
        .then(result => {
          User.findById(req.user._id)
            .then((user) => {
              if (user) {
                delete (user as any).password; // clean user
                delete (user as any)._id;
                res.status(200).send({ user });
              } else {
                res.status(401).send({ msg: 'error' }); // change this to error status code
              }
            });
        })
        .catch(error => res.send(error));
      return;
    }
    return res.status(401).send({ user: false });
  })
  .post('/editPost', (req, res) => {
    const { postDescriptionText, imageURL } = req.body;
    if (req.user) {
      console.log('imageURL', imageURL);
      User.findOneAndUpdate({ "posts.imageURL": imageURL },
        {
          $set:
          {
            "posts.$.description": postDescriptionText,
          },
        })
        .then((result) => {
          console.log('posts update', result);
          User.findOneAndUpdate({ "newsfeed.imageURL": imageURL },
            {
              $set:
              {
                "newsfeed.$.description": postDescriptionText,
              },
            })
            .then(result => console.log('newsfeed update', result));
        })
        .then((result) => {
          User.findById(req.user._id)
            .then((user) => {
              if (user) {
                delete (user as any).password; // clean user
                delete (user as any)._id;
                res.status(200).send({ user });
              } else {
                res.status(401).send({ msg: 'error' }); // change this to error status code
              }
            });
        })
        .catch(error => res.send(error));
      return;
    }
    return res.status(401).send({ user: false });
  })
  .post('/deletePost', (req, res) => {
    const { imageURL } = req.body;
    if (req.user) {
      User.findOneAndUpdate({ _id: req.user._id },
        {
          $pull:
          {
            "posts": { imageURL }
          },
        })
        .catch(error => {
          console.log('posts delete error', error);
        })
        .then((result) => {
          console.log('delete post', result);
          User.findOneAndUpdate({ _id: req.user._id },
            {
              $pull:
              {
                "newsfeed": { imageURL }
              },
            })
            .then(result => {
              console.log('newsfeed delete', result);
              User.findById(req.user._id)
                .then((user) => {
                  if (user) {
                    delete (user as any).password; // clean user
                    delete (user as any)._id;
                    res.status(200).send({ user });
                  }
                })
                .catch(error => {
                  res.send(error);
                })
            })
            .catch(error => {
              console.log('newsfeed delete error', error);
            })
        });
    }
  });
