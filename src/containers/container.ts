import { container } from 'tsyringe';
import { UserService } from '../modules/users/user.service';

container.register('UserService', UserService);

export {  container  }