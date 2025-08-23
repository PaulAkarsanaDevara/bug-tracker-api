import { container } from 'tsyringe';
import { UserService } from '../modules/users/user.service';
import { BugService } from '../modules/bugs/bug.service';
import { AuthService } from '../modules/auth/auth.service';

container.register('UserService', UserService);
container.register('BugService', BugService);
container.register('AuthService', AuthService);

export {  container  }