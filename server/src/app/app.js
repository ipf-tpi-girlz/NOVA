import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import config from '../config/config.js'
import cookieParser from 'cookie-parser'

export const app = express()

//MIDDLEWARE
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use(morgan("dev"))
app.use(express.json())
app.use(cookieParser())


//RUTAS
import { routerInst } from '../routers/user.inst.router.js'
import { routerProf } from '../routers/user.prof.router.js'
import { routerVict } from '../routers/user.vict.router.js'

app.use('/user/institucion', routerInst)
app.use("/user/profesional", routerProf)
app.use("/user/victima", routerVict)

app.listen(config.PORT, () => {
    console.log(`Servidor corriendo en el puerto ${config.PORT}`)
})