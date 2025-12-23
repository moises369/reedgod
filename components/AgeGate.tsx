
import React from 'react';

interface AgeGateProps {
  onVerify: () => void;
}

const AgeGate: React.FC<AgeGateProps> = ({ onVerify }) => {
  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-red-700 text-7xl md:text-9xl font-gothic mb-8 tracking-wider">Reedgood</h1>
      <div className="max-w-md w-full border border-neutral-800 bg-neutral-900 p-8 rounded-sm">
        <h2 className="text-red-600 text-3xl font-medieval mb-4 uppercase tracking-tighter">Entry Prohibited</h2>
        <p className="text-gray-400 mb-8 leading-relaxed">
          The following content is reserved for mature audiences. You must be at least 18 years of age to witness the darkness of Reedgood.
        </p>
        <div className="space-y-4">
          <button 
            onClick={onVerify}
            className="w-full py-4 border-2 border-red-700 text-red-700 font-bold uppercase hover:bg-red-700 hover:text-black transition-all duration-500 font-medieval tracking-widest text-xl"
          >
            I am 18+ Enter the Abyss
          </button>
          <button 
            onClick={() => window.location.href = 'https://google.com'}
            className="w-full py-2 text-gray-600 hover:text-gray-400 transition-colors uppercase text-sm"
          >
            I am a minor / Exit
          </button>
        </div>
      </div>
      <p className="mt-12 text-neutral-800 font-gothic text-2xl">Mors Vincit Omnia</p>
    </div>
  );
};

export default AgeGate;
