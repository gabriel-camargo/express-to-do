import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import { UsersRepository } from '../repositories/UsersRepository'

class UserController {
    async create(req: Request, res: Response): Promise<Response> {
        try {
            const usersRepository = getCustomRepository(UsersRepository)
            const [name, lastName, email, password] = [
                'Gabriel',
                'Camargo',
                'gabriel2@teste.com',
                '123',
            ]

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
                last_name: lastName,
                email,
                password,
            })

            await usersRepository.save(user)

            return res.status(201).json(user)
        } catch (error) {
            console.log('cacth', error)
            return res.status(400).json({
                error: error,
            })
        }
    }
}

export { UserController }
