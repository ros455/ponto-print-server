import { Router } from "express";
import multer from 'multer';
import fs from "fs"
import moment from 'moment';

import * as TableController from '../controllers/TableController.js';
import checkAuth from "../utils/checkAuth.js";

const fileStorage = multer.diskStorage({
    destination: (_,__,cd) => {
        if(!fs.existsSync('uploadsFile')) {
            fs.mkdirSync('uploadsFile');
        }
        cd(null,'uploadsFile')
    },
    filename: (_,file,cd) => {
        cd(null, file.originalname)
    },
})

const uploadFile = multer({ storage: fileStorage })

const router = new Router();

// router.post('/create-table',checkAuth,uploadFile.single('file'),TableController.createTable);
router.post('/create-table',checkAuth,TableController.createTable);
router.get('/get-all-table',TableController.getAllTables);
router.patch('/update-status',TableController.updateStatus);

export default router;