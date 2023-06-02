import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import moment from 'moment-timezone';
import cookieParser from 'cookie-parser';
import http from 'http'; // Додайте цей рядок
import { Server } from 'socket.io'; // Додайте цей рядок

import BlogRouter from './router/Blogrouter.js';
import UserRouter from './router/UserRouter.js';
import CalculatorRouter from './router/CalculatorRouter.js';
import TableRouter from './router/TableRouter.js';
import Table from './models/Table.js'

import * as TranslationsUaController from './controllers/TranslationsUaController.js';
import * as TranslationsRuController from './controllers/TranslationsRuController.js';
import * as CurrenyController from './controllers/CurrenyController.js';

const kyivTime = moment().tz('Europe/Kiev');
const startTime = moment(kyivTime).set({ hour: 7, minute: 0, second: 0 }).valueOf();
const endTime = moment(kyivTime).set({ hour: 8, minute: 0, second: 0 }).valueOf();

dotenv.config();
const app = express();
const db = 'mongodb+srv://roskichuk:qwerty12345@cluster0.vizv4yq.mongodb.net/?retryWrites=true&w=majority';


mongoose
.connect(db)
.then(() => {
    console.log('DB Strat')
})

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use('/uploads',express.static('uploads'));
app.use('/uploadsFile',express.static('uploadsFile'));

app.use(BlogRouter);
app.use(UserRouter);
app.use(CalculatorRouter);
app.use(TableRouter);

app.post('/create-ru-text', TranslationsRuController.createText);
app.get('/get-ru-text', TranslationsRuController.getText);

app.post('/create-ua-text', TranslationsUaController.createText);
app.get('/get-ua-text', TranslationsUaController.getText);

app.get('/get-currency',CurrenyController.getCurrency);
app.patch('/create-default-currency',CurrenyController.createDefaultCurrency);
app.patch('/upadte-currency',CurrenyController.createAdminCurrency);

setInterval(() => {
    const currentTime = Date.now();
    if (currentTime >= startTime && currentTime <= endTime) {
        CurrenyController.createDefaultCurrency();
    } 
}, 1800000);

const server = http.createServer(app); // Замініть цей рядок

const io = new Server(server); // Додайте цей рядок перед app.listen

io.on('connection', (socket) => {
    console.log('Нове з\'єднання Socket.io встановлено');
  
    // Обробка подій для з'єднання
    socket.on('message', (message) => {
      console.log('Отримано повідомлення:', message);
      // Тут ви можете виконати необхідну логіку з обробки повідомлення
  
      // Відправка повідомлення назад клієнту
      socket.emit('response', 'Вітаю, отримав повідомлення!');
    });
  
    socket.on('disconnect', () => {
      console.log('З\'єднання Socket.io закрите');
      // Тут ви можете виконати необхідну логіку при закритті з'єднання
    });
  });

app.listen(process.env.PORT,() => {
    console.log('server start',process.env.PORT)
})