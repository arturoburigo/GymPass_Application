/* eslint-disable camelcase */
import { hash } from "bcryptjs"
import { prisma } from "../lib/prisma"

interface CreateUserInterface {
  name: string,
  email: string,
  password: string
}

export class RegisterUserCase {
  constructor(private usersRepository: any) { }

  async execute({ email, name, password }: CreateUserInterface) {
    // eslint-
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await prisma.user.findUnique({
      where: {
        email
      }
    })

    if (userWithSameEmail) {
      throw new Error('E-mail already in use')
    }

    //  const prismaUsersRepository = new PrismaUserRepository()

    await this.usersRepository.create({
      name,
      email,
      password_hash
    })

  }
}



