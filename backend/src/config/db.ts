import mongoose from 'mongoose';

function db() {
  return mongoose.connect('mongodb://127.0.0.1:27017/userapp')
}

export { db } 