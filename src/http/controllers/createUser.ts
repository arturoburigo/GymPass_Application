
import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { createUserService } from '../../services/createUserService'


export async function createUser(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    email: z.string().email(),
    name: z.string(),
    password: z.string().min(6),
  })

  const { email, name, password } = registerBodySchema.parse(request.body)

  try {
    await createUserService({ email, name, password })
  } catch (err) {
    return reply.status(409).send()
  }

  return reply.status(201).send()
}
