import { Router } from "express";
import * as UsersController from '../controllers/UserController.js';

const router = new Router();

router.post('/register-user',UsersController.register);
router.post('/login-user',UsersController.login);
router.delete('/remove-user',UsersController.removeUser);
router.patch('/update-balance',UsersController.updateBalance);
router.patch('/update-discount',UsersController.updateDiscount);
router.get('/get-all-user',UsersController.getAll);

export default router;