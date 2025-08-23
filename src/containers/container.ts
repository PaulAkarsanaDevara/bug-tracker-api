import { container } from 'tsyringe';
import { UserService } from '../modules/users/user.service';
import { BugService } from '../modules/bugs/bug.service';

container.register('UserService', UserService);
container.register('BugService', BugService);

export {  container  }