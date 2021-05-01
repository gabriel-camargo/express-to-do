import { Router } from 'express'
import { UserController } from './controllers/UserController'

const router = Router()

const userController = new UserController()

router.post('/sign-up', userController.signUp)
router.post('/sign-in', userController.signIn)

export { router }
