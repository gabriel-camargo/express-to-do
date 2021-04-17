export default {
    type: 'mongodb',
    url: process.env.MONGO_URL,
    useNewUrlParser: true,
    synchronize: true,
    logging: true,
    useUnifiedTopology: true, // if you add this option the problem will solved
    entities: ['./src/entity/**.ts'],
    cli: {
        entitiesDir: 'src/entity',
    },
}
