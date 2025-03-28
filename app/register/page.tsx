import Link from "next/link";

export default function RegisterPage() {
    return (
        <div className="flex flex-col gap-4 w-full max-w-sm mx-auto mt-8">
            <h1 className="text-xl font-semibold text-center">Inscription</h1>
            <form className="flex flex-col gap-4">
                <input
                    type="email"
                    placeholder="Email"
                    className="border p-2 rounded"
                    required
                />
                <input
                    type="name"
                    placeholder="Pseudo"
                    className="border p-2 rounded"
                    required
                />
                <input
                    type="password"
                    placeholder="Mot de passe"
                    className="border p-2 rounded"
                    required
                />
                <button
                    type="submit"
                    className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition"
                >
                    S'inscrire
                </button>
            </form>
            <p className="text-sm text-center">
                Déjà un compte ?{" "}
                <Link href="/login" className="text-blue-500">
                    Se connecter
                </Link>
            </p>
        </div>
    )
}