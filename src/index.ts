import express from "express";
import jwt from "jsonwebtoken";
import { ContentModel, UserModel } from "./db";
import { JWT_PASSWORD } from "./config";
import { userMiddileware } from "./middleware";



const app = express();
app.use(express.json());

app.post("/api/v1/signup", async (req, res) => {
    //use zod and hash the password
    const username = req.body.username;
    const password = req.body.password;


    try {
        await UserModel.create({
            username: username,
            password: password
        })

        res.json({
            message: " User signed in"
        })
    } catch (e) {
        res.status(411).json({
            message: "User already exist"
        })
    }

})

app.post("/api/v1/signin", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    
    const existingUser = await UserModel.findOne({
        username,
        password
    });

    if (existingUser) {
        const token = jwt.sign({
            id: existingUser._id
        }, JWT_PASSWORD)
        res.json({
            token
        })
    }
    else {
        res.status(403).json({
            message: " incorrect credentials"
        })
    }

})

app.post("/api/v1/content",userMiddileware, async (req, res) => {
    const title= req.body.title;
    const link= req.body.link;
    
     await ContentModel.create({
        title,
        link,
        //@ts-ignore
        userId: req.userId,
        tags:[]

    })

    res.json({
        message:"Content Added"
    })

})

app.get("/api/v1/content",userMiddileware, async (req, res) => {
    //@ts-ignore    
    const userId=req.userId;
    const content =await ContentModel.find({
        userId: userId
    }).populate("userId","username")

    res.json({
        content
    })

})

app.delete("/api/v1/signin", (req, res) => {

})

app.post("/api/v1/brain/share", (req, res) => {

})

app.get("/api/v1/brain/:shareLink", (req, res) => {

})

app.listen(3000);