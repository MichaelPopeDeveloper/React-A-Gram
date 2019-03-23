import * as express from 'express';
// import * as crypto from 'crypto';
import { User } from '../models/User';
import * as encryptor from '../helper/Encryptor';
const router = express.Router();

export const userRoute = router
  .get('/', (req, res) => {
    res.send('User Home Page');
  });
