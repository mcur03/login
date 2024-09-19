import { Router } from 'express';
import { login, registerUser } from '../Controllers/authController'
import { validarToken } from '../Middleware/middleware'
import { protectedApi } from '../Controllers/protectedController';

const router = Router();

router.post('/register', registerUser);
router.post('/login', login);
router.get('/protected', validarToken, protectedApi);

export default router;