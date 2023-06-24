import CurrencyModel from '../models/Currency.js';

export const getCurrency = async (req,res) => {
    try{
        const allData = await CurrencyModel.find();

        res.json(allData)
    } catch (error) {
        console.log(error);
    }
}

export const createDefaultCurrency = async (req, res) => {
    try {
      const valueResponse = await fetch('https://server-ponto-print.herokuapp.com/get-currency');
      const valueData = await valueResponse.json();
      const value = valueData[0]?.value;
  
      const currencyId = '646faf6bd812a1a42ea8129d';
  
      const response = await fetch('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5');
      const responseData = await response.json();
      const currencyData = responseData[1];
  
      const resoult = currencyData.sale * value;
  
      const data = await CurrencyModel.updateOne(
        { _id: currencyId },
        {
          currency: resoult.toFixed(2),
          banckCurrency: currencyData.sale
        }
      );
    } catch (e) {
      console.log(e);
    }
  };

  export const createAdminCurrency = async (req, res) => {
    try{
        const {value} = req.body;

        const currencyId = '646faf6bd812a1a42ea8129d';

        const response = await fetch('https://server-ponto-print.herokuapp.com/get-currency')
        .then((res) => res.json())
        .then((res) => res[0]?.banckCurrency)

        let resoult = await response * value;

        const data = await CurrencyModel.updateOne(
            {_id: currencyId},
            {
                currency: resoult.toFixed(2),
                value
            }
        )

        res.json(data);
    } catch(e) {
        console.log(e);
    }
  }

  export const sayHello = () => {
    console.log('hello World');
  }
