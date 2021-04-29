import { Entity, ObjectIdColumn, Column, ObjectID, BeforeInsert } from 'typeorm'
import * as bcrypt from 'bcryptjs'

const BCRYPT_HASH_ROUND = 8

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
        this.password = await bcrypt.hash(this.password, BCRYPT_HASH_ROUND)
    }
}

export { User }
