import { Router } from 'express'
import { registerUser, loginUser, logout } from '../controllers/users.controllers.js'




export const usersRouter = Router()

usersRouter.post('/register', registerUser)
usersRouter.post('/login', loginUser)
usersRouter.get('/logout', logout)