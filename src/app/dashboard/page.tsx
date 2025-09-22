"use client"
import React from 'react'
import { useAuth } from '@/context/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoutes';
import { Bell } from 'lucide-react';
import AssetCards from "@/components/AssetCards";
import NewsCard from '@/components/NewsCard';
import TopCommodities from '@/components/TopCommodities';


export default function Dashboard() {

    const { user } = useAuth();

    return (
        <ProtectedRoute>
            <div className=''>
                <div className='p-8'>
                    <div className='justify-between flex'>
                        <p className='font-medium'>Welcome, </p>
                        <Bell />
                    </div>
                    <div className='text-2xl font-bold'>
                        {user?.name || user?.email || 'Guest'}!
                    </div>
                    <TopCommodities />
                    <NewsCard />
                    <h1 className='text-2xl font-semibold mb-4'>Watchlist</h1>
                    <AssetCards />


                    {/* <Navbar /> */}


                </div>
            </div>
        </ProtectedRoute >
    )
}
