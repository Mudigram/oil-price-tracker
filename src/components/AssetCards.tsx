"use client";
import { useAxios } from "@/hooks/useAxios";
import { useState, useEffect } from "react";

const COMMODITY_CODES = [
    "BRENT_CRUDE_USD",
    "GOLD_USD",
    "WTI_CRUDE_USD",
    "NATURAL_GAS_USD",
    "HEATING_OIL_USD",
    "COAL_USD",
    "DUBAI_CRUDE_USD",
    "URALS_CRUDE_USD",
];

// Commodity display names and icons
const COMMODITY_INFO = {
    "BRENT_CRUDE_USD": { name: "Brent Crude Oil", icon: "🛢️", color: "from-blue-600 to-blue-700" },
    "GOLD_USD": { name: "Gold", icon: "🥇", color: "from-yellow-500 to-yellow-600" },
    "WTI_CRUDE_USD": { name: "WTI Crude Oil", icon: "🛢️", color: "from-blue-500 to-blue-600" },
    "NATURAL_GAS_USD": { name: "Natural Gas", icon: "⛽", color: "from-green-600 to-green-700" },
    "HEATING_OIL_USD": { name: "Heating Oil", icon: "🔥", color: "from-orange-600 to-orange-700" },
    "COAL_USD": { name: "Coal", icon: "⚫", color: "from-gray-700 to-gray-800" },
    "DUBAI_CRUDE_USD": { name: "Dubai Crude Oil", icon: "🛢️", color: "from-blue-700 to-blue-800" },
    "URALS_CRUDE_USD": { name: "Urals Crude Oil", icon: "🛢️", color: "from-blue-800 to-blue-900" },
};

interface AssetCardsProps {
    commodities?: string[];
}

export default function AssetCards({ commodities = COMMODITY_CODES }: AssetCardsProps) {
    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {commodities.map((code) => (
                <CommodityCard key={code} code={code} />
            ))}
        </div>
    );
}

function CommodityCard({ code }: { code: string }) {
    const API_URL = `https://api.oilpriceapi.com/v1/prices/latest?by_code=${code}`;
    const { data, loading, error } = useAxios(API_URL, {
        headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_OILPRICE_API_KEY}`,
        },
    });

    const commodityInfo = COMMODITY_INFO[code] || { name: code, icon: "📈", color: "from-gray-600 to-gray-700" };

    if (loading)
        return (
            <div className="bg-white p-6 rounded-xl shadow-lg animate-pulse h-48 flex flex-col justify-center items-center border border-gray-100">
                <div className="w-12 h-12 bg-gray-200 rounded-full mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
        );

    if (error)
        return (
            <div className="bg-red-50 border border-red-200 p-6 rounded-xl shadow-lg h-48 flex flex-col justify-center items-center">
                <div className="text-red-500 text-center">
                    <div className="text-2xl mb-2">⚠️</div>
                    <p className="font-medium">Error loading {commodityInfo.name}</p>
                    <p className="text-sm text-red-400">API connection issue</p>
                </div>
            </div>
        );

    const asset = data?.data;
    const price = asset?.price || 0;
    const change = asset?.change || "neutral";
    const percentChange = asset?.percent_change || 0;

    return (
        <div className={`bg-gradient-to-br ${commodityInfo.color} text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 p-6`}>
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <span className="text-2xl">{commodityInfo.icon}</span>
                    <div>
                        <h3 className="text-lg font-bold">{commodityInfo.name}</h3>
                        <p className="text-white/80 text-sm">{code}</p>
                    </div>
                </div>
                <div className="text-right">
                    <div className="text-2xl font-bold">${price.toFixed(2)}</div>
                    <div className="text-white/80 text-sm">USD</div>
                </div>
            </div>

            {/* Price Change */}
            <div className="flex items-center justify-between mb-4">
                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                    change === "up" 
                        ? "bg-green-500/20 text-green-200 border border-green-400/30" 
                        : change === "down"
                        ? "bg-red-500/20 text-red-200 border border-red-400/30"
                        : "bg-white/20 text-white/80 border border-white/30"
                }`}>
                    {change === "up" ? "▲" : change === "down" ? "▼" : "—"} {change.toUpperCase()}
                </span>
                
                <span className={`text-sm font-medium ${
                    percentChange >= 0 ? "text-green-200" : "text-red-200"
                }`}>
                    {percentChange >= 0 ? "+" : ""}{percentChange.toFixed(2)}%
                </span>
            </div>

            {/* Footer */}
            <div className="pt-4 border-t border-white/20">
                <div className="flex justify-between text-xs text-white/70">
                    <span>Last update</span>
                    <span>{asset?.created_at ? new Date(asset.created_at).toLocaleTimeString() : "Unknown"}</span>
                </div>
            </div>
        </div>
    );
}
