import { Schema, model } from 'mongoose';

const auth_schema = new Schema({
  _id: {
    type: String,
    required: true,
  },
  access_token: {
    type: String,
    required: true,
  },
  token_type: {
    type: String,
    required: true,
  },
  expires_in: {
    type: Number,
  },
  refresh_token: {
    type: String,
    required: true,
  },
  scope: {
    type: String,
  },
});

export const Auth = model('user_auth', auth_schema);
