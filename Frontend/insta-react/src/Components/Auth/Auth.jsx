import * as axios from 'axios';

const Auth = {
  isAuthenticated: false,
  async checkToken(cb) {
    const localToken = localStorage.getItem('token');
    const isAuthenticated = await axios.post('/user/checkToken', {
      token: localToken,
    })
      .then((res) => {
        const { authenticated } = res.data;
        console.log(authenticated);
        if (authenticated) {
          this.isAuthenticated = true;
          cb(this.isAuthenticated);
        } else {
          cb(this.isAuthenticated);
          return false;
        }
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
    return isAuthenticated;
  },
  login(credentials, cb) {
    axios.post('/user/login', {
      email: credentials.email,
      password: credentials.password,
    })
      .then((res) => {
        console.log(res);
        const { token } = res.data;
        if (token) {
          localStorage.setItem('token', token);
          this.isAuthenticated = true;
          cb(this.isAuthenticated);
        } else {
          cb(this.isAuthenticated);
          return false;
        }
      })
      .catch(err => console.log(err));
  },
  signout(cb) {
    this.isAuthenticated = false;
    setTimeout(cb, 100);
  },
};