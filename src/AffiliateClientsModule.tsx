import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

export default function AffiliateClientsModule({ affiliateId }: { affiliateId: number }) {
  const [clients, setClients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [activeChatClientId, setActiveChatClientId] = useState<number | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [messageInput, setMessageInput] = useState('');
  
  // Invoice generation state
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [lastGeneratedLink, setLastGeneratedLink] = useState<string | null>(null);

  useEffect(() => {
    fetchClients();
  }, [affiliateId]);

  useEffect(() => {
    if (activeChatClientId) {
      fetchMessages(activeChatClientId);
      const interval = setInterval(() => fetchMessages(activeChatClientId), 5000);
      return () => clearInterval(interval);
    }
  }, [activeChatClientId]);

  const fetchClients = async () => {
    try {
      const res = await fetch(`/api/affiliates/${affiliateId}/clients`);
      const data = await res.json();
      setClients(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async (clientId: number) => {
    try {
      const res = await fetch(`/api/client-chat/${clientId}/affiliate`);
      const data = await res.json();
      setMessages(data);
    } catch (e) {
      console.error(e);
    }
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim() || !activeChatClientId) return;
    try {
      await fetch('/api/client-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          client_id: activeChatClientId, 
          room_type: 'affiliate', 
          sender_type: 'affiliate', 
          content: messageInput 
        })
      });
      setMessageInput('');
      fetchMessages(activeChatClientId);
    } catch (e) {
      console.error(e);
    }
  };

  const generateInvoice = async (stage: string) => {
    if (!activeChatClientId) return;
    setIsGenerating(true);
    setLastGeneratedLink(null);
    try {
      const res = await fetch('/api/invoices/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          client_id: activeChatClientId, 
          affiliate_id: affiliateId, 
          stage 
        })
      });
      const data = await res.json();
      if (data.invoice_id) {
        setLastGeneratedLink(`${window.location.origin}/invoice/${data.invoice_id}`);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Lien copié dans le presse-papier !');
  };

  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
          <span className="material-symbols-outlined text-indigo-600">people</span>
          Mes Clients Référés
        </h3>
        {activeChatClientId && (
           <button 
            onClick={() => { setShowInvoiceModal(true); setLastGeneratedLink(null); }}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg text-xs font-black shadow-lg shadow-emerald-200 hover:bg-emerald-700 transition-all uppercase tracking-widest"
           >
             <span className="material-symbols-outlined text-sm">receipt_long</span>
             Générer Paiement
           </button>
        )}
      </div>

      {showInvoiceModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
           <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-[2rem] p-8 max-w-md w-full shadow-2xl relative overflow-hidden"
           >
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              
              <div className="flex justify-between items-center mb-8 relative z-10">
                 <h4 className="text-xl font-black text-slate-900 tracking-tight">Stage de Paiement</h4>
                 <button onClick={() => setShowInvoiceModal(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors"><span className="material-symbols-outlined text-slate-400">close</span></button>
              </div>

              {!lastGeneratedLink ? (
                <div className="space-y-4 relative z-10">
                   <p className="text-xs text-slate-500 font-medium leading-relaxed mb-6">Sélectionnez l'étape de paiement pour <span className="text-indigo-600 font-bold">{clients.find(c => c.id === activeChatClientId)?.name}</span>.</p>
                   
                   {[
                     { id: 'initial60', label: 'Acompte 60%', price: '$675', color: 'bg-indigo-50 border-indigo-100 text-indigo-700' },
                     { id: 'final40', label: 'Solde 40%', price: '$450', color: 'bg-blue-50 border-blue-100 text-blue-700' },
                     { id: 'full100', label: 'Paiement Complet', price: '$1125', color: 'bg-emerald-50 border-emerald-100 text-emerald-700' }
                   ].map(s => (
                     <button 
                       key={s.id}
                       disabled={isGenerating}
                       onClick={() => generateInvoice(s.id)}
                       className={`w-full flex items-center justify-between p-4 rounded-2xl border-2 hover:scale-[1.02] transition-all group ${s.color}`}
                     >
                       <div className="text-left">
                          <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Package Élite</p>
                          <p className="font-black">{s.label}</p>
                       </div>
                       <p className="text-lg font-black">{s.price}</p>
                     </button>
                   ))}
                </div>
              ) : (
                <div className="text-center py-6 animate-in zoom-in duration-500 relative z-10">
                   <div className="w-16 h-16 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <span className="material-symbols-outlined text-3xl">check_circle</span>
                   </div>
                   <h5 className="text-lg font-black text-slate-900 mb-2">Lien Généré !</h5>
                   <p className="text-xs text-slate-500 font-medium mb-8">Envoyez ce lien à votre client pour qu'il puisse voir et régler sa facture.</p>
                   
                   <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-3 mb-8">
                      <span className="text-[10px] font-bold text-slate-400 truncate flex-1">{lastGeneratedLink}</span>
                      <button 
                        onClick={() => copyToClipboard(lastGeneratedLink)}
                        className="p-2 bg-white text-slate-600 rounded-lg shadow-sm border border-slate-100 hover:text-indigo-600"
                      >
                         <span className="material-symbols-outlined text-sm">content_copy</span>
                      </button>
                   </div>

                   <button 
                    onClick={() => setShowInvoiceModal(false)}
                    className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-[0.2em] text-xs hover:bg-slate-800 transition-colors"
                   >
                     Terminer
                   </button>
                </div>
              )}

              {isGenerating && (
                 <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center">
                    <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                    <p className="text-[10px] font-black uppercase text-indigo-600 tracking-widest">Génération...</p>
                 </div>
              )}
           </motion.div>
        </div>
      )}

      <div className="bg-white border text-left border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col md:flex-row min-h-[500px]">
        {/* Left Side: Client List */}
        <div className="w-full md:w-1/3 border-r border-slate-200 bg-slate-50 flex flex-col">
          <div className="p-4 border-b border-slate-200 bg-white">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Clients Actifs</h4>
          </div>
          <div className="flex-1 overflow-y-auto">
            {loading ? (
              <div className="p-8 text-center text-slate-400 text-xs uppercase tracking-widest font-bold">Chargement...</div>
            ) : clients.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-8 text-center opacity-50">
                <span className="material-symbols-outlined text-4xl mb-2">person_off</span>
                <p className="text-xs font-bold uppercase">Aucun client</p>
              </div>
            ) : (
              clients.map(c => {
                const needsNudge = c.status === 'pending';
                
                return (
                  <div 
                    key={c.id} 
                    onClick={() => setActiveChatClientId(c.id)}
                    className={`p-4 border-b border-slate-200 cursor-pointer transition-colors ${activeChatClientId === c.id ? 'bg-indigo-50 border-l-4 border-l-indigo-600' : 'hover:bg-slate-100 border-l-4 border-l-transparent'}`}
                  >
                    <div className="flex justify-between items-start">
                      <p className="font-bold text-slate-900 text-sm">{c.name}</p>
                      {needsNudge && (
                        <span className="flex items-center gap-1 text-[8px] font-black uppercase text-rose-600 bg-rose-100 px-1.5 py-0.5 rounded animate-pulse">
                          <span className="material-symbols-outlined text-[10px]">notification_important</span> Relance
                        </span>
                      )}
                    </div>
                    <div className="flex justify-between items-center mt-1">
                      <p className="text-xs font-medium text-slate-500">{c.phone}</p>
                      <span className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded ${c.status === 'completed' ? 'bg-emerald-100 text-emerald-700' : c.status === 'active' ? 'bg-blue-100 text-blue-700' : 'bg-slate-200 text-slate-600'}`}>
                        {c.status}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Side: Chat Window */}
        <div className="w-full md:w-2/3 flex flex-col bg-white">
          {!activeChatClientId ? (
            <div className="flex-1 flex flex-col items-center justify-center opacity-40">
              <span className="material-symbols-outlined text-6xl mb-4">forum</span>
              <p className="text-sm font-bold uppercase tracking-widest">Sélectionnez un client</p>
              <p className="text-xs font-medium mt-2 max-w-xs text-center">Contactez directement vos filleuls pour les accompagner dans leur lancement.</p>
            </div>
          ) : (
            <>
              <div className="p-4 border-b border-slate-200 bg-white flex justify-between items-center shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-indigo-100 text-indigo-700 rounded-lg flex items-center justify-center font-bold">
                    {clients.find(c => c.id === activeChatClientId)?.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{clients.find(c => c.id === activeChatClientId)?.name}</h4>
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Client</p>
                  </div>
                </div>
              </div>
              
              <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50/50">
                {messages.length === 0 && (
                  <p className="text-center text-xs text-slate-400 mt-4">Aucun message pour le moment. Dites bonjour !</p>
                )}
                {messages.map(msg => (
                  <div key={msg.id} className={`flex ${msg.sender_type === 'affiliate' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.sender_type === 'affiliate' ? 'bg-indigo-600 text-white rounded-br-none shadow-md' : 'bg-white border border-slate-200 text-slate-700 rounded-bl-none shadow-sm'}`}>
                      {msg.content}
                    </div>
                  </div>
                ))}
              </div>

              {clients.find(c => c.id === activeChatClientId)?.status === 'pending' && (
                 <div className="px-4 py-2 bg-rose-50 border-b border-rose-100 flex items-center justify-between shrink-0">
                   <p className="text-xs font-bold text-rose-800 flex items-center gap-1">
                     <span className="material-symbols-outlined text-[14px]">warning</span> Action Requise : Relance
                   </p>
                   <button 
                     onClick={() => {
                        const clientName = clients.find(c => c.id === activeChatClientId)?.name || '';
                        setMessageInput(`Bonjour ${clientName.split(' ')[0]}, j'ai remarqué que tu n'as pas encore finalisé ton paiement/contrat. As-tu besoin d'aide ?`);
                     }}
                     className="text-[10px] font-bold text-rose-700 bg-rose-200/50 hover:bg-rose-200 px-3 py-1 rounded-full transition-colors"
                   >
                     Utiliser le script auto
                   </button>
                 </div>
              )}

              <form onSubmit={sendMessage} className="p-3 bg-white border-t border-slate-200 flex gap-2 shrink-0">
                <input 
                  value={messageInput} 
                  onChange={e=>setMessageInput(e.target.value)} 
                  type="text" 
                  placeholder="Écrire un message..." 
                  className="flex-1 bg-slate-100 rounded-full px-4 text-sm outline-none focus:ring-2 focus:ring-indigo-600/20" 
                />
                <button type="submit" className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center shrink-0 hover:scale-105 transition-transform">
                  <span className="material-symbols-outlined text-[18px]">send</span>
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
