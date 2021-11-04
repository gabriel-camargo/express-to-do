import { Request, Response, NextFunction } from 'express'
import * as jwt from 'jsonwebtoken'

class AuthMiddleware {
    public checkJwt(req: Request, res: Response, next: NextFunction) {
        const token = <string>req.headers['authorization']?.split(' ')[1]
        const jwtSecret = process.env.SECRET ?? ''

        let jwtPayload

        try {
            jwtPayload = jwt.verify(token, jwtSecret)
            res.locals.user = {
                id: jwtPayload.user.id,
                name: jwtPayload.user.name,
                last_name: jwtPayload.user.last_name,
                email: jwtPayload.user.email,
            }
        } catch (error) {
            res.status(401).send()
            return
        }

        next()
    }
}

export default new AuthMiddleware()
