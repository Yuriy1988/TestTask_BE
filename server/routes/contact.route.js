import { Router } from 'express';
import contactsCtrl from '../controllers/contacts.controller';

const router = Router(); //

router.route('/')
  .get(contactsCtrl.list)
  .post(contactsCtrl.create);

router.route('/:id')
  .put(contactsCtrl.update)
  .delete(contactsCtrl.remove);

export default router;
