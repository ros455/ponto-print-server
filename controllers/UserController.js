import UserModel from '../models/User.js';
// import BalanceHistoryModel from '../models/BalanceHistory.js';
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
            isAdmin: false,
            balance: 0,
            discount: false,
            discountValue: 0,
            password: hash,
        });

        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '30d' });

        const { password: hashedPassword, ...userData } = user.toObject();

        let transporter = nodemailer.createTransport({
            host: 'smtp.ukr.net',
            port: 2525,
            secure: true,
            auth: {
              user: 'ros_kichuk@ukr.net',
              pass: 'yFs1TF9IcF897CtW'
            }
          });

          let mailOptions = {
            from: 'ros_kichuk@ukr.net', // електронна адреса, з якої відправляється лист
            to: email, // електронна адреса отримувача
            subject: 'Sucsesed registration', // тема листа
            text: `Welcome to ponto-print. Your login: ${email}; Your password: ${password}` // текст листа
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
        const user = await UserModel.findOne({email: req.body.email});

        if(!user) {
            return res.status(404).json({
                message: 'User not found',
            })
        }

        const isValidPass = await bcrypt.compare(req.body.password, user._doc.password);

        if(!isValidPass) {
            return res.status(400).json({
                message: 'Password not found',
            })
        }

        const token = jwt.sign(
            {id: user._id},
            JWT_SECRET,
            {expiresIn: '30d'}
        )

        const {passwordDoc, ...userData} = user._doc

        res.json({...userData, token})
    } catch(e) {
        console.log(e);
    }
}

// export const updateBalance = async (req, res) => {
//     try{
//       const {value, userId, action, date, historyValue} = req.body;

//       console.log('value',value);
//       console.log('userId',userId);
//       console.log('action',action);
//       console.log('date',date);
//       console.log('historyValue',historyValue);

//       const data = await UserModel.updateOne(
//           {_id: userId},
//           {
//             balance: value,
//           }
//       )

//       res.json(data);
//   } catch(e) {
//       console.log(e);
//   }
// }

export const updateBalance = async (req, res) => {
  try {
      const { value, userId, action, date, historyValue } = req.body;

      console.log('value', value);
      console.log('userId', userId);
      console.log('action', action);
      console.log('date', date);
      console.log('historyValue', historyValue);

      const user = await UserModel.findById(userId);

      if (!user) {
          return res.status(404).json({ error: 'Користувач не знайдений' });
      }

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

      const data = await UserModel.updateOne(
          {_id: userId},
          {
            discountValue: value,
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

  export const getAll = async (req,res) => {
    try{
        const allData = await UserModel.find();

        res.json(allData)
    } catch (error) {
        console.log(error);
    }
}

export const getMe = async (req,res) => {
  try{
      const user = await UserModel.findById(req.userId);

      if(!user) {
          return res.status(404).json({
              messege: 'User not found'
          })
      }

      const {password, ...userData} = user._doc
      res.json(userData);
  } catch(e) {
      console.log(e)
      res.status(500).json({
          messege: "Not accsess"
      })
  }
}