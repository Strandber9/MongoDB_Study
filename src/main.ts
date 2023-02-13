import express from "express"
import mongoose from "mongoose";
import userRouter from "./routes/userRoutes"


const app = express();

const MONGO_PWD = "F8Y0QWwctUZ33EJ1";
const MONGO_URI = `mongodb+srv://Strandber9:${MONGO_PWD}@cluster0.8votkfz.mongodb.net/test?retryWrites=true`;

const server = async () => {
    try{
        mongoose.set("strictQuery", false);
        mongoose.set("debug", true);
        let mongoCon = await mongoose.connect(MONGO_URI);
    
        console.log("==== MongoDB connected ====");
    
        app.listen(3000, function(){
            console.log("server opened port : 3000");
            console.log("http://localhost:3000/");
        });     

        app.use(express.json());
        app.use("/user", userRouter);
    }
    catch(err){
        console.log(err);
    }
}
server();