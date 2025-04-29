import mongoose from 'mongoose'

export async function connect(){
    try {
        mongoose.connect(process.env.MONGODB_CONNECTION_URL!);
        const connection = mongoose.connection;

        connection.on("connected",()=>{
            console.log("MongoDB connected successfully")
        });

        connection.on("error",(error)=>{
            console.log("MongoDB connnection error :",error);
            process.exit();
        });
        
    } catch (error) {
        console.log("something went wrong!")
        console.log(error)
    }
}