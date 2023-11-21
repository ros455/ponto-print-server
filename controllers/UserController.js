import UserModel from '../models/User.js';
import moment from 'moment';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';
import validator from 'validator';

const JWT_SECRET = 'secret';

export const register = async (req, res) => {
    const { email, name, password } = req.body;

    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const user = await UserModel.create({
            email,
            name,
            address: [],
            isAdmin: false,
            balance: 0,
            discount: false,
            discountValue: 0,
            loggedIn: true,
            disabled: false,
            password: hash,
        });

        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '30d' });

        const { password: hashedPassword, ...userData } = user.toObject();

        let transporter = nodemailer.createTransport({
            host: 'smtp.ukr.net',
            port: 2525,
            secure: true,
            auth: {
              user: 'ponto-print@ukr.net',
              pass: 'Lm5ReeugyRBHUzcg'
              // pass: 'yFs1TF9IcF897CtW'
            }
          });

          // let mailOptions = {
          //   from: 'ponto-print@ukr.net', // електронна адреса, з якої відправляється лист
          //   to: email, // електронна адреса отримувача
          //   subject: 'Рєстрація пройшла успішно', // тема листа
          //   text: `Ласкаво просимо до ponto-print. Ваш логін: ${name}; Ваш пароль: ${password}`,
          //   html: 
          //   `
          //   <div>
          //   <h3>Наша адресса:</h3>
          //   <a href='http://ponto-print.com.ua'>http://ponto-print.com.ua</a>
          //   </div>
          //   `
          // };
          let mailOptions = {
            from: 'ponto-print@ukr.net', // електронна адреса, з якої відправляється лист
            to: email, // електронна адреса отримувача
            subject: 'Рєстрація пройшла успішно', // тема листа
            html: 
            `
            <div>
            <h3>Наша адресса:</h3>
            <p>Ласкаво просимо до ponto-print. Ваш логін: ${name}; Ваш пароль: ${password}</p>
            <a href='http://ponto-print.com.ua'>http://ponto-print.com.ua</a>
            </div>
            `
          };

          if(validator.isEmail(email)) {
            transporter.sendMail(mailOptions, function(error, info){
              if (error) {
                console.log(error);
              } else {
                console.log('Email sent: ' + info.response);
              }
            });
          }
        
        res.json({ ...userData, token });

    } catch (error) {
        console.error('Помилка реєстрації користувача:', error);
        res.status(500).json({ message: 'Не вдалося зареєструвати користувача' });
    }
};

export const login = async (req, res) => {
    try {
        const user = await UserModel.findOne({name: req.body.name});
        console.log('req.body.name',req.body.name);
        console.log('WORK');
        if(!user) {
          console.log('uSER');
            return res.status(404).json({
                message: 'User not found',
            })
        }

        if(user.disabled) {
          console.log('disabled',user.disabled);
          return res.status(404).json({
              message: 'User disabled',
          })
      }

        const isValidPass = await bcrypt.compare(req.body.password, user._doc.password);

        if(!isValidPass) {
          console.log('PASSWORD');
            return res.status(400).json({
                message: 'Password not found',
            })
        }

        // const token = jwt.sign(
        //     {id: user._id},
        //     JWT_SECRET,
        //     {expiresIn: '30d'}
        // )

        const token = jwt.sign(
          { id: user._id, loggedIn: true },
          JWT_SECRET,
          { expiresIn: '30d' }
        );

        const {passwordDoc, ...userData} = user._doc

        user.loggedIn = true;
        await user.save();

        res.json({...userData, token})
    } catch(e) {
        console.log(e);
    }
}

export const updateBalance = async (req, res) => {
  try {
      const { value, userId, action, historyValue } = req.body;

      const user = await UserModel.findById(userId);

      if (!user) {
          return res.status(404).json({ error: 'Користувач не знайдений' });
      }

      const date = moment().utcOffset(3).format('YYYY-MM-DD HH:mm:ss');

      const newBalanceHistory = [...user.balanceHistory, {
          historyValue,
          date,
          action
      }];

      const data = await UserModel.updateOne(
          { _id: userId },
          {
              balance: value,
              balanceHistory: newBalanceHistory
          }
      );

      res.json(data);
  } catch (e) {
      console.log(e);
      res.status(500).json({ error: 'Виникла помилка сервера' });
  }
}


export const updateDiscount = async (req, res) => {
    try{
      const {value, userId} = req.body;

      const newValeue = value / 100;
      console.log('newValeue',newValeue);

      const data = await UserModel.updateOne(
          {_id: userId},
          {
            discountValue: newValeue,
          }
      )

      res.json(data);
  } catch(e) {
      console.log(e);
  }
}

export const updateName = async (req, res) => {
  try{
    const {value, userId} = req.body;

    console.log('WOrk');

    const data = await UserModel.updateOne(
        {_id: userId},
        {
          name: value,
        }
    )

    res.json(data);
} catch(e) {
    console.log(e);
}
}

export const updateDisabledStatus = async (req, res) => {
  try{
    const {value, userId} = req.body;

    console.log('WOrk');

    const data = await UserModel.updateOne(
        {_id: userId},
        {
          disabled: value,
        }
    )

    res.json(data);
} catch(e) {
    console.log(e);
}
}

export const removeUser = async (req, res) => {
    try {
    //   const postId = req.params.postId;
      const postId = '6464c5715f682572bbec8404';
      await UserModel.findByIdAndDelete(postId);
  
      res.json('Користувача видалено');
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Помилка видалення поста' });
    }
  };

export const getAll = async (req, res) => {
  try {
    const allData = await UserModel.find().populate('orders');
    console.log('allData',allData);
    res.json(allData);
  } catch (error) {
    console.log(error);
  }
}

export const getAllPagination = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const skip = parseInt(page - 1) * parseInt(limit); // Переконайтеся, що ці значення є числами

    const query = {
      isAdmin: { $ne: true }
    };

    // Використання агрегаційного пайплайну для сортування без урахування регістру
    let allData = await UserModel.aggregate([
      { $match: query },
      { $addFields: { nameLower: { $toLower: "$name" } } },
      { $sort: { nameLower: 1 } },
      { $skip: skip },
      { $limit: parseInt(limit) },
      { $lookup: { from: 'orders', localField: 'orders', foreignField: '_id', as: 'orders' } }
    ]);

    // Відправка відсортованих даних
    res.json(allData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Помилка сервера' });
  }
}

export const getMe = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId).populate('orders');

    if (!user) {
      return res.status(404).json({
        message: 'User not found'
      });
    }

    const { password, ...userData } = user._doc;
    res.json(userData);
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: 'Access denied'
    });
  }
}

export const updatePassword = async (req, res) => {
  const { userId, newPassword } = req.body;

  try {
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(newPassword, salt);

    user.password = hash;
    user.loggedIn = false;
    await user.save();

    res.json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error('Помилка зміни пароля користувача:', error);
    res.status(500).json({ message: 'Не вдалося змінити пароль користувача' });
  }
};

// export const updateUserAddress = async (req, res) => {
//   try {
//       const { userId, newValue} = req.body;
//       console.log('userId',userId);
//       console.log('newValue',newValue);

//       const data = await UserModel.updateOne(
//           {_id: userId},
//           {
//               address: newValue,
//           }
//       )
  
//       res.json(data);

//   } catch (e) {
//       console.log(e);
//       res.status(500).json({
//           message: "Error updating address"
//       });
//   }
// }


export const addAddressToUser = async (req,res) => {
  try {
    const { userId, newValue} = req.body;
    // Знайдіть користувача за його ідентифікатором (userId)
    const user = await UserModel.findById(userId);

    if (!user) {
      throw new Error("Користувача не знайдено");
    }

    // Додайте нову адресу до масиву address
    user.address.push(newValue);

    // Збережіть зміни
    await user.save();

    return user;
  } catch (error) {
    throw new Error("Помилка при додаванні адреси до користувача: " + error.message);
  }
}

export const removeAddressFromUser = async (req, res) => {
  try {
    const { userId, addressIndex } = req.body;
    // Знайдіть користувача за його ідентифікатором (userId)
    const user = await UserModel.findById(userId);

    if (!user) {
      throw new Error("Користувача не знайдено");
    }

    // Знайдіть індекс адреси, яку потрібно видалити

    if (addressIndex === -1) {
      throw new Error("Адресу не знайдено");
    }

    // Видаліть адресу з масиву address за індексом addressIndex
    user.address.splice(addressIndex, 1);

    // Збережіть зміни
    await user.save();

    return user;
  } catch (error) {
    throw new Error("Помилка при видаленні адреси з користувача: " + error.message);
  }
};