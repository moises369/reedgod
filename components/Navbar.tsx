
import React from 'react';
import { View } from '../types';

interface NavbarProps {
  setView: (view: View) => void;
  cartCount: number;
}

const Navbar: React.FC<NavbarProps> = ({ setView, cartCount }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 border-b border-red-900 px-6 py-4 flex justify-between items-center backdrop-blur-md">
      <button 
        onClick={() => setView('home')}
        className="text-red-700 text-4xl font-gothic hover:text-red-500 transition-colors"
      >
        Reedgood
      </button>
      
      <div className="flex gap-8 items-center">
        <button 
          onClick={() => setView('shop')}
          className="text-gray-400 hover:text-red-600 font-medieval uppercase tracking-widest transition-colors hidden md:block"
        >
          The Vault
        </button>
        <button 
          onClick={() => setView('cart')}
          className="relative text-red-700 hover:text-red-500 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
          </svg>
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-700 text-black text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
