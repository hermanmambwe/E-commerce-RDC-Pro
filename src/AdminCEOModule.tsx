import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

function ExecutiveCard({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`bg-white border border-slate-200 rounded-[2rem] shadow-sm hover:shadow-xl hover:border-indigo-100 transition-all duration-500 overflow-hidden ${className}`}
    >
      {children}
    </motion.div>
  );
}

function MiniSparkline({ data, color = "#4f46e5" }: { data: number[], color?: string }) {
    const max = Math.max(...data, 1);
    const points = data.map((v, i) => `${(i / (data.length - 1)) * 100},${40 - (v/max)*30}`).join(' ');
    
    return (
        <svg viewBox="0 0 100 40" className="w-16 h-8 overflow-visible">
            <polyline fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" points={points} />
        </svg>
    );
}

export default function AdminCEOModule() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/admin/ceo-stats');
      const data = await res.json();
      setStats(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="p-10 text-center animate-pulse">Chargement de la Console Executive...</div>;

  return (
    <div className="space-y-10">
      {/* KPI Header */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <ExecutiveCard className="p-6 group">
          <div className="flex justify-between items-start mb-4">
             <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500">
                <span className="material-symbols-outlined">payments</span>
             </div>
             <MiniSparkline data={stats.revenueTrend} />
          </div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Chiffre d'Affaires</p>
          <div className="flex items-baseline gap-2">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">${stats.revenue.toLocaleString()}</h2>
            <span className="text-[10px] font-bold text-emerald-600">+18%</span>
          </div>
        </ExecutiveCard>

        <ExecutiveCard className="p-6 group">
          <div className="flex justify-between items-start mb-4">
             <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                <span className="material-symbols-outlined">person_add</span>
             </div>
             <MiniSparkline data={[2, 5, 8, 12, 10, 15, 20]} color="#2563eb" />
          </div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Total Clients</p>
          <div className="flex items-baseline gap-2">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">{stats.totalClients}</h2>
            <span className="text-[10px] font-bold text-emerald-600">+5%</span>
          </div>
        </ExecutiveCard>

        <ExecutiveCard className="p-6 group">
          <div className="flex justify-between items-start mb-4">
             <div className="w-10 h-10 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center group-hover:bg-orange-600 group-hover:text-white transition-all duration-500">
                <span className="material-symbols-outlined">groups</span>
             </div>
             <MiniSparkline data={[10, 8, 15, 22, 18, 25, 30]} color="#ea580c" />
          </div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Partenaires Actifs</p>
          <div className="flex items-baseline gap-2">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">{stats.activeAffiliates}</h2>
            <span className="text-[10px] font-bold text-indigo-600">Premium</span>
          </div>
        </ExecutiveCard>

        <ExecutiveCard className="p-6 group bg-slate-900 border-slate-900 shadow-2xl shadow-indigo-200">
          <div className="flex justify-between items-start mb-4">
             <div className="w-10 h-10 bg-white/10 text-white rounded-xl flex items-center justify-center">
                <span className="material-symbols-outlined">account_balance_wallet</span>
             </div>
          </div>
          <p className="text-[10px] font-black text-white/40 uppercase tracking-widest leading-none mb-1">Dettes Partenaires</p>
          <div className="flex items-baseline gap-2">
            <h2 className="text-2xl font-black text-white tracking-tight">${stats.pendingPayouts.toLocaleString()}</h2>
            <span className="text-[10px] font-bold text-red-400 bg-red-400/10 px-1.5 py-0.5 rounded-md">Paiement Requis</span>
          </div>
        </ExecutiveCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Source Breakdown */}
        <section>
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-6 flex items-center gap-2">
             <span className="material-symbols-outlined text-indigo-600">bar_chart</span>
             Performance des Canaux
          </h3>
          <ExecutiveCard className="p-8">
             <div className="space-y-6">
                {(stats.trafficSources || []).map((s: any, idx: number) => (
                  <div key={s.source} className="group">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${idx === 0 ? 'bg-green-500' : idx === 1 ? 'bg-blue-500' : 'bg-slate-300'}`}></span>
                        <span className="text-xs font-black text-slate-700 uppercase tracking-widest">{s.source}</span>
                      </div>
                      <span className="text-xs font-bold text-slate-400">{s.count} clics</span>
                    </div>
                    <div className="w-full bg-slate-50 h-2 rounded-full overflow-hidden border border-slate-100">
                       <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${(s.count / stats.trafficSources[0].count) * 100}%` }}
                        transition={{ duration: 1, delay: idx * 0.1 }}
                        className={`h-full ${idx === 0 ? 'bg-green-500' : idx === 1 ? 'bg-blue-500' : 'bg-slate-300'}`}
                       ></motion.div>
                    </div>
                  </div>
                ))}
             </div>
          </ExecutiveCard>
        </section>

        {/* Executive Summary */}
        <section>
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-6 flex items-center gap-2">
             <span className="material-symbols-outlined text-indigo-600">insights</span>
             Résumé Stratégique
          </h3>
          <ExecutiveCard className="p-8 bg-indigo-600 text-white relative h-full">
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            <div className="relative z-10 space-y-6">
               <div className="space-y-2">
                 <p className="text-[10px] font-black uppercase tracking-widest text-white/50">Statut de Croissance</p>
                 <h4 className="text-2xl font-black leading-tight italic">"Votre réseau d'affiliés génère 65% de vos nouveaux clients cette semaine."</h4>
               </div>
               <div className="pt-6 border-t border-white/10 space-y-4">
                  <div className="flex items-center gap-3">
                     <span className="material-symbols-outlined text-green-400">check_circle</span>
                     <p className="text-xs font-bold">Payouts critiques (2) traités avec succès.</p>
                  </div>
                  <div className="flex items-center gap-3 text-indigo-100/60">
                     <span className="material-symbols-outlined text-indigo-200">lightbulb</span>
                     <p className="text-xs font-medium">Suggestion: Augmentez la commission Or pour booster le canal WhatsApp.</p>
                  </div>
               </div>
            </div>
          </ExecutiveCard>
        </section>
      </div>
    </div>
  );
}
