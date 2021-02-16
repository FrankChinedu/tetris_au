import passport from 'passport';
import { Strategy as TwitterStrategy } from 'passport-twitter';
import { TWITTER_CALLBACK, TWITTER_KEY, TWITTER_SECRET } from '../config/env';

console.log('TWITTER_CALLBACK', TWITTER_CALLBACK);
console.log('TWITTER_KEY', TWITTER_KEY);
console.log('TWITTER_SECRET', TWITTER_SECRET);

passport.use(new TwitterStrategy({
  callbackURL: TWITTER_CALLBACK,
  consumerKey: TWITTER_KEY,
  consumerSecret: TWITTER_SECRET,
  includeEmail: true
}, async (token, tokenSecret, profile, done) => {
  const { username } = profile;
  console.log('profile, -->', profile);

  return done(null, username);
}));

passport.deserializeUser((user: any, done) => {
  done(null, user);
});

export default passport;
