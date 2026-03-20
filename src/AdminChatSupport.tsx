import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';

export default function AdminChatSupport() {
  const [activeChats, setActiveChats] = useState<any[]>([]);
  const [selectedAffiliate, setSelectedAffiliate] = useState<any | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const fetchActiveChats = async () => {
    try {
      const res = await fetch('/api/admin/chats');
      const data = await res.json();
      if (Array.isArray(data)) {
        setActiveChats(data);
      }
    } catch(e) {}
  };

  const fetchMessages = async (affiliateId: number) => {
    try {
      const res = await fetch(`/api/chat/${affiliateId}`);
      const data = await res.json();
      setMessages(data);
    } catch(e) {}
  };

  useEffect(() => {
    fetchActiveChats();
    const interval = setInterval(fetchActiveChats, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (selectedAffiliate) {
      fetchMessages(selectedAffiliate.id);
      const interval = setInterval(() => fetchMessages(selectedAffiliate.id), 3000);
      return () => clearInterval(interval);
    }
  }, [selectedAffiliate]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || sending || !selectedAffiliate) return;
    setSending(true);
    try {
      await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ affiliate_id: selectedAffiliate.id, sender_type: 'admin', content: input })
      });
      setInput('');
      await fetchMessages(selectedAffiliate.id);
      await fetchActiveChats();
    } finally {
      setSending(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white border text-left border-slate-200 rounded-2xl shadow-sm overflow-hidden flex h-[700px] font-sans"
    >
      {/* Sidebar: List of Affiliates */}
      <div className="w-1/3 border-r border-slate-100 flex flex-col bg-slate-50">
        <div className="p-4 border-b border-slate-200 bg-white">
          <h3 className="font-bold text-slate-900 flex items-center gap-2">
            <span className="material-symbols-outlined text-indigo-600">forum</span>
            Support Partenaires
          </h3>
          <p className="text-xs text-slate-500 font-medium mt-1">Discussions en cours</p>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {activeChats.length === 0 ? (
            <p className="text-xs text-slate-500 text-center p-6">Aucune conversation active</p>
          ) : (
            activeChats.map(chat => (
              <button
                key={chat.id}
                onClick={() => setSelectedAffiliate(chat)}
                className={`w-full text-left p-3 rounded-xl transition-all flex gap-3 ${selectedAffiliate?.id === chat.id ? 'bg-white shadow-sm ring-1 ring-slate-200' : 'hover:bg-slate-100 border-transparent'} border`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg shrink-0 ${selectedAffiliate?.id === chat.id ? 'bg-indigo-600 text-white shadow-md' : 'bg-indigo-100 text-indigo-700'}`}>
                  {chat.name.charAt(0)}
                </div>
                <div className="flex-1 overflow-hidden">
                  <div className="flex justify-between items-center mb-0.5">
                    <p className={`font-bold text-sm truncate ${selectedAffiliate?.id === chat.id ? 'text-indigo-900' : 'text-slate-900'}`}>{chat.name}</p>
                    {chat.last_message_time && (
                       <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 shrink-0">
                         {new Date(chat.last_message_time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                       </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 truncate font-medium">{chat.last_message || 'Nouvelle conversation'}</p>
                </div>
              </button>
            ))
          )}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-white">
        {selectedAffiliate ? (
           <>
            <div className="p-4 border-b border-slate-100 bg-white flex items-center justify-between shadow-sm z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-100 text-indigo-700 rounded-xl flex items-center justify-center font-bold">
                  {selectedAffiliate.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">{selectedAffiliate.name}</h3>
                  <div className="flex items-center gap-1 mt-0.5">
                    <span className="material-symbols-outlined text-[12px] text-slate-400">phone</span>
                    <p className="text-[11px] font-bold tracking-widest text-slate-500 uppercase">{selectedAffiliate.phone}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-5 bg-slate-50/50">
              {messages.map(msg => {
                const isAdmin = msg.sender_type === 'admin';
                return (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={msg.id} 
                    className={`flex ${isAdmin ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[70%] p-3.5 rounded-2xl text-[13px] font-medium leading-relaxed ${
                      isAdmin 
                        ? 'bg-indigo-600 text-white rounded-br-sm shadow-md shadow-indigo-600/20' 
                        : 'bg-white border border-slate-200 text-slate-800 rounded-bl-sm shadow-sm'
                    }`}>
                      {msg.content}
                      <div className={`text-[9px] mt-1.5 font-bold uppercase tracking-wider ${isAdmin ? 'text-indigo-200' : 'text-slate-400'}`}>
                        {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
              <div ref={messagesEndRef} className="h-4" />
            </div>

            <div className="p-4 bg-white border-t border-slate-100">
              <form onSubmit={handleSend} className="relative flex items-center">
                <input 
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder="Écrivez votre réponse..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-4 pr-16 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:bg-white transition-all font-medium placeholder:text-slate-400"
                  required
                />
                <button 
                  type="submit"
                  disabled={sending || !input.trim()}
                  className="absolute right-2.5 w-10 h-10 flex items-center justify-center bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 hover:scale-105 active:scale-95 transition-all disabled:opacity-50 shadow-md shadow-indigo-600/20 disabled:hover:scale-100"
                >
                  <span className="material-symbols-outlined text-sm">send</span>
                </button>
              </form>
            </div>
           </>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-slate-400 bg-slate-50/50">
            <div className="w-20 h-20 bg-slate-100 rounded-3xl flex items-center justify-center text-slate-300 mb-6 shadow-sm">
              <span className="material-symbols-outlined text-5xl">forum</span>
            </div>
            <h3 className="text-lg font-bold text-slate-600 mb-1 tracking-tight">Support Chat</h3>
            <p className="text-sm font-medium text-slate-400">Sélectionnez un partenaire pour commencer à discuter</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
