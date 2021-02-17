import LoginWithTwitter from 'login-with-twitter';
import { TWITTER_CALLBACK, TWITTER_KEY, TWITTER_SECRET } from '../config/env';

const tw = new LoginWithTwitter({
  consumerKey: TWITTER_KEY,
  consumerSecret: TWITTER_SECRET,
  callbackUrl: TWITTER_CALLBACK
});

export default tw;
