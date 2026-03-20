import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface AffiliateOnboardingProps {
  affiliateId: number;
  affiliateName: string;
  onComplete: () => void;
}

export default function AffiliateOnboarding({ affiliateId, affiliateName, onComplete }: AffiliateOnboardingProps) {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleFinish = async () => {
    setLoading(true);
    try {
      await fetch(`/api/affiliates/${affiliateId}/onboarding`, { method: 'POST' });
      onComplete();
    } catch (e) {
      console.error(e);
      onComplete(); // Proceed even if offline
    }
  };

  const steps = [
    {
      title: "Bienvenue dans la Révolution",
      subtitle: `Bonjour ${affiliateName}`,
      description: "Plus qu'une simple plateforme, E-commerce RDC Pro est un mouvement visant à transformer l'économie numérique de notre pays. Nous sommes ravis de vous avoir parmi nous.",
      icon: "rocket_launch",
      color: "from-blue-600 to-indigo-600",
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=2574&auto=format&fit=crop"
    },
    {
      title: "Notre Produit Unique",
      subtitle: "La solution ultime",
      description: "Nous construisons des boutiques en ligne clés en main, pré-intégrées avec M-Pesa, Airtel et Orange Money. Une automatisation totale qui manquait cruellement aux entrepreneurs congolais face aux géants mondiaux.",
      icon: "storefront",
      color: "from-orange-500 to-red-500",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2574&auto=format&fit=crop"
    },
    {
      title: "Impact sur les Boutiques",
      subtitle: "Changer des vies",
      description: "En proposant cette solution, vous permettez aux vendeurs locaux de dormir pendant que leur site engrange des ventes et livre des produits numériques. Vous les libérez des transactions WhatsApp manuelles et fastidieuses.",
      icon: "trending_up",
      color: "from-green-500 to-emerald-600",
      image: "https://images.unsplash.com/photo-1556761175-4b46a572b786?q=80&w=2574&auto=format&fit=crop"
    },
    {
      title: "Votre Rôle, Votre Avenir",
      subtitle: "Gagnez en impactant",
      description: "Chaque recommandation réussie vous rapporte une énorme commission. En changeant la vie d'un entrepreneur en RDC, vous bâtissez votre propre indépendance financière, sans aucun capital de départ.",
      icon: "workspace_premium",
      color: "from-purple-500 to-pink-500",
      image: "https://images.unsplash.com/photo-1573164574572-cb89e39749b4?q=80&w=2669&auto=format&fit=crop"
    }
  ];

  const currentStep = steps[step];
  const isLastStep = step === steps.length - 1;

  const handleNext = () => {
    if (isLastStep) {
      handleFinish();
    } else {
      setStep(s => s + 1);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-slate-950 flex items-center justify-center p-4 sm:p-8 font-sans overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div 
          key={step}
          initial={{ opacity: 0, x: 20, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -20, scale: 0.95 }}
          transition={{ duration: 0.5, ease: "anticipate" }}
          className="w-full max-w-6xl bg-slate-900 rounded-[3rem] overflow-hidden shadow-2xl ring-1 ring-white/10 flex flex-col lg:flex-row h-[85vh] max-h-[800px]"
        >
          {/* Left Side - Visuals */}
          <div className="hidden lg:block lg:w-1/2 relative bg-slate-800">
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent z-10 mix-blend-multiply"></div>
            <div className={`absolute inset-0 bg-gradient-to-br ${currentStep.color} opacity-40 mix-blend-overlay z-10`}></div>
            <img 
              src={currentStep.image} 
              alt={currentStep.title} 
              className="w-full h-full object-cover grayscale-[20%]"
            />
            <div className="absolute top-12 left-12 z-20">
              <div className={`w-16 h-16 rounded-3xl flex items-center justify-center bg-gradient-to-br ${currentStep.color} text-white shadow-2xl`}>
                <span className="material-symbols-outlined text-3xl">{currentStep.icon}</span>
              </div>
            </div>
            
            {/* Dots indicator layered on image */}
            <div className="absolute bottom-12 left-12 z-20 flex gap-3">
              {steps.map((_, i) => (
                <div 
                  key={i} 
                  className={`h-2 rounded-full transition-all duration-500 ${i === step ? 'w-10 bg-white' : 'w-2 bg-white/30'}`}
                />
              ))}
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center p-8 sm:p-12 lg:p-16 relative">
            <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl ${currentStep.color} rounded-full blur-[100px] opacity-20 -translate-y-1/2 translate-x-1/2 pointer-events-none`}></div>
            
            <div className="flex-1 flex flex-col justify-center">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <div className="lg:hidden w-16 h-16 rounded-3xl flex items-center justify-center bg-gradient-to-br from-white/10 to-white/5 border border-white/10 text-white mb-8">
                  <span className="material-symbols-outlined text-3xl">{currentStep.icon}</span>
                </div>
                
                <h3 className={`text-sm font-black uppercase tracking-widest bg-clip-text text-transparent bg-gradient-to-r ${currentStep.color} mb-3`}>
                  {currentStep.subtitle}
                </h3>
                <h2 className="text-4xl sm:text-5xl font-display font-black text-white mb-6 leading-tight tracking-tight">
                  {currentStep.title}
                </h2>
                <p className="text-lg sm:text-xl text-slate-400 leading-relaxed max-w-lg">
                  {currentStep.description}
                </p>
              </motion.div>
            </div>

            {/* Mobile Dots */}
            <div className="lg:hidden flex gap-3 mb-8 justify-center">
              {steps.map((_, i) => (
                <div 
                  key={i} 
                  className={`h-2 rounded-full transition-all duration-500 ${i === step ? `w-10 bg-gradient-to-r ${currentStep.color}` : 'w-2 bg-white/10'}`}
                />
              ))}
            </div>

            <div className="pt-8">
              <button
                onClick={handleNext}
                disabled={loading}
                className={`w-full py-5 rounded-2xl font-black text-sm uppercase tracking-widest text-white shadow-xl transition-all disabled:opacity-50 flex items-center justify-center gap-3 hover:-translate-y-1 bg-gradient-to-r ${currentStep.color}`}
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : isLastStep ? (
                  <>
                    Explorer mon Dashboard <span className="material-symbols-outlined">launch</span>
                  </>
                ) : (
                  <>
                    Continuer <span className="material-symbols-outlined">arrow_forward</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
