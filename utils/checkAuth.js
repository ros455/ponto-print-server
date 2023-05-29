// import jwt from 'jsonwebtoken';
// import dotenv from 'dotenv';
// import UserModel from '../models/User.js';

// dotenv.config();
// export default async (req,res,next) => {
//     const token = (req.headers.authorization || '').replace(/Bearer\s?/,'')

//     if(token) {
//         try{
//             const decoded = jwt.verify(token,process.env.key)

//             req.userId = decoded.id;
//             const user = await UserModel.findById(userId);
//             req.user = user;

//             next();
//         } catch(e) {

//             return res.status(403).json({
//                 messege: 'Not access'
//             })
//         }
//     } else {
//         return res.status(403).json({
//             messege: 'Not access'
//         })
//     }
// }

import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import UserModel from '../models/User.js';

dotenv.config();

export default async function (req, res, next) {
  const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.key);

      req.userId = decoded.id;
      const user = await UserModel.findById(req.userId);
      req.user = user;

      next();
    } catch (e) {
      return res.status(403).json({
        message: 'Access denied'
      });
    }
  } else {
    return res.status(403).json({
      message: 'Access denied'
    });
  }
}