import * as Joi from 'joi';
import { User } from 'schema/DB/USERS';

const CreateSchema = Joi.object<User>({
    mail: Joi.string().required(),
    displayName: Joi.string().required(),
    password: Joi.string().required(),

});
export { CreateSchema };