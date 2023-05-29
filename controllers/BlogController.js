import BlogModel from '../models/Blog.js';

export const getAll = async (req,res) => {
    try{
        const allData = await BlogModel.find();

        res.json(allData)
    } catch (error) {
        console.log(error);
    }
}


export const addNewPost = async (req,res) => {
    try{
        const {image, title, description} = req.body;

        const post = await BlogModel.create({
            image: `/uploads/${req.file.originalname}`,
            title, 
            description
        })

        res.json(post)
    } catch(e) {
        console.log(e);
    }
}

export const updatePost = async (req,res) => {
    try{
        const {image, title, description} = req.body;
        const postId = '6468a4ba032ea68bb8ce5799';

        const post = await BlogModel.updateOne(
            {_id: postId},
            {
                title: title,
                description: description,
                image: `/uploads/${req.file.originalname}`,
            }
        )
        res.json(post)
    } catch(error) {
        console.log(error);
        res.status(500).json({ error: "Помилка оновлення поста" });
    }
}

export const removePost = async (req, res) => {
    try {
    //   const postId = req.params.postId;
      const postId = '646651d1355da81b6439459f';
      await BlogModel.findByIdAndDelete(postId);
  
      res.json('Пост видалено');
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Помилка видалення поста' });
    }
  };