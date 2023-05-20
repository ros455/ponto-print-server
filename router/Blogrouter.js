import { Router } from "express";
import * as BlogController from '../controllers/BlogController.js';
import multer from 'multer';
import fs from "fs"

const router = new Router();

const storage = multer.diskStorage({
    destination: (_,__,cd) => {
        if(!fs.existsSync('uploads')) {
            fs.mkdirSync('uploads');
        }
        cd(null,'uploads')
    },
    filename: (_,file,cd) => {
        cd(null, file.originalname)
    },
})

const upload = multer({storage})

router.post('/create-post', upload.single('img'),BlogController.addNewPost);
router.patch('/update-post',upload.single('img'),BlogController.updatePost);
router.delete('/remove-post',BlogController.removePost);
router.get('/get-all-post',BlogController.getAll);

export default router;