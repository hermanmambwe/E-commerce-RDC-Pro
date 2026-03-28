import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

export default function InvoiceView() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('invoice');
  const [invoice, setInvoice] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInvoice();
  }, [id]);

  const fetchInvoice = async () => {
    try {
      const res = await fetch(`/api/public/invoices/${id}`);
      const data = await res.json();
      setInvoice(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-xs font-black uppercase text-slate-400 tracking-widest">Chargement de la facture...</p>
      </div>
    </div>
  );

  if (!invoice) return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="text-center max-w-sm">
        <span className="material-symbols-outlined text-6xl text-slate-300 mb-4">search_off</span>
        <h2 className="text-xl font-black text-slate-900 mb-2">Facture Introuvable</h2>
        <p className="text-sm text-slate-500 font-medium">Ce lien est invalide ou la facture n'existe plus.</p>
      </div>
    </div>
  );

  const isPaid = invoice.status === 'paid';

  return (
    <div className="min-h-screen bg-slate-100 py-12 px-4 print:bg-white print:py-0">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto bg-white shadow-2xl rounded-[2.5rem] overflow-hidden relative print:shadow-none print:rounded-none"
      >
        {/* Top Header Section */}
        <div className="bg-slate-900 p-12 text-white relative flex flex-col md:flex-row justify-between items-start gap-8 overflow-hidden">
           <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
           <div className="relative z-10">
              <div className="flex items-center gap-3 mb-8">
                 <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center">
                   <span className="material-symbols-outlined text-2xl">command</span>
                 </div>
                 <span className="text-xl font-black tracking-tighter">E-COMMERCE <span className="text-indigo-500">RDC PRO</span></span>
              </div>
              <h1 className="text-5xl font-black tracking-tighter mb-2">FACTURE</h1>
              <p className="text-indigo-300 font-bold tracking-[0.2em] uppercase text-xs">OFFICIELLE & VÉRIFIABLE</p>
           </div>
           
           <div className="relative z-10 text-right md:text-right">
              <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1">Numéro de Facture</p>
              <p className="text-2xl font-black text-white mb-6">#{invoice.id}</p>
              
              <div className={`inline-flex items-center gap-3 px-6 py-2 rounded-full border-2 ${isPaid ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400' : 'bg-orange-500/10 border-orange-500 text-orange-400'}`}>
                 <span className="material-symbols-outlined text-lg">{isPaid ? 'verified' : 'pending_actions'}</span>
                 <span className="text-xs font-black uppercase tracking-widest">{isPaid ? 'PAYÉ' : 'EN ATTENTE'}</span>
              </div>
           </div>
        </div>

        {/* Details Section */}
        <div className="p-12">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 pb-16 border-b border-slate-100">
              <div>
                 <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">Émetteur</p>
                 <h4 className="font-black text-slate-900 mb-1">E-commerce RDC Pro</h4>
                 <p className="text-sm text-slate-500 font-medium">Kinshasa, RD Congo</p>
                 <p className="text-sm text-slate-500 font-medium font-mono mt-2 tracking-tighter cursor-pointer hover:text-indigo-600">contact@rdcpro.com</p>
              </div>
              <div className="md:text-right">
                 <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">Destinataire</p>
                 <h4 className="font-black text-slate-900 mb-1">{invoice.client_name}</h4>
                 <p className="text-sm text-slate-500 font-medium">{invoice.client_phone}</p>
                 <div className="mt-4 inline-block bg-slate-50 px-4 py-2 rounded-xl text-xs font-bold text-slate-500">
                    Date d'émission: {new Date(invoice.created_at).toLocaleDateString()}
                 </div>
              </div>
           </div>

           {/* Table */}
           <div className="mb-16">
              <div className="grid grid-cols-4 px-6 py-4 bg-slate-50 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">
                 <div className="col-span-2">Description du Service</div>
                 <div className="text-center">Quantité</div>
                 <div className="text-right">Total</div>
              </div>
              <div className="grid grid-cols-4 px-6 py-8 items-center">
                 <div className="col-span-2">
                    <h5 className="font-black text-slate-900 mb-1">Package E-commerce Élite</h5>
                    <p className="text-xs text-slate-400 font-medium">Boutique Live en 7 jours + Formation</p>
                    <div className="mt-2 text-[10px] font-bold text-indigo-600 uppercase tracking-widest bg-indigo-50 px-2 py-0.5 rounded-md inline-block">
                       Étape: {invoice.stage === 'initial60' ? 'ACCOMPTE 60%' : invoice.stage === 'final40' ? 'SOLDE FINAL 40%' : 'PAIEMENT COMPLET'}
                    </div>
                 </div>
                 <div className="text-center font-bold text-slate-900">1</div>
                 <div className="text-right font-black text-xl text-slate-900">${invoice.amount.toLocaleString()}</div>
              </div>
           </div>

           {/* Footer / Summary */}
           <div className="flex flex-col md:flex-row justify-between items-end gap-12">
              <div className="max-w-xs">
                 <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100 mb-6">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">Modes de Paiement Acceptés</p>
                    <div className="flex flex-wrap gap-2">
                       {['M-Pesa', 'Airtel Money', 'Orange Money'].map(m => (
                          <span key={m} className="px-3 py-1 bg-white rounded-lg text-[9px] font-black text-slate-600 border border-slate-200">
                             {m}
                          </span>
                       ))}
                    </div>
                 </div>
                 <p className="text-[10px] text-slate-400 font-medium leading-relaxed italic">
                    Note: Un reçu de paiement final sera généré automatiquement dès réception des fonds par notre équipe administrative.
                 </p>
              </div>

              <div className="w-full md:w-80 space-y-4">
                 <div className="flex justify-between items-center text-slate-500 font-bold">
                    <span className="text-xs uppercase tracking-widest">Sous-total</span>
                    <span>${invoice.amount.toLocaleString()}</span>
                 </div>
                 <div className="flex justify-between items-center text-slate-500 font-bold">
                    <span className="text-xs uppercase tracking-widest">Taxes (TVA)</span>
                    <span>$0.00</span>
                 </div>
                 <div className="pt-6 border-t-2 border-slate-900 flex justify-between items-center text-slate-900">
                    <span className="text-xs font-black uppercase tracking-[0.2em]">TOTAL NET DU</span>
                    <span className="text-3xl font-black">${invoice.amount.toLocaleString()}</span>
                 </div>
              </div>
           </div>
        </div>

        {/* Verification Footer */}
        <div className="bg-slate-50 p-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
           <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">shield_check</span>
              Document vérifié par le système de sécurité RDC Pro
           </div>
           <button onClick={() => window.print()} className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 transition-colors cursor-pointer print:hidden">
              <span className="material-symbols-outlined text-sm">print</span>
              Imprimer cette facture
           </button>
        </div>
      </motion.div>
    </div>
  );
}
