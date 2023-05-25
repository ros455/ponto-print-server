import TranslationsUaModel from '../models/TranslationsUa.js';

export const createText = async (req,res) => {
    try {
        const {key, value} = req.body;

        const data = await TranslationsUaModel.create({
            key,
            lang: 'ua',
            value
        });

        res.json(data);

    } catch (error) {
        console.log(error);
    }
}

export const getText = async (req,res) => {
    try {
        const allData = await TranslationsUaModel.find();

        res.json(allData)

    } catch (error) {
        console.log(error);
    }
}