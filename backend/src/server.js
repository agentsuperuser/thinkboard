import express from 'express'
import notesRoutes from './routes/notesRoutes.js'
import { connectDB } from './config/db.js';
import dotenv from 'dotenv'
import path from "path"

import rateLimiter from './middleware/rateLimiter.js';
import cors from 'cors'

dotenv.config();

console.log(process.env.MONGO_URI);


const app = express();
const PORT = process.env.PORT || 5002
const __dirname = path.resolve()

if(process.env.NODE_ENV !== "production" ) {
    app.use(cors({
        origin:"http://localhost:5173"
    }))
}

app.use(express.json())

app.use(rateLimiter)


// app.use((req, res, next)=>{
//     console.log(`Request method ${req.method} & req url is ${req.url}`);
//     next()
// })

app.use('/api/notes', notesRoutes)

if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname,"../frontend/dist")))

    app.get("*",(req,res) => {
    res.sendFile(path.join(__dirname,"../frontend", "dist", "index.html"))
})
}

// app.get('/api/notes',(req, res)=>{
//     res.status(200).send("got 10 notes")
// })

// app.post('/api/notes'),(req, res)=>{
//     res.status(200).json({message:"Post Created"})
// }
connectDB().then(()=>{
    app.listen(PORT, ()=>{
        console.log("Server connected to port", PORT);
        
    })
})
