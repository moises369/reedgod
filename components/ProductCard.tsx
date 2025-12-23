
import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (p: Product) => void;
  onSelect: (p: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onSelect }) => {
  return (
    <div className="group relative bg-neutral-900 border border-neutral-800 overflow-hidden hover:border-red-900 transition-all duration-700">
      <div 
        className="aspect-[2/3] w-full overflow-hidden cursor-pointer"
        onClick={() => onSelect(product)}
      >
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 brightness-75 group-hover:brightness-100"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all pointer-events-none"></div>
      </div>
      
      <div className="p-4 border-t border-neutral-800">
        <div className="flex justify-between items-start mb-2">
          <h3 
            className="text-red-700 font-medieval text-xl cursor-pointer hover:underline"
            onClick={() => onSelect(product)}
          >
            {product.name}
          </h3>
          <span className="text-white font-bold">${product.price}</span>
        </div>
        <p className="text-gray-500 text-xs mb-4 line-clamp-2 uppercase tracking-tighter">
          {product.category} &mdash; {product.description}
        </p>
        <button 
          onClick={() => onAddToCart(product)}
          className="w-full py-2 bg-transparent border border-red-900 text-red-900 hover:bg-red-900 hover:text-black transition-all font-bold uppercase text-xs tracking-[0.2em]"
        >
          Claim This Soul
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
