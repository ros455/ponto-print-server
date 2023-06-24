import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import moment from 'moment-timezone';
import cookieParser from 'cookie-parser';
import http from 'http';
import { Server } from 'socket.io';
import { MongoClient } from "mongodb";
import BlogRouter from './router/Blogrouter.js';
import UserRouter from './router/UserRouter.js';
import CalculatorRouter from './router/CalculatorRouter.js';
import TableRouter from './router/TableRouter.js';
import Table from './models/Table.js';
import fs from 'fs';

import * as TranslationsUaController from './controllers/TranslationsUaController.js';
import * as TranslationsRuController from './controllers/TranslationsRuController.js';
import * as CurrenyController from './controllers/CurrenyController.js';
import * as TableController from './controllers/TableController.js';

const kyivTime = moment().tz('Europe/Kiev');
const startTime = moment(kyivTime).set({ hour: 7, minute: 0, second: 0 }).valueOf();
const endTime = moment(kyivTime).set({ hour: 8, minute: 0, second: 0 }).valueOf();

dotenv.config();
const app = express();
const db = 'mongodb+srv://roskichuk:qwerty12345@cluster0.vizv4yq.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient('mongodb+srv://roskichuk:qwerty12345@cluster0.vizv4yq.mongodb.net/?retryWrites=true&w=majority');
const server = http.createServer(app);

export const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

mongoose.connect(db)
  .then(() => {
    console.log('DB Start');
  });

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use('/uploads', express.static('uploads'));
app.use('/uploadsFile', express.static('uploadsFile'));

app.use(BlogRouter);
app.use(UserRouter);
app.use(CalculatorRouter);
app.use(TableRouter);

app.post('/create-ru-text', TranslationsRuController.createText);
app.get('/get-ru-text', TranslationsRuController.getText);

app.post('/create-ua-text', TranslationsUaController.createText);
app.get('/get-ua-text', TranslationsUaController.getText);

app.get('/get-currency', CurrenyController.getCurrency);
app.patch('/create-default-currency', CurrenyController.createDefaultCurrency);
app.patch('/update-currency', CurrenyController.createAdminCurrency);

setInterval(() => {
  const currentTime = Date.now();
  if (currentTime >= startTime && currentTime <= endTime) {
    CurrenyController.createDefaultCurrency();
  }
}, 1800000);

setInterval(() => {
  TableController.checkedLongTimeFile();
}, 86400000);

setTimeout(() => {
  CurrenyController.createDefaultCurrency();
},1000)

const runFunc = async () => {
  try {
    await client.connect();
    const database = client.db('test');

    const tables = database.collection('tables');

    const changeStream = tables.watch();

    const activeConnections = new Set();

    io.on("connection", (socket) => {
      console.log("a user connected");
      socket.on("Room: Join", (data) => {
        activeConnections.add(socket);
      });
      socket.on("disconnect", () => {
        console.log("user disconnected");
        activeConnections.delete(socket);
      });
    });

    changeStream.on("change", async (next) => {
      switch (next.operationType) {
        case "insert":
          const { user } = next.fullDocument;
          io.emit('new table', {user: user});
          break;
        case "update":
          const { _id } = next.documentKey;
          const finalObject = next.updateDescription.updatedFields;
          let songStatus = false
          const updatedDocument = await Table.findById(_id);

          for (const key in finalObject) {
            if (finalObject.hasOwnProperty(key)) {
              const value = finalObject[key];
              if(key == 'status.currentStatus') {
                if(value == 'delete') {
                  songStatus = true;
                }
              }
            }
          }

          io.emit("update table", {user: updatedDocument.user, status: songStatus});
          
          break;
      }
    });

  } catch (error) {
    console.error('Error occurred:', error);
    await client.close();
  }
}

runFunc().catch(console.dir);

server.listen(process.env.PORT, () => {
  console.log('server start', process.env.PORT);
});
