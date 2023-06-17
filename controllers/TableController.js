import TableModel from '../models/Table.js';
import UserModel from "../models/User.js";
import moment from 'moment';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import Table from '../models/Table.js';

export const createTable = async (req, res) => {
    try {
        const { file, material, quality, width, height, count, sum, conditions, status, notes, address, userId } = req.body;

        const newStatus = JSON.parse(status);
        const newConditions = JSON.parse(conditions);
        console.log('newStatus',newStatus);

        // const userId = req.user._id;
        const user = await UserModel.findById(userId);

        const lastTable = await TableModel.findOne({}, {}, { sort: { id: -1 } });
        const id = (lastTable && lastTable.id) ? lastTable.id + 1 : 1;

        const date = moment().utcOffset(3).format('YYYY-MM-DD HH:mm:ss');

        const data = await TableModel.create({
            id,
            file: `/uploadsFile/${req.file.originalname}`,
            fileName: `${id}_${user.name}_${material}_${quality}_${width}_${height}_${count}${newConditions?.lamination?.name && '_' + newConditions.lamination.name}
            ${newConditions?.cutting?.name && '_' + newConditions.cutting.name }${newConditions?.eyelets?.name && '_' + newConditions.eyelets.name} 
            ${newConditions?.mounting?.name && '_' + newConditions.mounting.name}${newConditions?.poster?.name && '_' + newConditions.poster.name}
            ${newConditions?.solderGates?.name && '_' + newConditions.solderGates.name}${newConditions?.solderPockets?.name && '_' + newConditions.solderPockets.name}
            ${newConditions?.stamp?.name && '_' + newConditions.stamp.name}${newConditions?.stretch?.name && '_' + newConditions.stretch.name}`,
            material,
            quality,
            width,
            height,
            count,
            sum,
            conditions: newConditions,
            status: newStatus,
            date,
            user,
            notes,
            address,
            descriptionDelete: ''
        });

      user.orders.push(data._id); // Додайте ідентифікатор замовлення до масиву `orders`
      await user.save(); // Збережіть оновлену модель користувача

        res.json(data);
    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: "Error creating table"
        });
    }
}

export const downloadFile = async (req,res) => {
    try {
    const id = req.query.id;
    const table = await TableModel.findById(id);

      const __filename = fileURLToPath(import.meta.url);
      const __dirname = dirname(__filename);
      const filePath = path.join(__dirname, '..', table.file); // Отримайте шлях до файлу
      console.log('filePath',filePath);
      console.log('__filename',__filename);
      console.log('table.file',table.file);

      if(filePath) {
        return res.download(filePath)
        // return res.attachment(table.file).sendFile(filePath);
      }
      return res.status(400).json({message: 'Dowload error'})
    } catch(e) {
        console.log(e);
        res.status(500).json({message: 'Upload error'})
    }
}

export const updateStatus = async (req, res) => {
  try {
      const { tableId, value, name, paid, descriptionDelete } = req.body;
      console.log('descriptionDelete',descriptionDelete);

      const table = await TableModel.findById(tableId);
      if (!table) {
          return res.status(404).json({
              message: 'Table not found'
          });
      }
      table.descriptionDelete = descriptionDelete;
      table.status.currentStatus = value;
      table.status.name = name;
      table.status.paid = paid;
      await table.save();

      res.json(table);
  } catch (e) {
      console.log(e);
      res.status(500).json({
          message: "Error updating current status"
      });
  }
}

export const updateUserStatus = async (req, res) => {
  try {
      const { tableId, value, name, } = req.body;

      console.log('tableId',tableId);
      console.log('value',value);
      console.log('name',name);

      const table = await TableModel.findById(tableId);
      console.log('table.status.currentStatus',table.status.currentStatus);
      if (!table) {
          return res.status(404).json({
              message: 'Table not found'
          });
      }

      if (table.status.currentStatus == 'download') {
        return res.status(404).json({
            message: 'Table status worked'
        });
    }

      table.status.currentStatus = value;
      table.status.name = name;
      await table.save();

      res.json(table);
  } catch (e) {
      console.log(e);
      res.status(500).json({
          message: "Error updating current status"
      });
  }
}

  export const getAllTables = async (req, res) => {
    try{
    const tables = await TableModel.find().populate('user');
    
        res.json(tables)
      } catch(e) {
        console.log(e);
      }
  }

  export const checkedLongTimeFile = async (req, res) => {
    try {
        const currentDate = new Date(); // Поточна дата

        const tables = await Table.find().select('createdAt file');
        tables.filter((el) => {
            const createdAt = el.createdAt; // Дата створення з MongoDB
            const file = el.file;
            const differenceInTime = currentDate.getTime() - createdAt.getTime(); // Різниця в мілісекундах
            const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24)); // Різниця в днях

            if(differenceInDays > 180) {
                const newFileName = file.slice(1);
                fs.unlink(newFileName, (err) => {
                    if (err) {
                    //   console.log(err);
                    }
                  });
            }
        });
    } catch (e) {
        console.log('Error', e);
    }
}