"use client";
import React, {
    useState,
    useEffect,
    createContext,
    ReactNode,
    useContext,
} from "react";
import { account } from "@/lib/appwrite";
import { Models, ID } from "appwrite";

type UserType = Models.User<Models.Preferences> | null;

interface AuthContextType {
    user: UserType;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    signup: (email: string, password: string, name: string) => Promise<void>;
    forgotPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<UserType>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check for the current user session when the component mounts
        const fetchUser = async () => {
            try {
                const currentUser = await account.get();
                setUser(currentUser);
            } catch {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    // ✅ Fixed: use createEmailPasswordSession
    const login = async (email: string, password: string) => {
        await account.createEmailPasswordSession(email, password);
        const currentUser = await account.get();
        setUser(currentUser);
        console.log("Logged in successfully");
    };

    const logout = async () => {
        await account.deleteSession("current");
        setUser(null);
        console.log("Logged out successfully");
    };

    const signup = async (email: string, password: string, name: string) => {
        await account.create(ID.unique(), email, password, name);
        await login(email, password);
    };

    const forgotPassword = async (email: string) => {
        const recoveryUrl = `${window.location.origin}/forgot`;
        await account.createRecovery(email, recoveryUrl);
    };

    const value = {
        user,
        loading,
        login,
        logout,
        signup,
        forgotPassword,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
