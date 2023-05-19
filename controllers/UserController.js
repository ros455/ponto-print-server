// import UserModel from '../models/User.js';
// import jwt from 'jsonwebtoken';
// import bcrypt from 'bcrypt';
// import nodemailer from 'nodemailer';

// const JWT_SECRET = 'secret';

// export const register = async (req, res) => {
//     const { email, name, password } = req.body;

//     try {
//         const salt = await bcrypt.genSalt(10);
//         const hash = await bcrypt.hash(password, salt);

//         const user = await UserModel.create({
//             email,
//             name,
//             isAdmin: false,
//             balance: 0,
//             discount: false,
//             discountValue: 0,
//             password: hash,
//         });

//         const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '30d' });

//         const { password: hashedPassword, ...userData } = user.toObject();

//         let transporter = nodemailer.createTransport({
//             host: 'smtp.ukr.net',
//             port: 2525,
//             secure: true,
//             auth: {
//               user: 'ros_kichuk@ukr.net',
//               pass: 'yFs1TF9IcF897CtW'
//             }
//           });

//           let mailOptions = {
//             from: 'ros_kichuk@ukr.net', // електронна адреса, з якої відправляється лист
//             to: email, // електронна адреса отримувача
//             subject: 'Sucsesed registration', // тема листа
//             text: `Welcome to ponto-print. Your login: ${email}; Your password: ${password}` // текст листа
//           };

//           transporter.sendMail(mailOptions, function(error, info){
//             if (error) {
//               console.log(error);
//             } else {
//               console.log('Email sent: ' + info.response);
//             }
//           });
        
//         res.json({ ...userData, token });

//     } catch (error) {
//         console.error('Помилка реєстрації користувача:', error);
//         res.status(500).json({ message: 'Не вдалося зареєструвати користувача' });
//     }
// };

// export const login = async (req, res) => {
//     try {
//         const user = await UserModel.findOne({email: req.body.email});

//         if(!user) {
//             return res.status(404).json({
//                 message: 'User not found',
//             })
//         }

//         const isValidPass = await bcrypt.compare(req.body.password, user._doc.password);

//         if(!isValidPass) {
//             return res.status(400).json({
//                 message: 'Password not found',
//             })
//         }

//         const token = jwt.sign(
//             {id: user._id},
//             JWT_SECRET,
//             {expiresIn: '30d'}
//         )

//         const {passwordDoc, ...userData} = user._doc

//         res.json({...userData, token})
//     } catch(e) {
//         console.log(e);
//     }
// }

// export const updateBalance = async (req, res) => {
//     try {
//         const userId = '6464c5715f682572bbec8404';
//         const newBalance = 100;
//         const user = await UserModel.findById(userId); // Знаходимо користувача за його ідентифікатором
//         if (!user) {
//           // Якщо користувач не знайдений, повертаємо помилку або виконуємо необхідні дії
//           console.log("Користувач не знайдений");
//           return;
//         }
    
//         user.balance = newBalance; // Оновлюємо значення балансу
//         await user.save(); // Зберігаємо оновлений документ користувача
    
//         res.json("Баланс користувача оновлено")
//       } catch (error) {
//         // Обробка помилок при роботі з базою даних
//         console.error("Помилка оновлення балансу:", error);
//       }
// }

// export const updateDiscount = async (req, res) => {
//     try {
//         const userId = '6464c5715f682572bbec8404';
//         const newDiscount = 10;
//         const user = await UserModel.findById(userId); // Знаходимо користувача за його ідентифікатором
//         if (!user) {
//           // Якщо користувач не знайдений, повертаємо помилку або виконуємо необхідні дії
//           console.log("Користувач не знайдений");
//           return;
//         }
    
//         user.discountValue = newDiscount; // Оновлюємо значення балансу
//         await user.save(); // Зберігаємо оновлений документ користувача
    
//         res.json("Скидку користувача оновлено")
//       } catch (error) {
//         // Обробка помилок при роботі з базою даних
//         console.error("Помилка оновлення балансу:", error);
//       }
// }

// export const removeUser = async (req, res) => {
//     try {
//     //   const postId = req.params.postId;
//       const postId = '6464c5715f682572bbec8404';
//       await UserModel.findByIdAndDelete(postId);
  
//       res.json('Користувача видалено');
//     } catch (error) {
//       console.log(error);
//       res.status(500).json({ error: 'Помилка видалення поста' });
//     }
//   };