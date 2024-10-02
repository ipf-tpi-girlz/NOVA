import { Router } from 'express'
import { createSubForo } from '../controllers/subForos.controllers.js'

export const subForoRouter = Router();

subForoRouter.post('/:id', createSubForo)