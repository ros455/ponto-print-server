import { Router } from "express";
import * as CalculatorController from '../controllers/CalculatorController.js';
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

const uploadImage = multer({storage})

router.post('/create-calc',CalculatorController.createCalculator);
router.get('/get-all-calc',CalculatorController.getAll);
router.get('/get-info-table',CalculatorController.getInfoTableData);
router.patch('/update-eyelets-size-price',CalculatorController.updateEyeletsSizePrice);
router.patch('/update-stretch-on-the-stretcher',CalculatorController.updateStretchOnTheStretcher);
router.patch('/update-stretch-on-the-stretcher-min',CalculatorController.updateStretchOnTheStretcherMin);
router.patch('/update-eyelets-price',CalculatorController.updateEyeletsPrice);
router.patch('/update-mounting',CalculatorController.updateGoodsMounting);
router.patch('/update-stamp',CalculatorController.updateGoodsStamp);
router.patch('/update-quality',CalculatorController.updateGoodsQuality);
router.patch('/update-cutting',CalculatorController.updateGoodsCutting);
router.patch('/update-soldering-of-gates',CalculatorController.updateGoodsSolderingOfGates);
router.patch('/update-soldering-pockets',CalculatorController.updateGoodsSolderingPockets);
router.patch('/update-lamination',CalculatorController.updateGoodsLamination);
router.patch('/update-color',CalculatorController.updateGoodsColor);
router.patch('/update-color-image',uploadImage.single('imageColor'),CalculatorController.updateGoodsColorImage);
router.patch('/update-poster',CalculatorController.updateGoodsPoster);
router.patch('/update-material',CalculatorController.updateMaterialPrice);
router.patch('/update-lamination-many',CalculatorController.updateLaminationMany);

export default router;