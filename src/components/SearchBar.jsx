// src/components/SearchBar.jsx
import { Search } from 'lucide-react';

export default function SearchBar({ value, onChange, placeholder, className = '' }) {
  return (
   <div className={`relative flex items-center w-full max-w-xs sm:max-w-sm mx-auto shadow-md rounded-md sm:rounded-lg mb-4 sm:mb-6 ${className}`}>
  <Search size={16} className="sm:size-[20px] absolute left-2 sm:left-3 text-gray-400" />
  <input
    type="text"
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className="w-full pl-7 sm:pl-10 pr-2 sm:pr-4 py-1.5 sm:py-2 text-xs sm:text-base border border-gray-200 rounded-md sm:rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
  />
</div>

  );
}