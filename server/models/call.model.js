import mongoose from 'mongoose';

const CallSchema = new mongoose.Schema({
  started: Date,
  finished: Date,
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Contact'
  },
  caller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Contact'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  deleted: {
    type: Boolean,
    default: false
  },
});

CallSchema.options.toJSON = {
  transform(doc, ret) {
    const model = Object.assign({}, ret);
    model.id = model._id;
    delete model._id;
    delete model.deleted;
    delete model.createdAt;
    delete model.__v;
    return model;
  }
};

export default mongoose.model('Call', CallSchema);
