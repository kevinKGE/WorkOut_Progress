'use client'

import { signIn } from "next-auth/react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function LoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const router = useRouter()

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")

        const res = await signIn("credentials", {
            email,
            password,
            redirect: false,
        })

        if (res?.ok) {
            router.push("/dashboard")
        } else {
            setError("Email ou mot de passe invalide")
        }
    }

    return (
        <div className="flex flex-col gap-4 w-full max-w-sm mx-auto mt-8">
            <h1 className="text-xl font-semibold text-center">Connexion</h1>
            <form onSubmit={handleLogin} className="flex flex-col gap-4">
                <input
                    type="email"
                    placeholder="Email"
                    className="border p-2 rounded"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Mot de passe"
                    className="border p-2 rounded"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                />
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <button
                    type="submit"
                    className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition"
                >
                    Se connecter
                </button>
            </form>
            <p className="text-sm text-center">
                Pas encore de compte ?{" "}
                <Link href="/register" className="text-blue-600 underline hover:text-blue-800">
                    Créer un compte
                </Link>
            </p>

        </div>
    )
}
