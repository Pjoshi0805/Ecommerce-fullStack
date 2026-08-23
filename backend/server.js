import 'dotenv/config'
import express from 'express'
import connectDb from './config/db.js'
import productRouter from './routes/productRoutes.js'
import userRouter from './routes/userRoutes.js'
import { errorMiddleware } from './middleware/errorMiddleware.js'
import orderRouter from './routes/orderRoutes.js'
import cors from 'cors'
const app = express()



app.use((req, res, next) => {
    console.log('Request received')
    next()
})

app.use(cors())
app.use(express.json())

app.use('/products', productRouter)
app.use('/users', userRouter)
app.use('/orders', orderRouter)
app.use(errorMiddleware)
async function startServer() {
    await connectDb()
    app.listen('3001', () => {
        console.log('Listening on 3001')
    })
}
startServer()


