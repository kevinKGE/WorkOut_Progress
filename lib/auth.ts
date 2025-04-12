// TODO

// Commenté temporairement
// import { PrismaAdapter } from "@next-auth/prisma-adapter"
// import { PrismaClient } from "@prisma/client"
import CredentialsProvider from "next-auth/providers/credentials"
import type { AuthOptions } from "next-auth"
// import bcrypt from "bcrypt"

// Commenté temporairement
// const prisma = new PrismaClient()

export const authOptions: AuthOptions = {
    // Adapter désactivé temporairement
    // adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Mot de passe", type: "password" },
            },
            async authorize(credentials) {
                // Version stub pour le développement UI
                // Simule un utilisateur connecté avec l'email "test@example.com"
                if (credentials?.email === "test@example.com" && credentials?.password === "password") {
                    return {
                        id: "1",
                        name: "Utilisateur Test",
                        email: "test@example.com",
                    }
                }
                return null
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/login",
    },
}

// import { PrismaAdapter } from "@next-auth/prisma-adapter"
// import CredentialsProvider from "next-auth/providers/credentials"
// import bcrypt from "bcrypt"
// import { PrismaClient } from "@prisma/client"
// import type { AuthOptions } from "next-auth"
//
// const prisma = new PrismaClient()
//
// export const authOptions: AuthOptions = {
//     adapter: PrismaAdapter(prisma),
//     providers: [
//         CredentialsProvider({
//             name: "credentials",
//             credentials: {
//                 email: { label: "Email", type: "text" },
//                 password: { label: "Mot de passe", type: "password" },
//             },
//             async authorize(credentials) {
//                 const user = await prisma.user.findUnique({
//                     where: { email: credentials?.email },
//                 })
//
//                 if (!user) return null
//
//                 const valid = await bcrypt.compare(credentials!.password, user.password)
//                 return valid ? user : null
//             },
//         }),
//     ],
//     session: {
//         strategy: "jwt",
//     },
//     pages: {
//         signIn: "/login",
//     },
// }