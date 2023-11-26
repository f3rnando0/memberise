import { Router } from 'express';
import members_controller from './controllers/members.controller';

const routes = Router();

const members = new members_controller();

routes.get('/members', members.handle_get);

export default routes;
