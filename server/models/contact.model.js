import mongoose from 'mongoose';

const ContactSchema = new mongoose.Schema({
  name: String,
  age: Number,
  phone: Number,
  country: String,
  city: String,
  street: String,
  apt: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: Date,
  deleted: {
    type: Boolean,
    default: false
  },
});

ContactSchema.options.toJSON = {
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

ContactSchema.pre('save', function (next) {
  this.updatedAt = Date.now;
  next();
});

export default mongoose.model('Contact', ContactSchema);
