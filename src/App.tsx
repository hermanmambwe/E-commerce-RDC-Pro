import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import AboutUs from './AboutUs';
import AffiliateOnboarding from './AffiliateOnboarding';
import ChatWidget from './ChatWidget';
import AdminChatSupport from './AdminChatSupport';
import ClientPortal from './ClientPortal';
import AdminClientsModule from './AdminClientsModule';
import VaultUI from './VaultUI';
import ClientOnboarding from './ClientOnboarding';

function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({ days: 2, hours: 14, minutes: 35, seconds: 42 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { days, hours, minutes, seconds } = prev;
        if (seconds > 0) {
          seconds--;
        } else {
          seconds = 59;
          if (minutes > 0) {
            minutes--;
          } else {
            minutes = 59;
            if (hours > 0) {
              hours--;
            } else {
              hours = 23;
              if (days > 0) {
                days--;
              }
            }
          }
        }
        return { days, hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-slate-950 text-slate-300 py-2.5 overflow-hidden relative z-[60]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center items-center gap-4 text-xs sm:text-sm font-medium tracking-wide">
        <span className="flex items-center gap-1.5">
          <span className="material-symbols-outlined text-sm text-accent-vibrant animate-pulse">timer</span>
          L'OFFRE EXPIRE DANS :
        </span>
        <div className="flex gap-1.5">
          <span className="bg-white/10 text-white px-2 py-0.5 rounded font-mono">{String(timeLeft.days).padStart(2, '0')}j</span>
          <span className="bg-white/10 text-white px-2 py-0.5 rounded font-mono">{String(timeLeft.hours).padStart(2, '0')}h</span>
          <span className="bg-white/10 text-white px-2 py-0.5 rounded font-mono">{String(timeLeft.minutes).padStart(2, '0')}m</span>
          <span className="bg-accent-vibrant/20 text-accent-vibrant px-2 py-0.5 rounded font-mono">{String(timeLeft.seconds).padStart(2, '0')}s</span>
        </div>
        <span className="hidden md:inline border-l border-white/10 pl-4 text-slate-400">Plus que <span className="text-white font-bold">2 places</span> à ce tarif !</span>
      </div>
    </div>
  );
}

function FloatingWhatsApp() {
  return (
    <a
      href="https://wa.me/243837944949"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-[100] group flex items-center justify-center"
      aria-label="Contactez-nous sur WhatsApp"
    >
      <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-75"></div>
      <div className="relative bg-green-500 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30 ring-4 ring-white transition-transform duration-300 group-hover:scale-110">
        <svg
          className="w-8 h-8"
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.489-1.761-1.663-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
        </svg>
      </div>
    </a>
  );
}

function Header({ onLoginClick }: { onLoginClick: () => void }) {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    return scrollY.onChange((latest) => {
      setIsScrolled(latest > 50);
    });
  }, [scrollY]);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`sticky top-0 w-full z-50 transition-all duration-300 border-b ${isScrolled
        ? 'bg-white/90 backdrop-blur-xl border-slate-200/50 shadow-sm py-2'
        : 'bg-transparent border-transparent py-4'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2.5">
            <div className={`flex items-center justify-center text-white shadow-lg bg-primary rounded-xl transition-all duration-300 ${isScrolled ? 'w-8 h-8 shadow-primary/20' : 'w-10 h-10 shadow-primary/30'}`}>
              <span className={`material-symbols-outlined ${isScrolled ? 'text-lg' : 'text-2xl'}`}>storefront</span>
            </div>
            <span className={`font-extrabold tracking-tight text-slate-900 transition-all duration-300 ${isScrolled ? 'text-lg' : 'text-xl'}`}>E-commerce RDC Pro</span>
          </div>

          <nav className="hidden lg:flex space-x-8">
            <a className="text-sm font-semibold text-slate-600 hover:text-primary transition-colors" href="/?page=about">À propos</a>
            <a className="text-sm font-semibold text-slate-600 hover:text-primary transition-colors" href="/#features">Fonctionnalités</a>
            <a className="text-sm font-semibold text-slate-600 hover:text-primary transition-colors" href="/#showcase">Modèles</a>
            <a className="text-sm font-semibold text-slate-600 hover:text-primary transition-colors" href="/#comparison">Pourquoi nous ?</a>
            <a className="text-sm font-semibold text-slate-600 hover:text-primary transition-colors" href="/#pricing">Tarifs</a>
            <a className="text-sm font-semibold text-accent-vibrant hover:text-orange-600 transition-colors flex items-center gap-1" href="/#affiliate">
              <span className="material-symbols-outlined text-sm">loyalty</span>
              Affiliation
            </a>
          </nav>

          <div className="flex items-center gap-4">
            <button
              onClick={onLoginClick}
              className="hidden sm:block bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 md:px-6 md:py-2.5 rounded-full font-bold text-xs md:text-sm transition-all shadow-lg shadow-slate-900/20 hover:-translate-y-0.5"
            >
              Mon Compte
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 hover:text-primary transition-colors"
            >
              <span className="material-symbols-outlined text-2xl">
                {isMobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-slate-100 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              <a onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-3 text-base font-bold text-slate-700 hover:bg-slate-50 rounded-xl" href="/?page=about">À propos</a>
              <a onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-3 text-base font-bold text-slate-700 hover:bg-slate-50 rounded-xl" href="/#features">Fonctionnalités</a>
              <a onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-3 text-base font-bold text-slate-700 hover:bg-slate-50 rounded-xl" href="/#showcase">Modèles</a>
              <a onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-3 text-base font-bold text-slate-700 hover:bg-slate-50 rounded-xl" href="/#comparison">Pourquoi nous ?</a>
              <a onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-3 text-base font-bold text-slate-700 hover:bg-slate-50 rounded-xl" href="/#pricing">Tarifs</a>
              <a onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-3 text-base font-bold text-accent-vibrant hover:bg-orange-50 rounded-xl flex items-center gap-2" href="/#affiliate">
                <span className="material-symbols-outlined text-sm">loyalty</span>
                Affiliation
              </a>
              <div className="pt-4 px-3">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onLoginClick();
                  }}
                  className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold text-sm shadow-xl"
                >
                  Mon Compte
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

function Hero() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 150]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -50]);
  const imageScale = useTransform(scrollY, [0, 800], [1, 1.08]);
  const badgeY = useTransform(scrollY, [0, 800], [0, -40]);

  return (
    <section className="relative pt-8 pb-24 lg:pt-16 lg:pb-40 overflow-hidden bg-white">
      {/* Subtle background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full overflow-hidden -z-10 pointer-events-none">
        <motion.div style={{ y: y2 }} className="absolute -top-[20%] -right-[10%] w-[70%] h-[70%] rounded-full bg-primary/5 blur-3xl"></motion.div>
        <motion.div style={{ y: y1 }} className="absolute top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-accent-vibrant/5 blur-3xl"></motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-10"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/10 text-primary text-sm font-semibold tracking-wide">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Offre Spéciale Lancement
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-display font-extrabold leading-[1.1] tracking-tight text-slate-900">
              Lancez votre boutique en ligne <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-500 to-indigo-600 animate-pulse">automatisée</span> en RDC.
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-slate-600 leading-relaxed max-w-xl">
              Encaissez vos clients par M-Pesa, Airtel et Orange Money. Offre spéciale à <span className="font-bold text-slate-900">$1,125</span> incluant le nom de domaine offert.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="w-full sm:w-auto bg-gradient-to-r from-accent-vibrant to-orange-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-4 rounded-full font-bold text-lg transition-all hover:scale-105 hover:shadow-2xl hover:shadow-accent-vibrant/40 flex items-center justify-center gap-2 relative overflow-hidden group">
                <span className="relative z-10">Réserver ma remise</span>
                <span className="material-symbols-outlined relative z-10 group-hover:translate-x-1 transition-transform">arrow_forward</span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out z-0"></div>
              </button>
            </div>
            <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
              <div className="flex -space-x-2">
                <img className="w-8 h-8 rounded-full border-2 border-white" src="https://i.pravatar.cc/100?img=1" alt="User" />
                <img className="w-8 h-8 rounded-full border-2 border-white" src="https://i.pravatar.cc/100?img=2" alt="User" />
                <img className="w-8 h-8 rounded-full border-2 border-white" src="https://i.pravatar.cc/100?img=3" alt="User" />
              </div>
              <p className="text-sm text-slate-500 font-medium">Installation complète en moins de <span className="text-slate-900 font-bold">7 jours ouvrés</span>.</p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.85, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ y: y1 }}
            className="relative lg:ml-10"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent rounded-[2.5rem] transform translate-x-4 translate-y-4 -z-10"></div>

            <div className="animate-float">
              <div className="relative rounded-[2.5rem] shadow-2xl shadow-primary/20 ring-1 ring-slate-900/10 w-full aspect-[4/3] overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                <motion.img
                  style={{ scale: imageScale }}
                  alt="Smartphone displaying a modern e-commerce dashboard"
                  className="w-full h-full object-cover"
                  src="/hero_payment.png"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            {/* Floating Badge */}
            <motion.div style={{ y: badgeY }} className="absolute -bottom-4 sm:-bottom-6 -left-4 sm:-left-8 z-20 w-[90%] sm:w-auto">
              <div className="bg-white/80 backdrop-blur-xl p-3 sm:p-4 rounded-2xl shadow-2xl shadow-slate-900/10 ring-1 ring-white/50 flex items-center gap-3 sm:gap-4 animate-float-delayed">
                <div className="bg-green-100 p-2 sm:p-2.5 rounded-xl shrink-0">
                  <span className="material-symbols-outlined text-green-600 text-xl sm:text-2xl">payments</span>
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] sm:text-xs text-slate-500 font-medium mb-0.5 truncate">Dernier paiement reçu</p>
                  <p className="font-bold text-slate-900 text-sm sm:text-base truncate">+45.000 FC <span className="text-slate-400 font-normal text-xs sm:text-sm">(M-Pesa)</span></p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 sm:mt-24 pt-8 border-t border-slate-100 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8"
        >
          <div className="flex items-center justify-center sm:justify-start gap-4 text-slate-600">
            <span className="material-symbols-outlined text-green-500 bg-green-50 w-10 h-10 rounded-full flex items-center justify-center">verified</span>
            <span className="font-semibold text-sm">Partenaire Officiel Mobile Money</span>
          </div>
          <div className="flex items-center justify-center sm:justify-start gap-4 text-slate-600">
            <span className="material-symbols-outlined text-blue-500 bg-blue-50 w-10 h-10 rounded-full flex items-center justify-center">lock</span>
            <span className="font-semibold text-sm">Paiements 100% Sécurisés (SSL)</span>
          </div>
          <div className="flex items-center justify-center sm:justify-start gap-4 text-slate-600">
            <span className="material-symbols-outlined text-orange-500 bg-orange-50 w-10 h-10 rounded-full flex items-center justify-center">support_agent</span>
            <span className="font-semibold text-sm">Support Technique 24/7 RDC</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}



function Partners() {
  const partners = [
    { name: 'Airtel Money', color: 'from-red-500 to-red-600', icon: 'payments' },
    { name: 'M-Pesa', color: 'from-blue-500 to-blue-600', icon: 'account_balance_wallet' },
    { name: 'Orange Money', color: 'from-orange-400 to-orange-500', icon: 'currency_exchange' },
    { name: 'Afrimoney', color: 'from-indigo-500 to-indigo-600', icon: 'send_money' },
    { name: 'Visa / Mastercard', color: 'from-slate-700 to-slate-900', icon: 'credit_card' },
  ];

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-50 border border-slate-100 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
            Écosystème de Paiement
          </div>
          <h2 className="text-3xl font-display font-black text-slate-900 tracking-tight">Intégration native avec les leaders</h2>
        </div>
      </div>

      {/* Infinite Scrolling Ticker */}
      <div className="relative flex overflow-hidden group py-4">
        {/* Stronger Side Fades */}
        <div className="absolute inset-y-0 left-0 w-32 md:w-64 bg-gradient-to-r from-white via-white/80 to-transparent z-20 pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-32 md:w-64 bg-gradient-to-l from-white via-white/80 to-transparent z-20 pointer-events-none"></div>

        <div className="flex w-max animate-marquee space-x-8 md:space-x-12 px-8 md:px-12 group-hover:[animation-play-state:paused]">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex gap-8 md:gap-12">
              {partners.map((partner, index) => (
                <div
                  key={`${i}-${index}`}
                  className="flex items-center gap-5 p-4 md:p-6 bg-white/40 backdrop-blur-xl border border-white/20 rounded-[2rem] shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 cursor-pointer group/card hover:-translate-y-2 hover:rotate-1"
                >
                  <div className={`w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br ${partner.color} rounded-2xl flex items-center justify-center text-white shadow-lg transform transition-transform duration-500 group-hover/card:scale-110 group-hover/card:rotate-6`}>
                    <span className="material-symbols-outlined text-2xl md:text-3xl">{partner.icon}</span>
                  </div>
                  <div className="pr-4">
                    <span className="text-lg md:text-xl font-black text-slate-900 whitespace-nowrap block">{partner.name}</span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block opacity-0 group-hover/card:opacity-100 transition-opacity duration-300">Activé ✓</span>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const [activeStep, setActiveStep] = useState(1);

  const steps = [
    {
      id: 1,
      icon: 'storefront',
      title: 'Configuration',
      description: 'Nous créons votre boutique sur mesure et ajoutons vos premiers produits.'
    },
    {
      id: 2,
      icon: 'share',
      title: 'Partage',
      description: 'Partagez le lien de votre boutique sur WhatsApp, Facebook ou Instagram.'
    },
    {
      id: 3,
      icon: 'payments',
      title: 'Paiement',
      description: 'Vos clients paient par M-Pesa, Airtel ou Orange Money en toute sécurité.'
    },
    {
      id: 4,
      icon: 'local_shipping',
      title: 'Livraison',
      description: 'Recevez la commande avec les frais de livraison inclus et expédiez-la.'
    }
  ];

  return (
    <section className="py-24 bg-slate-50" id="how-it-works">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold tracking-tight text-slate-900 mb-6">Un processus transparent</h2>
          <p className="text-slate-600 text-base sm:text-lg">Lancez votre boutique et encaissez vos premiers paiements en 4 étapes simples. Survolez les étapes pour voir les détails.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 relative">
          {/* Ligne de connexion pour desktop avec barre de progression */}
          <div className="hidden lg:block absolute top-[4.5rem] left-[12.5%] w-[75%] h-1 bg-slate-200 z-0 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-700 ease-in-out"
              style={{ width: `${((activeStep - 1) / 3) * 100}%` }}
            ></div>
          </div>

          {steps.map((step) => (
            <div
              key={step.id}
              className="relative z-10 flex flex-col items-center text-center group cursor-pointer"
              onMouseEnter={() => setActiveStep(step.id)}
            >
              <div className={`w-36 h-36 rounded-full flex items-center justify-center mb-6 transition-all duration-500 ${activeStep === step.id ? 'bg-primary/10 scale-110' : 'bg-white ring-1 ring-slate-900/5 hover:bg-slate-50'}`}>
                <div className={`w-24 h-24 rounded-full flex items-center justify-center shadow-inner transition-all duration-500 ${activeStep === step.id ? 'bg-primary text-white shadow-primary/40 shadow-xl scale-105' : 'bg-slate-50 text-primary ring-1 ring-slate-900/5'}`}>
                  <span className={`material-symbols-outlined text-4xl transition-transform duration-500 ${activeStep === step.id ? 'scale-110 animate-bounce' : 'group-hover:scale-110'}`}>
                    {step.icon}
                  </span>
                </div>
              </div>
              <h3 className={`text-xl font-bold mb-3 transition-colors duration-300 ${activeStep === step.id ? 'text-primary' : 'text-slate-900'}`}>
                {step.title}
              </h3>
              <p className={`text-slate-600 leading-relaxed transition-opacity duration-300 ${activeStep === step.id ? 'opacity-100' : 'opacity-70'}`}>
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

function Features() {
  return (
    <section className="py-24 bg-white" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold tracking-tight text-slate-900 mb-6">Fonctionnalités Clés</h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">Tout ce dont vous avez besoin pour propulser votre commerce en ligne, pensé spécialement pour les réalités du marché congolais.</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8"
        >
          <div className="bg-white/60 backdrop-blur-lg p-8 sm:p-10 rounded-[2rem] ring-1 ring-slate-900/5 shadow-lg shadow-slate-200/50 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2 hover:ring-primary/20 transition-all duration-500 group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/10 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0 pointer-events-none"></div>
            <div className="relative z-10 w-20 h-20 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-md ring-1 ring-slate-900/5 group-hover:bg-gradient-to-br group-hover:from-primary group-hover:to-primary-dark group-hover:text-white transition-all duration-500 group-hover:scale-110 group-hover:-rotate-3">
              <span className="material-symbols-outlined text-primary group-hover:text-white text-4xl transition-colors duration-500">inventory_2</span>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-primary transition-colors duration-300">Gestion simplifiée des stocks</h3>
            <p className="text-slate-600 leading-relaxed mb-8">
              Suivez vos articles en temps réel et évitez les ruptures de stock.
            </p>
            <div className="bg-primary/5 p-5 rounded-xl ring-1 ring-primary/10 border-l-4 border-primary group-hover:bg-primary/10 transition-colors duration-300">
              <p className="text-sm sm:text-base text-slate-800"><strong className="text-slate-900 font-extrabold">Bénéfice :</strong> Vous savez exactement ce qui se vend le mieux sans utiliser de cahiers compliqués, vous faisant gagner un temps précieux chaque jour.</p>
            </div>
          </div>

          <div className="bg-white/60 backdrop-blur-lg p-8 sm:p-10 rounded-[2rem] ring-1 ring-slate-900/5 shadow-lg shadow-slate-200/50 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2 hover:ring-primary/20 transition-all duration-500 group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/10 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0 pointer-events-none"></div>
            <div className="relative z-10 w-20 h-20 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-md ring-1 ring-slate-900/5 group-hover:bg-gradient-to-br group-hover:from-primary group-hover:to-primary-dark group-hover:text-white transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
              <span className="material-symbols-outlined text-primary group-hover:text-white text-4xl transition-colors duration-500">security</span>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-primary transition-colors duration-300">Paiements sécurisés locaux</h3>
            <p className="text-slate-600 leading-relaxed mb-8">
              Acceptez M-Pesa, Airtel Money et Orange Money directement sur votre site.
            </p>
            <div className="bg-primary/5 p-5 rounded-xl ring-1 ring-primary/10 border-l-4 border-primary group-hover:bg-primary/10 transition-colors duration-300">
              <p className="text-sm sm:text-base text-slate-800"><strong className="text-slate-900 font-extrabold">Bénéfice :</strong> Plus besoin de vérifier manuellement chaque transfert par capture d'écran, tout est automatisé, rapide et 100% sécurisé.</p>
            </div>
          </div>

          <div className="bg-white/60 backdrop-blur-lg p-8 sm:p-10 rounded-[2rem] ring-1 ring-slate-900/5 shadow-lg shadow-slate-200/50 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2 hover:ring-primary/20 transition-all duration-500 group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/10 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0 pointer-events-none"></div>
            <div className="relative z-10 w-20 h-20 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-md ring-1 ring-slate-900/5 group-hover:bg-gradient-to-br group-hover:from-primary group-hover:to-primary-dark group-hover:text-white transition-all duration-500 group-hover:scale-110 group-hover:-rotate-3">
              <span className="material-symbols-outlined text-primary group-hover:text-white text-4xl transition-colors duration-500">local_shipping</span>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-primary transition-colors duration-300">Livraison optimisée en RDC</h3>
            <p className="text-slate-600 leading-relaxed mb-8">
              Calculez automatiquement les frais d'expédition selon les communes de Kinshasa ou les provinces.
            </p>
            <div className="bg-primary/5 p-5 rounded-xl ring-1 ring-primary/10 border-l-4 border-primary group-hover:bg-primary/10 transition-colors duration-300">
              <p className="text-sm sm:text-base text-slate-800"><strong className="text-slate-900 font-extrabold">Bénéfice :</strong> Fini les discussions interminables sur les prix de livraison avec les clients, tout est clair dès la commande.</p>
            </div>
          </div>

          <div className="bg-white/60 backdrop-blur-lg p-8 sm:p-10 rounded-[2rem] ring-1 ring-slate-900/5 shadow-lg shadow-slate-200/50 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2 hover:ring-primary/20 transition-all duration-500 group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/10 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0 pointer-events-none"></div>
            <div className="relative z-10 w-20 h-20 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-md ring-1 ring-slate-900/5 group-hover:bg-gradient-to-br group-hover:from-primary group-hover:to-primary-dark group-hover:text-white transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
              <span className="material-symbols-outlined text-primary group-hover:text-white text-4xl transition-colors duration-500">touch_app</span>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-primary transition-colors duration-300">Interface utilisateur intuitive</h3>
            <p className="text-slate-600 leading-relaxed mb-8">
              Gérez votre boutique depuis votre smartphone ou ordinateur avec une facilité déconcertante.
            </p>
            <div className="bg-primary/5 p-5 rounded-xl ring-1 ring-primary/10 border-l-4 border-primary group-hover:bg-primary/10 transition-colors duration-300">
              <p className="text-sm sm:text-base text-slate-800"><strong className="text-slate-900 font-extrabold">Bénéfice :</strong> Aucune compétence technique n'est requise, c'est aussi simple que d'utiliser WhatsApp ou Facebook pour gérer vos affaires.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ShowcaseGallery() {
  const templates = [
    {
      id: 'fashion',
      title: 'Style Fashion & Luxe',
      description: 'Design épuré et sophistiqué, idéal pour les vêtements et accessoires haut de gamme.',
      image: '/templates/fashion.png',
      tags: ['Élégant', 'Minimaliste', 'Premium']
    },
    {
      id: 'electronics',
      title: 'Style Tech & Électronique',
      description: 'Interface moderne en mode sombre avec des accents néon, parfaitement adapté aux gadgets.',
      image: '/templates/electronics.png',
      tags: ['Moderne', 'Sombre', 'Vibrant']
    },
    {
      id: 'minimalist',
      title: 'Style Maison & Déco',
      description: 'Utilisation intelligente de l\'espace blanc pour mettre en valeur des objets artisanaux.',
      image: '/templates/minimalist.png',
      tags: ['Pur', 'Organique', 'Serein']
    }
  ];

  return (
    <section className="py-24 bg-white" id="showcase">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold tracking-tight text-slate-900 mb-6">
              Choisissez votre style
            </h2>
            <p className="text-slate-600 text-lg">
              Visualisez votre future boutique à travers nos designs adaptés à votre secteur d'activité.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {templates.map((tpl, idx) => (
            <motion.div
              key={tpl.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.2 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[3/4] rounded-[2.5rem] overflow-hidden shadow-2xl ring-1 ring-slate-900/10 mb-6">
                <img
                  src={tpl.image}
                  alt={tpl.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {tpl.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-bold text-white uppercase tracking-wider">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <button className="w-full py-3 bg-white text-slate-900 rounded-xl font-bold text-sm tracking-tight transition-transform group-hover:translate-y-0 translate-y-4">
                    Utiliser ce design
                  </button>
                </div>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-primary transition-colors">
                {tpl.title}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {tpl.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ComparisonTable() {
  const comparisons = [
    {
      feature: "Paiements Mobile Money",
      rdc: "Natif & Automatisé (M-Pesa, Airtel, Orange)",
      dev: "Complexe & Coûteux à intégrer",
      global: "Non supporté nativement"
    },
    {
      feature: "Coût de départ",
      rdc: "$1,125 (Tout inclus)",
      dev: "$1500 - $3500+",
      global: "$29/mois + Apps payantes"
    },
    {
      feature: "Délais de livraison",
      rdc: "7 jours ouvrés",
      dev: "1 à 3 mois",
      global: "Fait maison (heures/jours)"
    },
    {
      feature: "Maintenance",
      rdc: "Inclus à vie",
      dev: "Souvent payante par heure",
      global: "Abonnement mensuel requis"
    },
    {
      feature: "Adapté au marché RDC",
      rdc: "Oui (Communes, Devises, SMS)",
      dev: "Selon le développeur",
      global: "Standard international uniquement"
    }
  ];

  return (
    <section className="py-24 bg-slate-50 overflow-hidden" id="comparison">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold tracking-tight text-slate-900 mb-6">Pourquoi nous choisir ?</h2>
          <p className="text-slate-600 text-lg">Comparez les différentes solutions pour lancer votre business en RDC.</p>
        </div>

        <div className="bg-white rounded-[2.5rem] shadow-xl ring-1 ring-slate-900/5 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-900 text-white">
                  <th className="p-6 text-sm font-bold uppercase tracking-wider">Solution</th>
                  <th className="p-6 text-sm font-bold uppercase tracking-wider bg-primary/20 ring-1 ring-inset ring-primary/20">E-commerce RDC Pro</th>
                  <th className="p-6 text-sm font-bold uppercase tracking-wider">Développeur Privé</th>
                  <th className="p-6 text-sm font-bold uppercase tracking-wider">Shopify / Wix</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {comparisons.map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors">
                    <td className="p-6 font-bold text-slate-900 border-r border-slate-50">{row.feature}</td>
                    <td className="p-6 font-medium text-primary bg-primary/[0.02] border-r border-slate-50">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm font-bold">check_circle</span>
                        {row.rdc}
                      </div>
                    </td>
                    <td className="p-6 text-slate-500 border-r border-slate-50">{row.dev}</td>
                    <td className="p-6 text-slate-500">{row.global}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-12 p-8 bg-primary/5 rounded-[2rem] border border-primary/10 flex flex-col md:flex-row items-center gap-6 justify-between">
          <p className="text-slate-800 font-medium text-lg">
            Gagnez du temps, de l'argent et évitez les maux de tête techniques.
          </p>
          <a href="#pricing" className="bg-primary text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-all whitespace-nowrap">
            Voir les tarifs
          </a>
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <section className="py-32 bg-white" id="pricing">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="lg:pr-8">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold tracking-tight text-slate-900 mb-6">Investissez dans votre croissance</h2>
            <p className="text-base sm:text-lg text-slate-600 mb-8 sm:mb-10 leading-relaxed">
              Une structure de prix transparente, sans frais cachés, conçue pour les entrepreneurs sérieux de la RDC.
            </p>
            <ul className="space-y-6">
              <li className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-green-600 text-sm font-bold">check</span>
                </div>
                <span className="text-slate-700 font-medium">Licence Pro à vie : <span className="text-slate-900 font-bold">$1000</span></span>
              </li>
              <li className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-green-600 text-sm font-bold">check</span>
                </div>
                <span className="text-slate-700 font-medium">Installation & Config : <span className="text-slate-900 font-bold">$125</span></span>
              </li>
              <li className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-accent-vibrant/10 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-accent-vibrant text-sm font-bold">public</span>
                </div>
                <span className="text-slate-700 font-medium">
                  Nom de domaine (.com/.cd) : <span className="text-accent-vibrant font-bold uppercase text-xs ml-1 bg-accent-vibrant/10 px-2 py-0.5 rounded">Bonus 1 an offert</span>
                </span>
              </li>
              <li className="flex items-center gap-4 pt-4 border-t border-slate-100">
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-slate-600 text-sm font-bold">functions</span>
                </div>
                <span className="text-slate-900 font-bold text-lg">Total standard : $1,125</span>
              </li>
            </ul>
          </div>

          <div className="bg-slate-950 text-white p-8 sm:p-10 lg:p-12 rounded-[2.5rem] sm:rounded-[3rem] shadow-2xl shadow-accent-vibrant/20 ring-1 ring-white/10 relative overflow-hidden animate-glow">
            {/* Glow effect */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-accent-vibrant/20 blur-[100px] pointer-events-none"></div>

            <div className="absolute top-4 right-4 sm:top-6 sm:right-6 bg-gradient-to-r from-accent-vibrant to-orange-500 text-white px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-bold tracking-wide shadow-lg shadow-accent-vibrant/40">
              OFFRE LIMITÉE -15%
            </div>

            <div className="relative z-10 mt-4 sm:mt-0">
              <p className="text-slate-400 uppercase font-bold text-xs tracking-widest mb-4">Premiers arrivés, premiers servis</p>
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-5xl sm:text-6xl font-black tracking-tighter">$1,125</span>
                <span className="text-slate-500 line-through text-xl sm:text-2xl font-medium">$1,500</span>
              </div>
              <p className="text-slate-300 mb-8 sm:mb-10 text-base sm:text-lg">
                Prix réduit pour les <span className="text-white font-bold border-b border-accent-vibrant">6 premiers clients</span> de ce mois.
              </p>

              <div className="mb-10">
                <div className="flex justify-between text-xs font-medium text-slate-400 mb-2">
                  <span>Places disponibles</span>
                  <span className="text-accent-vibrant font-bold">2 restantes</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden">
                  <div className="bg-gradient-to-r from-accent-vibrant to-orange-500 h-full rounded-full w-2/3 relative">
                    <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                  </div>
                </div>
              </div>

              <a className="block w-full sm:w-auto sm:inline-block bg-white text-slate-900 hover:bg-slate-100 text-center py-4 px-8 rounded-full font-bold text-lg transition-all shadow-xl hover:scale-105" href="#contact">
                En profiter maintenant
              </a>
              <p className="text-center text-xs text-slate-500 mt-6">Paiement sécurisé. Installation en 7 jours.</p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function Contact() {
  return (
    <section className="py-24 bg-slate-50" id="contact">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="bg-white rounded-[2rem] sm:rounded-[3rem] shadow-xl ring-1 ring-slate-900/5 overflow-hidden">
          <div className="bg-slate-950 p-8 sm:p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-primary/20 to-transparent opacity-50"></div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-extrabold text-white mb-4 relative z-10 tracking-tight">Prêt à digitaliser votre business ?</h2>
            <p className="text-slate-300 text-base sm:text-lg relative z-10">Répondez à ces quelques questions pour commencer.</p>
          </div>
          <form className="p-6 sm:p-10 lg:p-14 space-y-6 sm:space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              <div className="space-y-3">
                <label className="text-sm font-bold text-slate-900">Nom Complet</label>
                <input className="w-full rounded-xl sm:rounded-2xl border-0 ring-1 ring-slate-200 bg-slate-50 focus:ring-2 focus:ring-primary focus:bg-white transition-all px-4 sm:px-5 py-3 sm:py-4 text-slate-900" placeholder="Ex: Jean Mukendi" type="text" />
              </div>
              <div className="space-y-3">
                <label className="text-sm font-bold text-slate-900">Numéro WhatsApp</label>
                <input className="w-full rounded-xl sm:rounded-2xl border-0 ring-1 ring-slate-200 bg-slate-50 focus:ring-2 focus:ring-primary focus:bg-white transition-all px-4 sm:px-5 py-3 sm:py-4 text-slate-900" placeholder="+243 ..." type="tel" />
              </div>
            </div>
            <div className="space-y-3">
              <label className="text-sm font-bold text-slate-900">Adresse Email</label>
              <input className="w-full rounded-xl sm:rounded-2xl border-0 ring-1 ring-slate-200 bg-slate-50 focus:ring-2 focus:ring-primary focus:bg-white transition-all px-4 sm:px-5 py-3 sm:py-4 text-slate-900" placeholder="mambwehermann@gmail.com" type="email" />
            </div>
            <div className="space-y-3">
              <label className="text-sm font-bold text-slate-900 flex justify-between">
                Code Promo / Partenaire
                <span className="text-slate-400 font-normal text-xs uppercase tracking-wide bg-slate-100 px-2 py-0.5 rounded">Optionnel</span>
              </label>
              <input className="w-full rounded-xl sm:rounded-2xl border-0 ring-1 ring-slate-200 bg-slate-50 focus:ring-2 focus:ring-primary focus:bg-white transition-all px-4 sm:px-5 py-3 sm:py-4 text-slate-900 font-mono uppercase" placeholder="Ex: MUKENDI-PRO" type="text" />
              <p className="text-xs text-slate-500">Saisissez le code d'un partenaire pour bénéficier de -$20 de réduction immédiate.</p>
            </div>
            <div className="space-y-4">
              <label className="text-sm font-bold text-slate-900">Quel est votre profil ?</label>
              <div className="grid gap-3 sm:gap-4">
                <label className="flex items-center gap-3 sm:gap-4 p-4 sm:p-5 ring-1 ring-slate-200 rounded-xl sm:rounded-2xl cursor-pointer hover:bg-slate-50 transition-all has-[:checked]:ring-2 has-[:checked]:ring-primary has-[:checked]:bg-primary/5">
                  <input className="text-primary focus:ring-primary h-5 w-5 border-slate-300 shrink-0" name="status" type="radio" />
                  <span className="font-semibold text-slate-900 text-sm sm:text-base">Prêt à acheter <span className="font-normal text-slate-500 block sm:inline mt-1 sm:mt-0">(Je veux commencer demain)</span></span>
                </label>
                <label className="flex items-center gap-3 sm:gap-4 p-4 sm:p-5 ring-1 ring-slate-200 rounded-xl sm:rounded-2xl cursor-pointer hover:bg-slate-50 transition-all has-[:checked]:ring-2 has-[:checked]:ring-primary has-[:checked]:bg-primary/5">
                  <input className="text-primary focus:ring-primary h-5 w-5 border-slate-300 shrink-0" name="status" type="radio" />
                  <span className="font-semibold text-slate-900 text-sm sm:text-base">Intéressé <span className="font-normal text-slate-500 block sm:inline mt-1 sm:mt-0">(J'ai quelques questions)</span></span>
                </label>
                <label className="flex items-center gap-3 sm:gap-4 p-4 sm:p-5 ring-1 ring-slate-200 rounded-xl sm:rounded-2xl cursor-pointer hover:bg-slate-50 transition-all has-[:checked]:ring-2 has-[:checked]:ring-primary has-[:checked]:bg-primary/5">
                  <input className="text-primary focus:ring-primary h-5 w-5 border-slate-300 shrink-0" name="status" type="radio" />
                  <span className="font-semibold text-slate-900 text-sm sm:text-base">Besoin d'infos <span className="font-normal text-slate-500 block sm:inline mt-1 sm:mt-0">(Je compare les solutions)</span></span>
                </label>
              </div>
            </div>
            <div className="pt-4">
              <a
                href="https://wa.me/243837944949"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto sm:px-12 bg-accent-vibrant hover:bg-orange-600 text-white flex justify-center py-4 sm:py-5 rounded-full font-bold text-base sm:text-lg transition-all shadow-xl shadow-accent-vibrant/20 hover:scale-[1.02] cursor-pointer"
              >
                Envoyer ma demande
              </a>
              <p className="text-center text-xs sm:text-sm text-slate-500 mt-4 sm:mt-6">En soumettant ce formulaire, vous acceptez d'être contacté via WhatsApp par notre équipe commerciale.</p>
            </div>
          </form>
        </div>
      </motion.div>
    </section>
  );
}

function Affiliate({ onSuccess }: { onSuccess: () => void }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    confirmEmail: '',
    phone: '',
    method: 'Bouche-à-oreille (Amis / Famille)'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registrationResult, setRegistrationResult] = useState<any>(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.email !== formData.confirmEmail) {
      setError('Les adresses email ne correspondent pas.');
      return;
    }
    setError('');
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/affiliates/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          method: formData.method
        }),
      });
      if (response.ok) {
        const data = await response.json();
        setRegistrationResult(data);
        // Do not auto-close, wait for user to copy code and click "J'ai noté"
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
      <section className="py-24 bg-slate-900 text-center text-white" id="affiliate">
        <VaultUI
           accessCode={registrationResult.access_code}
           onTimeout={onSuccess}
           title="Bienvenue Partenaire"
           subtitle="Félicitations ! Votre code d'accès est généré. Veuillez le conserver précieusement avant la fermeture de ce message."
        />
      </section>
    );
  }

  return (
    <section className="py-24 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 relative overflow-hidden" id="affiliate">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent-vibrant/10 rounded-full blur-[120px] pointer-events-none translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none -translate-x-1/2 translate-y-1/2"></div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
      >
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-vibrant/20 border border-accent-vibrant/30 text-accent-vibrant text-sm font-bold tracking-wide mb-6">
              <span className="material-symbols-outlined text-sm">payments</span>
              Programme Partenaire
            </div>
            <h2 className="text-4xl sm:text-5xl font-display font-extrabold tracking-tight text-white mb-6">
              Recommandez & Gagnez de l'argent.
            </h2>
            <p className="text-slate-300 text-lg sm:text-xl leading-relaxed mb-8">
              Transformez votre rseau en revenus. Aidez d'autres commerants  se digitaliser et touchez une commission gnreuse et immdiate sur chaque installation russie.
            </p>

            <div className="space-y-6 mb-10">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center shrink-0 border border-white/5">
                  <span className="material-symbols-outlined text-accent-vibrant">person_add</span>
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg mb-1">Inscrivez-vous (Gratuit)</h4>
                  <p className="text-slate-400 text-sm">Obtenez votre code promo personnalis  partager (ex: MUKENDI-PRO).</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center shrink-0 border border-white/5">
                  <span className="material-symbols-outlined text-accent-vibrant">share</span>
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg mb-1">Partagez votre code</h4>
                  <p className="text-slate-400 text-sm">Vos proches bnficient d'une rduction spciale de -$20 s'ils utilisent votre code.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center shrink-0 border border-white/5">
                  <span className="material-symbols-outlined text-accent-vibrant">account_balance_wallet</span>
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg mb-1">Encaissez via Mobile Money</h4>
                  <p className="text-slate-400 text-sm">Vous recevez automatiquement <span className="text-green-400 font-bold">20% de commission ($225)</span> sur votre M-Pesa/Airtel à chaque vente.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 sm:p-10 rounded-[2.5rem] shadow-2xl ring-1 ring-slate-900/5 lg:translate-y-4">
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Devenir Partenaire</h3>
            <p className="text-slate-600 mb-8">Rejoignez-nous et commencez  gnrer des revenus ds aujourd'hui.</p>

            <form className="space-y-5" onSubmit={handleSubmit}>
              {error && (
                <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-xl text-sm mb-4 font-medium">
                  {error}
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-bold text-slate-900">Nom Complet</label>
                  <input
                    className="w-full rounded-xl border-0 ring-1 ring-slate-200 bg-slate-50 focus:ring-2 focus:ring-accent-vibrant focus:bg-white transition-all px-4 py-3 text-slate-900 font-medium"
                    placeholder="Votre nom"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-900">Adresse Email</label>
                  <input
                    className="w-full rounded-xl border-0 ring-1 ring-slate-200 bg-slate-50 focus:ring-2 focus:ring-accent-vibrant focus:bg-white transition-all px-4 py-3 text-slate-900 font-medium"
                    placeholder="Ex: nom@example.com"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-900">Confirmer Email</label>
                  <input
                    className="w-full rounded-xl border-0 ring-1 ring-slate-200 bg-slate-50 focus:ring-2 focus:ring-accent-vibrant focus:bg-white transition-all px-4 py-3 text-slate-900 font-medium"
                    placeholder="Répétez votre email"
                    type="email"
                    required
                    value={formData.confirmEmail}
                    onChange={(e) => setFormData({ ...formData, confirmEmail: e.target.value })}
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-bold text-slate-900">Numéro WhatsApp</label>
                  <input
                    className="w-full rounded-xl border-0 ring-1 ring-slate-200 bg-slate-50 focus:ring-2 focus:ring-accent-vibrant focus:bg-white transition-all px-4 py-3 text-slate-900 font-medium"
                    placeholder="+243 ..."
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-900">Comment comptez-vous promouvoir ?</label>
                <select
                  className="w-full rounded-xl border-0 ring-1 ring-slate-200 bg-slate-50 focus:ring-2 focus:ring-accent-vibrant focus:bg-white transition-all px-4 py-3 text-slate-600 cursor-pointer"
                  value={formData.method}
                  onChange={(e) => setFormData({ ...formData, method: e.target.value })}
                >
                  <option>Bouche--oreille (Amis / Famille)</option>
                  <option>Rseaux Sociaux (Influenceur)</option>
                  <option>Je suis une Agence / Freelance</option>
                  <option>Autre</option>
                </select>
              </div>
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto sm:px-12 mx-auto bg-slate-900 hover:bg-slate-800 text-white flex justify-center py-4 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 cursor-pointer gap-2 items-center disabled:opacity-50"
                >
                  <span className="material-symbols-outlined text-xl">rocket_launch</span>
                  {isSubmitting ? 'Traitement...' : 'Activer mon compte Affilié'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function AffiliateDashboard({ affiliateId, onLogout }: { affiliateId: number, onLogout: () => void }) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [payoutAmount, setPayoutAmount] = useState('');
  const [payoutMethod, setPayoutMethod] = useState('');
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [generatedLink, setGeneratedLink] = useState<string | null>(null);
  const [linkForm, setLinkForm] = useState({ client_name: '', client_phone: '' });
  const [message, setMessage] = useState({ text: '', type: '' });
  const [notifications, setNotifications] = useState<any[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [settingsName, setSettingsName] = useState('');
  const [settingsAvatar, setSettingsAvatar] = useState('');
  const [isSavingSettings, setIsSavingSettings] = useState(false);

  useEffect(() => {
    if (showSettings && data?.affiliate) {
      setSettingsName(data.affiliate.name || '');
      setSettingsAvatar('');
    }
  }, [showSettings, data?.affiliate]);

  const handleAvatarSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setSettingsAvatar(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingSettings(true);
    try {
      const res = await fetch(`/api/affiliates/${affiliateId}/profile`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: settingsName, avatar: settingsAvatar })
      });
      if (res.ok) {
        setShowSettings(false);
        fetchData();
        setMessage({ text: 'Profil mis à jour.', type: 'success' });
      }
    } finally {
      setIsSavingSettings(false);
    }
  };

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await fetch(`/api/notifications/${affiliateId}`);
        const data = await res.json();
        if (Array.isArray(data)) setNotifications(data);
      } catch (e) { }
    };
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 5000);
    return () => clearInterval(interval);
  }, [affiliateId]);

  const unreadCount = notifications.filter(n => !n.is_read).length;

  const handleMarkAsRead = async (id: number) => {
    try {
      await fetch(`/api/notifications/${id}/read`, { method: 'POST' });
      setNotifications(notifications.map(n => n.id === id ? { ...n, is_read: 1 } : n));
    } catch (e) { }
  };

  const fetchData = async () => {
    try {
      const res = await fetch(`/api/affiliates/${affiliateId}/dashboard`);
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [affiliateId]);

  const handleGenerateLink = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/payment-links', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          affiliate_id: affiliateId,
          ...linkForm
        })
      });
      const data = await res.json();
      if (res.ok) {
        setGeneratedLink(data.id);
        setShowLinkModal(false);
        setLinkForm({ client_name: '', client_phone: '' });
      }
    } catch (err) {
      setMessage({ text: 'Erreur lors de la génération.', type: 'error' });
    }
  };

  const handlePayoutRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!payoutAmount || !payoutMethod) return;

    try {
      const res = await fetch('/api/payouts/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          affiliate_id: affiliateId,
          amount: parseFloat(payoutAmount),
          payment_method: payoutMethod
        })
      });
      if (res.ok) {
        setMessage({ text: 'Demande envoyée avec succès !', type: 'success' });
        setPayoutAmount('');
        setShowRequestForm(false);
        fetchData();
      }
    } catch (err) {
      setMessage({ text: 'Erreur lors de la demande.', type: 'error' });
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  const { affiliate, leads, payouts } = data;

  if (affiliate && !affiliate.has_completed_onboarding) {
    return (
      <AffiliateOnboarding
        affiliateId={affiliate.id}
        affiliateName={affiliate.name}
        onComplete={() => {
          setData(prev => ({ ...prev, affiliate: { ...prev.affiliate, has_completed_onboarding: 1 } }));
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-20 selection:bg-indigo-100 selection:text-indigo-900">
      {/* Navigation Header */}
      <nav className="bg-white/80 backdrop-blur-xl border-b border-slate-200 sticky top-0 z-50 px-8 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button onClick={() => setShowSettings(true)} className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white shadow-lg rotate-3 hover:rotate-0 transition-all overflow-hidden group border-2 border-transparent hover:border-indigo-500 cursor-pointer shrink-0">
              {affiliate?.avatar_url ? (
                <img src={affiliate.avatar_url} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <span className="material-symbols-outlined text-xl group-hover:scale-110 transition-transform">person</span>
              )}
            </button>
            <div className="cursor-pointer" onClick={() => setShowSettings(true)}>
              <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-[0.2em] leading-none mb-1 flex items-center gap-1">Portail Partenaire</p>
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-tight hover:text-indigo-600 transition-colors flex items-center gap-1.5">{affiliate?.name} <span className="material-symbols-outlined text-[12px] text-slate-400 hidden md:block">edit</span></h2>
            </div>
          </div>
          <div className="flex items-center gap-6">

            {/* Notifications Bell */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 text-slate-400 hover:text-slate-900 transition-colors"
              >
                <span className="material-symbols-outlined">notifications</span>
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
                )}
              </button>

              <AnimatePresence>
                {showNotifications && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute top-12 right-0 w-80 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-50"
                  >
                    <div className="p-4 bg-slate-900 text-white font-bold text-sm tracking-wide flex justify-between items-center">
                      <span>Notifications</span>
                      <span className="bg-white/10 px-2 py-0.5 rounded text-xs">{unreadCount} non lues</span>
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                      {notifications.length === 0 ? (
                        <div className="p-6 text-center text-slate-500 text-sm">Aucune notification</div>
                      ) : (
                        notifications.map(n => (
                          <div
                            key={n.id}
                            onClick={() => !n.is_read && handleMarkAsRead(n.id)}
                            className={`p-4 border-b border-slate-50 flex gap-3 cursor-pointer transition-colors hover:bg-slate-50 ${!n.is_read ? 'bg-blue-50/30' : 'opacity-70'}`}
                          >
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${n.type === 'message' ? 'bg-blue-100 text-blue-600' : 'bg-orange-100 text-orange-600'}`}>
                              <span className="material-symbols-outlined text-sm">{n.type === 'message' ? 'chat' : 'notifications'}</span>
                            </div>
                            <div>
                              <p className={`text-sm ${!n.is_read ? 'font-bold text-slate-900' : 'font-medium text-slate-700'}`}>{n.title}</p>
                              <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">{n.message}</p>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Connecté</span>
            </div>
            <button
              onClick={onLogout}
              className="group flex items-center gap-2 text-slate-400 hover:text-slate-900 transition-colors"
            >
              <span className="text-[10px] font-bold uppercase tracking-widest">Quitter</span>
              <span className="material-symbols-outlined text-lg group-hover:translate-x-0.5 transition-transform">logout</span>
            </button>
          </div>
        </div>
      </nav>

      <ChatWidget affiliateId={affiliateId} />

      {/* Settings Modal */}
      <AnimatePresence>
        {showSettings && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm cursor-pointer"
              onClick={() => setShowSettings(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-[2rem] shadow-2xl w-full max-w-sm relative z-10 overflow-hidden"
            >
              <div className="p-8">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-xl font-black text-slate-900 tracking-tight">Mon Profil</h3>
                  <button onClick={() => setShowSettings(false)} className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-50 text-slate-400 hover:bg-red-50 hover:text-red-500 transition-colors">
                    <span className="material-symbols-outlined text-sm">close</span>
                  </button>
                </div>

                <form onSubmit={handleSaveSettings} className="space-y-8">
                  {/* Avatar Upload */}
                  <div className="flex flex-col items-center justify-center pt-2">
                    <div className="relative group mx-auto">
                      <div className="w-24 h-24 rounded-[1.5rem] bg-slate-50 flex items-center justify-center overflow-hidden ring-4 ring-white shadow-xl shadow-slate-200/50 group-hover:ring-indigo-50 transition-all">
                        {(settingsAvatar || affiliate?.avatar_url) ? (
                          <img src={settingsAvatar || affiliate?.avatar_url} alt="Aperçu" className="w-full h-full object-cover" />
                        ) : (
                          <span className="material-symbols-outlined text-4xl text-slate-300">person</span>
                        )}
                      </div>
                      <label className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-white text-indigo-600 border border-indigo-100 shadow-lg px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest cursor-pointer hover:bg-indigo-50 hover:-translate-y-0.5 transition-all flex items-center gap-1.5 whitespace-nowrap z-20">
                        <span className="material-symbols-outlined text-[14px]">photo_camera</span> Modifier
                        <input type="file" className="hidden" accept="image/*" onChange={handleAvatarSelect} />
                      </label>
                    </div>
                  </div>

                  {/* Name Edit */}
                  <div className="space-y-2 mt-4">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Nom d'affichage</label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg">badge</span>
                      <input
                        type="text"
                        value={settingsName}
                        onChange={(e) => setSettingsName(e.target.value)}
                        required
                        placeholder="Votre nom complet"
                        className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all font-bold text-slate-900 text-sm placeholder:text-slate-400 placeholder:font-medium"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSavingSettings}
                    className="w-full bg-slate-900 text-white rounded-xl py-4 font-bold text-sm hover:-translate-y-0.5 hover:shadow-xl hover:shadow-slate-900/20 hover:bg-slate-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                  >
                    {isSavingSettings ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : (
                      <>
                        <span className="material-symbols-outlined text-lg">check_circle</span>
                        Enregistrer
                      </>
                    )}
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-8 pt-12">
        {/* Metric Overview */}
        <header className="mb-12">
          <h1 className="text-3xl font-display font-black text-slate-900 tracking-tight flex items-center gap-3">
            Tableau de Bord
            <span className="text-sm font-medium text-slate-400 font-sans tracking-normal italic">v3.0 Executive</span>
          </h1>
          <p className="text-slate-500 mt-2 font-medium">Consultez vos indicateurs de performance et gérez vos commissions.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <ExecutiveCard className="p-6">
            <div className="flex justify-between items-start mb-6">
              <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center">
                <span className="material-symbols-outlined text-xl">group</span>
              </div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Prospects</span>
            </div>
            <p className="text-3xl font-black text-slate-900 leading-none">{affiliate?.total_leads || 0}</p>
            <div className="mt-4 pt-4 border-t border-slate-50">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Visites Totales</p>
            </div>
          </ExecutiveCard>

          <ExecutiveCard className="p-6">
            <div className="flex justify-between items-start mb-6">
              <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center">
                <span className="material-symbols-outlined text-xl">verified_user</span>
              </div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Conversions</span>
            </div>
            <p className="text-3xl font-black text-slate-900 leading-none">{affiliate?.conversions || 0}</p>
            <div className="mt-4 pt-4 border-t border-slate-50">
              <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">Taux: {affiliate?.total_leads ? ((affiliate.conversions / affiliate.total_leads) * 100).toFixed(1) : 0}%</p>
            </div>
          </ExecutiveCard>

          <ExecutiveCard className="p-6">
            <div className="flex justify-between items-start mb-6">
              <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-lg flex items-center justify-center">
                <span className="material-symbols-outlined text-xl">payments</span>
              </div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Gains Cumulés</span>
            </div>
            <p className="text-3xl font-black text-slate-900 leading-none tracking-tight">${(affiliate?.revenue || 0).toLocaleString()}</p>
            <div className="mt-4 pt-4 border-t border-slate-50">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Validés & Payés</p>
            </div>
          </ExecutiveCard>

          <ExecutiveCard className="p-6 bg-slate-900 border-slate-900 shadow-2xl shadow-indigo-200">
            <div className="flex justify-between items-start mb-6">
              <div className="w-10 h-10 bg-white/10 text-white rounded-lg flex items-center justify-center">
                <span className="material-symbols-outlined text-xl">account_balance_wallet</span>
              </div>
              <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Solde Retirable</span>
            </div>
            <p className="text-3xl font-black text-white leading-none tracking-tight">${(affiliate?.revenue || 0).toLocaleString()}</p>
            <div className="mt-6 space-y-3">
              <button
                onClick={() => setShowRequestForm(true)}
                className="w-full bg-white text-slate-900 py-2.5 rounded-lg font-bold text-[10px] uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-sm">payout</span>
                Retirer Gains
              </button>
              <button
                onClick={() => setShowLinkModal(true)}
                className="w-full bg-slate-800 text-white/80 py-2.5 rounded-lg font-bold text-[10px] uppercase tracking-widest hover:text-white transition-all border border-white/5 flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-sm">link</span>
                Lien Paiement
              </button>
            </div>
          </ExecutiveCard>
        </div>

        {/* Marketing Center */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <ExecutiveCard className="p-1 group relative overflow-hidden h-full">
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-50"></div>
              <div className="p-8 relative z-10">
                <div className="flex items-center gap-3 mb-8">
                  <span className="material-symbols-outlined text-indigo-600">stars</span>
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Outils de Promotion</h3>
                </div>

                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1 p-6 bg-slate-50 rounded-2xl border border-slate-200/60">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Votre Code Promo Unique</p>
                    <div className="flex items-center justify-between gap-4">
                      <code className="text-2xl font-black text-slate-900 tracking-[0.2em]">{affiliate?.promo_code || '---'}</code>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(affiliate?.promo_code || '');
                          setMessage({ text: 'Code copié !', type: 'success' });
                        }}
                        className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:border-indigo-600 transition-all shadow-sm"
                      >
                        <span className="material-symbols-outlined text-lg">content_copy</span>
                      </button>
                    </div>
                  </div>

                  <div className="flex-1 p-6 bg-indigo-600 rounded-2xl text-white shadow-xl shadow-indigo-100">
                    <p className="text-[10px] font-bold text-white/60 uppercase tracking-widest mb-4">Commission Partenaire</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-black">$50.00</span>
                      <span className="text-[10px] font-bold uppercase tracking-wider opacity-60">par vente</span>
                    </div>
                    <p className="text-[9px] font-medium text-white/50 mt-4 leading-relaxed">Paiement instantané dès validation de la transaction par l'administration.</p>
                  </div>
                </div>
              </div>
            </ExecutiveCard>
          </div>

          <ExecutiveCard className="p-8 flex flex-col justify-center text-center bg-slate-50 border-dashed border-2">
            <div className="w-16 h-16 bg-white rounded-2xl mx-auto flex items-center justify-center text-slate-400 mb-6 shadow-sm border border-slate-100">
              <span className="material-symbols-outlined text-3xl">qr_code_2</span>
            </div>
            <h4 className="text-sm font-bold text-slate-900 mb-2">QR Code de Parrainage</h4>
            <p className="text-xs text-slate-500 mb-6 px-4">Prochainement : Imprimez votre QR Code pour vos supports physiques.</p>
            <button className="text-[10px] font-bold text-slate-400 uppercase tracking-widest cursor-not-allowed">Bientôt disponible</button>
          </ExecutiveCard>
        </div>

        {/* Data Sections */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Sales Activity */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <span className="material-symbols-outlined text-indigo-600">radar</span>
                Activités Récentes
              </h3>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden min-h-[400px]">
              {leads.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full p-20 text-center opacity-40">
                  <span className="material-symbols-outlined text-6xl mb-4">query_stats</span>
                  <p className="text-xs font-bold uppercase tracking-widest">En attente de données</p>
                </div>
              ) : (
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 font-bold text-[10px] text-slate-400 uppercase tracking-wider">
                      <th className="px-6 py-4">Prospect / Client</th>
                      <th className="px-6 py-4">État</th>
                      <th className="px-6 py-4 text-right">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {leads.map((lead: any) => (
                      <tr key={lead.id} className="group hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-4">
                          <p className="font-bold text-slate-900 text-sm">{lead.client_name}</p>
                          <p className="text-[10px] font-medium text-slate-400 mt-1">{lead.client_phone}</p>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-widest border ${lead.event_type === 'conversion'
                            ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
                            : 'bg-indigo-50 text-indigo-600 border-indigo-100'
                            }`}>
                            {lead.event_type === 'conversion' ? 'Payé' : 'Visite'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <p className="text-[10px] font-bold text-slate-500 uppercase">
                            {new Date(lead.created_at).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' })}
                          </p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </section>

          {/* Revenue History */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <span className="material-symbols-outlined text-indigo-600">history_toggle_off</span>
                Historique Retraits
              </h3>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden min-h-[400px]">
              {payouts.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full p-20 text-center opacity-40">
                  <span className="material-symbols-outlined text-6xl mb-4">account_balance</span>
                  <p className="text-xs font-bold uppercase tracking-widest">Aucun versement</p>
                </div>
              ) : (
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 font-bold text-[10px] text-slate-400 uppercase tracking-wider">
                      <th className="px-6 py-4">Montant</th>
                      <th className="px-6 py-4">Méthode</th>
                      <th className="px-6 py-4 text-right">Statut</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {payouts.map((p: any) => (
                      <tr key={p.id} className="group hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-4">
                          <span className="font-bold text-slate-900 text-sm">${p.amount}</span>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{p.payment_method}</p>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <span className={`px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-widest border ${p.status === 'paid' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                            p.status === 'rejected' ? 'bg-rose-50 text-rose-600 border-rose-100' :
                              'bg-amber-50 text-amber-600 border-amber-100'
                            }`}>
                            {p.status === 'pending' ? 'En attente' : p.status === 'paid' ? 'Payé' : 'Refusé'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </section>
        </div>
      </div>

      <AnimatePresence>
        {/* Payout Request Modal */}
        {showRequestForm && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 text-left">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
              onClick={() => setShowRequestForm(false)}
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white rounded-3xl p-10 max-w-lg w-full relative z-10 shadow-2xl border border-slate-100"
            >
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Demander un Retrait</h3>
              <p className="text-sm text-slate-500 mb-8 italic">Vos revenus seront transférés après validation administrative.</p>

              <form onSubmit={handlePayoutRequest} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Montant ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-600/10 focus:border-indigo-600/30 transition-all font-bold text-slate-900"
                    placeholder="0.00"
                    value={payoutAmount}
                    onChange={(e) => setPayoutAmount(e.target.value)}
                    required
                  />
                  <p className="text-[9px] text-slate-400 font-medium ml-1">Solde disponible: ${(affiliate?.revenue || 0).toLocaleString()}</p>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Méthode de réception</label>
                  <input
                    type="text"
                    className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-600/10 focus:border-indigo-600/30 transition-all font-bold text-slate-900"
                    placeholder="Ex: M-Pesa - 0820000000"
                    value={payoutMethod}
                    onChange={(e) => setPayoutMethod(e.target.value)}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10 mt-4"
                >
                  Confirmer la demande
                </button>
              </form>
            </motion.div>
          </div>
        )}

        {/* Generate Link Modal */}
        {showLinkModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 text-left">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
              onClick={() => setShowLinkModal(false)}
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white rounded-3xl p-10 max-w-lg w-full relative z-10 shadow-2xl border border-slate-100"
            >
              <h3 className="text-2xl font-bold text-slate-900 mb-2 font-display">Générer un Lien</h3>
              <p className="text-sm text-slate-500 mb-8 italic">Préparez un accès direct au paiement pour votre prospect.</p>

              <form onSubmit={handleGenerateLink} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Filiation Client</label>
                  <input
                    type="text"
                    className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-600/10 focus:border-indigo-600/30 transition-all font-bold text-slate-900"
                    placeholder="Nom complet du client"
                    value={linkForm.client_name}
                    onChange={(e) => setLinkForm({ ...linkForm, client_name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Contact WhatsApp</label>
                  <input
                    type="tel"
                    className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-600/10 focus:border-indigo-600/30 transition-all font-bold text-slate-900"
                    placeholder="+243 ..."
                    value={linkForm.client_phone}
                    onChange={(e) => setLinkForm({ ...linkForm, client_phone: e.target.value })}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200 mt-4"
                >
                  Générer Lien Direct
                </button>
              </form>
            </motion.div>
          </div>
        )}

        {/* Generated Link Success */}
        {generatedLink && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-md" />
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="bg-white rounded-[2.5rem] p-12 max-w-xl w-full relative z-10 shadow-3xl text-center border border-slate-100"
            >
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-8">
                <span className="material-symbols-outlined text-3xl">sentiment_very_satisfied</span>
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-2">Lien Prêt !</h3>
              <p className="text-slate-500 mb-8 font-medium">Partagez ce lien avec votre client pour finaliser la vente.</p>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 mb-8 flex items-center justify-between gap-4">
                <code className="text-xs font-bold text-slate-600 truncate flex-1 block text-left">
                  {window.location.host}/p/{generatedLink}
                </code>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(`${window.location.host}/p/${generatedLink}`);
                    setMessage({ text: 'Lien copié !', type: 'success' });
                  }}
                  className="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-indigo-600 transition-all shadow-sm"
                >
                  <span className="material-symbols-outlined text-sm">content_copy</span>
                </button>
              </div>

              <button
                onClick={() => setGeneratedLink(null)}
                className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-slate-800 transition-all"
              >
                Terminer
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Message Notification */}
      <AnimatePresence>
        {message.text && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-[120] px-6 py-4 rounded-2xl shadow-2xl border flex items-center gap-3 backdrop-blur-xl ${message.type === 'success' ? 'bg-emerald-900/90 text-white border-white/10' : 'bg-rose-900/90 text-white border-white/10'
              }`}
          >
            <span className="material-symbols-outlined text-xl">
              {message.type === 'success' ? 'check_circle' : 'error'}
            </span>
            <p className="text-[10px] font-bold uppercase tracking-widest">{message.text}</p>
            <button
              onClick={() => setMessage({ text: '', type: '' })}
              className="ml-4 w-6 h-6 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors"
            >
              <span className="material-symbols-outlined text-sm">close</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}


// --- Executive Admin 3.0 Infrastructure ---

function ExecutiveCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white border border-slate-200 shadow-[0_1px_3px_0_rgba(0,0,0,0.02),0_1px_2px_-1px_rgba(0,0,0,0.03)] rounded-2xl ${className}`}
    >
      {children}
    </motion.div>
  );
}

function ExecutiveChart({ data, title, color = "#4f46e5" }: { data: number[], title: string, color?: string }) {
  const max = Math.max(...data, 1);
  const steps = 7;
  const points = data.map((v, i) => `${(i / (data.length - 1)) * 100},${90 - (v / max) * 80}`).join(' ');

  return (
    <ExecutiveCard className="p-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{title}</p>
          <div className="flex items-baseline gap-2 mt-1">
            <p className="text-2xl font-bold text-slate-900">${data.reduce((a, b) => a + b, 0).toLocaleString()}</p>
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-md flex items-center gap-1">
              <span className="material-symbols-outlined text-[10px]">trending_up</span>
              +12%
            </span>
          </div>
        </div>
        <div className="flex gap-1">
          {[1, 2, 3].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-slate-100" />)}
        </div>
      </div>
      <div className="h-28 w-full relative">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full overflow-visible">
          <defs>
            <linearGradient id={`exec-grad-${color}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity="0.12" />
              <stop offset="100%" stopColor={color} stopOpacity="0" />
            </linearGradient>
          </defs>
          {/* Grid Lines */}
          {[0, 25, 50, 75, 100].map(y => (
            <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="#f1f5f9" strokeWidth="0.5" />
          ))}
          <path d={`M 0 100 L ${points} L 100 100 Z`} fill={`url(#exec-grad-${color})`} />
          <polyline fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" points={points} />
          {/* Interactive Dots */}
          {data.map((v, i) => (
            <circle
              key={i}
              cx={(i / (data.length - 1)) * 100}
              cy={90 - (v / max) * 80}
              r="1.2"
              fill="white"
              stroke={color}
              strokeWidth="1.5"
              className="hover:r-2 transition-all cursor-crosshair"
            />
          ))}
        </svg>
      </div>
    </ExecutiveCard>
  );
}

function AdminDashboard() {
  const [affiliates, setAffiliates] = useState<any[]>([]);
  const [payouts, setPayouts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [activeModule, setActiveModule] = useState<'overview' | 'clients' | 'affiliates' | 'payouts' | 'profile' | 'settings' | 'chats'>('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Advanced Platform Settings
  const [settings, setSettings] = useState({
    platformName: 'E-commerce RDC Pro',
    commissionRate: 225,
    supportEmail: 'admin@rdcpro.com',
    allowAutoActivation: false,
    payoutMinimum: 50,
    paymentNumbers: {
      mpesa: '+243 81 000 0000',
      airtel: '+243 99 000 0000',
      orange: '+243 89 000 0000',
      bank: 'Equity BCDC - 0012...'
    }
  });

  // Analytics Data (Simulated for Demo)
  const revenueHistory = [420, 580, 510, 890, 720, 950, 1100];
  const conversionHistory = [12, 18, 15, 25, 20, 28, 35];

  // Admin Profile State
  const [adminProfile, setAdminProfile] = useState({
    name: 'Admin Principal',
    role: 'Super Administrateur',
    email: 'admin@rdcpro.com',
    avatar: 'A',
    avatarUrl: null as string | null
  });

  const [notifications, setNotifications] = useState<any[]>([]);

  const fetchAffiliates = async () => {
    try {
      const response = await fetch('/api/affiliates');
      const data = await response.json();
      setAffiliates(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPayouts = async () => {
    try {
      const response = await fetch('/api/payouts');
      const data = await response.json();
      setPayouts(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchAffiliates();
    fetchPayouts();
  }, []);

  const handleActivate = async (id: number, name: string) => {
    const promoCode = name.split(' ')[0].toUpperCase() + '-' + Math.floor(100 + Math.random() * 900);
    try {
      const response = await fetch(`/api/affiliates/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'active', promo_code: promoCode }),
      });
      if (response.ok) fetchAffiliates();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleUpdatePayout = async (id: number, status: string) => {
    try {
      const response = await fetch(`/api/payouts/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (response.ok) fetchPayouts();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const filteredAffiliates = affiliates.filter(aff => {
    const matchesSearch = aff.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      aff.phone.includes(searchQuery);
    const matchesStatus = filterStatus === 'all' || aff.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: affiliates.length,
    active: affiliates.filter(a => a.status === 'active').length,
    pending: affiliates.filter(a => a.status === 'pending').length,
    totalRevenue: affiliates.reduce((sum, a) => sum + (a.revenue || 0), 0)
  };

  const topPerformers = [...affiliates]
    .filter(a => a.status === 'active')
    .sort((a, b) => (b.conversions || 0) - (a.conversions || 0))
    .slice(0, 3);

  const menuItems = [
    { id: 'overview', label: 'Vue d\'Ensemble', icon: 'analytics' },
    { id: 'clients', label: 'Onboarding Clients', icon: 'person_add' },
    { id: 'affiliates', label: 'Partenaires', icon: 'groups' },
    { id: 'payouts', label: `Retraits (${payouts.filter(p => p.status === 'pending').length})`, icon: 'payments' },
    { id: 'chats', label: 'Support Chat', icon: 'forum' },
    { id: 'settings', label: 'Paramètres', icon: 'settings' }
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
      {/* Integrated Sidebar */}
      <aside className={`
        ${isSidebarOpen ? 'w-72' : 'w-20'} 
        bg-white border-r border-slate-200 transition-all duration-300 flex flex-col h-screen fixed top-0 left-0 z-50
      `}>
        <div className="h-20 flex items-center px-6 border-b border-slate-100 overflow-hidden">
          <div className="flex items-center gap-3 min-w-max">
            <div className="w-9 h-9 bg-indigo-600 rounded-lg flex items-center justify-center text-white shadow-sm">
              <span className="material-symbols-outlined text-xl">command</span>
            </div>
            {isSidebarOpen && <span className="text-lg font-bold tracking-tight text-slate-900">Executive <span className="text-indigo-600">3.0</span></span>}
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveModule(item.id as any)}
              className={`
                w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group relative
                ${activeModule === item.id
                  ? 'bg-indigo-50 text-indigo-700 font-semibold'
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}
              `}
            >
              <span className={`material-symbols-outlined text-[20px] ${activeModule === item.id ? 'text-indigo-600' : 'group-hover:text-slate-900'}`}>
                {item.icon}
              </span>
              {isSidebarOpen && <span className="text-sm tracking-tight">{item.label}</span>}
              {activeModule === item.id && isSidebarOpen && (
                <motion.div layoutId="nav-indicator" className="absolute left-0 w-1 h-5 bg-indigo-600 rounded-r-full" />
              )}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-100">
          <button
            className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 transition-all group"
            onClick={() => setActiveModule('profile')}
          >
            <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center overflow-hidden border border-slate-200 shrink-0">
              {adminProfile.avatarUrl ? <img src={adminProfile.avatarUrl} alt="" className="w-full h-full object-cover" /> : <span className="font-bold text-slate-600">{adminProfile.avatar}</span>}
            </div>
            {isSidebarOpen && (
              <div className="flex-1 text-left overflow-hidden">
                <p className="text-xs font-bold text-slate-900 truncate">{adminProfile.name}</p>
                <p className="text-[10px] font-medium text-slate-500 uppercase tracking-wider leading-none mt-1">Super Admin</p>
              </div>
            )}
            {isSidebarOpen && <span className="material-symbols-outlined text-slate-400 text-sm">unfold_more</span>}
          </button>
        </div>
      </aside>

      {/* Main Workspace */}
      <main className={`flex-1 ${isSidebarOpen ? 'ml-72' : 'ml-20'} transition-all duration-300 relative`}>
        {/* Executive Header */}
        <header className="h-20 sticky top-0 z-30 px-8 flex justify-between items-center bg-white/80 backdrop-blur-md border-b border-slate-200/60">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-1.5 hover:bg-slate-100 rounded-md text-slate-500 transition-colors"
            >
              <span className="material-symbols-outlined text-xl">menu_open</span>
            </button>
            <div className="h-4 w-px bg-slate-200"></div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                {activeModule === 'overview' ? 'Tableau de bord' :
                  activeModule === 'clients' ? 'Onboarding Clients' :
                  activeModule === 'affiliates' ? 'Partenaires' :
                    activeModule === 'payouts' ? 'Versements' :
                      activeModule === 'chats' ? 'Support Chat' :
                        activeModule === 'profile' ? 'Profil' :
                          activeModule === 'config' ? 'Paiements' : 'Paramètres'}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Live Engine</span>
            </div>
            <button
              onClick={() => { fetchAffiliates(); fetchPayouts(); }}
              className="w-10 h-10 hover:bg-slate-50 rounded-lg flex items-center justify-center transition-all border border-slate-200 text-slate-500"
            >
              <span className="material-symbols-outlined text-xl">refresh</span>
            </button>
          </div>
        </header>

        <div className="px-8 py-8 max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            {activeModule === 'overview' && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-8"
              >
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <ExecutiveChart data={revenueHistory} title="Chiffre d'Affaires" color="#4f46e5" />
                  <ExecutiveChart data={conversionHistory} title="Conversions Réseau" color="#0ea5e9" />
                  <ExecutiveCard className="p-6 flex flex-col justify-between overflow-hidden relative">
                    <div className="relative z-10">
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">État du Système</p>
                      <div className="mt-4 flex items-center gap-3">
                        <div className="text-3xl font-bold text-slate-900">{stats.active}</div>
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">Optimal</span>
                      </div>
                    </div>
                    <div className="pt-4 border-t border-slate-100 mt-4 relative z-10">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Temps de réponse</p>
                      <p className="text-xs font-semibold text-slate-900 mt-0.5">24ms (Avg)</p>
                    </div>
                    <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-indigo-50/50 rounded-full blur-3xl opacity-50"></div>
                  </ExecutiveCard>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <ExecutiveCard className="p-8">
                    <div className="flex justify-between items-center mb-8">
                      <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                        <span className="material-symbols-outlined text-indigo-600 text-lg">workspace_premium</span>
                        Partenaires d'Élite
                      </h3>
                      <button className="text-[10px] font-bold text-indigo-600 hover:text-indigo-700 uppercase tracking-widest">Voir tout</button>
                    </div>
                    <div className="space-y-4">
                      {topPerformers.map((p) => (
                        <div key={p.id} className="flex items-center gap-4 p-3 hover:bg-slate-50 rounded-xl transition-all border border-transparent hover:border-slate-100">
                          <div className="w-10 h-10 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-sm">
                            {p.name.charAt(0)}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-bold text-slate-900">{p.name}</p>
                            <p className="text-[10px] font-medium text-slate-500">{p.conversions} conversions</p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs font-bold text-slate-900">${(p.revenue || 0).toLocaleString()}</p>
                            <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded uppercase tracking-widest">Actif</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ExecutiveCard>

                  <ExecutiveCard className="p-8">
                    <div className="flex justify-between items-center mb-8">
                      <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                        <span className="material-symbols-outlined text-indigo-600 text-lg">history_edu</span>
                        Journal Opérationnel
                      </h3>
                    </div>
                    <div className="space-y-5">
                      {[
                        { action: 'Versement validé', details: 'Airtel Money - $420.00', time: 'Il y a 12 min' },
                        { action: 'Configuration mise à jour', details: 'Module Paramètres', time: 'À l\'instant' },
                        { action: 'Alerte Système', details: 'Audit de sécurité effectué', time: '10:45 AM' }
                      ].map((log, i) => (
                        <div key={i} className="flex gap-4">
                          <div className="w-1.5 h-1.5 rounded-full bg-slate-200 mt-1.5 shrink-0" />
                          <div>
                            <p className="text-xs font-bold text-slate-900">{log.action}</p>
                            <p className="text-[10px] font-medium text-slate-500 mt-0.5">{log.details} • {log.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ExecutiveCard>
                </div>
              </motion.div>
            )}

            {activeModule === 'clients' && <AdminClientsModule key="clients" />}

            {activeModule === 'affiliates' && (
              <motion.div
                key="affiliates"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-4">
                  <div className="relative w-full md:w-96">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">search</span>
                    <input
                      type="text"
                      placeholder="Filtrer par nom..."
                      className="w-full pl-10 pr-4 py-2 text-sm rounded-lg bg-white border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-600/10 transition-all font-medium"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <div className="flex gap-1 p-1 bg-slate-100 rounded-lg">
                    {['all', 'pending', 'active'].map((s) => (
                      <button
                        key={s}
                        onClick={() => setFilterStatus(s)}
                        className={`px-4 py-1.5 rounded-md text-[11px] font-bold tracking-wider transition-all ${filterStatus === s ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'
                          }`}
                      >
                        {s === 'all' ? 'Tous' : s === 'pending' ? 'Attente' : 'Actifs'}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 font-bold text-[10px] text-slate-500 uppercase tracking-wider">
                        <th className="px-6 py-4">Partenaire</th>
                        <th className="px-6 py-4">Performance</th>
                        <th className="px-6 py-4">Code Promo</th>
                        <th className="px-6 py-4">Code Accès</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {loading ? (
                        <tr><td colSpan={4} className="p-20 text-center text-slate-400 text-xs font-bold uppercase tracking-widest">Traitement des données...</td></tr>
                      ) : filteredAffiliates.length === 0 ? (
                        <tr><td colSpan={4} className="p-20 text-center text-slate-400 text-xs font-bold uppercase tracking-widest">Aucun enregistrement</td></tr>
                      ) : (
                        filteredAffiliates.map((aff) => (
                          <tr key={aff.id} className="hover:bg-slate-50/50 transition-colors group">
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-lg bg-slate-100 border border-slate-200 text-slate-600 flex items-center justify-center font-bold text-sm">{aff.name.charAt(0)}</div>
                                <div>
                                  <p className="font-bold text-slate-900 text-sm">{aff.name}</p>
                                  <p className="text-[10px] font-medium text-slate-400 mt-0.5">{aff.phone}</p>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex gap-4">
                                <div>
                                  <p className="text-[10px] font-bold text-slate-400 uppercase">Ventes</p>
                                  <p className="text-sm font-bold text-slate-900">{aff.conversions || 0}</p>
                                </div>
                                <div className="w-px h-6 bg-slate-100 self-center"></div>
                                <div>
                                  <p className="text-[10px] font-bold text-slate-400 uppercase">Dû</p>
                                  <p className="text-sm font-bold text-indigo-600">${((aff.conversions || 0) * settings.commissionRate).toLocaleString()}</p>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              {aff.promo_code ? (
                                <code className="text-[11px] font-bold bg-indigo-50 text-indigo-700 px-2 py-1 rounded border border-indigo-100">{aff.promo_code}</code>
                              ) : (
                                <span className="text-[10px] text-slate-300 italic font-bold uppercase tracking-widest">-</span>
                              )}
                            </td>
                            <td className="px-6 py-4">
                              {aff.access_code ? (
                                <code className="text-[11px] font-bold bg-orange-50 text-orange-700 px-2 py-1 rounded border border-orange-100 tracking-widest">{aff.access_code}</code>
                              ) : (
                                <span className="text-[10px] text-slate-300 italic font-bold uppercase tracking-widest">-</span>
                              )}
                            </td>
                            <td className="px-6 py-4 text-right">
                              {aff.status === 'pending' ? (
                                <button onClick={() => handleActivate(aff.id, aff.name)} className="bg-indigo-600 text-white px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-sm">Activer</button>
                              ) : (
                                <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Opérationnel</span>
                              )}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {activeModule === 'payouts' && (
              <motion.div
                key="payouts"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <span className="material-symbols-outlined text-indigo-600">account_balance</span>
                    Flux de Versements
                  </h3>
                </div>

                <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden text-left">
                  {payouts.length === 0 ? (
                    <div className="p-20 text-center text-slate-400 text-xs font-bold uppercase tracking-widest italic">Aucun mouvement récent</div>
                  ) : (
                    <table className="w-full">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-200 font-bold text-[10px] text-slate-500 uppercase tracking-wider">
                          <th className="px-6 py-4">Bénéficiaire</th>
                          <th className="px-6 py-4">Montant</th>
                          <th className="px-6 py-4">Méthode</th>
                          <th className="px-6 py-4 text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {payouts.map((p) => (
                          <tr key={p.id} className="hover:bg-slate-50/50 transition-colors group">
                            <td className="px-6 py-4">
                              <p className="text-sm font-bold text-slate-900 leading-none">{p.affiliate_name}</p>
                              <p className="text-[10px] font-medium text-slate-400 mt-1">{p.affiliate_phone}</p>
                            </td>
                            <td className="px-6 py-4">
                              <span className="text-sm font-bold text-slate-900">${p.amount}</span>
                            </td>
                            <td className="px-6 py-4">
                              <p className="text-[10px] font-bold text-slate-700">{p.payment_method}</p>
                              <p className="text-[9px] font-medium text-slate-400 uppercase tracking-widest">{new Date(p.created_at).toLocaleDateString()}</p>
                            </td>
                            <td className="px-6 py-4 text-right">
                              {p.status === 'pending' && (
                                <div className="flex justify-end gap-2">
                                  <button onClick={() => handleUpdatePayout(p.id, 'paid')} className="bg-slate-900 text-white px-3 py-1 rounded-md text-[10px] font-bold uppercase hover:bg-slate-800 transition-all">Approuver</button>
                                  <button onClick={() => handleUpdatePayout(p.id, 'rejected')} className="text-slate-500 hover:text-rose-600 px-3 py-1 rounded-md text-[10px] font-bold uppercase transition-all">Rejeter</button>
                                </div>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </motion.div>
            )}

            {activeModule === 'profile' && (
              <motion.div
                key="profile"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="max-w-2xl mx-auto"
              >
                <ExecutiveCard className="p-10">
                  <div className="flex items-center gap-8 mb-10">
                    <div className="relative group">
                      <div className="w-24 h-24 rounded-2xl bg-slate-100 border border-slate-200 shadow-sm overflow-hidden flex items-center justify-center text-2xl font-bold text-slate-400">
                        {adminProfile.avatarUrl ? <img src={adminProfile.avatarUrl} alt="" className="w-full h-full object-cover" /> : adminProfile.avatar}
                      </div>
                      <label className="absolute -bottom-2 -right-2 w-8 h-8 bg-white border border-slate-200 rounded-lg flex items-center justify-center text-slate-600 cursor-pointer shadow-sm hover:bg-slate-50 transition-all">
                        <span className="material-symbols-outlined text-sm">edit</span>
                        <input
                          type="file"
                          hidden
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onloadend = () => setAdminProfile({ ...adminProfile, avatarUrl: reader.result as string });
                              reader.readAsDataURL(file);
                            }
                          }}
                        />
                      </label>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">{adminProfile.name}</h3>
                      <p className="text-sm font-medium text-slate-500">Super Administrateur</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">Identité</label>
                        <input type="text" value={adminProfile.name} onChange={(e) => setAdminProfile({ ...adminProfile, name: e.target.value })} className="w-full px-4 py-2 bg-white rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-600/10 focus:border-indigo-600/30 transition-all font-medium text-sm" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">Email</label>
                        <input type="text" value={adminProfile.email} onChange={(e) => setAdminProfile({ ...adminProfile, email: e.target.value })} className="w-full px-4 py-2 bg-white rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-600/10 focus:border-indigo-600/30 transition-all font-medium text-sm" />
                      </div>
                    </div>
                    <button className="w-full bg-slate-900 text-white py-3 rounded-lg font-bold text-xs uppercase tracking-widest hover:bg-slate-800 transition-all shadow-sm">Mettre à jour le profil</button>
                  </div>
                </ExecutiveCard>
              </motion.div>
            )}


            {activeModule === 'settings' && (
              <motion.div
                key="settings"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-8"
              >
                <div className="space-y-8">
                  <ExecutiveCard className="p-8">
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-8 flex items-center gap-2">
                      <span className="material-symbols-outlined text-indigo-600">tune</span>
                      Configuration Plateforme
                    </h3>
                    <div className="space-y-6">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Nom de la Plateforme</label>
                        <input
                          type="text"
                          value={settings.platformName}
                          onChange={(e) => setSettings({ ...settings, platformName: e.target.value })}
                          className="w-full px-4 py-2 bg-white rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-600/10 transition-all font-medium text-sm text-slate-900"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Commission Fixe ($)</label>
                        <input
                          type="number"
                          value={settings.commissionRate}
                          onChange={(e) => setSettings({ ...settings, commissionRate: parseInt(e.target.value) })}
                          className="w-full px-4 py-2 bg-white rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-600/10 transition-all font-medium text-sm text-slate-900"
                        />
                      </div>
                    </div>
                  </ExecutiveCard>

                  <ExecutiveCard className="p-8">
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                      <div>
                        <p className="text-sm font-bold text-slate-900">Activation Automatique</p>
                        <p className="text-[10px] text-slate-400 font-medium">Activer les partenaires dès l'inscription</p>
                      </div>
                      <button
                        onClick={() => setSettings({ ...settings, allowAutoActivation: !settings.allowAutoActivation })}
                        className={`w-14 h-8 rounded-full relative transition-all duration-300 ${settings.allowAutoActivation ? 'bg-indigo-600' : 'bg-slate-200'}`}
                      >
                        <div className={`absolute top-1 w-6 h-6 rounded-full bg-white shadow-sm transition-all duration-300 ${settings.allowAutoActivation ? 'left-7' : 'left-1'}`}></div>
                      </button>
                    </div>
                  </ExecutiveCard>
                </div>

                <div className="space-y-8">
                  <ExecutiveCard className="p-8">
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-8 flex items-center gap-2">
                      <span className="material-symbols-outlined text-indigo-600">payments</span>
                      Comptes de Réception
                    </h3>
                    <div className="space-y-4">
                      {Object.entries(settings.paymentNumbers).map(([key, value]) => (
                        <div key={key} className="space-y-1.5">
                          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">{key}</label>
                          <input
                            type="text"
                            value={value}
                            onChange={(e) => setSettings({
                              ...settings,
                              paymentNumbers: { ...settings.paymentNumbers, [key]: e.target.value }
                            })}
                            className="w-full px-4 py-2 bg-slate-50 rounded-lg border border-slate-200 focus:bg-white outline-none transition-all font-medium text-sm text-slate-900"
                          />
                        </div>
                      ))}
                    </div>
                  </ExecutiveCard>

                  <ExecutiveCard className="p-8 bg-slate-900 text-white relative overflow-hidden group">
                    <div className="relative z-10 text-left">
                      <h4 className="text-lg font-bold mb-2">Audit de Sécurité</h4>
                      <p className="text-slate-400 text-[11px] leading-relaxed mb-6">Tous les changements de paramètres sont audités en temps réel pour garantir l'intégrité de la plateforme.</p>
                      <button className="bg-white text-slate-900 px-6 py-2 rounded-lg font-bold text-[10px] uppercase tracking-widest hover:bg-slate-50 transition-all">Consulter Logs</button>
                    </div>
                    <span className="material-symbols-outlined absolute -bottom-10 -right-10 text-[10rem] text-white/5 group-hover:scale-110 transition-transform duration-500">verified_user</span>
                  </ExecutiveCard>
                </div>
              </motion.div>
            )}

            {activeModule === 'chats' && (
              <AdminChatSupport />
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

function Testimonials() {
  return (
    <section className="py-32 bg-white" id="testimonials">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl lg:text-5xl font-display font-extrabold tracking-tight text-slate-900 mb-6">Ce que disent nos clients</h2>
          <p className="text-slate-600 text-lg">Des entrepreneurs comme vous qui ont franchi le pas de la vente en ligne automatisée.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-slate-50 p-10 rounded-[2.5rem] ring-1 ring-slate-900/5 flex flex-col justify-between">
            <div>
              <div className="flex gap-1 text-yellow-400 mb-6">
                <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              </div>
              <p className="text-slate-700 text-lg leading-relaxed mb-10 font-medium">
                "Avant, je passais mes journées à vérifier les preuves de paiement sur WhatsApp. Depuis que j'utilise E-commerce RDC Pro, tout est automatisé. Mes ventes ont augmenté de 40% en deux mois."
              </p>
            </div>
            <div className="flex items-center gap-4">
              <img alt="Portrait de Sarah M." className="w-14 h-14 rounded-full object-cover ring-2 ring-white shadow-sm" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBoE6WS55Mq9Jb4Z_O_cGbI7qhIvBWMCS7pLpR-_93xCAgf08gTS7rKA4ju2QaxJ9-TwhAq1dJV617cB-bl-Zm5-Uzpe7CAtwpz6U6DDRJ5re6RZ_ETxC2u0a_kGSsKk8huZNAhV6RT4Honvp7bLqxFE4zTBpZs8OHk-gEkuvCM5THkfzjCbX9g2-505l7x4-f-9x4WtQaYoLXBIytHkdqzz3Jj4pxfK3mfHcj9rIgCKxJYrUIqWsfBAtctj8H_oYJzq-WfoZXTyjI" referrerPolicy="no-referrer" />
              <div>
                <p className="font-bold text-slate-900">Sarah Musau</p>
                <p className="text-sm text-slate-500">Boutique Glam Goma</p>
              </div>
            </div>
          </div>
          <div className="bg-slate-50 p-10 rounded-[2.5rem] ring-1 ring-slate-900/5 flex flex-col justify-between">
            <div>
              <div className="flex gap-1 text-yellow-400 mb-6">
                <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              </div>
              <p className="text-slate-700 text-lg leading-relaxed mb-10 font-medium">
                "L'intégration de M-Pesa a changé la donne pour mon business. Mes clients de Kinshasa et d'ailleurs peuvent payer en un clic. L'installation a été rapide et le support est top."
              </p>
            </div>
            <div className="flex items-center gap-4">
              <img alt="Portrait de Marc K." className="w-14 h-14 rounded-full object-cover ring-2 ring-white shadow-sm" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB-X0nd5f0vToZXfdv3Kg1HRyd2xleyjRXwJaiz5goQCwUyOVn3A6rDwpCL3BIrYDT0CweTxk88nunMwnLHwPLkN6sZM9-PmCljfs9S8l4QAdkChu8TRYpu2uRxXCG8_OudqhLve4CWRmbSTJ8y5fpN-_er_mgu35SeEMA_oBHLJXbAKS63CuVNKw4oDC99jhXmVoA_FlAMm5w5LQgV0YQyIVBtZ8bAjgheEM4enVIkEjDYoCsskvsWjBpUNJB7XLXm9MTnb0HVj6o" referrerPolicy="no-referrer" />
              <div>
                <p className="font-bold text-slate-900">Marc Kabamba</p>
                <p className="text-sm text-slate-500">K-Tech Solutions</p>
              </div>
            </div>
          </div>
          <div className="bg-slate-50 p-10 rounded-[2.5rem] ring-1 ring-slate-900/5 flex flex-col justify-between">
            <div>
              <div className="flex gap-1 text-yellow-400 mb-6">
                <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              </div>
              <p className="text-slate-700 text-lg leading-relaxed mb-10 font-medium">
                "Je n'y connaissais rien en technique, mais l'équipe a tout configuré. La gestion des frais de livraison par province est super précise. C'est le meilleur investissement pour ma PME."
              </p>
            </div>
            <div className="flex items-center gap-4">
              <img alt="Portrait de Dorcas L." className="w-14 h-14 rounded-full object-cover ring-2 ring-white shadow-sm" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB1spHWmr9rxNmcA7Qnds0NEJm5kU9aXwBI4TWkzGz2SuMwRz2MQ4RPnlYtE-EdvQKzlDSG5lE5ukPHnEeUpT-WevqTV01yFlNmWjRiFcw37PLvWcO1uhBNp1ZMlKUh1KWBgSV4wdf8eVAo_d_FJWezYZJdrNmfYgoJ-hBWNXRMxM7xmB18xSA--ya1DZ8M4PoMC0u8tv-L5GOff2q5EldN0ZXOgRrFMpawjzebgm1DBcOKe2R8n5R9NdsD4bcWFcJ0IwXC4L0W5XA" referrerPolicy="no-referrer" />
              <div>
                <p className="font-bold text-slate-900">Dorcas Luvumbu</p>
                <p className="text-sm text-slate-500">Luvumbu Fashion</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function FAQ() {
  return (
    <section className="py-24 bg-slate-50" id="faq">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-display font-extrabold tracking-tight text-slate-900 mb-6">Questions Fréquentes</h2>
          <p className="text-slate-600 text-lg">Tout ce que vous devez savoir pour lancer votre boutique avec succès.</p>
        </div>
        <div className="space-y-4">
          <details className="group bg-white rounded-2xl ring-1 ring-slate-900/5 shadow-sm overflow-hidden" open>
            <summary className="flex justify-between items-center p-6 cursor-pointer list-none hover:bg-slate-50/50 transition-colors">
              <span className="text-lg font-bold text-slate-900">Comment se passe le paiement ?</span>
              <span className="material-symbols-outlined transition-transform group-open:rotate-180 text-slate-400">expand_more</span>
            </summary>
            <div className="px-6 pb-6 text-slate-600 leading-relaxed">
              <p>C'est très simple : vos clients choisissent leurs produits, entrent leur numéro Mobile Money au moment du paiement, et reçoivent instantanément une demande de confirmation sur leur téléphone. Une fois le code PIN saisi, la commande est validée automatiquement sur votre site.</p>
            </div>
          </details>
          <details className="group bg-white rounded-2xl ring-1 ring-slate-900/5 shadow-sm overflow-hidden">
            <summary className="flex justify-between items-center p-6 cursor-pointer list-none hover:bg-slate-50/50 transition-colors">
              <span className="text-lg font-bold text-slate-900">Quels sont les délais de configuration ?</span>
              <span className="material-symbols-outlined transition-transform group-open:rotate-180 text-slate-400">expand_more</span>
            </summary>
            <div className="px-6 pb-6 text-slate-600 leading-relaxed">
              <p>Nous nous engageons à livrer votre boutique clé en main sous 7 jours ouvrés. Cela inclut l'installation technique, le paramétrage des moyens de paiement et l'importation de vos premiers produits.</p>
            </div>
          </details>
          <details className="group bg-white rounded-2xl ring-1 ring-slate-900/5 shadow-sm overflow-hidden">
            <summary className="flex justify-between items-center p-6 cursor-pointer list-none hover:bg-slate-50/50 transition-colors">
              <span className="text-lg font-bold text-slate-900">Ai-je besoin de connaissances techniques ?</span>
              <span className="material-symbols-outlined transition-transform group-open:rotate-180 text-slate-400">expand_more</span>
            </summary>
            <div className="px-6 pb-6 text-slate-600 leading-relaxed">
              <p>Absolument pas. Nous gérons toute la partie complexe. Vous recevez un accès à une interface simplifiée (tableau de bord) qui vous permet de gérer vos stocks et vos commandes aussi facilement que vous utilisez Facebook ou WhatsApp.</p>
            </div>
          </details>
        </div>
      </motion.div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 py-16 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2 space-y-6">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-3xl">storefront</span>
              <span className="text-xl font-bold text-white tracking-tight">E-commerce RDC Pro</span>
            </div>
            <p className="max-w-sm leading-relaxed">
              La solution n°1 en RDC pour digitaliser votre commerce et automatiser vos paiements Mobile Money. Simple, rapide et professionnel.
            </p>
            <div className="space-y-2 mt-4">
              <a href="mailto:mambwehermann@gmail.com" className="flex items-center gap-2 text-slate-400 hover:text-primary transition-colors">
                <span className="material-symbols-outlined text-sm">mail</span>
                mambwehermann@gmail.com
              </a>
              <a href="https://wa.me/243837944949" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-slate-400 hover:text-green-500 transition-colors">
                <span className="material-symbols-outlined text-sm">chat</span>
                +243 83 794 4949
              </a>
            </div>
            <div className="flex gap-4 pt-2">
              <a className="w-10 h-10 rounded-full bg-slate-900 ring-1 ring-white/10 flex items-center justify-center hover:bg-primary hover:text-white transition-all" href="#">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.417c0-3.007 1.791-4.667 4.53-4.667 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"></path></svg>
              </a>
              <a className="w-10 h-10 rounded-full bg-slate-900 ring-1 ring-white/10 flex items-center justify-center hover:bg-primary hover:text-white transition-all" href="#">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884 0 2.225.569 3.843 1.617 5.518l-1.001 3.656 3.873-1.013zm11.373-7.144c-.311-.156-1.841-.908-2.126-1.011-.284-.103-.491-.156-.699.156-.207.311-.803 1.011-.984 1.218-.181.207-.363.233-.674.078-.311-.156-1.312-.483-2.499-1.541-.923-.824-1.546-1.841-1.727-2.152-.181-.311-.019-.48.137-.635.141-.14.311-.363.466-.544.156-.181.207-.311.311-.518.104-.207.052-.389-.026-.544-.078-.156-.699-1.684-.958-2.306-.252-.603-.51-.521-.699-.531-.18-.01-.389-.012-.596-.012-.207 0-.544.078-.829.389-.285.311-1.088 1.063-1.088 2.592 0 1.53 1.114 3.007 1.269 3.214.156.207 2.192 3.348 5.311 4.697.741.321 1.32.512 1.771.656.745.236 1.423.203 1.958.123.597-.089 1.841-.752 2.1-.1.478.259.726 1.348.726 2.022.026 1.53-.104 2.825-.26 3.136-.156.311-.466.467-.777.311z"></path></svg>
              </a>
            </div>
          </div>
          <div className="space-y-6">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider">Liens Rapides</h4>
            <ul className="space-y-4 text-sm">
              <li><a className="hover:text-primary transition-colors" href="/?page=about">À propos</a></li>
              <li><a className="hover:text-primary transition-colors" href="/#features">Fonctionnalités</a></li>
              <li><a className="hover:text-primary transition-colors" href="/#pricing">Tarifs</a></li>
              <li><a className="hover:text-primary transition-colors" href="/#testimonials">Témoignages</a></li>
              <li><a className="text-accent-vibrant hover:text-orange-600 transition-colors font-medium flex items-center gap-1" href="/#affiliate"><span className="material-symbols-outlined text-xs">loyalty</span> Programme Affiliation</a></li>
            </ul>
          </div>
          <div className="space-y-6">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider">Légal</h4>
            <ul className="space-y-4 text-sm">
              <li><a className="hover:text-primary transition-colors" href="#">Confidentialité</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">CGV</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Support</a></li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm">© 2024 E-commerce RDC Pro. Tous droits réservés.</p>
          <div className="flex items-center gap-6">
            <span className="text-xs flex items-center gap-1"><span className="material-symbols-outlined text-xs">public</span> Kinshasa, RDC</span>
            <span className="text-xs flex items-center gap-1"><span className="material-symbols-outlined text-xs">encrypted</span> Paiements Sécurisés</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function AdminLoginForm({ onLogin }: { onLogin: (userData: any) => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        onLogin(data.user);
      } else {
        setError(data.error || 'Accès refusé. Identifiants administrateur incorrects.');
      }
    } catch (err) {
      setError('Erreur de connexion au serveur.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex lg:flex-row-reverse bg-slate-50 font-sans">
      {/* Form (Right Side on Desktop, Full on Mobile) */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative bg-white lg:rounded-l-[3rem] lg:shadow-[-20px_0_50px_rgba(0,0,0,0.1)] z-20">
        <a href="/" className="absolute top-8 left-8 flex items-center gap-2 text-slate-500 hover:text-primary transition-colors font-bold text-sm">
          <span className="material-symbols-outlined text-sm">arrow_back</span> Retour
        </a>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-sm mx-auto"
        >
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl shadow-lg mb-6 bg-gradient-to-tr from-blue-600 to-indigo-500 shadow-blue-600/20">
              <span className="material-symbols-outlined text-white text-4xl">shield_person</span>
            </div>
            <h2 className="text-3xl font-display font-black text-slate-900 tracking-tight mb-2">Administration</h2>
            <p className="text-slate-500 font-medium">Accès réservé au personnel autorisé</p>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-2xl text-sm mb-8 text-center font-bold flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-lg">error</span>
              {error}
            </motion.div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Email Professionnel</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl">mail</span>
                <input
                  type="email"
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all placeholder:text-slate-400"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Mot de passe</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl">lock</span>
                <input
                  type="password"
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all placeholder:text-slate-400"
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full text-white py-5 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-blue-500/20 hover:shadow-blue-500/40 hover:-translate-y-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed group bg-gradient-to-tr from-blue-600 to-indigo-600"
            >
              <span className="flex items-center justify-center gap-2">
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    Connecter
                    <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                  </>
                )}
              </span>
            </button>
          </form>
        </motion.div>
      </div>

      {/* Right Side: Beautiful text & branding */}
      <div className="hidden lg:flex w-1/2 bg-slate-950 relative overflow-hidden items-center justify-center p-20 xl:p-24">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-slate-900 to-slate-950 z-0 opacity-90"></div>
        <div className="absolute top-[10%] right-[-10%] w-[60%] h-[60%] rounded-full blur-[150px] bg-blue-500/20 animate-pulse"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full blur-[150px] bg-indigo-500/20" style={{ animationDelay: '2s' }}></div>

        <div className="relative z-10 text-white max-w-xl">
          <div className="mb-10 inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
            <span className="material-symbols-outlined text-3xl text-blue-400">admin_panel_settings</span>
          </div>
          <h2 className="text-4xl xl:text-5xl font-display font-black mb-8 leading-tight tracking-tight">
            L'espace exclusif pour <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">piloter votre empire.</span>
          </h2>
          <p className="text-lg xl:text-xl text-slate-300 leading-relaxed mb-12">
            Prenez le contrôle total de vos opérations e-commerce. Analysez vos ventes, gérez vos affiliés et supervisez les paiements avec une interface pensée pour une efficacité absolue.
          </p>

          <div className="space-y-6">
            <div className="flex items-center gap-6 p-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
              <div className="w-14 h-14 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                <span className="material-symbols-outlined text-2xl">security</span>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Sécurité Maximale</h3>
                <p className="text-sm text-slate-400">Infrastructures hautement sécurisées, accès restreint et surveillance continue.</p>
              </div>
            </div>

            <div className="flex items-center gap-6 p-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
              <div className="w-14 h-14 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
                <span className="material-symbols-outlined text-2xl">monitoring</span>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Analytique Avancée</h3>
                <p className="text-sm text-slate-400">Visualisez la croissance de votre plateforme en temps réel et prenez les meilleures décisions.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PartnerPortalAccess({ onLogin }: { onLogin: (userData: any) => void }) {
  const [phone, setPhone] = useState('');
  const [accessCode, setAccessCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/affiliates/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, access_code: accessCode }),
      });
      const data = await response.json();
      if (response.ok) {
        onLogin(data.user);
      } else {
        setError(data.error || 'Code d\'accès ou numéro incorrect.');
      }
    } catch (err) {
      setError('Erreur de connexion au serveur.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex lg:flex-row-reverse bg-slate-50 font-sans">
      {/* Form (Right Side on Desktop, Full on Mobile) */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative bg-white lg:rounded-l-[3rem] lg:shadow-[-20px_0_50px_rgba(0,0,0,0.1)] z-20">
        <a href="/" className="absolute top-8 left-8 flex items-center gap-2 text-slate-500 hover:text-primary transition-colors font-bold text-sm">
          <span className="material-symbols-outlined text-sm">arrow_back</span> Retour
        </a>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-sm mx-auto"
        >
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl shadow-lg mb-6 bg-gradient-to-tr from-primary to-orange-500 shadow-primary/20">
              <span className="material-symbols-outlined text-white text-4xl">handshake</span>
            </div>
            <h2 className="text-3xl font-display font-black text-slate-900 tracking-tight mb-2">Espace Partenaire</h2>
            <p className="text-slate-500 font-medium">Bienvenue dans votre portail de réussite</p>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-2xl text-sm mb-8 text-center font-bold flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-lg">error</span>
              {error}
            </motion.div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Numéro WhatsApp</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl">phone</span>
                <input
                  type="tel"
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 focus:ring-2 focus:ring-primary focus:bg-white outline-none transition-all placeholder:text-slate-400"
                  placeholder="+243 ..."
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Code d'Accès Unique</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl">key</span>
                <input
                  type="password"
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 focus:ring-2 focus:ring-primary focus:bg-white outline-none transition-all placeholder:text-slate-400"
                  placeholder="Code fourni par l'admin"
                  value={accessCode}
                  onChange={(e) => setAccessCode(e.target.value)}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full text-white py-5 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed group bg-gradient-to-tr from-primary to-orange-500"
            >
              <span className="flex items-center justify-center gap-2">
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    Accéder à mon Dashboard
                    <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                  </>
                )}
              </span>
            </button>
          </form>
        </motion.div>
      </div>

      {/* Left Side: Beautiful text & branding */}
      <div className="hidden lg:flex w-1/2 bg-slate-950 relative overflow-hidden items-center justify-center p-20 xl:p-24">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-900 z-0 opacity-90"></div>
        <div className="absolute top-[10%] left-[0%] w-[70%] h-[70%] rounded-full blur-[150px] bg-primary/20 animate-pulse"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full blur-[150px] bg-orange-500/20" style={{ animationDelay: '2s' }}></div>

        <div className="relative z-10 text-white max-w-xl">
          <div className="mb-10 inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
            <span className="material-symbols-outlined text-3xl text-orange-400">loyalty</span>
          </div>
          <h2 className="text-4xl xl:text-5xl font-display font-black mb-8 leading-tight tracking-tight">
            Espace Partenaire <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-400">votre portail de réussite.</span>
          </h2>
          <p className="text-lg xl:text-xl text-slate-300 leading-relaxed mb-12">
            Rejoignez le réseau le plus dynamique de RDC. Suivez vos commissions, gérez vos affiliés et voyez vos revenus croître en temps réel.
          </p>

          <div className="space-y-6">
            <div className="flex items-center gap-6 p-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
              <div className="w-14 h-14 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 shrink-0">
                <span className="material-symbols-outlined text-2xl">payments</span>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Commissions Instantanées</h3>
                <p className="text-sm text-slate-400">Financement direct de vos projets avec nos taux de commission imbattables.</p>
              </div>
            </div>

            <div className="flex items-center gap-6 p-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
              <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0">
                <span className="material-symbols-outlined text-2xl">insights</span>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Suivi en Temps Réel</h3>
                <p className="text-sm text-slate-400">Des statistiques claires et transparentes sur l'impact de chaque recommandation.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}





function PaymentLinkPage({ linkId }: { linkId: string }) {
  const [linkData, setLinkData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [paid, setPaid] = useState(false);

  useEffect(() => {
    fetch(`/api/payment-links/${linkId}`)
      .then(res => res.json())
      .then(data => {
        setLinkData(data);
        setLoading(false);
      });
  }, [linkId]);

  const handlePay = async () => {
    const res = await fetch(`/api/payment-links/${linkId}/pay`, { method: 'PATCH' });
    if (res.ok) {
      setPaid(true);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-slate-50"><div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>;

  if (paid || (linkData && linkData.status === 'paid')) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white p-12 rounded-[3rem] shadow-2xl text-center max-w-lg w-full">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="material-symbols-outlined text-4xl">check_circle</span>
          </div>
          <h2 className="text-3xl font-black text-slate-900 mb-4">Paiement Réussi !</h2>
          <p className="text-slate-600 mb-8 font-medium">Merci {linkData.client_name}. Votre installation de boutique E-commerce RDC Pro va débuter sous peu.</p>
          <button onClick={() => window.location.href = '/'} className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold">Retour à l'accueil</button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-20 px-6 font-sans">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden ring-1 ring-slate-900/5">
          <div className="bg-slate-900 p-12 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white">
                  <span className="material-symbols-outlined">payments</span>
                </div>
                <span className="font-black text-xl tracking-tight">E-commerce RDC Pro</span>
              </div>
              <h1 className="text-4xl font-display font-black mb-4">Finalisez votre commande</h1>
              <p className="text-slate-400 font-medium">Lien de paiement sécurisé généré par votre conseiller <span className="text-white font-bold">{linkData?.affiliate_name}</span></p>
            </div>
          </div>

          <div className="p-12">
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-8">
                <div>
                  <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Résumé de l'offre</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-slate-900">
                      <span className="font-bold">Installation & Licence Pro</span>
                      <span className="font-black">${linkData?.amount}</span>
                    </div>
                    <div className="flex justify-between items-center text-slate-500 text-sm">
                      <span>Nom de domaine .com/.cd</span>
                      <span className="text-green-600 font-bold uppercase text-[10px] bg-green-50 px-2 py-0.5 rounded">Offert</span>
                    </div>
                  </div>
                </div>

                <div className="pt-8 border-t border-slate-100">
                  <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Informations Client</h3>
                  <div className="bg-slate-50 p-6 rounded-2xl">
                    <p className="font-black text-slate-900 mb-1">{linkData?.client_name}</p>
                    <p className="text-sm font-medium text-slate-500">{linkData?.client_phone}</p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 p-10 rounded-[2.5rem] border border-slate-100">
                <h3 className="text-xl font-black text-slate-900 mb-6 tracking-tight">Payer avec Mobile Money</h3>
                <div className="space-y-4 mb-10">
                  <div className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-slate-200">
                    <div className="w-8 h-8 bg-blue-600 rounded-full"></div>
                    <span className="font-bold text-slate-700">M-Pesa</span>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-slate-200">
                    <div className="w-8 h-8 bg-red-600 rounded-full"></div>
                    <span className="font-bold text-slate-700">Airtel Money</span>
                  </div>
                </div>

                <button
                  onClick={handlePay}
                  className="w-full bg-primary text-white py-5 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
                >
                  Confirmer le paiement
                </button>
                <p className="text-center text-[10px] text-slate-400 mt-6 font-bold uppercase tracking-widest">Paiement 100% sécurisé via SSL</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [loginState, setLoginState] = useState<{ role: 'admin' | 'affiliate' | 'client' | null, user: any }>({ role: null, user: null });
  const [showLogin, setShowLogin] = useState<'admin' | 'affiliate' | 'client' | null>(null);

  // Simple routing for payment links
  const urlParams = new URLSearchParams(window.location.search);
  const linkId = urlParams.get('link');
  const pageParams = urlParams.get('page');
  const clientAction = urlParams.get('client'); // 'login' | 'register'

  if (clientAction === 'register') {
    return (
      <ClientOnboarding 
        onSuccess={() => { window.location.href = '/?client=login'; }}
        onClose={() => { window.location.href = '/'; }}
      />
    );
  }

  if (pageParams === 'about') {
    return (
      <div className="min-h-screen">
        <CountdownTimer />
        <Header onLoginClick={() => setShowLogin('affiliate')} />
        <AboutUs />
        <Footer />
        <FloatingWhatsApp />
      </div>
    );
  }

  if (linkId) {
    return <PaymentLinkPage linkId={linkId} />;
  }

  if (loginState.role === 'admin') {
    return (
      <div className="relative">
        <button
          onClick={() => setLoginState({ role: null, user: null })}
          className="fixed top-4 right-4 z-[100] bg-slate-900 text-white px-4 py-2 rounded-full font-bold shadow-lg"
        >
          Se déconnecter
        </button>
        <AdminDashboard />
      </div>
    );
  }

  if (loginState.role === 'affiliate') {
    return (
      <AffiliateDashboard
        affiliateId={loginState.user.id}
        onLogout={() => setLoginState({ role: null, user: null })}
      />
    );
  }

  if (loginState.role === 'client') {
    return (
      <ClientPortal
        initialClient={loginState.user}
        onLogout={() => setLoginState({ role: null, user: null })}
      />
    );
  }

  if (showLogin === 'client') {
    return (
      <div className="relative">
        <ClientPortal onLogout={() => setShowLogin(null)} />
      </div>
    );
  }

  if (showLogin === 'admin') {
    return (
      <div className="relative">
        <AdminLoginForm onLogin={(user) => setLoginState({ role: 'admin', user })} />
      </div>
    );
  }

  if (showLogin === 'affiliate') {
    return (
      <div className="relative">
        <PartnerPortalAccess onLogin={(user) => setLoginState({ role: 'affiliate', user })} />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <CountdownTimer />
      <Header onLoginClick={() => setShowLogin('affiliate')} />
      <main>
        <Hero />

        <Partners />
        <HowItWorks />
        <Features />
        <ShowcaseGallery />
        <ComparisonTable />
        <Pricing />
        <Contact />
        <Testimonials />
        <Affiliate onSuccess={() => {
          setShowLogin('affiliate');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }} />
        <FAQ />
      </main>
      <Footer />
      {/* Hidden triggers for login - for easier access during dev */}
      <div
        className="fixed bottom-4 left-4 w-8 h-8 opacity-0 hover:opacity-10 transition-opacity cursor-pointer z-[100]"
        onClick={() => setShowLogin('admin')}
      ></div>
      <div
        className="fixed bottom-4 right-20 w-8 h-8 opacity-0 hover:opacity-10 transition-opacity cursor-pointer z-[100]"
        onClick={() => setShowLogin('affiliate')}
      ></div>
      <div
        className="fixed bottom-14 right-20 w-8 h-8 opacity-0 hover:opacity-10 transition-opacity cursor-pointer z-[100]"
        onClick={() => setShowLogin('client')}
      ></div>
      <FloatingWhatsApp />
    </div>
  );
}
