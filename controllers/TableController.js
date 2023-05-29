import TableModel from '../models/Table.js';
import UserModel from "../models/User.js";
import moment from 'moment';

export const createTable = async (req, res) => {
    try {
        const { file, fileName, material, quality, width, height, count, sum, conditions, status, notes, address } = req.body;

        const userId = req.user._id;
        const user = await UserModel.findById(userId);

        const lastTable = await TableModel.findOne({}, {}, { sort: { id: -1 } });
        const id = (lastTable && lastTable.id) ? lastTable.id + 1 : 1;

        const date = moment().utcOffset(3).format('YYYY-MM-DD HH:mm:ss');

        const data = await TableModel.create({
            id,
            file,
            fileName,
            material,
            quality,
            width,
            height,
            count,
            sum,
            conditions,
            status,
            date,
            user,
            notes,
            address
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

export const updateStatus = async (req, res) => {
  try {
      const { tableId, value, name, paid } = req.body;

      const table = await TableModel.findById(tableId);
      if (!table) {
          return res.status(404).json({
              message: 'Table not found'
          });
      }

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

  export const getAllTables = async (req, res) => {
    try{
    const tables = await TableModel.find().populate('user');
    
        res.json(tables)
      } catch(e) {
        console.log(e);
      }
  }