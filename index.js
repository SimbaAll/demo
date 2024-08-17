import express from "express";
import jwt from "jsonwebtoken";

const ScretKey = "BhiduToken"

const app = express()

app.use(express.json())


app.post("/login", (req, res) => {
    const user = {
        id: 1,
        name: "Savjibhai",
        email: "savju@gmail.com"
    }
    jwt.sign({ user }, ScretKey, { expiresIn: "300s" }, (error, token) => {
        res.json({
            token
        })
    })
})


app.post("/profile", getToken, (req, res) => {
    jwt.verify(req.token, ScretKey, (err, userData)=>{
        if (err) {
            res.send({result:"Invalid Token..."})
        } else {
            res.json({
                result:"Success...",
                userData
            })
        }
    })
})

function getToken(req, res, next) {
    const header = req.headers['authorization']
    if (typeof header !== 'undefined') {
        const bearer = header.split(" ")
        const token = bearer[1]
        req.token = token
        next()
    } else {
        res.send({
            result: "Token Not Valid........"
        })
    }

}

app.listen(3000)