import React, { useState } from 'react';
import { motion } from 'motion/react';
import VaultUI from './VaultUI';

interface ClientOnboardingProps {
  onSuccess: () => void;
  onClose: () => void;
}

export default function ClientOnboarding({ onSuccess, onClose }: ClientOnboardingProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    affiliate_id: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registrationResult, setRegistrationResult] = useState<any>(null);
  const [error, setError] = useState('');

  // Extract affiliate ID from URL if present
  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const ref = urlParams.get('ref');
    if (ref) {
      setFormData(prev => ({ ...prev, affiliate_id: ref }));
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/clients/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          affiliate_id: formData.affiliate_id ? parseInt(formData.affiliate_id) : null
        })
      });
      
      if (response.ok) {
        const data = await response.json();
        setRegistrationResult(data);
      } else {
        const err = await response.json();
        setError(err.error || "Erreur lors de l'inscription");
      }
    } catch (err) {
      console.error('Error:', err);
      setError('Erreur de connexion au serveur.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (registrationResult) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <VaultUI
           accessCode={registrationResult.access_code}
           onTimeout={onSuccess}
           title="Espace Client Sécurisé"
           subtitle="Félicitations ! Votre code d'accès personnel a été généré. Veuillez le conserver précieusement pour accéder à votre espace."
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-4">
      <div className="bg-white p-8 sm:p-12 rounded-[2rem] shadow-xl w-full max-w-lg ring-1 ring-slate-900/5 relative">
        <button onClick={onClose} className="absolute top-6 right-6 text-slate-400 hover:text-slate-900 transition-colors">
          <span className="material-symbols-outlined">close</span>
        </button>
        
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
             <span className="material-symbols-outlined text-3xl">storefront</span>
          </div>
          <h2 className="text-2xl font-black text-slate-900 mb-2">Commencez Votre Projet</h2>
          <p className="text-slate-500 text-sm">Créez votre espace client pour lancer la création de votre boutique automatisée.</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-sm font-bold text-slate-900 block mb-2">Nom Complet</label>
            <input 
              required
              value={formData.name} 
              onChange={(e)=>setFormData({...formData, name: e.target.value})} 
              type="text" 
              className="w-full p-4 rounded-xl bg-slate-50 ring-1 ring-slate-200 outline-none focus:ring-2 focus:ring-primary" 
              placeholder="Jean Mukendi" 
            />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="text-sm font-bold text-slate-900 block mb-2">Téléphone</label>
              <input 
                required
                value={formData.phone} 
                onChange={(e)=>setFormData({...formData, phone: e.target.value})} 
                type="tel" 
                className="w-full p-4 rounded-xl bg-slate-50 ring-1 ring-slate-200 outline-none focus:ring-2 focus:ring-primary" 
                placeholder="+243..." 
              />
            </div>
            <div>
              <label className="text-sm font-bold text-slate-900 block mb-2">Email (Optionnel)</label>
              <input 
                value={formData.email} 
                onChange={(e)=>setFormData({...formData, email: e.target.value})} 
                type="email" 
                className="w-full p-4 rounded-xl bg-slate-50 ring-1 ring-slate-200 outline-none focus:ring-2 focus:ring-primary" 
                placeholder="nom@mail.com" 
              />
            </div>
          </div>
          
          <div>
            <label className="text-sm font-bold text-slate-900 flex justify-between mb-2">
              ID Partenaire
              <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded text-slate-400 font-bold uppercase tracking-widest">Optionnel</span>
            </label>
            <input 
              value={formData.affiliate_id} 
              onChange={(e)=>setFormData({...formData, affiliate_id: e.target.value})} 
              type="number" 
              className="w-full p-4 rounded-xl bg-slate-50 ring-1 ring-slate-200 outline-none focus:ring-2 focus:ring-primary" 
              placeholder="Ex: 5" 
            />
          </div>

          {error && <p className="text-red-500 text-sm font-medium p-3 bg-red-50 rounded-xl">{error}</p>}
          
          <button 
            disabled={isSubmitting} 
            className="w-full py-4 mt-2 bg-primary text-white rounded-xl font-bold shadow-lg hover:bg-primary-dark transition-all hover:-translate-y-1 disabled:opacity-50 flex justify-center items-center gap-2"
          >
            {isSubmitting ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : "Créer mon espace"}
          </button>
        </form>
      </div>
    </div>
  );
}
