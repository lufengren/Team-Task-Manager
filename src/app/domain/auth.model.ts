import { IUser } from './user.model';
import { IError } from './error.model';

export interface IAuth {
  user?: IUser;
  userId?: string;
  token?: string;
  err?: IError;
}
