'use client'

import Link from "next/link"

export default function Header() {

    return (
        <header className="w-full p-4 bg-gray-100 shadow-md flex justify-between items-center">
            <Link href="/" className="text-lg font-semibold">
                Wo Progress
            </Link>
        </header>
    )
}
