import { Router } from 'express'; 
import { container } from '../../containers/container';
import { AuthController } from './auth.controller';
import { authMiddleware } from '../../middleware/auth';

const router = Router();

const authController = container.resolve(AuthController);

router.post('/register', (req, res) => authController.register(req, res));
router.post('/login', (req, res) => authController.login(req, res));
router.post("/refresh", (req, res) => authController.refresh(req, res));
router.post("/logout", authMiddleware(), (req, res) => authController.logout(req, res));

export default router;
