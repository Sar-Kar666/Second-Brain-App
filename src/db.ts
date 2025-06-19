import mongoose ,{model,Schema} from "mongoose";
mongoose.connect("mongodb+srv://admin:wyArcxLoww3YzzMO@cluster0.amlcxqh.mongodb.net/second_brain")


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