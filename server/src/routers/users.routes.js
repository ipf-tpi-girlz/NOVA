import { Router } from 'express'
import { registerUser, loginUser, logout } from '../controllers/users.controllers.js'
import { loginSchema, registerUserSchema } from '../schemas/users.schema.js'
import { validateSchema } from '../middlewares/validator.middleware.js'


export const usersRouter = Router()

usersRouter.post('/register', validateSchema(registerUserSchema), registerUser)
usersRouter.post('/login', validateSchema(loginSchema), loginUser)
usersRouter.get('/logout', logout)