import { User } from './user.model';
import { Error } from './error.model';

export interface Auth {
  user?: User;
  userId?: string;
  token?: string;
  err?: Error;
}
