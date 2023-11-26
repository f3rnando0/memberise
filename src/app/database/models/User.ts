import { Schema, model } from 'mongoose';

const user_schema = new Schema(
  {
    _id: {
      type: String,
      unique: true,
      required: true,
    },
    username: {
      type: String,
    },
    discriminator: {
      type: String,
    },
    global_name: {
      type: String,
      default: null,
    },
    avatar: {
      type: String,
      default: null,
    },
    bot: {
      type: Boolean,
      default: false,
    },
    system: {
      type: Boolean,
      default: false,
    },
    mfa_enabled: {
      type: Boolean,
      default: false,
    },
    banner: {
      type: String,
      default: null,
    },
    accent_color: {
      type: Number,
      default: null,
    },
    locale: {
      type: String,
      default: null,
    },
    flags: {
      type: Number,
      default: null,
    },
    premium_type: {
      type: Number,
      default: 0,
    },
    public_flags: {
      type: Number,
      default: null,
    },
    avatar_decoration: {
      type: String,
      default: null,
    },
  },
  {
    _id: false,
  }
);

export const User = model('users', user_schema);
