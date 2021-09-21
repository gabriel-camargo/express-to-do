export default {
    type: 'mongodb',
    url: process.env.MONGO_URL,
    useNewUrlParser: true,
    synchronize: true,
    logging: true,
    useUnifiedTopology: true,
    writeConcern: {
        j: true,
    },
    entities: ['./src/entity/**.ts'],
    cli: {
        entitiesDir: 'src/entity',
    },
}
