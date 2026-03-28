import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

export default function AffiliateClientsModule({ affiliateId }: { affiliateId: number }) {
  const [clients, setClients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [activeChatClientId, setActiveChatClientId] = useState<number | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [messageInput, setMessageInput] = useState('');

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

  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
          <span className="material-symbols-outlined text-indigo-600">people</span>
          Mes Clients Référés
        </h3>
      </div>

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
              clients.map(c => (
                <div 
                  key={c.id} 
                  onClick={() => setActiveChatClientId(c.id)}
                  className={`p-4 border-b border-slate-200 cursor-pointer transition-colors ${activeChatClientId === c.id ? 'bg-indigo-50 border-l-4 border-l-indigo-600' : 'hover:bg-slate-100 border-l-4 border-l-transparent'}`}
                >
                  <p className="font-bold text-slate-900 text-sm">{c.name}</p>
                  <div className="flex justify-between items-center mt-1">
                    <p className="text-xs font-medium text-slate-500">{c.phone}</p>
                    <span className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded ${c.status === 'completed' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-600'}`}>
                      {c.status}
                    </span>
                  </div>
                </div>
              ))
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
