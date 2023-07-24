import  express  from  'express' 
import colors from 'colors' 
import dotenv from 'dotenv' 
import morgan from 'morgan'
import connectDB from './config/db.js'
import authRoutes from './routes/authroute.js'
import categoryRoute from './routes/categoryRoutes.js'
import productRoutes from './routes/producRoutes.js'
import cors from 'cors'
import path from 'path'
import {fileURLToPath} from 'url'
// config env
dotenv.config()
// database config 
connectDB()

// esmodule fix
const __filename= fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// rest object 
const app=express()  
// middleware  
app.use(cors())
app.use(express.json()) 
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname,'./client/build')))
// routes
app.use('/api/v1/auth',authRoutes)
app.use('/api/v1/category',categoryRoute)
app.use('/api/v1/product',productRoutes)
// rest api
app.use('*',function(req,res){
res.sendFile(path.join(__dirname,'./client/build/index.html'))
})
// port
const PORT =process.env.PORT ||8080 
app.listen(PORT,()=>{
    console.log(`Server is running on port:${PORT}`.bgRed.yellow)
})
