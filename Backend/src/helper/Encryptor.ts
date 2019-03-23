
import * as bcrypt from 'bcryptjs';

export const encryptString = (string: string) => {
  const salt = bcrypt.genSaltSync(12);
  const hash = bcrypt.hashSync(string, salt);
  return hash;
};

export const compareEncryptedString = (string: string, hash: string) => {
  return bcrypt.compareSync(string, hash);
};
