"use client"
import React from 'react'

const categories = [
    "All", 
    "Oil & Energy", 
    "Natural Gas", 
    "Metals", 
    "Gold", 
    "Silver", 
    "Renewables"
];

interface SearchSelectProps {
    activeCategory: string;
    onCategoryChange: (category: string) => void;
}

export default function SearchSelect({ activeCategory, onCategoryChange }: SearchSelectProps) {
    return (
        <div className="w-full overflow-x-auto scrollbar-hide scroll-smooth">
            <div className="flex space-x-3 px-2 py-2 w-max">
                {categories.map((cat, idx) => (
                    <button
                        key={idx}
                        onClick={() => onCategoryChange(cat)}
                        className={`
                            whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200
                            ${activeCategory === cat 
                                ? "bg-blue-600 text-white shadow-md transform scale-105" 
                                : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 hover:border-blue-300 hover:text-blue-600"
                            }
                        `}
                    >
                        {cat}
                    </button>
                ))}
            </div>
        </div>
    );
}
