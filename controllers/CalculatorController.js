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
        const { nameUa, nameRu, mounting, stamp, goods, } = req.body;

        const data = await CalculatorModel.create({
            nameUa,
            nameRu,
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
  export const updateStretchOnTheStretcherMin = async (req,res) => {
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
        calculator.goods[goodsIndex].stretchOnTheStretcherMin = price;
    
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
      console.log('price',price);
      console.log('mainId',mainId);
      console.log('goodsIndex',goodsIndex);
      console.log('currentItemIndex',currentItemIndex);
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
        const calculatorId = '6479a247e7f201dccc99fb47';
        // Знайти об'єкт Calculator за ідентифікатором
        const calculator = await CalculatorModel.findById(calculatorId);
    
        if (!calculator) {
          // Об'єкт не знайдено, можна викинути помилку або обробити відповідним чином
          throw new Error('Calculator not found');
        }
    
        // Оновити поле mounting в масиві goods
        calculator.goods[5].color[1].imageColor = `/uploads/${req.file.originalname}`;
    
        // Зберегти зміни в базі даних
        await calculator.save();

        res.json(calculator);
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


  export const updateMaterialPrice = async (req,res) => {
    try {
      const {mainId, goodsIndex, value, сhoice} = req.body;
      console.log('work');
      const calculator = await CalculatorModel.findById(mainId);

      if (!calculator) {
        // Об'єкт не знайдено, можна викинути помилку або обробити відповідним чином
        throw new Error('Calculator not found');
      }

      if(сhoice == "small") calculator.goods[goodsIndex].prices.small = value;
      if(сhoice == "average") calculator.goods[goodsIndex].prices.average = value;
      if(сhoice == "many") calculator.goods[goodsIndex].prices.many = value;

      await calculator.save();

      res.json(calculator);
    } catch (error) {
      console.error('Error updating goods mounting:', error);
    }
  }

  export const updateLaminationMany = async (req,res) => {
    try {
      const {mainId, value, сhoice} = req.body;
      console.log('work');
      const calculator = await CalculatorModel.findById(mainId);

      if (!calculator) {
        // Об'єкт не знайдено, можна викинути помилку або обробити відповідним чином
        throw new Error('Calculator not found');
      }

      
      if(сhoice == "small") {
        console.log("small");
        calculator.goods[0].lamination[1].prices.small = value;
        calculator.goods[0].lamination[2].prices.small = value;
      }
      if(сhoice == "average") {
        console.log("average");
        calculator.goods[0].lamination[1].prices.average = value;
        calculator.goods[0].lamination[2].prices.average = value;
      }
      if(сhoice == "many") {
        console.log("many");
        calculator.goods[0].lamination[1].prices.many = value;
        calculator.goods[0].lamination[2].prices.many = value;
      }
      
      await calculator.save();

      console.log('calculator',calculator);
      console.log('mainId',mainId);
      console.log('value',value);
      console.log('сhoice',сhoice);

      res.json(calculator);
    } catch (error) {
      console.error('Error updating goods mounting:', error);
    }
  }

  export const getInfoTableData = async (req,res) => {
    try {
      console.log('work');
      const calculator = await CalculatorModel.find();

      const findData = calculator.find((item) => item.nameUa == "Цифровий лазерний друк");

      console.log('findData',findData);

      if (!findData) {
        // Об'єкт не знайдено, можна викинути помилку або обробити відповідним чином
        throw new Error('Calculator not found');
      }


      res.json(findData);
    } catch (error) {
      console.error('Error updating goods mounting:', error);
    }
  }