import { Router } from 'express';
import callCtrl from '../controllers/calls.controller';

const router = Router(); //

router.route('/')
  .get(callCtrl.list)
  .post(callCtrl.create);

router.route('/:id')
  .get(callCtrl.list)
  .put(callCtrl.update)
  .delete(callCtrl.remove);

export default router;
