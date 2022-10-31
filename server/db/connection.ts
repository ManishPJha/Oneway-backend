import mongoose from "mongoose"
import { localConfig } from "../config/index"

let connectionString : string = localConfig.DB_URI!;

const connectDatabase = () => {
    mongoose.connect(connectionString, (error: any) => {
        if(error) console.log("Database Connection Failed!");
        console.log("Database Connection Successfull.");
    })
}

export default connectDatabase;