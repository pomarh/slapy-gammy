import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // obtener sesión actual
    useEffect(() => {
        const getSession = async () => {
            const { data } = await supabase.auth.getSession();
            setUser(data.session?.user ?? null);
            setLoading(false);
        };

        getSession();

        // escuchar cambios (login/logout)
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    const login = async (email, password) => {
        return await supabase.auth.signInWithPassword({ email, password });
    };

    const register = async (email, password) => {
        return await supabase.auth.signUp({ email, password });
    };

    const logout = async () => {
        await supabase.auth.signOut();
    };

    return <AuthContext.Provider value={{ user, login, register, logout }}>{!loading && children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
