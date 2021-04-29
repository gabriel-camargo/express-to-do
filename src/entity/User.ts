import { Entity, ObjectIdColumn, Column, ObjectID, BeforeInsert } from 'typeorm'
import * as bcrypt from 'bcryptjs'

@Entity('users')
class User {
    @ObjectIdColumn()
    id: ObjectID

    @Column()
    name: string

    @Column()
    last_name: string

    @Column()
    email: string

    @Column()
    password: string

    @BeforeInsert()
    async beforeInsert(): Promise<void> {
        const BCRYPT_HASH_ROUND = Number(process.env.BCRYPT_HASH_ROUND ?? 8)

        const salt = await bcrypt.genSalt(BCRYPT_HASH_ROUND)
        this.password = await bcrypt.hash(this.password, salt)
    }
}

export { User }
