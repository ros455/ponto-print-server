import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
    blogImage: String,
    titleUa: String,
    titleRu: String,
    descriptionUa: String,
    descriptionRu: String,
},{timestamps: true,})

export default mongoose.model('Blog',BlogSchema)