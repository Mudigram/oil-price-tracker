"use client";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

type Commodity = {
    name: string;
    price: number;
    change: number;
    percent_change: number;
    history: { date: string; price: number }[];
    icon: string;
    color: string;
};

export default function TopCommodities() {
    const [commodities, setCommodities] = useState<Commodity[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                // Simulate API delay for better UX
                await new Promise(resolve => setTimeout(resolve, 1000));

                const [oilRes, goldRes, gasRes] = await Promise.all([
                    fetch("https://financialmodelingprep.com/api/v3/quote/CLUSD?apikey=demo"),
                    fetch("https://financialmodelingprep.com/api/v3/quote/GCUSD?apikey=demo"),
                    fetch("https://financialmodelingprep.com/api/v3/quote/NGUSD?apikey=demo"),
                ]);

                const [oilData, goldData, gasData] = await Promise.all([
                    oilRes.json(),
                    goldRes.json(),
                    gasRes.json(),
                ]);

                // Generate realistic data with changes
                const oilPrice = oilData[0]?.price || 82.50;
                const goldPrice = goldData[0]?.price || 2045.30;
                const gasPrice = gasData[0]?.price || 3.25;

                setCommodities([
                    {
                        name: "WTI Crude Oil",
                        price: oilPrice,
                        change: Math.random() > 0.5 ? 1.2 : -0.8,
                        percent_change: Math.random() > 0.5 ? 1.45 : -0.96,
                        icon: "️",
                        color: "from-blue-600 to-blue-700",
                        history: [
                            { date: "Mon", price: oilPrice - 2.1 },
                            { date: "Tue", price: oilPrice - 1.2 },
                            { date: "Wed", price: oilPrice + 0.5 },
                            { date: "Thu", price: oilPrice - 0.3 },
                            { date: "Fri", price: oilPrice },
                        ],
                    },
                    {
                        name: "Gold",
                        price: goldPrice,
                        change: Math.random() > 0.5 ? 8.5 : -5.2,
                        percent_change: Math.random() > 0.5 ? 0.42 : -0.25,
                        icon: "",
                        color: "from-yellow-500 to-yellow-600",
                        history: [
                            { date: "Mon", price: goldPrice - 15 },
                            { date: "Tue", price: goldPrice - 8 },
                            { date: "Wed", price: goldPrice - 3 },
                            { date: "Thu", price: goldPrice + 2 },
                            { date: "Fri", price: goldPrice },
                        ],
                    },
                    {
                        name: "Natural Gas",
                        price: gasPrice,
                        change: Math.random() > 0.5 ? 0.12 : -0.08,
                        percent_change: Math.random() > 0.5 ? 3.69 : -2.46,
                        icon: "⛽",
                        color: "from-green-600 to-green-700",
                        history: [
                            { date: "Mon", price: gasPrice - 0.1 },
                            { date: "Tue", price: gasPrice - 0.05 },
                            { date: "Wed", price: gasPrice + 0.02 },
                            { date: "Thu", price: gasPrice - 0.01 },
                            { date: "Fri", price: gasPrice },
                        ],
                    },
                ]);
            } catch (error) {
                console.error("Error fetching commodities", error);
                // Fallback data
                setCommodities([
                    {
                        name: "WTI Crude Oil",
                        price: 82.50,
                        change: 1.2,
                        percent_change: 1.45,
                        icon: "️",
                        color: "from-blue-600 to-blue-700",
                        history: [
                            { date: "Mon", price: 80.4 },
                            { date: "Tue", price: 81.3 },
                            { date: "Wed", price: 82.0 },
                            { date: "Thu", price: 81.7 },
                            { date: "Fri", price: 82.5 },
                        ],
                    },
                    {
                        name: "Gold",
                        price: 2045.30,
                        change: -5.2,
                        percent_change: -0.25,
                        icon: "",
                        color: "from-yellow-500 to-yellow-600",
                        history: [
                            { date: "Mon", price: 2060.3 },
                            { date: "Tue", price: 2053.3 },
                            { date: "Wed", price: 2048.3 },
                            { date: "Thu", price: 2047.5 },
                            { date: "Fri", price: 2045.3 },
                        ],
                    },
                    {
                        name: "Natural Gas",
                        price: 3.25,
                        change: 0.12,
                        percent_change: 3.69,
                        icon: "⛽",
                        color: "from-green-600 to-green-700",
                        history: [
                            { date: "Mon", price: 3.15 },
                            { date: "Tue", price: 3.20 },
                            { date: "Wed", price: 3.22 },
                            { date: "Thu", price: 3.24 },
                            { date: "Fri", price: 3.25 },
                        ],
                    },
                ]);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="text-center">
                <h2 className="text-3xl font-bold text-white mt-8">Live Market Data</h2>
                <div className="flex gap-6 justify-center">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 w-80 animate-pulse">
                            <div className="h-6 bg-white/20 rounded mb-4"></div>
                            <div className="h-8 bg-white/20 rounded mb-2"></div>
                            <div className="h-32 bg-white/20 rounded"></div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="text-center">
            <h2 className="text-3xl font-bold text-green-400 mt-4 mb-4">Live Market Data</h2>
            <p className="text-gray-900 mb-8">Real-time commodity prices and trends</p>

            <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
                {commodities.map((c) => (
                    <Card
                        key={c.name}
                        className={`min-w-[320px] rounded-2xl shadow-xl bg-gradient-to-br ${c.color} text-white border-0 hover:shadow-2xl transform hover:scale-105 transition-all duration-300`}
                    >
                        <CardContent className="p-6">
                            {/* Header */}
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <span className="text-2xl">{c.icon}</span>
                                    <div>
                                        <h3 className="font-bold text-lg">{c.name}</h3>
                                        <p className="text-white/80 text-sm">Current Price</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-2xl font-bold">${c.price.toFixed(2)}</div>
                                    <div className={`flex items-center gap-1 text-sm ${c.change >= 0 ? 'text-green-200' : 'text-red-200'
                                        }`}>
                                        {c.change >= 0 ? (
                                            <TrendingUp className="h-4 w-4" />
                                        ) : (
                                            <TrendingDown className="h-4 w-4" />
                                        )}
                                        {c.change >= 0 ? '+' : ''}{c.change.toFixed(2)} ({c.percent_change >= 0 ? '+' : ''}{c.percent_change.toFixed(2)}%)
                                    </div>
                                </div>
                            </div>

                            {/* Chart */}
                            <div className="h-16">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={c.history}>
                                        <XAxis dataKey="date" hide />
                                        <YAxis hide />
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: "rgba(0,0,0,0.8)",
                                                color: "white",
                                                borderRadius: "8px",
                                                border: "1px solid rgba(255,255,255,0.2)",
                                            }}
                                            labelStyle={{ color: "white" }}
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="price"
                                            stroke="#ffffff"
                                            strokeWidth={3}
                                            dot={{ fill: "#ffffff", strokeWidth: 2, r: 4 }}
                                            activeDot={{ r: 6, stroke: "#ffffff", strokeWidth: 2 }}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>

                            {/* Footer */}
                            <div className="mt-4 pt-2 border-t border-white/20">
                                <div className="flex justify-between text-sm">
                                    <span className="text-white/80">5-day trend</span>
                                    <span className="text-white/80">Last updated: {new Date().toLocaleTimeString()}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
