import express from 'express';
import passport from '../middleware/passport';
// import TwitterController from '../module/twitter';

const Router = express.Router();

Router.get('/twitter', passport.authenticate('twitter', { scope: ['include_email=true'] }));
// Router.get('/twitter', (req, res) => {
//   res.send('some');
// });

Router.get('/twitter/callback', passport.authenticate('twitter', { failureRedirect: '/auth/error' }),
  function (req, res) {
    res.redirect('/game/end');
  });
// Router.get('/callback', TwitterController.log);

export default Router;
