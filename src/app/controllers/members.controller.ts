import Express from 'express';
import { member_schema, query_schema } from '../validations/member.schema';
import { custom_error } from '../helpers/errors/custom_error';
import boom from '@hapi/boom';
import { ZodError } from 'zod';
import { members_service } from '../services/members.service';

export default class members_controller {
  async handle_get(req: Express.Request, res: Express.Response) {
    try {
      const { code } = req.query;
      query_schema.parse(code);

      const member_service = new members_service();

      const data = await member_service.retrieve_user(code as string);

      const if_exists = await member_service.check_if_already_exists(
        data.user_data.id
      );

      if (if_exists)
        return res.status(200).json({ status: 200, message: 'Created' });

      await member_service.create_user(data.user_data, data.auth);

      return res.status(200).json({ status: 200, message: 'Created' });
    } catch (error: any) {
      if (error instanceof ZodError) {
        throw boom.badRequest(error.message);
      } else {
        if (error.isBoom) {
          throw boom.boomify(error);
        } else {
          throw boom.internal(error.message, error);
        }
      }
    }
  }
}
