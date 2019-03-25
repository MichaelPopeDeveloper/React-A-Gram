import * as passport from 'passport';
import { User } from '../models/User';
import * as Encryptor from '../helper/Encryptor';
const LocalStrategy = require('passport-local');

passport.use(new LocalStrategy(
  {
    usernameField: 'username',
    passwordField: 'password',
  },
  (username: string, password: string, done: any) => {
    User.findOne({ username })
      .then((user) => {
        if (!user || !Encryptor.compareEncryptedString(password, (user as any).password)) {
          console.log('you done offed');
          console.log(user);
          return done(null, false, { errors: { 'email or password': 'is invalid' } });
        }
        return done(null, user);
      }).catch(done);
  },
));

passport.serializeUser((user, done) => {
  console.log('=== serialize ... called ===');
  console.log(user); // the whole raw user object!
  console.log('---------');
  done(null, { _id: (user as any)._id });
});

passport.deserializeUser((id, done) => {
  console.log('DEserialize ... called');
  User.findOne(
    { _id: id },
    // 'firstName lastName photos local.username',
    (err, user) => {
      console.log('======= DESERILAIZE USER CALLED ======');
      console.log(user);
      console.log('--------------');
      done(null, user);
    },
  );
});

module.exports = passport;
