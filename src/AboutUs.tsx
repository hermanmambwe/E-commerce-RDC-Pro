import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

export default function AboutUs() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 800], [0, -80]);
  const y2 = useTransform(scrollY, [0, 800], [0, 40]);

  return (
    <main className="font-sans overflow-hidden bg-white">

      {/* ── HERO ── clean white, editorial, no dark bg ── */}
      <section className="relative pt-36 pb-32 lg:pt-52 lg:pb-44 overflow-hidden">
        {/* Subtle decorative blobs on white */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-indigo-100/60 rounded-full blur-[100px]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-4xl mx-auto text-center"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15 }}
              className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-primary/8 border border-primary/15 text-primary text-xs font-black tracking-[0.18em] uppercase mb-10"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              Notre histoire
            </motion.div>

            <h1 className="text-[clamp(3rem,10vw,7rem)] font-display font-black tracking-tight leading-[0.92] text-slate-900 mb-10">
              Bâtir l'avenir{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-indigo-500 to-blue-400">
                du commerce congolais.
              </span>
            </h1>

            <p className="text-xl lg:text-2xl text-slate-500 leading-relaxed font-medium max-w-2xl mx-auto">
              Nous brisons les barrières technologiques pour que chaque entrepreneur de la RDC puisse prospérer dans l'économie numérique mondiale.
            </p>
          </motion.div>

          {/* Scrolling stat strip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.8 }}
            className="mt-16 flex overflow-x-auto sm:overflow-visible sm:grid sm:grid-cols-3 gap-4 max-w-2xl mx-auto pb-2 sm:pb-0 px-1 sm:px-0 snap-x snap-mandatory"
          >
            {[
              { value: '7j', label: 'Livraison boutique' },
              { value: '20%', label: 'Commission partenaire' },
              { value: '100%', label: 'Paiement Mobile Money' },
            ].map((s) => (
              <div key={s.label} className="text-center p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-100 min-w-[140px] sm:min-w-0 flex-shrink-0 snap-start">
                <p className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">{s.value}</p>
                <p className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest mt-1 leading-tight">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── FOUNDER ── */}
      <section className="py-24 lg:py-40 bg-slate-50 relative overflow-hidden">
        {/* Decorative line */}
        <div className="absolute left-1/2 top-0 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent to-slate-200" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

            {/* Photo col */}
            <motion.div
              style={{ y: y1 }}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              {/* Backdrop accent */}
              <div className="absolute -inset-4 bg-gradient-to-br from-primary/10 to-indigo-100/30 rounded-[3rem] -z-10" />
              <div className="relative rounded-[2.5rem] overflow-hidden shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)] ring-1 ring-slate-900/8">
                <img
                  src="/herman.png"
                  alt="Herman Mambwe – Founder & CEO"
                  className="w-full object-cover aspect-[4/5] hover:scale-105 transition-transform duration-700"
                />
                {/* Name overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-950/90 via-slate-900/40 to-transparent px-10 pt-20 pb-10 text-white">
                  <p className="font-display font-black text-2xl tracking-tight">Herman Mambwe</p>
                  <p className="text-sm font-bold text-primary uppercase tracking-widest mt-1">Founder & CEO</p>
                </div>
              </div>

              {/* Floating badge */}
              <motion.div
                style={{ y: y2 }}
                className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl ring-1 ring-slate-100 p-4 flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                  <span className="material-symbols-outlined text-emerald-500 text-xl">verified</span>
                </div>
                <div>
                  <p className="text-xs font-black text-slate-900">Fondateur Vérifié</p>
                  <p className="text-[10px] text-slate-400 font-medium">Kolwezi, RDC</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Text col */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8 }}
              className="space-y-10"
            >
              <div className="space-y-4">
                <p className="text-xs font-black text-primary uppercase tracking-[0.2em]">Le Fondateur</p>
                <h2 className="text-4xl lg:text-5xl font-display font-black text-slate-900 leading-tight">
                  L'homme derrière la révolution digitale.
                </h2>
                <div className="w-12 h-1 bg-primary rounded-full" />
              </div>

              <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
                <p>
                  Passionné par l'impact social de la technologie, Herman Mambwe a identifié un frein majeur : l'absence d'infrastructures de paiement automatisées adaptées aux réalités du marché congolais.
                </p>

                <blockquote className="relative pl-6 border-l-4 border-primary py-2">
                  <p className="text-xl lg:text-2xl font-bold text-slate-800 italic leading-snug">
                    "Ma mission est de livrer aux commerçants de Kolwezi à Kinshasa des outils aux standards mondiaux, totalement repensés pour la RDC."
                  </p>
                </blockquote>

                <p>
                  Aujourd'hui, E-commerce RDC Pro est plus qu'une plateforme : c'est le moteur de croissance pour une nouvelle génération d'entrepreneurs connectés à travers toute la RDC.
                </p>
              </div>

              {/* Credential pills */}
              <div className="flex flex-wrap gap-3 pt-2">
                {['🇨🇩 Made in DRC', '💡 Tech Entrepreneur', '🤝 Affiliate Ecosystem'].map(tag => (
                  <span key={tag} className="px-4 py-2 rounded-full bg-white border border-slate-200 text-sm font-bold text-slate-700 shadow-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── ADN / PILLARS ── */}
      <section className="py-24 lg:py-40 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <p className="text-xs font-black text-primary uppercase tracking-[0.2em] mb-4">Notre ADN</p>
            <h2 className="text-4xl lg:text-5xl font-display font-black tracking-tight text-slate-900 mb-6">
              Trois piliers, une seule obsession.
            </h2>
            <p className="text-xl text-slate-500 font-medium leading-relaxed">
              Les convictions profondes qui fondent notre approche et inspirent chaque décision.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                title: 'Vision',
                icon: 'travel_explore',
                gradient: 'from-blue-600 to-indigo-600',
                bg: 'bg-blue-50',
                text: 'text-blue-600',
                desc: "S'imposer comme l'infrastructure technologique évidente en Afrique Centrale, offrant à toute PME un canal de vente mondial.",
              },
              {
                title: 'Mission',
                icon: 'rocket_launch',
                gradient: 'from-primary to-orange-500',
                bg: 'bg-primary/5',
                text: 'text-primary',
                desc: "Démocratiser l'e-commerce en RDC avec des boutiques performantes intégrant le paiement automatisé Mobile Money.",
              },
              {
                title: 'Conviction',
                icon: 'psychology',
                gradient: 'from-emerald-500 to-teal-500',
                bg: 'bg-emerald-50',
                text: 'text-emerald-600',
                desc: "La technologie doit être un levier d'ascension sociale. Abaisser les barrières techniques, c'est stimuler l'économie réelle.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="group relative bg-white border border-slate-100 rounded-[2.5rem] p-10 lg:p-12 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.06)] hover:shadow-[0_24px_64px_-12px_rgba(0,0,0,0.12)] hover:-translate-y-2 transition-all duration-500 overflow-hidden"
              >
                {/* Top gradient accent bar */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                <div className={`w-14 h-14 ${item.bg} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300`}>
                  <span className={`material-symbols-outlined text-2xl ${item.text}`}>{item.icon}</span>
                </div>

                <h3 className="text-2xl lg:text-3xl font-display font-black mb-5 tracking-tight text-slate-900">{item.title}</h3>
                <p className="text-slate-500 leading-relaxed text-base font-medium">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AFFILIATE IMPACT ── */}
      <section className="py-24 lg:py-40 bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1542626991-cbc4e32524cc?q=80&w=2669&auto=format&fit=crop')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/95 to-slate-950 z-10" />
        {/* Glow */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] z-0" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-[120px] z-0" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-20">
          <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-7 space-y-8"
            >
              <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 border border-white/10 text-primary text-xs font-black tracking-widest uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
                Impact Social
              </div>
              <h2 className="text-5xl lg:text-6xl font-display font-black tracking-tight leading-[1.05]">
                Changez votre vie avec notre{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-indigo-400">
                  programme d'élite.
                </span>
              </h2>
              <p className="text-xl text-slate-400 leading-relaxed font-medium max-w-xl">
                Nous avons conçu un système de recommandation ultra-performant pour permettre à la jeunesse congolaise de s'émanciper financièrement.
              </p>

              <div className="grid sm:grid-cols-2 gap-5">
                {[
                  { icon: 'price_check', title: 'Indépendance financière', desc: 'Gagnez des revenus sérieux et réguliers grâce à votre réseau, sans capital de départ.' },
                  { icon: 'bolt', title: 'Démarrage immédiat', desc: 'Un smartphone, WhatsApp et votre réseau. C\'est tout ce dont vous avez besoin.' },
                ].map((stat) => (
                  <div key={stat.title} className="p-7 bg-white/5 border border-white/8 rounded-3xl backdrop-blur-sm hover:bg-white/10 transition-colors duration-300">
                    <span className="material-symbols-outlined text-primary text-3xl mb-5 block">{stat.icon}</span>
                    <h3 className="text-lg font-bold mb-2">{stat.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{stat.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="lg:col-span-5"
            >
              <div className="bg-gradient-to-br from-primary via-indigo-600 to-indigo-900 rounded-[3rem] p-px shadow-2xl shadow-primary/20">
                <div className="bg-slate-950 rounded-[2.95rem] p-10 lg:p-14 text-center relative overflow-hidden">
                  <div className="absolute -top-16 -right-16 w-40 h-40 bg-primary/15 rounded-full blur-3xl" />
                  <div className="relative z-10">
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-8">
                      <span className="material-symbols-outlined text-primary text-3xl">people</span>
                    </div>
                    <h3 className="text-3xl font-display font-black text-white mb-4">Devenez Partenaire</h3>
                    <p className="text-slate-400 mb-3 text-base font-medium leading-relaxed">
                      Rejoignez-nous et encaissez vos commissions directement sur votre téléphone.
                    </p>
                    <p className="text-2xl font-black text-white mb-10">
                      <span className="text-green-400">$225</span>
                      <span className="text-slate-500 text-sm font-medium"> / vente confirmée</span>
                    </p>
                    <a
                      href="/?page=home#affiliate"
                      className="block w-full bg-white text-slate-900 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-slate-100 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5"
                    >
                      Postuler maintenant
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-32 lg:py-52 bg-white text-center px-6 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/4 rounded-full blur-[120px]" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto relative z-10"
        >
          <h2 className="text-5xl lg:text-[80px] font-display font-black text-slate-900 tracking-tight mb-8 leading-[0.95]">
            Prêt à transformer<br />votre entreprise ?
          </h2>
          <p className="text-xl lg:text-2xl text-slate-500 mb-14 font-medium max-w-2xl mx-auto leading-relaxed">
            L'automatisation est à portée de clic. Offrez à vos clients une expérience de paiement sans faille.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 lg:gap-5 justify-center">
            <a
              href="/#pricing"
              className="bg-slate-950 text-white px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest shadow-2xl hover:bg-primary transition-all duration-300 hover:-translate-y-1"
            >
              Lancer ma boutique
            </a>
            <a
              href="/#contact"
              className="bg-slate-50 text-slate-900 border border-slate-200 px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-white hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              Contacter les ventes
            </a>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
