import TableModel from '../models/Table.js';

export const createTable = async (req, res) => {
    try{
        const { file, material, quality, width, count, sum, conditions, status } = req.body;

        const data = await TableModel.create({
            file: `/uploadsFile/${req.file.originalname}`,
            material,
            quality,
            width,
            count,
            sum,
            conditions,
            status
        });

        res.json(data);
    } catch(e) {
        console.log(e);
    }
  }