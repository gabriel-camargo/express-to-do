import { Router } from 'express'
import { UserController } from './app/controllers/UserController'
import Auth from './app/middleware/AuthMiddleware'
import Request from './app/middleware/RequestValidatorMiddleware'
import AuthValidator from './app/validators/AuthValidator'

const router = Router()

const userController = new UserController()

router.post(
    '/sign-up',
    Request.validate(AuthValidator.signUp()),
    userController.signUp,
)

router.post(
    '/sign-in',
    Request.validate(AuthValidator.signIn()),
    userController.signIn,
)

router.get('/dash', Auth.checkJwt, userController.dashboard)

export { router }
