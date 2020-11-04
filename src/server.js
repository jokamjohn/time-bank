require('dotenv').config();

import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
import * as sapper from '@sapper/server';
import cookieParser from 'cookie-parser';
// import {verifyToken} from "./backend/auth";

const {PORT, NODE_ENV} = process.env;
const dev = NODE_ENV === 'development';

export default polka() // You can also use Express
    .use(cookieParser())
    .use(
        compression({threshold: 0}),
        sirv('static', {dev}),
        sapper.middleware({
          session: async (req, res) => {
            let cookie = req.cookies.userDetails;
            if (cookie) {
              if (cookie === 'false') return {user: false};
              return {user: cookie};
            }
            return {user: false}
          }
        })
    )
    .listen(PORT, err => {
      if (err) console.log('error', err);
    });
