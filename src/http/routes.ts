import { FastifyInstance } from 'fastify'
import { createUser } from './controllers/createUser'


export async function appRoutes(app: FastifyInstance) {
    app.post('/users', createUser)
}