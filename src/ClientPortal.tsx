import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

export default function ClientPortal({ onLogout, initialClient = null }: { onLogout: () => void, initialClient?: any }) {
  const [phone, setPhone] = useState('');
  const [accessCode, setAccessCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const [client, setClient] = useState<any>(initialClient);
  const [contract, setContract] = useState<any>(null);
  const [project, setProject] = useState<any>(null);
  const [deliverables, setDeliverables] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [activeChat, setActiveChat] = useState<'admin' | 'affiliate'>('admin');
  const [invoices, setInvoices] = useState<any[]>([]);

  const [messageInput, setMessageInput] = useState('');

  const [businessName, setBusinessName] = useState('');
  const [businessType, setBusinessType] = useState('');
  const [scheduleDate, setScheduleDate] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');

  useEffect(() => {
    if (client) {
      fetchDashboard();
    }
  }, [client]);

  useEffect(() => {
    if (client) {
      fetchMessages();
      const interval = setInterval(fetchMessages, 5000); // Simple polling
      return () => clearInterval(interval);
    }
  }, [client, activeChat]);

  const fetchDashboard = async () => {
    try {
      const res = await fetch(`/api/clients/${client.id}/dashboard`);
      const data = await res.json();
      setContract(data.contract);
      setProject(data.project);
      setDeliverables(data.deliverables);
      if (data.client.status !== client.status) {
        setClient(data.client);
      }

      // Fetch invoices
      const invRes = await fetch(`/api/admin/clients/${client.id}/invoices`);
      const invData = await invRes.json();
      setInvoices(invData);
    } catch (e) {
      console.error(e);
    }
  };

  const fetchMessages = async () => {
    if (!client) return;
    try {
      const res = await fetch(`/api/client-chat/${client.id}/${activeChat}`);
      const data = await res.json();
      setMessages(data);
    } catch (e) {
      console.error(e);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/clients/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, access_code: accessCode })
      });
      const data = await res.json();
      if (data.success) {
        setClient(data.user);
      } else {
        setError(data.error);
      }
    } catch (e) {
      setError("Erreur de connexion");
    } finally {
      setLoading(false);
    }
  };

  const step1Sign = async () => {
    try {
      await fetch(`/api/clients/${client.id}/contract/sign`, { method: 'POST' });
      fetchDashboard();
    } catch (e) { console.error(e); }
  };

  const step2Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch(`/api/clients/${client.id}/questionnaire`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ business_details: { businessName, businessType } })
      });
      fetchDashboard();
    } catch (e) { console.error(e); }
  };

  const step3Schedule = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch(`/api/clients/${client.id}/schedule`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ kickoff_date: scheduleDate, kickoff_time: scheduleTime })
      });
      fetchDashboard();
    } catch (e) { console.error(e); }
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim()) return;
    try {
      await fetch('/api/client-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ client_id: client.id, room_type: activeChat, sender_type: 'client', content: messageInput })
      });
      setMessageInput('');
      fetchMessages();
    } catch (e) { console.error(e); }
  };

  if (!client) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-4">
        <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md ring-1 ring-slate-900/5">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-black text-slate-900 mb-2">Espace Client</h2>
            <p className="text-slate-500">Connectez-vous pour finaliser votre projet.</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="text-sm font-bold text-slate-900 block mb-2">Téléphone</label>
              <input value={phone} onChange={(e)=>setPhone(e.target.value)} type="tel" className="w-full p-4 rounded-xl bg-slate-50 ring-1 ring-slate-200 outline-none focus:ring-2 focus:ring-primary" required placeholder="+243..." />
            </div>
            <div>
              <label className="text-sm font-bold text-slate-900 block mb-2">Code d'accès sécurisé</label>
              <input value={accessCode} onChange={(e)=>setAccessCode(e.target.value)} type="password" className="w-full p-4 rounded-xl bg-slate-50 ring-1 ring-slate-200 outline-none focus:ring-2 focus:ring-primary uppercase" required placeholder="EX: A1B2C3" />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button disabled={loading} className="w-full py-4 bg-primary text-white rounded-xl font-bold shadow-lg hover:bg-primary-dark transition-colors">{loading ? '...' : 'Accéder à mon espace'}</button>
          </form>
          <button onClick={onLogout} className="mt-4 w-full text-center text-sm text-slate-500 hover:text-slate-900 transition-colors">Retour à l'accueil</button>
        </div>
      </div>
    );
  }

  const isSigned = contract?.is_signed === 1;
  const isQuestionnaireDone = client?.status === 'active' || client?.status === 'completed';
  const isScheduled = !!project?.kickoff_date;

  const milestones = JSON.parse(project?.milestones || '{"branding": 0, "catalog": 0, "payment": 0, "marketing": 0, "testing": 0, "live": 0}');
  const isDelivered = project?.status === 'delivered';

  const SuccessView = () => (
    <div className="space-y-8 animate-in fade-in zoom-in duration-700">
       <div className="bg-slate-900 rounded-[3rem] p-12 text-white relative overflow-hidden shadow-2xl shadow-indigo-200">
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
          <div className="relative z-10">
             <div className="w-20 h-20 bg-green-500 rounded-3xl flex items-center justify-center mb-8 shadow-xl shadow-green-500/20 rotate-3">
                <span className="material-symbols-outlined text-4xl font-black">verified</span>
             </div>
             <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter">Votre Boutique est LIVE ! 🚀</h2>
             <p className="text-indigo-200 text-lg font-medium max-w-xl mb-10 leading-relaxed">Félicitations {client.name}, votre projet est officiellement en ligne. Vous disposez maintenant de tous les outils pour conquérir le marché.</p>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/10 backdrop-blur-md border border-white/10 p-6 rounded-3xl group hover:bg-white/20 transition-all cursor-pointer">
                   <p className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-300 mb-2">Lien de la boutique</p>
                   <div className="flex items-center justify-between">
                      <span className="font-bold text-sm truncate mr-4">www.{client.name.toLowerCase().replace(/\s/g, '')}.cd</span>
                      <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">open_in_new</span>
                   </div>
                </div>
                <div className="bg-white/10 backdrop-blur-md border border-white/10 p-6 rounded-3xl group hover:bg-white/20 transition-all cursor-pointer">
                   <p className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-300 mb-2">Accès Administration</p>
                   <div className="flex items-center justify-between">
                      <span className="font-bold text-sm">Tableau de Bord Vendeur</span>
                      <span className="material-symbols-outlined text-sm">lock_open</span>
                   </div>
                </div>
             </div>
          </div>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-all group">
             <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined">menu_book</span>
             </div>
             <h4 className="font-bold text-slate-900 mb-2">Guide de Lancement</h4>
             <p className="text-xs text-slate-500 leading-relaxed">Apprenez à gérer vos premiers stocks et vos paiements M-Pesa.</p>
             <button className="mt-6 text-xs font-black text-blue-600 uppercase tracking-widest flex items-center gap-2">Lire le guide <span className="material-symbols-outlined text-sm">arrow_forward</span></button>
          </div>
          <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-all group">
             <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined">campaign</span>
             </div>
             <h4 className="font-bold text-slate-900 mb-2">Kit Marketing</h4>
             <p className="text-xs text-slate-500 leading-relaxed">Bannières et visuels pour vos réseaux sociaux (WhatsApp, FB).</p>
             <button className="mt-6 text-xs font-black text-purple-600 uppercase tracking-widest flex items-center gap-2">Télécharger <span className="material-symbols-outlined text-sm">download</span></button>
          </div>
          <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-all group">
             <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined">support_agent</span>
             </div>
             <h4 className="font-bold text-slate-900 mb-2">Support Prioritaire</h4>
             <p className="text-xs text-slate-500 leading-relaxed">Une question ? Chattez directement avec un expert technique.</p>
             <button onClick={() => setActiveChat('admin')} className="mt-6 text-xs font-black text-emerald-600 uppercase tracking-widest flex items-center gap-2">Ouvrir le chat <span className="material-symbols-outlined text-sm">chat_bubble</span></button>
          </div>
       </div>
    </div>
  );

  const BuildTimeline = () => (
    <div className="bg-white rounded-3xl p-8 shadow-xl ring-1 ring-slate-200 mb-8 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h3 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">rocket_launch</span> 
            Roadmap de Construction
          </h3>
          <p className="text-xs text-slate-500 font-medium">Suivez l'évolution de votre boutique en temps réel.</p>
        </div>
        <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-full border border-slate-100">
           <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
           <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest leading-none">Mise à jour direct</span>
        </div>
      </div>

      <div className="relative">
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 -translate-y-1/2 hidden md:block"></div>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-6 relative z-10">
           {Object.entries(milestones).map(([key, val], idx) => (
             <div key={key} className="flex flex-col items-center text-center group">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 mb-3 border-2 ${val === 1 ? 'bg-green-500 border-green-500 text-white shadow-lg shadow-green-200 scale-110' : 'bg-white border-slate-100 text-slate-300 group-hover:border-primary/30'}`}>
                  <span className="material-symbols-outlined text-xl">
                    {key === 'branding' ? 'palette' : key === 'catalog' ? 'inventory' : key === 'payment' ? 'payments' : key === 'marketing' ? 'campaign' : key === 'testing' ? 'app_registration' : 'check_circle'}
                  </span>
                </div>
                <p className={`text-[10px] font-black uppercase tracking-widest ${val === 1 ? 'text-slate-900' : 'text-slate-400'}`}>
                  {key === 'payment' ? 'Paiement' : key === 'catalog' ? 'Catalogue' : key === 'branding' ? 'Design' : key === 'marketing' ? 'Marketing' : key === 'testing' ? 'Tests' : 'Live'}
                </p>
                {val === 1 && <span className="text-[8px] font-bold text-green-600 mt-1">OK</span>}
             </div>
           ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="bg-white border-b border-slate-200 py-4 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
                <span className="material-symbols-outlined">person</span>
             </div>
             <div>
               <h1 className="font-bold text-slate-900 leading-tight">{client.name}</h1>
               <p className="text-xs text-slate-500">Espace Client</p>
             </div>
          </div>
          <button onClick={onLogout} className="text-sm font-bold text-slate-500 hover:text-slate-900 px-4 py-2 bg-slate-100 rounded-lg">Quitter</button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left Column: Flow / Steps */}
        <div className="md:col-span-2 space-y-6">
          {isDelivered ? (
            <SuccessView />
          ) : (
            <>
              <BuildTimeline />
              <h2 className="text-2xl font-black mb-6">Déclenchez votre réussite en 3 étapes.</h2>
              
              {/* STEP 1: Contract */}
              <div className={"border rounded-2xl p-6 transition-all duration-300 " + (isSigned ? "bg-white border-green-200" : "bg-white shadow-xl ring-1 ring-primary/20 border-transparent")}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-lg flex items-center gap-2">
                    <span className={"flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold text-white " + (isSigned ? "bg-green-500" : "bg-primary")}>
                      {isSigned ? '✓' : '1'}
                    </span>
                    Signature de l'accord numérique
                  </h3>
                  {isSigned && <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full border border-green-200">Terminé</span>}
                </div>
                {!isSigned ? (
                  <div className="space-y-4">
                    <p className="text-slate-500 text-sm">Pour commencer la création de votre boutique, veuillez valider nos termes et conditions.</p>
                    <div className="p-4 bg-slate-50 rounded-xl text-xs text-slate-500 h-32 overflow-y-auto mb-4 border border-slate-200">
                      <strong>Termes de services E-commerce RDC Pro</strong><br/>
                      1. En signant cet accord, vous vous engagez à ...<br/><br/>
                      Ce contrat prend effet dès votre signature numérique et confirme le lancement de votre projet avec l'installation garantie sous 7 jours.
                    </div>
                    <button onClick={step1Sign} className="w-full py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary-dark transition-colors">Je signe et j'accepte</button>
                  </div>
                ) : (
                  <p className="text-slate-500 text-sm">Contrat signé le {new Date(contract.signed_at).toLocaleDateString()}</p>
                )}
              </div>

              {/* STEP 2: Questionnaire */}
              <div className={"border rounded-2xl p-6 transition-all duration-300 " + (!isSigned ? "opacity-50 pointer-events-none bg-slate-50 border-slate-200" : isQuestionnaireDone ? "bg-white border-green-200" : "bg-white shadow-xl border-dashed border-primary ring-2 ring-primary/20")}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-lg flex items-center gap-2">
                    <span className={"flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold text-white " + (!isSigned ? "bg-slate-300" : isQuestionnaireDone ? "bg-green-500" : "bg-primary")}>
                      {isQuestionnaireDone ? '✓' : '2'}
                    </span>
                    Recueil de vos informations
                  </h3>
                  {isQuestionnaireDone && <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full border border-green-200">Terminé</span>}
                </div>
                {isSigned && !isQuestionnaireDone ? (
                  <form onSubmit={step2Submit} className="space-y-4">
                    <p className="text-slate-500 text-sm">Dites-nous en plus sur votre boutique pour que nous adaptions le système.</p>
                    <div>
                      <label className="text-xs font-bold text-slate-700">Nom de la future boutique</label>
                      <input required value={businessName} onChange={e=>setBusinessName(e.target.value)} type="text" className="w-full mt-1 p-3 rounded-xl bg-slate-50 ring-1 ring-slate-200 outline-none focus:ring-2 focus:ring-primary" placeholder="Ex: KinShop Express" />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-700">Secteur d'activité</label>
                      <select required value={businessType} onChange={e=>setBusinessType(e.target.value)} className="w-full mt-1 p-3 rounded-xl bg-slate-50 ring-1 ring-slate-200 outline-none focus:ring-2 focus:ring-primary">
                        <option value="">Sélectionnez...</option>
                        <option value="fashion">Mode & Vêtements</option>
                        <option value="tech">Électronique</option>
                        <option value="beauty">Beauté & Cosmétique</option>
                        <option value="other">Autre</option>
                      </select>
                    </div>
                    <button type="submit" className="w-full py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary-dark transition-colors">Enregistrer</button>
                  </form>
                ) : isQuestionnaireDone ? (
                  <p className="text-slate-500 text-sm">Informations enregistrées avec succès.</p>
                ) : null}
              </div>

              {/* STEP 3: Scheduling */}
              <div className={"border rounded-2xl p-6 transition-all duration-300 " + (!isQuestionnaireDone ? "opacity-50 pointer-events-none bg-slate-50 border-slate-200" : isScheduled ? "bg-white border-green-200" : "bg-white shadow-xl border-dashed border-primary ring-2 ring-primary/20")}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-lg flex items-center gap-2">
                    <span className={"flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold text-white " + (!isQuestionnaireDone ? "bg-slate-300" : isScheduled ? "bg-green-500" : "bg-primary")}>
                      {isScheduled ? '✓' : '3'}
                    </span>
                    Réunion de Lancement
                  </h3>
                  {isScheduled && <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full border border-green-200">Réservé</span>}
                </div>
                {isQuestionnaireDone && !isScheduled ? (
                  <form onSubmit={step3Schedule} className="space-y-4">
                    <p className="text-slate-500 text-sm">Choisissez une date et heure pour un appel de 15 minutes avec votre chef de projet.</p>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-bold text-slate-700">Date</label>
                        <input required value={scheduleDate} onChange={e=>setScheduleDate(e.target.value)} type="date" className="w-full mt-1 p-3 rounded-xl bg-slate-50 ring-1 ring-slate-200 outline-none focus:ring-2 focus:ring-primary" />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-slate-700">Heure (Kinshasa)</label>
                        <select required value={scheduleTime} onChange={e=>setScheduleTime(e.target.value)} className="w-full mt-1 p-3 rounded-xl bg-slate-50 ring-1 ring-slate-200 outline-none focus:ring-2 focus:ring-primary">
                          <option value="">Sélectionnez...</option>
                          <option value="10:00">10:00</option>
                          <option value="11:30">11:30</option>
                          <option value="14:00">14:00</option>
                          <option value="16:00">16:00</option>
                        </select>
                      </div>
                    </div>
                    <button type="submit" className="w-full py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary-dark transition-colors">Confirmer le rendez-vous</button>
                  </form>
                ) : isScheduled ? (
                  <p className="text-slate-500 text-sm">Le rendez-vous est prévu pour le {new Date(project.kickoff_date).toLocaleDateString()} à {project.kickoff_time}.</p>
                ) : null}
              </div>
            </>
          )}

          {/* Deliverables Box */}
          {deliverables.length > 0 && (
            <div className="bg-white rounded-2xl p-6 shadow-sm ring-1 ring-slate-200">
               <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><span className="material-symbols-outlined text-primary">folder_open</span> Vos Fichiers & Livrables</h3>
               <div className="space-y-3">
                 {deliverables.map(d => (
                   <a key={d.id} href={d.file_url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors border border-slate-200 group">
                     <span className="font-medium text-slate-700">{d.title}</span>
                     <span className="material-symbols-outlined text-slate-400 group-hover:text-primary transition-colors">download</span>
                   </a>
                 ))}
               </div>
            </div>
          )}

          {/* Financial Summary Box */}
          <div className="bg-white rounded-[2rem] p-8 shadow-xl ring-1 ring-slate-200 overflow-hidden relative">
             <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
             <h3 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2 mb-6">
                <span className="material-symbols-outlined text-emerald-600">account_balance_wallet</span> 
                Financement & Facturation
             </h3>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                   <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">Progression du Paiement</p>
                   <div className="flex items-end gap-2 mb-2">
                      <span className="text-3xl font-black text-slate-900">${(project?.paid_amount || 0).toLocaleString()}</span>
                      <span className="text-sm font-bold text-slate-400 mb-1">/ ${(project?.total_price || 1125).toLocaleString()}</span>
                   </div>
                   <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(((project?.paid_amount || 0) / (project?.total_price || 1125)) * 100, 100)}%` }}
                        className="h-full bg-emerald-500 rounded-full shadow-lg shadow-emerald-200"
                      />
                   </div>
                </div>
                <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                   <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-emerald-600 border border-slate-100">
                      <span className="material-symbols-outlined font-black">check_circle</span>
                   </div>
                   <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Statut Financier</p>
                      <p className="text-xs font-black text-slate-900">
                        {project?.paid_amount >= project?.total_price ? 'Totalement Payé' : project?.paid_amount > 0 ? 'Acompte Réglé' : 'En attente de paiement'}
                      </p>
                   </div>
                </div>
             </div>

             <div className="space-y-3">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">Vos Factures</p>
                {invoices.length === 0 ? (
                  <p className="text-xs text-slate-500 italic">Aucune facture émise pour le moment.</p>
                ) : (
                  invoices.map((inv: any) => (
                    <div key={inv.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-emerald-200 transition-all group">
                       <div className="flex items-center gap-3">
                          <span className="material-symbols-outlined text-slate-400">description</span>
                          <div>
                             <p className="text-xs font-black text-slate-900">Facture {inv.id}</p>
                             <p className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">
                                {inv.stage === 'initial60' ? 'Acompte 60%' : inv.stage === 'final40' ? 'Solde 40%' : 'Paiement Complet'}
                             </p>
                          </div>
                       </div>
                       <div className="flex items-center gap-4">
                          <div className="text-right">
                             <p className="text-xs font-black text-slate-900">${inv.amount.toLocaleString()}</p>
                             <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-full ${inv.status === 'paid' ? 'bg-emerald-100 text-emerald-700' : 'bg-orange-100 text-orange-700'}`}>
                                {inv.status === 'paid' ? 'Payé' : 'En attente'}
                             </span>
                          </div>
                          <a 
                            href={`/?invoice=${inv.id}`} 
                            target="_blank" 
                            rel="noreferrer"
                            className="w-8 h-8 flex items-center justify-center bg-white rounded-lg border border-slate-200 text-slate-400 hover:text-emerald-600 hover:border-emerald-200 transition-all"
                          >
                             <span className="material-symbols-outlined text-sm">open_in_new</span>
                          </a>
                       </div>
                    </div>
                  ))
                )}
             </div>
          </div>
        </div>

        {/* Right Column: Built-in Messaging */}
        <div className="h-[600px] flex flex-col bg-white rounded-3xl shadow-xl ring-1 ring-slate-200 overflow-hidden sticky top-24">
          <div className="flex border-b border-slate-200 shrink-0">
             <button onClick={() => setActiveChat('admin')} className={`flex-1 p-3 text-xs font-bold uppercase tracking-widest transition-colors ${activeChat === 'admin' ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'}`}>Équipe Technique</button>
             {client.affiliate_id && (
               <button onClick={() => setActiveChat('affiliate')} className={`flex-1 p-3 text-xs font-bold uppercase tracking-widest transition-colors ${activeChat === 'affiliate' ? 'bg-indigo-600 text-white' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'}`}>Mon Partenaire</button>
             )}
          </div>
          <div className={`p-4 ${activeChat === 'admin' ? 'bg-slate-900' : 'bg-indigo-600'} text-white flex justify-between items-center transition-colors`}>
             <div className="flex items-center gap-2">
               <span className="material-symbols-outlined">{activeChat === 'admin' ? 'support_agent' : 'handshake'}</span>
               <span className="font-bold text-sm tracking-wide">{activeChat === 'admin' ? 'Chef de Projet' : 'Partenaire Conseil'}</span>
             </div>
             <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
          </div>
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50/50">
            {messages.map(msg => (
               <div key={msg.id} className={'flex ' + (msg.sender_type === 'client' ? 'justify-end' : 'justify-start')}>
                  <div className={"max-w-[80%] p-3 rounded-2xl text-sm " + (msg.sender_type === 'client' ? 'bg-primary text-white rounded-br-none' : 'bg-white border border-slate-200 text-slate-700 rounded-bl-none shadow-sm')}>
                    {msg.content}
                  </div>
               </div>
            ))}
          </div>
          <form onSubmit={sendMessage} className="p-3 bg-white border-t border-slate-200 flex gap-2">
            <input value={messageInput} onChange={e=>setMessageInput(e.target.value)} type="text" placeholder="Écrire un message..." className="flex-1 bg-slate-100 rounded-full px-4 text-sm outline-none focus:ring-2 focus:ring-primary/20" />
            <button type="submit" className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center shrink-0 hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[18px]">send</span>
            </button>
          </form>
        </div>

      </main>
    </div>
  );
}
