"use client"
import React from 'react'
import Link from "next/link";
import { Home, User, ShoppingBagIcon } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Navbar() {

    const pathname = usePathname();

    const navItems = [
        { name: "Home", href: "/dashboard", icon: <Home size={25} /> },
        { name: "Markets", href: "/market", icon: <ShoppingBagIcon size={25} /> },
        { name: "Profile", href: "/profile", icon: <User size={25} /> },
    ];

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-md flex justify-around items-center h-18 sm:hidden">
            <div className="flex justify-around w-full">
                {navItems.map((item) => (
                    <Link
                        key={item.name}
                        href={item.href}
                        className={`flex flex-col items-center justify-center text-xs ${pathname === item.href ? 'text-green-400 rounded-2xl' : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        {item.icon}
                        <span className="mt-1">{item.name}</span>
                    </Link>
                ))}
            </div>

        </div>
    )
}

