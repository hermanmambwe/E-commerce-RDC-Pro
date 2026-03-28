import React, { useState } from 'react';

export default function AffiliateResourcesModule({ promoCode, refLink }: { promoCode: string, refLink: string }) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const scripts = [
    {
      id: "script-whatsapp-1",
      title: "Approche Rapide (WhatsApp)",
      content: `Salut ! 👋 J'ai pensé à toi.\nSi tu veux vendre tes produits en ligne et être payé directement par M-Pesa ou Airtel Money, j'ai trouvé la solution parfaite.\n\nE-commerce RDC Pro te crée une boutique automatique en moins de 7 jours. Je suis partenaire avec eux, donc si tu utilises mon lien, ton nom de domaine (.com) est offert !\n\nRegarde ça ici : ${refLink}&src=whatsapp`
    },
    {
      id: "script-fb-1",
      title: "Post Facebook / Instagram",
      content: `🚀 Vendeurs et Entrepreneurs en RDC :\nArrêtez de gérer vos ventes uniquement par message. Passez au niveau supérieur avec votre propre boutique en ligne, connectée à M-Pesa et Mobile Money !\n\n✅ Installation complète\n✅ Paiements locaux et internationaux\n✅ Design premium\n\n🎁 J'ai un cadeau pour vous ! Utilisez mon lien partenaire pour recevoir votre nom de domaine GRATUITEMENT.\n\n👇 Cliquez ici pour lancer votre business :\n${refLink}&src=facebook`
    },
    {
      id: "script-short",
      title: "Follow-up SMS / Court",
      content: `Coucou ! Tu as pu regarder le site pour ta boutique en ligne ? N'oublie pas de passer par mon lien pour avoir le domaine gratuit 🎁 : ${refLink}`
    }
  ];

  return (
    <section>
      <div className="flex items-center justify-between mb-6 border-b border-slate-200 pb-4">
        <div>
          <h3 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <span className="material-symbols-outlined text-indigo-600">workspaces</span>
            Boîte à Outils Marketing
          </h3>
          <p className="text-sm text-slate-500 mt-1">Scripts et visuels prêts à l'emploi. Copiez, collez, encaissez !</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 relative">
        {/* Scripts Section */}
        <div>
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">chat</span> Scripts de Vente (Swipe File)
          </h4>
          <div className="space-y-4">
            {scripts.map((script) => (
              <div key={script.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden group">
                <div className="bg-slate-50 p-4 border-b border-slate-200 flex justify-between items-center">
                  <span className="font-bold text-slate-700 text-sm">{script.title}</span>
                  <button 
                    onClick={() => handleCopy(script.content, script.id)}
                    className={`text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${copiedId === script.id ? 'bg-emerald-100 text-emerald-700' : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'}`}
                  >
                    <span className="material-symbols-outlined text-[14px]">{copiedId === script.id ? 'check' : 'content_copy'}</span>
                    {copiedId === script.id ? 'Copié !' : 'Copier text'}
                  </button>
                </div>
                <div className="p-5">
                  <p className="text-sm text-slate-600 whitespace-pre-wrap leading-relaxed">{script.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Graphics Section */}
        <div>
           <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">image</span> Visuels Promotionnels
          </h4>
          <div className="grid grid-cols-2 gap-4">
            {/* Banner 1 */}
            <div className="relative group overflow-hidden rounded-2xl border border-slate-200 aspect-square bg-slate-100">
               <img src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=400" alt="Promo E-commerce" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
               <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                 <span className="text-white font-bold text-sm text-center px-4">Bannière Instagram/Facebook</span>
                 <button className="bg-white text-indigo-900 px-4 py-2 rounded-full text-xs font-bold flex items-center gap-1 shadow-xl hover:scale-105 transition-transform">
                   <span className="material-symbols-outlined text-[14px]">download</span> Télécharger
                 </button>
               </div>
            </div>

            {/* Banner 2 */}
            <div className="relative group overflow-hidden rounded-2xl border border-slate-200 aspect-square bg-slate-100">
               <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=400" alt="Dashboard Promo" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
               <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                 <span className="text-white font-bold text-sm text-center px-4">Aperçu Dashboard (Mockup)</span>
                 <button className="bg-white text-indigo-900 px-4 py-2 rounded-full text-xs font-bold flex items-center gap-1 shadow-xl hover:scale-105 transition-transform">
                   <span className="material-symbols-outlined text-[14px]">download</span> Télécharger
                 </button>
               </div>
            </div>

            {/* Custom Banner Notice */}
            <div className="col-span-2 bg-indigo-50 border border-indigo-100 p-6 rounded-2xl flex items-center gap-4">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-indigo-500 shrink-0">
                <span className="material-symbols-outlined text-2xl">palette</span>
              </div>
              <div>
                <h5 className="font-bold text-slate-900 text-sm">Besoin d'un visuel personnalisé ?</h5>
                <p className="text-xs text-slate-500 mt-1">En tant que partenaire certifié, vous pouvez demander à l'équipe technique de créer des mockups avec votre propre logo dans la section Chat.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
