import mongoose ,{model,Schema} from "mongoose";
mongoose.connect("mongodb+srv://admin:wyArcxLoww3YzzMO@cluster0.amlcxqh.mongodb.net/second_brain")


const UserSchema=new Schema({
    username: {type: String, unique: true},
    password: String

})
                           
export const UserModel=model("User",UserSchema);