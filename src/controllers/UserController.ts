import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import { UsersRepository } from '../repositories/UsersRepository'

class UserController {
    async create(req: Request, res: Response): Promise<Response> {
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
}

export { UserController }
