// import BlogModel from '../models/Blog.js';

// export const addNewPost = async (req,res) => {
//     try{
//         const {image, title, description} = req.body;

//         const post = await BlogModel.create({
//             image,
//             title, 
//             description
//         })

//         res.json(post)
//     } catch(e) {
//         console.log(e);
//     }
// }

// export const updatePost = async (req,res) => {
//     try{
//         const {image, title, description} = req.body;
//         const postId = '646651d1355da81b6439459f';
//         const post = await BlogModel.findById(postId)
//         post.image = image;
//         post.title = title;
//         post.description = description;
//         await post.save();
//         res.json(post)
//     } catch(error) {
//         console.log(error);
//         res.status(500).json({ error: "Помилка оновлення поста" });
//     }
// }

// export const removePost = async (req, res) => {
//     try {
//     //   const postId = req.params.postId;
//       const postId = '646651d1355da81b6439459f';
//       await BlogModel.findByIdAndDelete(postId);
  
//       res.json('Пост видалено');
//     } catch (error) {
//       console.log(error);
//       res.status(500).json({ error: 'Помилка видалення поста' });
//     }
//   };