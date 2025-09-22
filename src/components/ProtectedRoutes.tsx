"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push("/signin"); // redirect if not logged in
        }
    }, [user, loading, router]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className=" p-5 w-8 h-8 border-4 border-gray-300 border-t-green-500 rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!user) {
        return null; // prevent flicker before redirect
    }

    return <>{children}</>;
}
