import { Router } from "express";
import * as UsersController from '../controllers/UserController.js';
import checkAuth from "../utils/checkAuth.js";

const router = new Router();

router.post('/register-user',UsersController.register);
router.post('/login-user',UsersController.login);
router.delete('/remove-user',UsersController.removeUser);
router.patch('/update-balance',UsersController.updateBalance);
router.patch('/update-discount',UsersController.updateDiscount);
router.patch('/update-name',UsersController.updateName);
router.patch('/update-password',UsersController.updatePassword);
router.get('/get-all-user',UsersController.getAll);
router.get('/get-me',checkAuth,UsersController.getMe)

export default router;