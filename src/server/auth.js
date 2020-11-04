import app from './firebase';

export const verifyToken = cookie => {
  let checkRevoked = true;
  return app.auth().verifyIdToken(cookie.token, checkRevoked)
      .then(function (decodedToken) {
        return {
          token: cookie.token,
          ...cookie,
          email: decodedToken.email,
          uid: decodedToken.uid
        };
      }).catch(function (error) {
        console.log('error verifying token', error);
        return false;
      });
}


