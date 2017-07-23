import httpStatus from 'http-status';
import Call from '../models/call.model';
import ShortHelper from '../helpers/ShortHelper';
import APIError from '../helpers/APIError';

function list(req, res, next) {
  const { entity } = req.query;
  const query = {};
  if (entity) query.entity = entity;
  const { id } = req.params;
  Call.find(query)
    .where('deleted').equals(false)
    .or([{ recipient: id }, { caller: id }])
    .populate({
      path: 'recipient caller',
      select: 'name phone',
    })
    .sort({ createdAt: -1 })
    .then(items => res.json(items))
    .catch(e => next(e));
}

function create(req, res, next) {
  const fields = ShortHelper.pick(req.body, 'started', 'finished', 'recipient', 'caller');
  Call.create(fields, (err, record) => {
    if (!record) {
      return next(err);
    }
    return res.json(record.toJSON());
  });
}

function update(req, res, next) {
  const _id = req.params.id;
  const fields = ShortHelper.pick(req.body, 'started', 'finished', 'recipient', 'caller');

  Call.update({ _id }, fields)
    .then((item) => {
      if (!item) {
        const err = new APIError('Call record is not found after update', httpStatus.INTERNAL_SERVER_ERROR);
        return next(err);
      }
      return Call.findOne({ _id });
    })
    .then(contact => res.json(contact.toJSON()))
    .catch(e => next(e));
}

function remove(req, res, next) {
  const _id = req.params.id;

  Call.update({ _id }, { deleted: true })
  .then((item) => {
    if (!item) {
      const err = new APIError('Call record is not found after delete', httpStatus.BAD_REQUEST);
      return next(err);
    }
    return res.json({ id: _id });
  })
  .catch(e => next(e));
}

export default { list, update, create, remove };
