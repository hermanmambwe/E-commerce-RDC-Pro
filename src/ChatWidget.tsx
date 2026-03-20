import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface Message {
  id: number;
  sender_type: 'affiliate' | 'admin';
  content: string;
  created_at: string;
}

export default function ChatWidget({ affiliateId }: { affiliateId: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const fetchMessages = async () => {
    try {
      const res = await fetch(`/api/chat/${affiliateId}`);
      const data = await res.json();
      setMessages(data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchMessages();
      const interval = setInterval(fetchMessages, 3000);
      return () => clearInterval(interval);
    }
  }, [isOpen, affiliateId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || sending) return;
    setSending(true);
    try {
      await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ affiliate_id: affiliateId, sender_type: 'affiliate', content: input })
      });
      setInput('');
      await fetchMessages();
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-[100] w-14 h-14 bg-gradient-to-tr from-primary to-blue-600 rounded-2xl shadow-xl shadow-blue-500/30 text-white flex items-center justify-center hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-500/40 transition-all font-bold group"
      >
        <div className="absolute inset-0 bg-white/20 rounded-2xl scale-0 group-hover:scale-100 transition-transform origin-center"></div>
        <span className="material-symbols-outlined text-2xl relative z-10 transition-transform duration-300">
          {isOpen ? 'close' : 'chat_bubble'}
        </span>
      </button>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-24 right-6 z-[100] w-[360px] h-[550px] max-h-[70vh] bg-white rounded-[2rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] flex flex-col overflow-hidden ring-1 ring-slate-900/5 font-sans"
          >
            {/* Header */}
            <div className="bg-slate-900 p-6 flex flex-col text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
              <div className="flex items-center gap-4 relative z-10">
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center ring-1 ring-white/20 shadow-lg">
                  <span className="material-symbols-outlined text-blue-400">support_agent</span>
                </div>
                <div>
                  <h3 className="font-display font-black text-xl leading-tight">Support E-commerce</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div>
                    <span className="text-xs text-slate-300 font-bold uppercase tracking-widest bg-emerald-500/10 px-2 py-0.5 rounded-md">Répond vite</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-5 space-y-5 bg-slate-50/50">
              {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-slate-400">
                  <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-3xl flex items-center justify-center mb-4">
                     <span className="material-symbols-outlined text-3xl">waving_hand</span>
                  </div>
                  <p className="text-sm font-bold text-slate-600">Vous avez une question ?</p>
                  <p className="text-xs font-medium text-slate-400 mt-1 max-w-[200px] text-center">N'hésitez pas, l'équipe admin est là pour vous aider avec vos prospects.</p>
                </div>
              ) : (
                messages.map((msg, i) => {
                  const isAffiliate = msg.sender_type === 'affiliate';
                  const showAvatar = !isAffiliate && (i === 0 || messages[i-1].sender_type !== 'admin');
                  return (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      key={msg.id} 
                      className={`flex gap-3 ${isAffiliate ? 'justify-end' : 'justify-start'}`}
                    >
                      {!isAffiliate && (
                        <div className={`w-8 h-8 shrink-0 flex items-center justify-center bg-slate-900 rounded-full text-white shadow-sm ${!showAvatar ? 'opacity-0' : ''}`}>
                          <span className="material-symbols-outlined text-sm">support_agent</span>
                        </div>
                      )}
                      <div className={`max-w-[80%] p-3.5 rounded-2xl text-[13px] font-medium leading-relaxed ${
                        isAffiliate 
                          ? 'bg-blue-600 text-white rounded-br-none shadow-md shadow-blue-600/20 px-4' 
                          : 'bg-white border border-slate-200 text-slate-700 rounded-bl-sm shadow-sm px-4'
                      }`}>
                        {msg.content}
                        <div className={`text-[9px] mt-1.5 font-bold uppercase tracking-wider ${isAffiliate ? 'text-blue-200' : 'text-slate-400'}`}>
                          {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              )}
              <div ref={messagesEndRef} className="h-2" />
            </div>

            {/* Input Form */}
            <div className="p-4 bg-white border-t border-slate-100 relative">
              <form onSubmit={handleSend} className="relative flex items-center">
                <input 
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder="Tapez votre message..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-5 pr-14 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:bg-white transition-all font-medium placeholder:text-slate-400"
                  required
                />
                <button 
                  type="submit"
                  disabled={sending || !input.trim()}
                  className="absolute right-2 w-10 h-10 flex items-center justify-center bg-blue-600 text-white rounded-xl hover:bg-blue-700 hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:hover:scale-100 shadow-md shadow-blue-600/20"
                >
                  <span className="material-symbols-outlined text-sm">send</span>
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
