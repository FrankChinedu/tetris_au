import { Express } from 'express';

export default (app: Express): void => {
  app.use('/api/v1', function (req, res) {
    return res.status(200).send({ message: 'here' });
  });
};
