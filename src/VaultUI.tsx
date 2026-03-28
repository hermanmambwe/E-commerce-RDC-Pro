import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface VaultUIProps {
  accessCode: string;
  onTimeout: () => void;
  title: string;
  subtitle: string;
}

export default function VaultUI({ accessCode, onTimeout, title, subtitle }: VaultUIProps) {
  const [timeLeft, setTimeLeft] = useState(60);
  const [copied, setCopied] = useState(false);
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    if (timeLeft <= 0) {
      setExpired(true);
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleCopy = () => {
    navigator.clipboard.writeText(accessCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (expired) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
        <span className="material-symbols-outlined text-5xl text-red-500 mb-4">gpp_maybe</span>
        <h3 className="text-2xl font-black text-white mb-2">Délai Expiré</h3>
        <p className="text-slate-400 mb-6">Le délai est expiré pour des raisons de sécurité. Si vous n'avez pas noté votre code, veuillez le demander à l'administrateur via WhatsApp.</p>
        <button onClick={onTimeout} className="bg-slate-800 text-white px-6 py-2 rounded-xl border border-slate-700 font-bold hover:bg-slate-700 transition">
          Fermer
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-slate-900 border border-slate-700/50 rounded-3xl p-8 max-w-md mx-auto relative overflow-hidden text-center shadow-2xl">
      <div className="absolute top-0 left-0 w-full h-1 bg-slate-800">
        <motion.div 
          className="h-full bg-gradient-to-r from-red-500 to-orange-500" 
          initial={{ width: "100%" }} 
          animate={{ width: "0%" }} 
          transition={{ duration: 60, ease: "linear" }}
        />
      </div>
      
      <span className="material-symbols-outlined text-5xl text-emerald-400 mb-4 mt-2">lock_open</span>
      <h3 className="text-2xl font-black text-white mb-1">{title}</h3>
      <p className="text-slate-400 text-sm mb-6">{subtitle}</p>
      
      <div className="bg-slate-950 rounded-2xl p-6 border border-slate-800 relative group">
         <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Votre Code d'Accès</p>
         <p className="text-5xl font-mono font-black tracking-[0.2em] text-white break-all mb-4">
           {accessCode}
         </p>
         <div className="flex justify-center gap-4">
            <button onClick={handleCopy} className={`flex items-center gap-2 px-6 py-2 rounded-xl font-bold transition-all ${copied ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}>
              <span className="material-symbols-outlined text-sm">{copied ? 'check' : 'content_copy'}</span>
              {copied ? 'Copié !' : 'Copier le code'}
            </button>
         </div>
         <div className="absolute top-4 right-4 text-xs font-bold text-slate-500 flex items-center gap-1">
            <span className="material-symbols-outlined text-sm text-red-500 animate-pulse">timer</span>
            00:{timeLeft.toString().padStart(2, '0')}
         </div>
      </div>
      
      <div className="mt-6 flex justify-center">
        <button onClick={onTimeout} className="text-slate-500 hover:text-white transition-colors text-sm font-bold flex items-center gap-1">
          J'ai noté mon code <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </button>
      </div>
    </motion.div>
  );
}
