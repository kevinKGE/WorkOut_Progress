// TODO pas d'auth

import { redirect } from "next/navigation"

export default function HomePage() {
    // Redirection directe vers le dashboard sans vérification d'authentification
    // Pendant le développement UI, on suppose que l'utilisateur est connecté
    redirect("/dashboard")

    // Ou si tu préfères, tu peux afficher une page d'accueil simple:
    /*
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24">
            <h1 className="text-4xl font-bold mb-8">Bienvenue sur Mon Application</h1>
            <div className="flex gap-4">
                <a href="/login" className="px-4 py-2 bg-blue-500 text-white rounded">Se connecter</a>
                <a href="/dashboard" className="px-4 py-2 bg-green-500 text-white rounded">Dashboard</a>
            </div>
        </main>
    )
    */
}

// import { getServerSession } from "next-auth"
// import { redirect } from "next/navigation"
// import {authOptions} from "../lib/auth";
//
// export default async function HomePage() {
//     const session = await getServerSession(authOptions)
//
//     if (!session) {
//         redirect("/login")
//     } else {
//         redirect("/dashboard")
//     }
// }