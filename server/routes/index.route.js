import express from 'express';
import contacts from './contact.route';
import calls from './call.route';


const router = express.Router(); // eslint-disable-line new-cap

router.get('/health-check', (req, res) =>
  res.send('OK')
);

router.use('/contacts', contacts);
router.use('/calls', calls);

export default router;
