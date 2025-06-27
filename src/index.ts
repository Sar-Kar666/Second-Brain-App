import express from "express";
import jwt from "jsonwebtoken";
import { ContentModel, LinkModel, UserModel } from "./db";
import { JWT_PASSWORD } from "./config";
import { userMiddileware } from "./middleware";
import { random } from "./utils";



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

app.post("/api/v1/content", userMiddileware, async (req, res) => {
    const title = req.body.title;
    const link = req.body.link;

    await ContentModel.create({
        title,
        link,
        //@ts-ignore
        userId: req.userId,
        tags: []

    })

    res.json({
        message: "Content Added"
    })

})

app.get("/api/v1/content", userMiddileware, async (req, res) => {
    //@ts-ignore    
    const userId = req.userId;
    const content = await ContentModel.find({
        userId: userId
    }).populate("userId", "username")

    res.json({
        content
    })

})

app.delete("/api/v1/content", userMiddileware, async (req, res) => {
    const title = req.body.title;

    await ContentModel.deleteMany({
        title,
        //@ts-ignore
        userId: req.userId
    })

    res.json({
        message: "deleted"
    })
})

app.post("/api/v1/brain/share", userMiddileware, async (req, res) => {

    const share = req.body.share;

    //asking for link again
    if (share) {
        const existinglink = await LinkModel.findOne({
            // @ts-ignore
            userId: req.userId
        });

        if (existinglink) {

            res.json({
                hash: existinglink.hash
            })

            return;
        }


        // creating the link at the first palce
        const hash = random(10);
        await LinkModel.create({
            //@ts-ignore
            userId: req.userId,
            hash: hash
        })
        res.json({
            message: "/share/" + hash
        })

    }

    else {
        await LinkModel.deleteOne({
            //@ts-ignore
            userId: req.userId

        })

        res.json({
            message: "link removed"
        })
    }



})

app.get("/api/v1/brain/:shareLink", async (req, res) => {
    const hash = req.params.shareLink;

    const link = await LinkModel.findOne({
        hash
    })

    if (!link) {
        res.status(411).json({
            message: "Sorry incorrect input "
        })
        return;
    }

    const content = await ContentModel.findOne({
        userId : link.userId
    })

    const user = await UserModel.findOne({
        _id : link.userId
    })
    res.json({
        //@ts-ignore
        username : user.username,
        content: content
    })

})

app.listen(3000);