import { Router } from "express";
import multer from 'multer';
import fs from "fs"

import * as TableController from '../controllers/TableController.js';

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
router.post('/create-table',uploadFile.single('file'),TableController.createTable);
router.get('/get-all-table',TableController.getAllTables);
router.patch('/update-status',TableController.updateStatus);
router.patch('/update-user-table-status',TableController.updateUserStatus);
router.patch('/update-table-sum',TableController.updateTableSum);
router.get('/download',TableController.downloadFile);
router.get('/download-program',TableController.downloadProgram);
router.get('/get-tables-sort-by-user',TableController.sortByUserName);
router.get('/get-tables-sort-by-status',TableController.sortByStatus);
router.get('/get-tables-sort-by-date',TableController.sortByDate);
router.delete('/delete-all-tables',TableController.deleteCollection);

export default router;