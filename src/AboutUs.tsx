import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

export default function AboutUs() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 800], [0, -100]);
  
  return (
    <main className="font-sans overflow-hidden">
      {/* HERO SECTION */}
      <section className="relative pt-24 pb-32 lg:pt-32 lg:pb-40 bg-slate-950 text-white overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full blur-[150px] animate-pulse bg-primary/20"></div>
          <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full blur-[150px] animate-pulse bg-orange-500/20" style={{ animationDelay: '2s' }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/5 border border-white/10 text-white text-sm font-bold tracking-widest uppercase mb-8 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>
              L'Histoire de E-commerce RDC Pro
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-8xl font-display font-black tracking-tight mb-8 leading-[1.1]">
              Redéfinir le commerce 
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-orange-400">
                sur notre continent.
              </span>
            </h1>
            <p className="text-xl text-slate-300 leading-relaxed font-medium">
              Nous levons les barrières technologiques en intégrant nativement <strong className="text-white">M-Pesa, Airtel et Orange Money</strong>, pour permettre à chaque entrepreneur congolais de vendre en ligne, simplement.
            </p>
          </motion.div>
        </div>
      </section>

      {/* THE FOUNDER SECTION */}
      <section className="py-32 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div 
              style={{ y: y1 }}
              initial={{ opacity: 0, scale: 0.9 }} 
              whileInView={{ opacity: 1, scale: 1 }} 
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative order-2 lg:order-1"
            >
              <div className="absolute -inset-10 bg-gradient-to-br from-primary/10 via-orange-500/5 to-transparent rounded-[4rem] transform -rotate-6 z-0 mix-blend-multiply"></div>
              <div className="relative z-10 rounded-[3rem] shadow-2xl ring-1 ring-slate-900/10 overflow-hidden bg-slate-100">
                <img 
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2574&auto=format&fit=crop" 
                  alt="Herman Mambwe - Fondateur de E-commerce RDC Pro" 
                  className="w-full h-full object-cover aspect-[4/5] object-center transition-transform duration-1000 hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent p-10 pt-24 text-white">
                  <p className="font-bold tracking-widest uppercase text-primary text-sm mb-1">Architecte Visionnaire</p>
                  <p className="font-display font-bold text-3xl">Herman Mambwe</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 50 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="order-1 lg:order-2 space-y-10"
            >
              <div>
                <h2 className="text-4xl sm:text-5xl font-display font-black text-slate-900 tracking-tight mb-4">L'homme derrière la révolution</h2>
                <div className="w-20 h-2 bg-gradient-to-r from-primary to-orange-500 rounded-full"></div>
              </div>
              
              <div className="text-lg sm:text-xl text-slate-600 leading-relaxed font-medium space-y-6">
                <p>
                  Passionné par la technologie et porteur d'une vision d'émancipation économique, Herman Mambwe a identifié un frein majeur pour l'entrepreneuriat congolais : l'absence d'infrastructures de paiement en ligne locales, fiables et automatisées.
                </p>
                <p>
                  Tandis que le reste du monde vend via Stripe et PayPal, les entrepreneurs congolais perdaient quotidiennement d'innombrables ventes à cause de processus manuels fastidieux par Mobile Money.
                </p>
                <div className="bg-slate-50 border-l-8 border-primary rounded-r-3xl p-8 my-8 shadow-sm">
                  <p className="text-xl sm:text-2xl font-bold text-slate-800 italic leading-relaxed">
                    "Ma mission n'est pas seulement de créer des sites web. C'est de livrer aux PME de Goma à Kinshasa des outils aux standards mondiaux, totalement repensés pour nos réalités."
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* VISION, MISSION, CONVICTION (ADN) */}
      <section className="py-32 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <h2 className="text-4xl sm:text-5xl font-display font-black tracking-tight text-slate-900 mb-6">Notre ADN</h2>
            <p className="text-xl text-slate-600 font-medium">Les trois piliers inébranlables qui fondent notre approche et inspirent chaque ligne de code que nous écrivons.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Vision */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="bg-white p-12 rounded-[3rem] shadow-xl shadow-slate-200/50 ring-1 ring-slate-900/5 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 group"
            >
              <div className="w-20 h-20 bg-blue-50 rounded-3xl flex items-center justify-center mb-8 text-blue-600 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all transform rotate-3">
                <span className="material-symbols-outlined text-4xl">travel_explore</span>
              </div>
              <h3 className="text-3xl font-bold mb-4 tracking-tight text-slate-900">Vision</h3>
              <p className="text-slate-600 leading-relaxed text-lg">
                S'imposer comme l'infrastructure technologique évidente en Afrique Centrale, offrant à toute PME un canal de vente mondial et sans friction.
              </p>
            </motion.div>
            
            {/* Mission */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white p-12 rounded-[3rem] shadow-xl shadow-slate-200/50 ring-1 ring-primary/20 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mb-8 text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all transform -rotate-3">
                <span className="material-symbols-outlined text-4xl">rocket_launch</span>
              </div>
              <h3 className="text-3xl font-bold mb-4 tracking-tight text-slate-900">Mission</h3>
              <p className="text-slate-600 leading-relaxed text-lg">
                Démocratiser l'e-commerce en RDC avec des boutiques performantes intégrant le paiement automatisé Mobile Money à la portée de tous.
              </p>
            </motion.div>

            {/* Conviction */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white p-12 rounded-[3rem] shadow-xl shadow-slate-200/50 ring-1 ring-slate-900/5 hover:-translate-y-2 hover:shadow-2xl hover:shadow-green-500/10 transition-all duration-300 group"
            >
              <div className="w-20 h-20 bg-green-50 rounded-3xl flex items-center justify-center mb-8 text-green-600 group-hover:scale-110 group-hover:bg-green-600 group-hover:text-white transition-all transform rotate-3">
                <span className="material-symbols-outlined text-4xl">psychology</span>
              </div>
              <h3 className="text-3xl font-bold mb-4 tracking-tight text-slate-900">Conviction</h3>
              <p className="text-slate-600 leading-relaxed text-lg">
                La technologie doit être un levier d'ascension sociale. Abaisser les barrières techniques, c'est stimuler directement l'économie réelle de la RDC.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* AFFILIATE IMPACT SECTION */}
      <section className="py-32 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1542626991-cbc4e32524cc?q=80&w=2669&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/90 to-slate-900/60 z-10"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-vibrant/20 text-accent-vibrant text-sm font-bold tracking-widest uppercase backdrop-blur-sm border border-accent-vibrant/30">
                <span className="material-symbols-outlined text-sm">handshake</span> Le Pouvoir à la Jeunesse
              </div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black tracking-tight leading-tight">
                Changez votre vie avec notre programme d'Affiliation.
              </h2>
              <p className="text-xl text-slate-400 leading-relaxed font-medium">
                Conscients des défis financiers pour la jeunesse, nous avons conçu un système de recommandation ultra-lucratif. 
              </p>
              
              <div className="grid sm:grid-cols-2 gap-6 pt-6">
                <div className="bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10">
                  <span className="material-symbols-outlined text-green-400 text-4xl mb-4 block">price_check</span>
                  <h3 className="text-white font-bold text-xl mb-2">Gains Massifs</h3>
                  <p className="text-slate-400 text-sm">Générez un revenu consistant permettant de financer études et ambitions.</p>
                </div>
                <div className="bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10">
                  <span className="material-symbols-outlined text-blue-400 text-4xl mb-4 block">phone_iphone</span>
                  <h3 className="text-white font-bold text-xl mb-2">Zéro Capital</h3>
                  <p className="text-slate-400 text-sm">Un smartphone, WhatsApp et votre détermination suffisent pour exceller.</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} 
              whileInView={{ opacity: 1, scale: 1 }} 
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-gradient-to-br from-primary to-orange-500 rounded-[3rem] p-1 shadow-2xl shadow-primary/30"
            >
              <div className="bg-slate-900 rounded-[2.9rem] p-10 sm:p-14 text-center h-full flex flex-col justify-center relative overflow-hidden">
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/20 rounded-full blur-3xl"></div>
                <h3 className="text-3xl font-display font-bold text-white mb-6">Devenez Partenaire Indépendant</h3>
                <p className="text-slate-400 mb-10 text-lg">Rejoignez une communauté d'ambassadeurs d'élite et touchez vos commissions directement sur Mobile Money.</p>
                <a 
                  href="/?page=home#affiliate" 
                  className="w-full bg-white text-slate-900 py-6 rounded-2xl font-black text-lg uppercase tracking-widest shadow-xl shadow-white/10 hover:shadow-2xl hover:scale-105 transition-all"
                >
                  S'inscrire au Programme
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* STRONG CALL TO ACTION */}
      <section className="py-32 bg-white text-center px-4">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-5xl sm:text-7xl font-display font-black text-slate-900 tracking-tight mb-8">
            Prêt à transformer votre entreprise ?
          </h2>
          <p className="text-2xl text-slate-600 mb-12 font-medium">
            L'automatisation est à portée de clic. Offrez à vos clients une expérience de paiement sans faille.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a 
              href="/#pricing" 
              className="bg-slate-900 text-white px-10 py-6 rounded-full font-black text-lg sm:text-xl uppercase tracking-widest shadow-2xl hover:bg-primary hover:-translate-y-2 transition-all"
            >
              Lancer ma boutique
            </a>
            <a 
              href="/#contact" 
              className="bg-slate-100 text-slate-900 hover:bg-slate-200 px-10 py-6 rounded-full font-black text-lg sm:text-xl uppercase tracking-widest shadow-xl hover:-translate-y-2 transition-all"
            >
              Contacter les ventes
            </a>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
