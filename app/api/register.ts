// app/api/register/route.ts

import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"

const prisma = new PrismaClient()

export async function POST(req: Request) {
    const body = await req.json()
    const { email, password, name } = body

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
        data: {
            email,
            password: hashedPassword,
            name,
        }
    })

    return Response.json({ user })
}
