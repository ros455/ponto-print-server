import BlogModel from '../models/Blog.js';
import fs from 'fs';

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
        const {blogImage, titleUa, titleRu, descriptionUa, descriptionRu} = req.body;

        const post = await BlogModel.create({
            blogImage: `/uploads/${req.file.originalname}`,
            titleUa, 
            titleRu, 
            descriptionUa,
            descriptionRu
        })

        res.json(post)
    } catch(e) {
        console.log(e);
    }
}

export const updatePost = async (req, res) => {
    try {
      const { image, titleUa, titleRu, descriptionUa, descriptionRu, postId } = req.body;
  
      const post = await BlogModel.findById(postId);
  
      if (!post) {
        return res.status(404).json({ error: 'Пост не знайдено' });
      }
  
      // Оновлення полів, крім картинки
      post.titleUa = titleUa;
      post.titleRu = titleRu;
      post.descriptionUa = descriptionUa;
      post.descriptionRu = descriptionRu;
  
      // Оновлення картинки, якщо передана нова картинка
      if (req.file && req.file.originalname) {
        // Видалення попередньої картинки
        const filename = post.blogImage;
        const previousImage = filename.slice(1);
  
        if (previousImage) {
          // Видалення попередньої картинки
          await fs.promises.unlink(previousImage);
        }
  
        // Збереження нової картинки
        post.blogImage = `/uploads/${req.file.originalname}`;
      }
  
      // Збереження оновленого запису в базі даних
      await post.save();
  
      res.json(post);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Помилка оновлення поста' });
    }
  };


export const removePost = async (req, res) => {
    try {
      const { filename, postId } = req.body;
      const newFileName = filename.slice(1);

      fs.unlink(newFileName, (err) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ message: 'Помилка при видаленні фото' });
        }
        res.json({ message: 'Фото успішно видалено' });
      });
      await BlogModel.findByIdAndDelete(postId);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Помилка видалення поста' });
    }
  };