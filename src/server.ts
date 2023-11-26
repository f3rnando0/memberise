import { config } from 'dotenv';
import app from './app';
import { create_connection } from './app/database';
import boom from '@hapi/boom';
config();

try {
  create_connection();

  app.listen(process.env.PORT || '3000', () => {
    console.log('http://localhost:3000');
  });
} catch (error: any) {
  throw boom.internal(error);
}
