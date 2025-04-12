// TODO
// Version temporaire sans Prisma

// Importe commentés temporairement
// import { PrismaClient } from "@prisma/client"
// import bcrypt from "bcrypt"

// Commenté temporairement
// const prisma = new PrismaClient()

export async function POST(req: Request) {
    const body = await req.json()
    const { email, password, name } = body

    // Version stub qui simule l'enregistrement sans utiliser Prisma
    // Commenté temporairement
    // const hashedPassword = await bcrypt.hash(password, 10)
    // const user = await prisma.user.create({...})

    // Retourne une réponse simulée
    return Response.json({
        user: {
            id: "temp-id",
            email,
            name,
            // Ne pas retourner le mot de passe, même en développement
            // password: hashedPassword,
        }
    })
}

// import { PrismaClient } from "@prisma/client"
// import bcrypt from "bcrypt"
//
// const prisma = new PrismaClient()
//
// export async function POST(req: Request) {
//     const body = await req.json()
//     const { email, password, name } = body
//
//     const hashedPassword = await bcrypt.hash(password, 10)
//
//     const user = await prisma.user.create({
//         data: {
//             email,
//             password: hashedPassword,
//             name,
//         }
//     })
//
//     return Response.json({ user })
// }