import TranslationsRuModel from '../models/TranslationsRu.js';

export const createText = async (req,res) => {
    try {
        const {key, value} = req.body;

        const data = await TranslationsRuModel.create({
            key,
            lang: 'ru',
            value
        });

        res.json(data);

    } catch (error) {
        console.log(error);
    }
}

export const getText = async (req,res) => {
    try {
        const allData = await TranslationsRuModel.find();

        res.json(allData)

    } catch (error) {
        console.log(error);
    }
}