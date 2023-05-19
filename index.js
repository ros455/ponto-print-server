import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import * as UsersController from './controllers/UserController.js';
// import * as BlogController from './controllers/BlogController.js';
// import * as CalculatorController from './controllers/CalculatorController.js';

dotenv.config();
const app = express();
const db = 'mongodb+srv://roskichuk:qwerty12345@cluster0.vizv4yq.mongodb.net/?retryWrites=true&w=majority';

mongoose
.connect(db)
.then(() => {
    console.log('DB Strat')
})

app.use(cors());
app.use(express.json())

app.post('/register-user',UsersController.register);
app.post('/login-user',UsersController.login);
app.delete('/remove-user',UsersController.removeUser);
app.patch('/update-balance',UsersController.updateBalance);
app.patch('/update-discount',UsersController.updateDiscount);
// app.post('/create-post',BlogController.addNewPost);
// app.patch('/update-post',BlogController.updatePost);
// app.delete('/remove-post',BlogController.removePost);
// app.post('/create-calc',CalculatorController.createCalculator);
// app.get('/get-all-calc',CalculatorController.getAll);

app.listen(process.env.PORT,() => {
    console.log('server start',process.env.PORT)
})