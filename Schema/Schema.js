import mongoose from "mongoose";

const Schema = mongoose.Schema

const insertSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    pass: { type: String, required: true },
    city: { type: String, required: true },
}, { timestamps: true })

export default mongoose.model('detail', insertSchema)