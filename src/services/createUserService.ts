/* eslint-disable camelcase */
import { hash } from "bcryptjs"
import { prisma } from "../lib/prisma"
import { PrismaUserRepository } from "../repositories/prisma-users-repository"

interface CreateUserInterface {
  name: string,
  email: string,
  password: string
}


export async function createUserService({ email, name, password }: CreateUserInterface) {
  const password_hash = await hash(password, 6)

  const userWithSameEmail = await prisma.user.findUnique({
    where: {
      email
    }
  })

  if (userWithSameEmail) {
    throw new Error('E-mail already in use')
  }

  const prismaUsersRepository = new PrismaUserRepository()

  await prismaUsersRepository.create({
    name,
    email,
    password_hash
  })

}

