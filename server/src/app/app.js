import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import session from 'express-session'
import config from '../config/config.js'
import cookieParser from 'cookie-parser'
import { usersRouter } from '../routers/users.routes.js'
import { subForoRouter } from '../routers/subforo.routes.js'
import { foroRouter } from '../routers/foro.routes.js'
import { authRouter } from '../routers/auth.routes.js'


export const app = express()
console.log(
)
//MIDDLEWARE
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    //*Puertos del frontend permitidos
    origin: ["http://127.0.0.1:5500",],
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


//!RUTAS
app.use('/users', usersRouter)
app.use('/subforo', subForoRouter)
app.use('/foro', foroRouter)
app.use('/auth', authRouter)


app.listen(config.PORT, () => {
    console.log(`Servidor corriendo en el puerto ${config.PORT}`)
})