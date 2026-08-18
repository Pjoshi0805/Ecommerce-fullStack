import mongoose from "mongoose";
import 'dotenv/config'
async function connectDb(){
    const connectionString = process.env.MONGODB_URI
    try{
        await mongoose.connect(connectionString)
        console.log('Database connected !!')
    }catch(error){
        console.log(error)
    }

}

export default connectDb