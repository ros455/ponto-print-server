// import CalculatorModel from '../models/Calculator.js';

// export const getAll = async (req,res) => {
//     try{
//         const allData = await CalculatorModel.find();

//         res.json(allData)
//     } catch (error) {
//         console.log(error);
//     }
// }


// export const createCalculator = async (req, res) => {
//     try{
//         const { name, price, eyeletsSizePrice, eyelets, mounting, stamp, stretchOnTheStretcher, goods } = req.body;

//         const data = await CalculatorModel.create({
//             name,
//             price,
//             eyeletsSizePrice,
//             eyelets,
//             mounting,
//             stamp,
//             stretchOnTheStretcher,
//             goods

//         });

//         res.json(data);
//     } catch(e) {
//         console.log(e);
//     }
//   }