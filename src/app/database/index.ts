import { Connection, connect } from 'mongoose';
import boom from '@hapi/boom';

export const create_connection = async () => {
  try {
    await connect(process.env.DATABASE_URL!);

    return connect;
  } catch (error: any) {
    throw boom.internal(error);
  }
};
