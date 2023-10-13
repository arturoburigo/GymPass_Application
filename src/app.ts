import fastify from 'fastify'
import { createUser } from './http/controllers/register-controller'

export const app = fastify()

app.post('/users', createUser)
