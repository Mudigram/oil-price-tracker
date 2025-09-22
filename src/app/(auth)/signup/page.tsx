"use client"
import React, { useState } from 'react'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

const images = {
    src: '/assets/wallpaper.jpg',
    alt: 'Welcome Image',
    width: 1920,
    height: 1080,
}
export default function Page() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();
    const { signup, loading } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            await signup(email, password, name);
            router.push('/welcome');
        } catch (err) {
            setError("Signup failed. Please check your details.");
            console.error(err);
        }
    };
    return (

        <div className="min-h-screen"    >
            <div className="relative w-full h-[40vh] rounded-b-2xl overflow-hidden">
                <Image
                    src={images.src}
                    alt={images.alt}
                    width={images.width}
                    height={images.height}
                    className="object-cover"
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100vw",
                        height: "100vh",
                        objectFit: "cover",
                        zIndex: -1,
                    }}
                />
            </div>
            <div className="relative flex justify-center px-4 -mt-2">
                <div className="w-full max-w-sm bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-8 space-y-6 border border-gray-100">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-gray-900">
                            Create an Account
                        </h2>
                        <p className="mt-2 text-sm text-gray-600">
                            Please create an account
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {error && <p className="text-red-500">{error}</p>}
                        <div className="space-y-4">
                            <Input
                                type="name"
                                placeholder="Username"
                                className="px-4 py-5 rounded-xl"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <Input
                                type="email"
                                placeholder="Email address"
                                className="px-4 py-5 rounded-xl"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <Input
                                type="password"
                                placeholder="Password"
                                className="px-4 py-5 rounded-xl"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 text-primary rounded border-gray-300"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                    Remember me
                                </label>
                            </div>

                            <Link href="/forgot-password" className="text-sm font-medium text-primary hover:text-primary/90">
                                Forgot?
                            </Link>
                        </div>

                        <Button
                            disabled={loading}
                            className="w-full py-6 rounded-xl text-base"
                            type="submit"
                        >
                            {loading ? "Signing up..." : "Sign Up"} {/* ✅ fixed */}
                        </Button>

                        {/* <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white/90 text-gray-500">
                                    Or continue with
                                </span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <Button variant="outline" type="button" className="w-full">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <path
                                        d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
                                        fill="currentColor"
                                    />
                                </svg>
                                <span className="sr-only">Login with Apple</span>
                            </Button>
                            <Button variant="outline" type="button" className="w-full">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <path
                                        d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                                        fill="currentColor"
                                    />
                                </svg>
                                <span className="sr-only">Login with Google</span>
                            </Button>
                        </div> */}

                        <p className="text-center text-sm text-gray-600">
                            Already have an account?{" "}
                            <Button
                                variant={"ghost"}
                                onClick={() => router.push("/signin")}
                                className="w-full py-2 rounded-xl text-base"
                                type="button"
                            >
                                Sign in
                            </Button>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
}
