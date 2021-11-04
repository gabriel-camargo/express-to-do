import { NextFunction, Request, Response } from 'express'
import { ValidationChain, validationResult } from 'express-validator'

class RequestValidatorMiddleware {
    public validate(schemas: Array<ValidationChain>) {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                await Promise.all(schemas.map((schema) => schema.run(req)))

                const result = validationResult(req)
                if (result.isEmpty()) {
                    return next()
                }

                const errors = result.array()
                return res.status(422).json({
                    errors: errors,
                    message:
                        'Falha na validação. Por favor, verifique os dados enviados e tente novamente.',
                })
            } catch (error) {
                return res.status(500).json({
                    message:
                        'Falha na validação. Por favor, verifique os dados enviados e tente novamente.',
                })
            }
        }
    }
}

export default new RequestValidatorMiddleware()
