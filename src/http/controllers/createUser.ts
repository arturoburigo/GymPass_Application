
import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { RegisterUserCase } from '../../services/createUserService'
import { PrismaUserRepository } from '../../repositories/prisma-users-repository'


export async function createUser(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    email: z.string().email(),
    name: z.string(),
    password: z.string().min(6),
  })

  const { email, name, password } = registerBodySchema.parse(request.body)

  try {
    const prismaUsersRepository = new PrismaUserRepository()
    const registerUserCase = new RegisterUserCase(prismaUsersRepository)

    await registerUserCase.execute({ email, name, password })
  } catch (err) {
    return reply.status(409).send()
  }

  return reply.status(201).send()
}
