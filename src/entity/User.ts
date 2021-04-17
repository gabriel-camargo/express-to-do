import { Entity, ObjectIdColumn, Column, ObjectID } from 'typeorm'

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
}

export { User }
