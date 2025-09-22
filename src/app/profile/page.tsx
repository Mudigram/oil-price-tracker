"use client"
import { Button } from '@/components/ui/button'
import React from 'react'
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation'
import { User, Mail, Calendar, LogOut } from 'lucide-react'

export default function ProfilePage() {
    const { user, logout } = useAuth();
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await logout();
            router.push("/signin");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 pb-20">
            <div className="flex flex-col items-center justify-center p-8 pt-16">
                {/* Profile Card */}
                <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md border border-gray-100">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-green-400 mb-2">Profile</h1>
                        <p className="text-gray-600">Manage your account settings</p>
                    </div>

                    {/* Avatar */}
                    <div className="flex justify-center mb-8">
                        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-300 to-green-600 flex items-center justify-center text-2xl font-bold text-white shadow-lg">
                            {user?.name?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || "U"}
                        </div>
                    </div>

                    {/* User Info */}
                    <div className="space-y-6 mb-8">
                        {/* Name */}
                        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                                <User className="w-5 h-5 text-blue-600" />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-medium text-gray-500">Full Name</p>
                                <p className="text-lg font-semibold text-gray-900">
                                    {user?.name || "Not provided"}
                                </p>
                            </div>
                        </div>

                        {/* Email */}
                        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                                <Mail className="w-5 h-5 text-green-600" />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-medium text-gray-500">Email Address</p>
                                <p className="text-lg font-semibold text-gray-900">
                                    {user?.email || "Not provided"}
                                </p>
                            </div>
                        </div>

                        {/* Account Created */}
                        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                                <Calendar className="w-5 h-5 text-purple-600" />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-medium text-gray-500">Member Since</p>
                                <p className="text-lg font-semibold text-gray-900">
                                    {user?.$createdAt ? new Date(user.$createdAt).toLocaleDateString() : "Unknown"}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Logout Button */}
                    <div className="pt-6 border-t border-gray-200">
                        <Button
                            variant="destructive"
                            size="lg"
                            onClick={handleLogout}
                            className="w-full py-3 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                        >
                            <LogOut className="w-5 h-5 mr-2" />
                            Sign Out
                        </Button>
                    </div>
                </div>

                {/* Additional Info */}
                <div className="mt-8 text-center">
                    <a href="https://github.com/Mudigram" >
                        <p className="text-sm text-gray-500">
                            Built with love by Mudi
                        </p>
                    </a>
                </div>
            </div>
        </div>
    )
}
