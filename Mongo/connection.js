import mongoose from "mongoose";
const DB_URL = 'mongodb://localhost:27017/student'
mongoose.set('strictQuery', false)
const database = async () => {
    return mongoose.connect(DB_URL);
    
}
export default database