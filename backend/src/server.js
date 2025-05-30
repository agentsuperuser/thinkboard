import express from 'express'
import notesRoutes from './routes/notesRoutes.js'
import { connectDB } from './config/db.js';
import dotenv from 'dotenv'
import rateLimiter from './middleware/rateLimiter.js';
import cors from 'cors'

dotenv.config();

console.log(process.env.MONGO_URI);


const app = express();
const PORT = process.env.PORT || 5002

app.use(cors({
    origin:"http://localhost:5173"
}))

app.use(express.json())

app.use(rateLimiter)


// app.use((req, res, next)=>{
//     console.log(`Request method ${req.method} & req url is ${req.url}`);
//     next()
// })

app.use('/api/notes', notesRoutes)

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
