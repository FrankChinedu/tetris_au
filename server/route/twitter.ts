import express, { Request, Response } from 'express';
import tw from '../middleware/twitter';

const Router = express.Router();

Router.get('/twitter', (req: Request, res: Response) => {
  tw.login((err: Error, tokenSecret: string, url: string) => {
    if (err) {
      // Handle the error your way
      console.log('error', err);
    }
    console.log(tokenSecret, 'tokensecret');
    console.log(url, 'url');

    // Save the OAuth token secret for use in your /twitter/callback route
    req.session.tokenSecret = tokenSecret;
    res.redirect(url);
  });
});

Router.get('/twitter/callback', (req: Request, res: Response) => {
  tw.callback({
    oauth_token: req.query.oauth_token,
    oauth_verifier: req.query.oauth_verifier
  }, req.session.tokenSecret, (err: Error, user: any) => {
    if (err) {
      // Handle the error your way
      console.log('callback', err);
    }
    console.log('user allback', user);

    res.redirect('/');
  });
});

export default Router;
