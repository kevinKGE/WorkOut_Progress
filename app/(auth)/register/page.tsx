'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../../../context/AuthContext";

export default function RegisterPage() {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { signUp } = useAuth();

    // Validation basique du formulaire
    const validateForm = () => {
        // Validation de l'email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError("L'adresse email est invalide");
            return false;
        }

        // Validation du mot de passe
        if (password.length < 6) {
            setError("Le mot de passe doit contenir au moins 6 caractères");
            return false;
        }

        // Vérification que les mots de passe correspondent
        if (password !== confirmPassword) {
            setError("Les mots de passe ne correspondent pas");
            return false;
        }

        return true;
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        // Valider le formulaire avant de soumettre
        if (!validateForm()) {
            return;
        }

        setLoading(true);

        try {
            // Inscription avec Supabase Auth via notre contexte Auth
            const { data, error: signUpError } = await signUp(email, password);

            if (signUpError) {
                throw signUpError;
            }

            // Si l'inscription est réussie, ajouter des métadonnées à l'utilisateur
            if (data?.user) {
                // À ce stade, notre Hook de Auth Context s'occupe de mettre à jour les métadonnées
                // et de synchroniser avec Prisma

                alert("Inscription réussie ! Vous pouvez maintenant vous connecter.");
                router.push("/login");
            }
        } catch (err: any) {
            if (err.message?.includes("already registered")) {
                setError("Cette adresse email est déjà utilisée");
            } else {
                setError(err.message || "Une erreur est survenue lors de l'inscription");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col gap-4 w-full max-w-sm mx-auto mt-8 p-4">
            <h1 className="text-xl font-semibold text-center">Inscription</h1>
            <form onSubmit={handleRegister} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                    <label htmlFor="email" className="text-sm font-medium">Email</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="votre@email.com"
                        className="border p-2 rounded"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="name" className="text-sm font-medium">Pseudo</label>
                    <input
                        id="name"
                        type="text"
                        placeholder="Votre pseudo"
                        className="border p-2 rounded"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="password" className="text-sm font-medium">Mot de passe</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Minimum 6 caractères"
                        className="border p-2 rounded"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="confirmPassword" className="text-sm font-medium">Confirmer le mot de passe</label>
                    <input
                        id="confirmPassword"
                        type="password"
                        placeholder="Confirmer votre mot de passe"
                        className="border p-2 rounded"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded">
                        {error}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="bg-black text-white py-3 px-4 rounded hover:bg-gray-800 transition disabled:bg-gray-500 mt-2"
                >
                    {loading ? "Inscription en cours..." : "S'inscrire"}
                </button>
            </form>
            <p className="text-sm text-center mt-2">
                Déjà un compte ?{" "}
                <Link href="/login" className="text-blue-500 hover:underline">
                    Se connecter
                </Link>
            </p>
        </div>
    );
}