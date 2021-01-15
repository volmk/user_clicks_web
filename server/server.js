import express from 'express'
import morgan from 'morgan'
import path from 'path'
import dotenv from 'dotenv'

import {errorHandler, notFound} from './middleware/errorMiddleware.js'
import {closeDatabase} from "./database/connect.js";
import userRoutes from './routes/userRoutes.js'

dotenv.config()

const __dirname = path.resolve()
const app = express()

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

app.use(express.json())

app.use('/api/users', userRoutes)

app.get('/wakeup', (req, res) => {
    res.send('!')
})

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/client/build')))

    app.get('*', (req, res) =>
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    )
} else {
    app.get('/', (req, res) => {
        res.send('API running...')
    })
}

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

const server = app.listen(PORT, () => {
    console.log(`Listening ${PORT} port on ${process.env.NODE_ENV} mode`)
})

process.on('SIGINT', () => {
    closeDatabase();
    server.close();
});