import mongoose ,{model,Schema} from "mongoose";
import { API_KEY } from "./config";

const UserSchema=new Schema({
    username: {type: String, unique: true},
    password: String

})
                           
export const UserModel=model("User",UserSchema);

const ConetentSchema=new Schema({
    title: String,
    link: String,
    tags: [{type: mongoose.Types.ObjectId, ref:'Tag'}] ,
    userId:{type: mongoose.Types.ObjectId, ref:'User', require: true}
}) 

export const ContentModel=model("Content",ConetentSchema);