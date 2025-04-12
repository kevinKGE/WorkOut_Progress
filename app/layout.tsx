import './globals.css'
import {SessionProvider} from 'next-auth/react'
import Header from "../components/header";
import {AuthProvider} from "@/providers";

export const metadata = {
    title: 'Wo Progress',
}

export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <html lang="fr">
        <body className="min-h-screen bg-white text-black">
        <AuthProvider>
            <Header/>
            <main className="p-4 max-w-md mx-auto">{children}</main>
        </AuthProvider>
        </body>
        </html>
    )
}
