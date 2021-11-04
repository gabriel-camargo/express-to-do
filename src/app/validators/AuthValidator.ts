import { body, ValidationChain } from 'express-validator'
import { getCustomRepository } from 'typeorm'
import { UsersRepository } from '../../repositories/UsersRepository'

class AuthValidator {
    public signUp(): Array<ValidationChain> {
        const valitators: Array<ValidationChain> = []

        valitators.push(
            body('name.first_name')
                .isString()
                .withMessage('Nome inválido!')
                .isLength({
                    min: 2,
                    max: 15,
                })
                .withMessage(
                    'O nome deve ter no mínimo 2 caracteres, e no máximo 15 caracteres',
                ),
            body('name.middle_name')
                .isString()
                .withMessage('Nome inválido!')
                .isLength({
                    min: 2,
                    max: 15,
                })
                .withMessage(
                    'O nome deve ter no mínimo 2 caracteres, e no máximo 15 caracteres',
                ),
            body('name.last_name')
                .isString()
                .withMessage('Nome inválido!')
                .isLength({
                    min: 2,
                    max: 15,
                })
                .withMessage(
                    'O nome deve ter no mínimo 2 caracteres, e no máximo 15 caracteres',
                ),
            body('email')
                .isEmail()
                .withMessage('Email inválido!')
                .custom(async (value: string) => {
                    const usersRepository = getCustomRepository(UsersRepository)

                    const userAlreadyExists = await usersRepository.findOne({
                        email: value,
                    })

                    if (userAlreadyExists) {
                        throw new Error('Usuário já cadastrado.')
                    }

                    return true
                }),
            body('password')
                .isStrongPassword({
                    minLength: 8,
                    minNumbers: 1,
                    minLowercase: 1,
                    minUppercase: 1,
                    minSymbols: 0,
                })
                .withMessage(
                    'A sua senha deve ter no mínimo 8 caracteres, e conter ao menos um número, ' +
                        'uma letra maiúscula, e uma letra minúscula.',
                )
                .custom((value: string, { req }) => {
                    if (value !== req.body.confirm_password) {
                        throw new Error(
                            'A confirmação da senha está incorreta!',
                        )
                    }

                    return true
                }),
            body('confirm_password').isString(),
        )

        return valitators
    }

    public signIn(): Array<ValidationChain> {
        const valitators: Array<ValidationChain> = []

        valitators.push(
            body('email').isEmail().withMessage('Email inválido!'),
            body('password').isString().withMessage('Senha inválida!'),
        )

        return valitators
    }
}

export default new AuthValidator()
