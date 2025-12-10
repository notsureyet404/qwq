import React from 'react';
import { CheckCircle, ArrowLeft } from 'lucide-react';

const Thanks: React.FC = () => {
  return (
    <div className="min-h-full flex flex-col items-center justify-center p-8 text-center animate-fade-in">
      <div className="w-24 h-24 rounded-full bg-neon-green/20 flex items-center justify-center mb-6">
        <CheckCircle className="w-12 h-12 text-green-400" />
      </div>
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Transmission Received</h1>
      <p className="text-xl text-slate-400 max-w-lg mb-8">
        Your data has been successfully sent to me. I will review your frequency and contact you via Telegram if resonance is detected.
      </p>
      
      <a 
        href="#/"
        className="inline-flex items-center text-neon-blue hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Return to Frequency
      </a>
    </div>
  );
};

export default Thanks;