import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import { UsersRepository } from '../repositories/UsersRepository'
import * as jwt from 'jsonwebtoken'

class UserController {
    async signIn(req: Request, res: Response): Promise<Response> {
        const { email, password } = req.body

        if (!(email && password)) {
            return res.status(400).send()
        }

        try {
            const usersRepository = getCustomRepository(UsersRepository)

            const user = await usersRepository.findOne({
                email,
            })

            if (!user || !user.checkPassword(password)) {
                return res.status(401).send()
            }

            const token = jwt.sign(
                {
                    user,
                },
                process.env.SECRET ?? '',
                {
                    expiresIn: '4h',
                },
            )

            res.status(200).send({ token })
        } catch (error) {
            console.log('cacth', error)
            return res.status(400).json({
                error: error,
            })
        }
    }

    async signUp(req: Request, res: Response): Promise<Response> {
        const { name, last_name, email, password } = req.body

        try {
            const usersRepository = getCustomRepository(UsersRepository)

            const userAlreadyExists = await usersRepository.findOne({
                email,
            })

            if (userAlreadyExists) {
                return res
                    .status(400)
                    .json({ message: 'email already exists!' })
            }

            const user = usersRepository.create({
                name,
                last_name,
                email,
                password,
            })

            await usersRepository.save(user)
        } catch (error) {
            console.log('cacth', error)
            return res.status(400).json({
                error: error,
            })
        }

        return res.status(201).json({ message: 'User created' })
    }

    async dashboard(req: Request, res: Response): Promise<Response> {
        return res.status(200).send({
            message: `Boas vindas, ${res.locals.user.name.first_name}!`,
            user: res.locals.user,
        })
    }
}

export { UserController }
