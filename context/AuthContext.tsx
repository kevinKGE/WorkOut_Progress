"use client";

import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { useRouter } from "next/navigation";
import { supabase } from '../lib/supabase';
import { isAuthenticated, getCurrentUser, syncUserWithPrisma } from '../lib/auth';
import { User } from '@supabase/supabase-js';

interface AuthContextType {
    user: User | null;
    loading: boolean;
    signIn: (email: string, password: string) => Promise<any>;
    signUp: (email: string, password: string) => Promise<any>;
    signOut: () => Promise<void>;
    isAuthenticated: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const loadUser = async () => {
            try {
                const currentUser = await getCurrentUser();
                setUser(currentUser);

                if (currentUser) {
                    await syncUserWithPrisma(currentUser);
                }
            } catch (error) {
                console.error("Erreur lors du chargement de l'utilisateur:", error);
            } finally {
                setLoading(false);
            }
        };

        loadUser();

        // Configurer le listener pour les changements d'état d'authentification
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                const currentUser = session?.user || null;
                setUser(currentUser);

                // Synchroniser l'utilisateur à chaque changement d'authentification
                if (currentUser && (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED')) {
                    await syncUserWithPrisma(currentUser);
                }
            }
        );

        return () => subscription?.unsubscribe();
    }, []);

    const signUp = async (email: string, password: string, metadata = {}) => {
        return supabase.auth.signUp({
            email,
            password,
            options: {
                data: metadata,
                emailRedirectTo: `${window.location.origin}/login`
            }
        });
    };

    const signIn = async (email: string, password: string) => {
        const result = await supabase.auth.signInWithPassword({ email, password });

        // Si la connexion est réussie, synchroniser avec la base de données
        if (!result.error && result.data.user) {
            await syncUserWithPrisma(result.data.user);
        }

        return result;
    };

    const signOut = async () => {
        await supabase.auth.signOut();
        router.push("/login");
    };

    const value: AuthContextType = {
        user,
        loading,
        signIn,
        signUp,
        signOut,
        isAuthenticated: async () => await isAuthenticated()
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth doit être utilisé à l'intérieur d'un AuthProvider");
    }
    return context;
}