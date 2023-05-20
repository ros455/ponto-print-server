import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import fs from "fs"

import BlogRouter from './router/Blogrouter.js'
import UserRouter from './router/UserRouter.js'
import CalculatorRouter from './router/CalculatorRouter.js'

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

app.use('/uploads',express.static('uploads'))

app.use(BlogRouter)
app.use(UserRouter)
app.use(CalculatorRouter)

app.listen(process.env.PORT,() => {
    console.log('server start',process.env.PORT)
})