
import React, { useState, useEffect, useCallback } from 'react';
import AgeGate from './components/AgeGate';
import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';
import { Product, CartItem, View } from './types';
import { PRODUCTS } from './constants';
import { getGothicQuote, getCustomDescription } from './services/geminiService';

const App: React.FC = () => {
  const [isAdult, setIsAdult] = useState<boolean>(false);
  const [view, setView] = useState<View>('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [gothicQuote, setGothicQuote] = useState<string>("In the heart of darkness, find your style.");
  const [loadingQuote, setLoadingQuote] = useState<boolean>(true);

  useEffect(() => {
    const fetchQuote = async () => {
      const quote = await getGothicQuote();
      setGothicQuote(quote);
      setLoadingQuote(false);
    };
    if (isAdult) fetchQuote();
  }, [isAdult]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (!isAdult) {
    return <AgeGate onVerify={() => setIsAdult(true)} />;
  }

  return (
    <div className="min-h-screen flex flex-col pt-20">
      <Navbar setView={setView} cartCount={cartCount} />

      <main className="flex-grow">
        {view === 'home' && (
          <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
            <img 
              src="https://picsum.photos/seed/darkhero/1920/1080?grayscale" 
              className="absolute inset-0 w-full h-full object-cover brightness-[0.3]" 
              alt="Hero"
            />
            <div className="relative z-10 text-center px-6">
              <h1 className="text-red-700 text-8xl md:text-[12rem] font-gothic mb-4 drop-shadow-[0_5px_15px_rgba(0,0,0,1)]">
                Reedgood
              </h1>
              <p className="text-white font-medieval text-xl md:text-3xl uppercase tracking-[0.3em] mb-8">
                Shadows & Silk
              </p>
              <div className="max-w-xl mx-auto italic text-red-600 font-light opacity-80 mb-12 h-12">
                {loadingQuote ? '...' : `"${gothicQuote}"`}
              </div>
              <button 
                onClick={() => setView('shop')}
                className="px-12 py-4 border-2 border-red-700 text-red-700 font-bold uppercase hover:bg-red-700 hover:text-black transition-all font-medieval tracking-widest text-2xl"
              >
                Enter the Shop
              </button>
            </div>
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
              <div className="w-1 h-12 bg-red-800"></div>
            </div>
          </section>
        )}

        {(view === 'shop' || view === 'home') && (
          <section className="bg-black py-24 px-6 md:px-12">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                <div>
                  <h2 className="text-red-700 text-6xl font-gothic mb-4">The Collection</h2>
                  <p className="text-gray-500 font-medieval uppercase tracking-widest">Selected Artifacts for the Damned</p>
                </div>
                <div className="flex gap-4">
                  {['Men', 'Women', 'Occult', 'Accessories'].map(cat => (
                    <button key={cat} className="text-xs text-neutral-600 hover:text-red-600 transition-colors uppercase font-bold border-b border-transparent hover:border-red-600">
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {PRODUCTS.map(product => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    onAddToCart={addToCart} 
                    onSelect={setSelectedProduct}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        {view === 'cart' && (
          <section className="bg-neutral-950 py-24 px-6 md:px-12 min-h-screen">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-red-700 text-6xl font-gothic mb-12">Sacrifices Pending</h2>
              {cart.length === 0 ? (
                <div className="text-center py-24">
                  <p className="text-gray-600 font-medieval text-2xl mb-8 uppercase">The altar is empty</p>
                  <button onClick={() => setView('shop')} className="text-red-700 underline font-bold uppercase tracking-widest">Return to the vault</button>
                </div>
              ) : (
                <div className="space-y-8">
                  {cart.map(item => (
                    <div key={item.id} className="flex gap-6 border-b border-neutral-800 pb-8 items-center">
                      <img src={item.imageUrl} className="w-24 h-32 object-cover grayscale" alt={item.name} />
                      <div className="flex-grow">
                        <h3 className="text-red-600 font-medieval text-2xl uppercase tracking-tighter">{item.name}</h3>
                        <p className="text-gray-500 text-sm">Qty: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-bold text-xl">${item.price * item.quantity}</p>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-neutral-700 hover:text-red-500 transition-colors text-xs uppercase font-bold mt-2"
                        >
                          Cast Away
                        </button>
                      </div>
                    </div>
                  ))}
                  <div className="pt-8 flex flex-col items-end">
                    <p className="text-gray-400 font-medieval text-xl mb-2">Total Obligation</p>
                    <p className="text-red-700 text-5xl font-gothic mb-8">${cartTotal}</p>
                    <button 
                      onClick={() => alert("Checkout processed in the shadows...")}
                      className="px-12 py-4 bg-red-700 text-black font-bold uppercase hover:bg-red-500 transition-all font-medieval tracking-widest text-2xl w-full md:w-auto"
                    >
                      Complete the Ritual
                    </button>
                  </div>
                </div>
              )}
            </div>
          </section>
        )}
      </main>

      <footer className="bg-black border-t border-neutral-900 py-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="text-red-700 text-4xl font-gothic mb-6">Reedgood</h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              Established in the echoes of the catacombs. We provide vestments for those who walk between the worlds. 18+ exclusive couture for the dark soul.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="text-white font-medieval uppercase tracking-widest mb-6">Manifesto</h4>
            <ul className="text-gray-600 text-sm space-y-2">
              <li className="hover:text-red-600 cursor-pointer">Shadow Policy</li>
              <li className="hover:text-red-600 cursor-pointer">The Coven Terms</li>
              <li className="hover:text-red-600 cursor-pointer">Shipping from the Void</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-medieval uppercase tracking-widest mb-6">Summon Us</h4>
            <p className="text-red-900 text-xl font-medieval mb-4">darkness@reedgood.void</p>
            <div className="flex gap-4">
              <div className="w-10 h-10 border border-neutral-800 rounded-full flex items-center justify-center hover:bg-red-900 transition-colors cursor-pointer">
                <span className="text-white text-xs">†</span>
              </div>
              <div className="w-10 h-10 border border-neutral-800 rounded-full flex items-center justify-center hover:bg-red-900 transition-colors cursor-pointer">
                <span className="text-white text-xs">‡</span>
              </div>
              <div className="w-10 h-10 border border-neutral-800 rounded-full flex items-center justify-center hover:bg-red-900 transition-colors cursor-pointer">
                <span className="text-white text-xs">ψ</span>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center mt-16 pt-8 border-t border-neutral-900">
          <p className="text-neutral-800 font-gothic text-lg">&copy; 1888-2024 Reedgood. All Souls Reserved.</p>
        </div>
      </footer>

      {/* Product Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[110] bg-black/95 flex items-center justify-center p-6 backdrop-blur-sm overflow-y-auto">
          <div className="max-w-5xl w-full bg-neutral-950 border border-red-900 relative">
            <button 
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 text-red-700 hover:text-red-500 z-10"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2 aspect-[3/4]">
                <img src={selectedProduct.imageUrl} className="w-full h-full object-cover grayscale brightness-75" alt={selectedProduct.name} />
              </div>
              <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                <h2 className="text-red-700 text-6xl font-gothic mb-2">{selectedProduct.name}</h2>
                <p className="text-white font-medieval text-xl mb-6 uppercase tracking-widest">${selectedProduct.price}</p>
                <div className="h-px bg-red-900 w-24 mb-6"></div>
                <p className="text-gray-400 leading-relaxed mb-8 italic">
                  {selectedProduct.description}
                </p>
                <p className="text-neutral-700 text-xs mb-8 uppercase tracking-tighter">
                  Hand-crafted in the deepest pits of the artisan district. Limited ritual batches only. 18+ mature handling required.
                </p>
                <button 
                  onClick={() => {
                    addToCart(selectedProduct);
                    setSelectedProduct(null);
                  }}
                  className="w-full py-4 bg-red-700 text-black font-bold uppercase hover:bg-red-600 transition-all font-medieval tracking-[0.2em] text-xl"
                >
                  Bind to Soul
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
