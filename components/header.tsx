'use client'

import { useSession, signOut } from "next-auth/react"
import Link from "next/link"

export default function Header() {
    const { data: session } = useSession()

    return (
        <header className="w-full p-4 bg-gray-100 shadow-md flex justify-between items-center">
            <Link href="/" className="text-lg font-semibold">
                Wo Progress
            </Link>

            {session ? (
                <button
                    onClick={() => signOut({ callbackUrl: "/login" })}
                    className="text-sm text-red-600 hover:underline"
                >
                    Se déconnecter
                </button>
            ) : null}
        </header>
    )
}
