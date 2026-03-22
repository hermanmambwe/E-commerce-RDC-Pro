import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

export default function AboutUs() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 800], [0, -100]);
  
  return (
    <main className="font-sans overflow-hidden">
      {/* HERO SECTION */}
      <section className="relative pt-32 pb-44 lg:pt-48 lg:pb-60 bg-[#020617] text-white overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] rounded-full blur-[120px] bg-primary/10 opacity-60"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[70%] h-[70%] rounded-full blur-[120px] bg-blue-500/10 opacity-40"></div>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] mix-blend-overlay"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-5xl mx-auto text-center"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 border border-white/10 text-primary text-xs font-black tracking-[0.2em] uppercase mb-10 backdrop-blur-md"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              L'Histoire de E-commerce RDC Pro
            </motion.div>
            
            <h1 className="text-6xl sm:text-7xl lg:text-[100px] font-display font-black tracking-tight mb-12 leading-[0.95] lg:leading-[0.9]">
              Redéfinir le commerce 
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-indigo-400">
                sur notre continent.
              </span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-slate-400 leading-relaxed font-medium max-w-3xl mx-auto">
              Nous levons les barrières technologiques pour permettre à chaque entrepreneur congolais de prospérer dans l'économie numérique mondiale.
            </p>
          </motion.div>
        </div>
      </section>

      {/* THE FOUNDER SECTION */}
      <section className="py-24 lg:py-48 bg-white relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-32 items-center">
            <motion.div 
              style={{ y: y1 }}
              initial={{ opacity: 0, x: -30 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <div className="relative z-10 rounded-[2.5rem] overflow-hidden bg-slate-100 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] ring-1 ring-slate-200">
                <img 
                  src="/herman.png" 
                  alt="Herman Mambwe" 
                  className="w-full h-full object-cover aspect-[4/5] grayscale hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent p-10 text-white">
                  <p className="font-display font-black text-2xl tracking-tight">Herman Mambwe</p>
                  <p className="text-sm font-bold text-primary uppercase tracking-widest mt-1">Founder & CEO</p>
                </div>
              </div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl -z-10"></div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="space-y-12"
            >
              <div className="space-y-4">
                <h2 className="text-4xl lg:text-5xl font-display font-black text-slate-900 leading-tight">L'homme derrière la révolution digitale.</h2>
                <div className="w-16 h-1.5 bg-primary rounded-full"></div>
              </div>
              
              <div className="text-lg lg:text-xl text-slate-500 leading-relaxed font-medium space-y-8">
                <p>
                  Passionné par l'impact social de la technologie, Herman Mambwe a identifié un frein majeur : l'absence d'infrastructures de paiement automatisées adaptées à nos réalités.
                </p>
                
                <blockquote className="relative p-8 lg:p-12 bg-slate-50 rounded-[2rem] border-l-4 border-primary">
                  <span className="material-symbols-outlined absolute top-6 left-6 text-primary/10 text-6xl select-none">format_quote</span>
                  <p className="relative z-10 text-xl lg:text-2xl font-bold text-slate-800 leading-relaxed italic">
                    "Ma mission est de livrer aux PME de Goma à Kinshasa des outils aux standards mondiaux, totalement repensés pour la RDC."
                  </p>
                </blockquote>

                <p>
                  Aujourd'hui, E-commerce RDC Pro est plus qu'une plateforme : c'est le moteur de croissance pour une nouvelle génération d'entrepreneurs connectés.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* VISION, MISSION, CONVICTION (ADN) */}
      <section className="py-24 lg:py-40 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-20 lg:mb-32"
          >
            <h2 className="text-4xl lg:text-5xl font-display font-black tracking-tight text-slate-900 mb-6">Notre ADN</h2>
            <p className="text-xl text-slate-500 font-medium leading-relaxed">Les trois piliers inébranlables qui fondent notre approche et inspirent chaque ligne de code.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {[
              { 
                title: "Vision", 
                icon: "travel_explore", 
                color: "blue",
                desc: "S'imposer comme l'infrastructure technologique évidente en Afrique Centrale, offrant à toute PME un canal de vente mondial." 
              },
              { 
                title: "Mission", 
                icon: "rocket_launch", 
                color: "primary",
                desc: "Démocratiser l'e-commerce en RDC avec des boutiques performantes intégrant le paiement automatisé Mobile Money." 
              },
              { 
                title: "Conviction", 
                icon: "psychology", 
                color: "green",
                desc: "La technologie doit être un levier d'ascension sociale. Abaisser les barrières techniques, c'est stimuler l'économie réelle." 
              }
            ].map((item, i) => (
              <motion.div 
                key={item.title}
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                transition={{ delay: i * 0.1 }}
                className="bg-white p-10 lg:p-12 rounded-[2.5rem] shadow-[0_20px_40px_-12px_rgba(0,0,0,0.05)] ring-1 ring-slate-200/50 hover:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] transition-all duration-300 group"
              >
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-10 text-white ${i === 0 ? 'bg-blue-600' : i === 1 ? 'bg-primary' : 'bg-green-600'} shadow-lg transform group-hover:scale-110 transition-transform`}>
                  <span className="material-symbols-outlined text-3xl">{item.icon}</span>
                </div>
                <h3 className="text-2xl lg:text-3xl font-display font-black mb-6 tracking-tight text-slate-900">{item.title}</h3>
                <p className="text-slate-500 leading-relaxed text-lg font-medium">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AFFILIATE IMPACT SECTION */}
      <section className="py-24 lg:py-48 bg-[#020617] text-white relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1542626991-cbc4e32524cc?q=80&w=2669&auto=format&fit=crop')] bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-[#020617]/95 to-[#020617] z-10"></div>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-20">
          <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 30 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }}
              className="lg:col-span-7 space-y-10"
            >
              <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 border border-white/10 text-primary text-xs font-black tracking-widest uppercase backdrop-blur-md">
                <span className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_12px_rgba(59,130,246,0.8)]"></span>
                Impact Social
              </div>
              <h2 className="text-5xl lg:text-7xl font-display font-black tracking-tight leading-[1.1]">
                Changez votre vie avec notre <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-indigo-400">programme d'élite.</span>
              </h2>
              <p className="text-xl text-slate-400 leading-relaxed font-medium max-w-2xl">
                Nous avons conçu un système de recommandation ultra-performant pour permettre à la jeunesse congolaise de s'émanciper financièrement.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  { icon: "price_check", title: "Indépendance", desc: "Gagnez des revenus sérieux et réguliers grâce à votre réseau." },
                  { icon: "bolt", title: "Rapidité", desc: "Zéro capital requis. Un smartphone et WhatsApp suffisent." }
                ].map((stat) => (
                  <div key={stat.title} className="p-8 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-sm">
                    <span className="material-symbols-outlined text-primary text-4xl mb-6 block">{stat.icon}</span>
                    <h3 className="text-xl font-bold mb-2">{stat.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">{stat.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} 
              whileInView={{ opacity: 1, scale: 1 }} 
              viewport={{ once: true }}
              className="lg:col-span-5"
            >
              <div className="bg-gradient-to-br from-primary via-indigo-600 to-indigo-900 rounded-[3rem] p-1 shadow-2xl shadow-primary/20">
                <div className="bg-[#020617] rounded-[2.9rem] p-10 lg:p-14 text-center h-full flex flex-col justify-center relative overflow-hidden">
                  <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary/20 rounded-full blur-3xl opacity-50"></div>
                  <h3 className="text-3xl font-display font-black text-white mb-6">Devenez Partenaire</h3>
                  <p className="text-slate-400 mb-12 text-lg font-medium leading-relaxed">Rejoignez-nous et encaissez vos commissions directement sur votre téléphone.</p>
                  <a 
                    href="/?page=home#affiliate" 
                    className="w-full bg-white text-slate-900 py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-slate-100 transition-all shadow-xl"
                  >
                    Postuler maintenant
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* STRONG CALL TO ACTION */}
      <section className="py-32 lg:py-52 bg-white text-center px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-5xl lg:text-8xl font-display font-black text-slate-900 tracking-tight mb-10 leading-[0.95]">
            Prêt à transformer votre entreprise ?
          </h2>
          <p className="text-xl lg:text-2xl text-slate-500 mb-14 font-medium max-w-2xl mx-auto leading-relaxed">
            L'automatisation est à portée de clic. Offrez à vos clients une expérience de paiement sans faille.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 lg:gap-6 justify-center">
            <a 
              href="/#pricing" 
              className="bg-slate-950 text-white px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest shadow-2xl hover:bg-primary transition-all hover:-translate-y-1"
            >
              Lancer ma boutique
            </a>
            <a 
              href="/#contact" 
              className="bg-slate-50 text-slate-900 border border-slate-200 px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-white transition-all hover:-translate-y-1"
            >
              Contacter les ventes
            </a>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
