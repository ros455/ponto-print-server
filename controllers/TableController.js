import TableModel from '../models/Table.js';
import UserModel from "../models/User.js";
// import moment from 'moment';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import moment from "moment-timezone";

export const createTable = async (req, res) => {
    try {
        const { file, material, quality, width, height, count, sum, conditions, status, notes, address, userId, color } = req.body;

        const newStatus = JSON.parse(status);
        const newConditions = JSON.parse(conditions);

        const user = await UserModel.findById(userId);

        const lastTable = await TableModel.findOne({}, {}, { sort: { id: -1 } });
        const id = (lastTable && lastTable.id) ? lastTable.id + 1 : 1;

        // const date = moment().utcOffset(3).format('YYYY-MM-DD HH:mm:ss');

        let materialname = '';
        
        switch(material) {
            case 'Банер 440 гр. Ламінований':
            case 'Баннер 440 гр. Ламинированный':
                materialname = 'Банер'
                break;
            case 'Банер 510 гр. литий':
            case 'Баннер 510 гр. литой':
                materialname = 'Литой'
                break;
            case 'Просвітний банер 440 гр.':
            case 'Просветный баннер 440 гр.':
                materialname = 'Просветный'
                break;
            case 'Сітка банерна 380 гр.':
            case 'Сетка баннерная 380 гр.':
                materialname = 'Сетка'
                break;
            case 'Глянцева плівка':
            case 'Глянцевая пленка':
                materialname = 'Глянцевая'
                break;
            case 'Матова плівка':
            case 'Матовая пленка':
                materialname = 'Матовая'
                break;
            case 'Прозора глянцева плівка':
            case 'Прозрачная глянцевая пленка':
                materialname = 'Прозрачная глянец'
                break;
            case 'Прозора матова плівка':
            case 'Прозрачная матовая пленка':
                materialname = 'Прозрачная мат'
                break;
            case 'Перфорована плівка':
            case 'Перфорированная пленка':
                materialname = 'Перфа'
                break;
            case 'Самоклеюча плівка з чорним клейовим шаром':
            case 'Самоклеющаяся пленка с черным клеевым слоем':
                materialname = 'Блокпленка'
                break;
            case 'Кольорова плівка серії Oracal 641':
            case 'Цветная пленка серии Oracal 641':
                materialname = ''
                break;
            case 'Папір сіті 150 гр.':
            case 'Бумага сити 150 гр.':
                materialname = 'Сити'
                break;
            case 'Папір блюбек 115 гр.':
            case 'Бумага блюбэк 115 гр.':
                materialname = 'Блюбек'
                break;
            case 'Давальницький матеріал':
            case 'Давальческий материал':
                materialname = 'Давальческий'
                break;
            case 'Холст':
                materialname = 'Холст'
                break;
            case 'Світлопропускний пластик':
            case 'Светопропускной пластик':
                materialname = 'Пластик'
                break;
          }

        const newFileName = `${id}_${user.name}_${materialname}_${quality ? quality : color}_${width}x${height}mm_${count}шт${newConditions?.lamination?.name && '_Ламинация_ ' + newConditions.lamination.name}
        ${newConditions?.cutting?.name && '_Порезка_ ' + newConditions.cutting.name }${newConditions?.eyelets?.name && '_Люверсы_ ' + newConditions.eyelets.name} 
        ${newConditions?.mounting?.name && '_Монтирование_ ' + newConditions.mounting.name}${newConditions?.poster?.name && '_Постер_ ' + newConditions.poster.name}
        ${newConditions?.solderGates?.name && '_Пропайка-подворотов_ ' + newConditions.solderGates.name}${newConditions?.solderPockets?.name && '_Пропайка-карманов_ ' + newConditions.solderPockets.name}
        ${newConditions?.stamp?.name && '_Штамп_ ' + newConditions.stamp.name}${newConditions?.stretch?.name && '_Натяжка-на-подрамник_ ' + newConditions.stretch.name}${newConditions?.bilateral?.name && '_Двусторонний '}`.trim()
        const fileExtension = req.file.originalname.split('.').pop();

        const invalidCharacters = /[<>:"\\/|?*.]/g;
        const cleanedStr = newFileName.replace(/\s/g, "").replace(invalidCharacters, "");
        
        // Склеювання тексту без пробілів
        const gluedStr = cleanedStr.split(" ").join("");

        const originalFilename = Buffer.from(req.file.originalname, 'binary').toString('utf8');
        
        const kyivTime = moment().tz("Europe/Kiev");
        const formattedDateTime = kyivTime.format("DD.MM.YYYY HH:mm:ss");

        const data = await TableModel.create({
            id,
            file: `/uploadsFile/${gluedStr}.${fileExtension}`,
            fileName: newFileName,
            originalFileName: originalFilename,
            material,
            quality,
            width,
            height,
            count,
            sum,
            conditions: newConditions,
            status: newStatus,
            date: formattedDateTime,
            user,
            notes,
            address,
            descriptionDelete: ''
        });

      user.orders.push(data._id); // Додайте ідентифікатор замовлення до масиву `orders`
      await user.save(); // Збережіть оновлену модель користувача
      
      fs.rename(`./uploadsFile/${req.file.originalname}`, `./uploadsFile/${cleanedStr}.${fileExtension}`, (err) => {
        if (err) throw err; // не удалось переименовать файл
        console.log("Файл успешно переименован");
      });

        res.json(data);
    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: "Error creating table"
        });
    }
}

export const downloadFile = async (req, res) => {
  try {
    const id = req.query.id;
    const table = await TableModel.findById(id);

    const __filename = fileURLToPath(import.meta.url);

    const __dirname = dirname(__filename);


    const filePath = path.join(__dirname, "..", table.file); // Отримайте шлях до файлу

    console.log('filePath',filePath);

    if (filePath) {
      return res.download(filePath);
    }
    return res.status(400).json({ message: "Dowload error" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Upload error" });
  }
};

export const updateStatus = async (req, res) => {
  try {
      const { tableId, value, name, paid, descriptionDelete } = req.body;
      console.log('update table status');

      const table = await TableModel.findById(tableId);
      if (!table) {
          return res.status(404).json({
              message: 'Table not found'
          });
      }
      table.descriptionDelete = descriptionDelete ? descriptionDelete : '';
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

      const table = await TableModel.findById(tableId);

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
    try {
      const { page, limit } = req.query;
      const skip = (page - 1) * limit;
      const tables = await TableModel.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate("user");

      res.json(tables);
    } catch (e) {
      console.log(e);
    }
  };

  export const checkedLongTimeFile = async (req, res) => {
    try {
        const currentDate = new Date(); // Поточна дата

        const tables = await TableModel.find().select('createdAt file');
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

export const updateTableSum = async (req, res) => {
    try {
        const { tableId, newValue} = req.body;
        console.log('tableId',tableId);
        console.log('newValue',newValue);

        const data = await TableModel.updateOne(
            {_id: tableId},
            {
                sum: newValue,
            }
        )
    
        res.json(data);

    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: "Error updating sum"
        });
    }
  }


  export const downloadProgram = async (req, res) => {
    try {
      const localPathFile = '/download-program/TiffInfo.rar';
      const __filename = fileURLToPath(import.meta.url);
      const __dirname = dirname(__filename);
      console.log('__dirname',__dirname);
  
      const filePath = path.join(__dirname, "..", localPathFile); // Отримайте шлях до файлу
  
      console.log('filePath',filePath);
  
      if (filePath) {
        return res.download(filePath);
      }
      return res.status(400).json({ message: "Dowload error" });
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: "Upload error" });
    }
  };

  export const deleteCollection = async (req, res) => {
    console.log('work');
    try {
      await TableModel.deleteMany({}); // Видалити всі документи у колекції
      res.json({ message: 'Колекцію успішно видалено' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Помилка при видаленні колекції' });
    }
  };

  export const sortByUserName = async (req, res) => {
    try {
        const {name, page, limit} = req.query;
        const skip = (page - 1) * limit;
        const user = await UserModel.findOne({name});
        if(!user) {
            res.status(404).json({ error: 'Користувача не знайдено' });
            return;
        }
        const userId = user._id;

        const tables = await TableModel.find({user: userId})
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate("user");

        if(!tables) {
            res.status(404).json({ error: 'Таблиць не знайдено' });
        }

        res.json(tables);
    } catch(error) {
        console.log(error);
        res.status(404).json({ error: 'Користувача не знайдено' });
    }
  }

  export const sortByStatus = async (req, res) => {
    try {
        const {status, page, limit} = req.query;
        const skip = (page - 1) * limit;
        const tables = await TableModel.find({"status.name": status})
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate("user");

        if(!tables) {
            res.status(404).json({ error: 'Таблиць не знайдено' });
        }

        console.log('tables',tables);

        res.json(tables);
    } catch(error) {
        console.log(error);
        res.status(404).json({ error: 'Користувача не знайдено' });
    }
  }


export const sortByDate = async (req, res) => {
    try {
        const { date } = req.query;

        console.log('date', date);

        const tables = await TableModel.aggregate([
            {
                $addFields: {
                    // Форматування дати у рядок
                    formattedDate: {
                        $dateToString: { format: "%Y-%m-%d", date: { $dateFromString: { dateString: "$date" } } }
                    }
                }
            },
            {
                $match: {
                    formattedDate: date
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "user",
                    foreignField: "_id",
                    as: "user"
                }
            },
            {
                $unwind: {
                    path: "$user",
                    preserveNullAndEmptyArrays: true // Для випадків, коли у користувача немає запису
                }
            }
        ]);

        console.log('tables', tables);

        if (tables.length === 0) {
            return res.status(404).json({ error: 'Таблиць не знайдено' });
        }

        res.json(tables);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Помилка сервера' });
    }
};


export const getTablesForUser = async (req, res) => {
    try {
        console.log('getTablesForUser');
        const { page, limit, id } = req.query;
        const skip = (page - 1) * limit;
        const tables = await TableModel.find({user: id})
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)

        if (!tables) {
            return res.status(404).json({
                message: 'Table not found'
            });
        }

        console.log('tables',tables);

        res.json(tables);
  
    } catch(error) {
        console.log(error);
    }
}