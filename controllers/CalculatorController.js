import CalculatorModel from '../models/Calculator.js';

export const getAll = async (req,res) => {
    try{
        const allData = await CalculatorModel.find();

        res.json(allData)
    } catch (error) {
        console.log(error);
    }
}


export const createCalculator = async (req, res) => {
    try{
        const { name, mounting, stamp, goods, } = req.body;

        const data = await CalculatorModel.create({
            name,
            mounting,
            stamp,
            goods
        });

        res.json(data);
    } catch(e) {
        console.log(e);
    }
  }

  export const updateEyeletsSizePrice = async (req,res) => {
    const {price} = req.body;
    try {
        const calculatorId = '6467638eafb3ddd2e9090eac';
        // Знайти об'єкт Calculator за ідентифікатором
        const calculator = await CalculatorModel.findById(calculatorId);
    
        if (!calculator) {
          // Об'єкт не знайдено, можна викинути помилку або обробити відповідним чином
          throw new Error('Calculator not found');
        }
    
        // Оновити поле eyeletsSizePrice
        calculator.eyeletsSizePrice = 70;
    
        // Зберегти зміни в базі даних
        await calculator.save();

        res.json(calculator)
    
      } catch (error) {
        console.error('Error updating eyeletsSizePrice:', error);
      }
  }

  export const updateStretchOnTheStretcher = async (req,res) => {
    const {price, mainId, goodsIndex, currentItemIndex} = req.body;
    try {
        const calculatorId = '6467a2e6185edade347871be';
        // Знайти об'єкт Calculator за ідентифікатором
        const calculator = await CalculatorModel.findById(mainId);
    
        if (!calculator) {
          // Об'єкт не знайдено, можна викинути помилку або обробити відповідним чином
          throw new Error('Calculator not found');
        }
    
        // Оновити поле eyeletsSizePrice
        calculator.goods[goodsIndex].stretchOnTheStretcher = price;
    
        // Зберегти зміни в базі даних
        await calculator.save();

        res.json(calculator)
    
        console.log('eyeletsSizePrice updated successfully');
      } catch (error) {
        console.error('Error updating eyeletsSizePrice:', error);
      }
  }

  export const updateEyeletsPrice = async (req,res) => {
    try {
      const {price, mainId, goodsIndex, currentItemIndex} = req.body;
      const calculatorId = '646a16847e3d4300561d3c58';
      // Знайти об'єкт Calculator за ідентифікатором
      const calculator = await CalculatorModel.findById(mainId);
  
      if (!calculator) {
        // Об'єкт не знайдено, можна викинути помилку або обробити відповідним чином
        throw new Error('Calculator not found');
      }
  
      // Оновити поле price в масиві eyelets
      calculator.goods[goodsIndex].eyelets[currentItemIndex].price = price;
  
      // Зберегти зміни в базі даних
      await calculator.save();

      res.json(calculator);
  
      console.log('Eyelets price updated successfully');
    } catch (error) {
      console.error('Error updating eyelets price:', error);
    }
  }

  export const updateGoodsMounting = async (req,res) => {
    try {
        const {price, mainId, goodsIndex, currentItemIndex} = req.body;
        const calculatorId = '6467b9ed87567f5d7cb848f1';
        // Знайти об'єкт Calculator за ідентифікатором
        const calculator = await CalculatorModel.findById(mainId);
    
        if (!calculator) {
          // Об'єкт не знайдено, можна викинути помилку або обробити відповідним чином
          throw new Error('Calculator not found');
        }
    
        // Оновити поле mounting в масиві goods
        calculator.goods[goodsIndex].mounting = price;
    
        // Зберегти зміни в базі даних
        await calculator.save();

        res.json(calculator);
    
        console.log('Goods mounting updated successfully');
      } catch (error) {
        console.error('Error updating goods mounting:', error);
      }
  }

  export const updateGoodsStamp = async (req,res) => {
    try {
        const {price, mainId, goodsIndex, currentItemIndex} = req.body;
        const calculatorId = '6467b9ed87567f5d7cb848f1';
        // Знайти об'єкт Calculator за ідентифікатором
        const calculator = await CalculatorModel.findById(mainId);
    
        if (!calculator) {
          // Об'єкт не знайдено, можна викинути помилку або обробити відповідним чином
          throw new Error('Calculator not found');
        }
    
        // Оновити поле mounting в масиві goods
        calculator.goods[goodsIndex].stamp = price;
    
        // Зберегти зміни в базі даних
        await calculator.save();

        res.json(calculator);
    
        console.log('Goods mounting updated successfully');
      } catch (error) {
        console.error('Error updating goods mounting:', error);
      }
  }

  export const updateGoodsQuality = async (req,res) => {
    try {
        const {price, mainId, goodsIndex, currentItemIndex} = req.body;
        console.log('currentItemIndex',currentItemIndex);
        const calculatorId = '6467638eafb3ddd2e9090eac';
        // Знайти об'єкт Calculator за ідентифікатором
        const calculator = await CalculatorModel.findById(mainId);
    
        if (!calculator) {
          // Об'єкт не знайдено, можна викинути помилку або обробити відповідним чином
          throw new Error('Calculator not found');
        }
    
        // Оновити поле mounting в масиві goods
        calculator.goods[goodsIndex].quality[currentItemIndex].price = price;
    
        // Зберегти зміни в базі даних
        await calculator.save();

        res.json(calculator);
    
        console.log('Goods mounting updated successfully');
      } catch (error) {
        console.error('Error updating goods mounting:', error);
      }
  }

  export const updateGoodsCutting = async (req,res) => {
    try {
        const {price, mainId, goodsIndex, currentItemIndex} = req.body;
        const calculatorId = '6467638eafb3ddd2e9090eac';
        // Знайти об'єкт Calculator за ідентифікатором
        const calculator = await CalculatorModel.findById(mainId);
    
        if (!calculator) {
          // Об'єкт не знайдено, можна викинути помилку або обробити відповідним чином
          throw new Error('Calculator not found');
        }
    
        // Оновити поле mounting в масиві goods
        calculator.goods[goodsIndex].cutting[currentItemIndex].price = price;
    
        // Зберегти зміни в базі даних
        await calculator.save();

        res.json(calculator);
    
        console.log('Goods mounting updated successfully');
      } catch (error) {
        console.error('Error updating goods mounting:', error);
      }
  }

  export const updateGoodsSolderingOfGates = async (req,res) => {
    try {
        const {price, mainId, goodsIndex, currentItemIndex} = req.body;
        const calculatorId = '6467638eafb3ddd2e9090eac';
        // Знайти об'єкт Calculator за ідентифікатором
        const calculator = await CalculatorModel.findById(mainId);
    
        if (!calculator) {
          // Об'єкт не знайдено, можна викинути помилку або обробити відповідним чином
          throw new Error('Calculator not found');
        }
    
        // Оновити поле mounting в масиві goods
        calculator.goods[goodsIndex].solderingOfGates[currentItemIndex].price = price;
    
        // Зберегти зміни в базі даних
        await calculator.save();

        res.json(calculator);
    
        console.log('Goods mounting updated successfully');
      } catch (error) {
        console.error('Error updating goods mounting:', error);
      }
  }

  export const updateGoodsSolderingPockets = async (req,res) => {
    try {
        const {price, mainId, goodsIndex, currentItemIndex} = req.body;
        const calculatorId = '6467638eafb3ddd2e9090eac';
        // Знайти об'єкт Calculator за ідентифікатором
        const calculator = await CalculatorModel.findById(mainId);
    
        if (!calculator) {
          // Об'єкт не знайдено, можна викинути помилку або обробити відповідним чином
          throw new Error('Calculator not found');
        }
    
        // Оновити поле mounting в масиві goods
        calculator.goods[goodsIndex].solderingPockets[currentItemIndex].price = price;
    
        // Зберегти зміни в базі даних
        await calculator.save();

        res.json(calculator);
    
        console.log('Goods mounting updated successfully');
      } catch (error) {
        console.error('Error updating goods mounting:', error);
      }
  }

  export const updateGoodsLamination = async (req,res) => {
    try {
        const {price, mainId, goodsIndex, currentItemIndex} = req.body;
        const calculatorId = '64677e4fdbfee1e0f19d0dca';
        // Знайти об'єкт Calculator за ідентифікатором
        const calculator = await CalculatorModel.findById(mainId);
    
        if (!calculator) {
          // Об'єкт не знайдено, можна викинути помилку або обробити відповідним чином
          throw new Error('Calculator not found');
        }
    
        // Оновити поле mounting в масиві goods
        calculator.goods[goodsIndex].lamination[currentItemIndex].price = price;
    
        // Зберегти зміни в базі даних
        await calculator.save();

        res.json(calculator);
    
        console.log('Goods mounting updated successfully');
      } catch (error) {
        console.error('Error updating goods mounting:', error);
      }
  }

  export const updateGoodsColor= async (req,res) => {
    try {
        const {price, mainId, goodsIndex, currentItemIndex} = req.body;
        const calculatorId = '6467b9ed87567f5d7cb848f1';
        // Знайти об'єкт Calculator за ідентифікатором
        const calculator = await CalculatorModel.findById(mainId);
    
        if (!calculator) {
          // Об'єкт не знайдено, можна викинути помилку або обробити відповідним чином
          throw new Error('Calculator not found');
        }
    
        // Оновити поле mounting в масиві goods
        calculator.goods[goodsIndex].color[currentItemIndex].price = price;
    
        // Зберегти зміни в базі даних
        await calculator.save();

        res.json(calculator);
    
        console.log('Goods mounting updated successfully');
      } catch (error) {
        console.error('Error updating goods mounting:', error);
      }
  }

  export const updateGoodsColorImage = async (req,res) => {
    try {
        const calculatorId = '64690844bf642515b215f7d6';
        // Знайти об'єкт Calculator за ідентифікатором
        const calculator = await CalculatorModel.findById(calculatorId);
    
        if (!calculator) {
          // Об'єкт не знайдено, можна викинути помилку або обробити відповідним чином
          throw new Error('Calculator not found');
        }
    
        // Оновити поле mounting в масиві goods
        calculator.goods[5].color[0].imageColor = `/uploads/${req.file.originalname}`;
    
        // Зберегти зміни в базі даних
        await calculator.save();

        res.json(calculator);
    
        console.log('Goods mounting updated successfully');
      } catch (error) {
        console.error('Error updating goods mounting:', error);
      }
  }

  export const updateGoodsPoster= async (req,res) => {
    try {
        const {price, mainId, goodsIndex, currentItemIndex} = req.body;
        const calculatorId = '64677e4fdbfee1e0f19d0dca';
        // Знайти об'єкт Calculator за ідентифікатором
        const calculator = await CalculatorModel.findById(mainId);
    
        if (!calculator) {
          // Об'єкт не знайдено, можна викинути помилку або обробити відповідним чином
          throw new Error('Calculator not found');
        }
    
        // Оновити поле mounting в масиві goods
        calculator.goods[goodsIndex].poster[currentItemIndex].price = price;
    
        // Зберегти зміни в базі даних
        await calculator.save();

        res.json(calculator);
    
        console.log('Goods mounting updated successfully');
      } catch (error) {
        console.error('Error updating goods mounting:', error);
      }
  }