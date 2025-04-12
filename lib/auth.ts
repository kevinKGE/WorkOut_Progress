import { supabase } from './supabase';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Synchroniser l'utilisateur Supabase Auth avec Prisma
export async function syncUserWithPrisma(supabaseUser: any) {
    try {
        // Vérifier si l'utilisateur existe déjà dans la base de données
        const existingUser = await prisma.user.findUnique({
            where: {
                email: supabaseUser.email
            }
        });

        if (!existingUser) {
            // Créer l'utilisateur dans la base de données Prisma
            await prisma.user.create({
                data: {
                    email: supabaseUser.email,
                    name: supabaseUser.user_metadata?.name || supabaseUser.email.split('@')[0],
                    // Ne pas stocker de mot de passe, Supabase gère l'authentification
                }
            });
        }

        return true;
    } catch (error) {
        console.error('Erreur lors de la synchronisation utilisateur :', error);
        return false;
    }
}

// Vérifie si un utilisateur est authentifié
export async function isAuthenticated() {
    const { data } = await supabase.auth.getSession();
    return data.session !== null;
}

// Récupère l'utilisateur actuel
export async function getCurrentUser() {
    const { data } = await supabase.auth.getUser();
    return data.user;
}