import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import session from 'express-session'
import config from '../config/config.js'
import cookieParser from 'cookie-parser'
import { usersRouter } from '../routers/users.routes.js'

export const app = express()

//MIDDLEWARE
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))
app.use(session({
    secret: config.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
        maxAge: 3600000,
    },
}));
app.use(morgan("dev"))
app.use(express.json())
app.use(cookieParser())

app.use('/users', usersRouter)


app.listen(config.PORT, () => {
    console.log(`Servidor corriendo en el puerto ${config.PORT}`)
})