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
    try{
        const value = await fetch('https://ponto-print.herokuapp.com/get-currency')
        .then((res) => res.json())
        .then((res) => res[0]?.value)

        const currencyId = '646faf6bd812a1a42ea8129d';

        const response = await fetch('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json')
        .then((res) => res.json())
        .then((res) => res[24])

        console.log('response.rate',response.rate);
        console.log('value',value);

        // const data = await CurrencyModel.create({
        //     currency: response.rate,
        //     value: 50
        // });

        // const data = await CurrencyModel.findById(currencyId);

        const resoult = await response.rate * value;

        console.log('resoult',resoult);

        const data = await CurrencyModel.updateOne(
            {_id: currencyId},
            {
                currency: resoult.toFixed(2),
                banckCurrency: response.rate.toFixed(2)
            }
        )

        res.json(data);
    } catch(e) {
        console.log(e);
    }
  }

  export const createAdminCurrency = async (req, res) => {
    try{
        const {value} = req.body;

        const currencyId = '646faf6bd812a1a42ea8129d';

        const response = await fetch('https://ponto-print.herokuapp.com/get-currency')
        .then((res) => res.json())
        .then((res) => res[0]?.banckCurrency)

        console.log('banck',response);
        console.log('value',value);

        let resoult = await response * value;

        console.log('resoult',resoult);

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
