import { Router } from 'express'
import { UserController } from './controllers/UserController'
import AuthMiddleware from './middleware/AuthMiddleware'

const router = Router()

const userController = new UserController()

router.post('/sign-up', userController.signUp)
router.post('/sign-in', userController.signIn)

router.get('/dash', AuthMiddleware.checkJwt, userController.dashboard)

export { router }
