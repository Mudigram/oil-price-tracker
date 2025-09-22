"use client"
import React, { useState, useMemo } from 'react'
import { Input } from '@/components/ui/input'
import { Search, Filter, X } from "lucide-react";
import AssetCards from "@/components/AssetCards";
import Navbar from '@/components/Navbar';
import SearchSelect from '@/components/SearchSelect'
import { Button } from '@/components/ui/button';

// Define commodity categories with their associated codes
const COMMODITY_CATEGORIES = {
    "Oil & Energy": ["BRENT_CRUDE_USD", "WTI_CRUDE_USD", "DUBAI_CRUDE_USD", "URALS_CRUDE_USD", "HEATING_OIL_USD"],
    "Natural Gas": ["NATURAL_GAS_USD"],
    "Metals": ["GOLD_USD", "SILVER_USD", "PLATINUM_USD", "COPPER_USD"],
    "Gold": ["GOLD_USD"],
    "Silver": ["SILVER_USD"],
    "Renewables": ["COAL_USD", "CARBON_CREDITS_USD"],
    "All": ["BRENT_CRUDE_USD", "GOLD_USD", "WTI_CRUDE_USD", "NATURAL_GAS_USD", "HEATING_OIL_USD", "COAL_USD", "DUBAI_CRUDE_USD", "URALS_CRUDE_USD"]
};

// Commodity display names for search
const COMMODITY_NAMES = {
    "BRENT_CRUDE_USD": "Brent Crude Oil",
    "GOLD_USD": "Gold",
    "WTI_CRUDE_USD": "WTI Crude Oil",
    "NATURAL_GAS_USD": "Natural Gas",
    "HEATING_OIL_USD": "Heating Oil",
    "COAL_USD": "Coal",
    "DUBAI_CRUDE_USD": "Dubai Crude Oil",
    "URALS_CRUDE_USD": "Urals Crude Oil",
    "SILVER_USD": "Silver",
    "PLATINUM_USD": "Platinum",
    "COPPER_USD": "Copper",
    "CARBON_CREDITS_USD": "Carbon Credits"
};

export default function Market() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState("Oil & Energy");
    const [showFilters, setShowFilters] = useState(false);

    // Filter commodities based on search and category
    const filteredCommodities = useMemo(() => {
        let commodities = COMMODITY_CATEGORIES[selectedCategory] || COMMODITY_CATEGORIES["All"];

        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            commodities = commodities.filter(code => {
                const name = COMMODITY_NAMES[code] || code;
                return name.toLowerCase().includes(query) || code.toLowerCase().includes(query);
            });
        }

        return commodities;
    }, [searchQuery, selectedCategory]);

    const handleClearSearch = () => {
        setSearchQuery('');
    };

    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category);
        // Clear search when changing category for better UX
        setSearchQuery('');
    };

    return (
        <div className='min-h-screen bg-gray-100 pb-20'>
            {/* Header */}
            <div className='bg-white shadow-sm border-b sticky top-0 z-10'>
                <div className="p-6">
                    {/* Search Bar */}
                    <div className="relative mb-4">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-green-400" />
                        <Input
                            type="search"
                            placeholder="Search commodities (e.g., Oil, Gold, Gas)..."
                            className="pl-12 pr-12 bg-gray-100 h-12 border-green-200 focus:border-blue-500 focus:ring-green-500"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        {searchQuery && (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={handleClearSearch}
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-gray-100"
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        )}
                    </div>

                    {/* Filter Toggle */}
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <Filter className="h-5 w-5 text-green-400" />
                            <span className="text-sm font-medium text-gray-700">Filters</span>
                        </div>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setShowFilters(!showFilters)}
                            className="text-green-600 border-green-200 hover:bg-green-50"
                        >
                            {showFilters ? 'Hide' : 'Show'} Filters
                        </Button>
                    </div>

                    {/* Category Selector */}
                    {showFilters && (
                        <div className="bg-gray-100 rounded-lg p-4 mb-4">
                            <SearchSelect
                                activeCategory={selectedCategory}
                                onCategoryChange={handleCategoryChange}
                            />
                        </div>
                    )}

                    {/* Results Summary */}
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className='text-xl font-bold text-green-400'>
                                {selectedCategory} Markets
                            </h2>
                            <p className="text-sm text-gray-600">
                                {searchQuery ? `Showing ${filteredCommodities.length} results for "${searchQuery}"` :
                                    `Showing ${filteredCommodities.length} commodities`}
                            </p>
                        </div>

                        {/* Quick Stats */}
                        <div className="text-right">
                            <div className="text-sm text-green-400">
                                {filteredCommodities.length} {filteredCommodities.length === 1 ? 'asset' : 'assets'}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="p-6">
                {filteredCommodities.length === 0 ? (
                    <div className="text-center py-12">
                        <Search className="h-12 w-12 text-green-400 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-green-400 mb-2">No results found</h3>
                        <p className="text-green-600 mb-4">
                            Try adjusting your search terms or selecting a different category
                        </p>
                        <Button
                            variant="outline"
                            onClick={() => {
                                setSearchQuery('');
                                setSelectedCategory("All");
                            }}
                            className="text-green-600 border-green-200 hover:bg-green-50"
                        >
                            Clear all filters
                        </Button>
                    </div>
                ) : (
                    <AssetCards commodities={filteredCommodities} />
                )}
            </div>

            <Navbar />
        </div>
    )
}

