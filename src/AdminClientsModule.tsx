import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

export default function AdminClientsModule() {
  const [clients, setClients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // form state
  const [showAddForm, setShowAddForm] = useState(false);
  const [newClientName, setNewClientName] = useState('');
  const [newClientPhone, setNewClientPhone] = useState('');

  // file upload state
  const [selectedClientId, setSelectedClientId] = useState<number | null>(null);
  const [deliverableTitle, setDeliverableTitle] = useState('');
  const [deliverableUrl, setDeliverableUrl] = useState('');

  // project management state
  const [managingProject, setManagingProject] = useState<any | null>(null);
  const [isUpdatingProject, setIsUpdatingProject] = useState(false);
  const [projectInvoices, setProjectInvoices] = useState<any[]>([]);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const res = await fetch('/api/admin/clients');
      const data = await res.json();
      setClients(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const fetchProjectInvoices = async (clientId: number) => {
    try {
      const res = await fetch(`/api/admin/clients/${clientId}/invoices`); // Note: need this endpoint or reuse another
      const data = await res.json();
      setProjectInvoices(data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (managingProject) {
      fetchProjectInvoices(managingProject.id);
    }
  }, [managingProject]);

  const handleMarkAsPaid = async (invoiceId: string) => {
    setIsUpdatingProject(true);
    try {
      const res = await fetch(`/api/admin/invoices/${invoiceId}/pay`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ payment_method: 'Manuel' })
      });
      if (res.ok) {
        fetchProjectInvoices(managingProject.id);
        fetchClients();
      }
    } catch (e) { console.error(e); }
    finally { setIsUpdatingProject(false); }
  };

  const handleAddClient = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/clients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newClientName, phone: newClientPhone })
      });
      if (res.ok) {
        setNewClientName('');
        setNewClientPhone('');
        setShowAddForm(false);
        fetchClients();
      }
    } catch (e) { console.error(e); }
  };

  const handleUploadDeliverable = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedClientId) return;
    try {
      const res = await fetch(`/api/clients/${selectedClientId}/deliverable`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: deliverableTitle, file_url: deliverableUrl })
      });
      if (res.ok) {
        setDeliverableTitle('');
        setDeliverableUrl('');
        setSelectedClientId(null);
        alert('Livrable ajouté !');
      }
    } catch (e) { console.error(e); }
  };

  const handleUpdateMilestone = async (project_id: number, key: string, currentVal: number) => {
    if (!managingProject) return;
    const newMilestones = { ...JSON.parse(managingProject.milestones), [key]: currentVal === 1 ? 0 : 1 };
    
    setIsUpdatingProject(true);
    try {
      const res = await fetch(`/api/admin/projects/${project_id}/milestones`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ milestones: newMilestones })
      });
      if (res.ok) {
        setManagingProject({ ...managingProject, milestones: JSON.stringify(newMilestones) });
        fetchClients();
      }
    } catch (e) { console.error(e); }
    finally { setIsUpdatingProject(false); }
  };

  const handleUpdateStatus = async (project_id: number, status: string) => {
    setIsUpdatingProject(true);
    try {
      const res = await fetch(`/api/admin/projects/${project_id}/milestones`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        setManagingProject({ ...managingProject, project_status: status });
        fetchClients();
      }
    } catch (e) { console.error(e); }
    finally { setIsUpdatingProject(false); }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 text-sm">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <span className="material-symbols-outlined text-indigo-600">person_add</span>
          Gestion Onboarding Clients
        </h3>
        <button onClick={() => setShowAddForm(!showAddForm)} className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-indigo-700 transition">
          {showAddForm ? 'Fermer' : 'Nouveau Client'}
        </button>
      </div>

      {showAddForm && (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mb-6">
          <form onSubmit={handleAddClient} className="flex gap-4 items-end">
             <div className="flex-1">
               <label className="block text-xs font-bold mb-1">Nom du client</label>
               <input required value={newClientName} onChange={e=>setNewClientName(e.target.value)} className="w-full p-2 border rounded-lg" placeholder="Ex: Jean Mukendi" />
             </div>
             <div className="flex-1">
               <label className="block text-xs font-bold mb-1">Numéro de téléphone</label>
               <input required value={newClientPhone} onChange={e=>setNewClientPhone(e.target.value)} type="tel" className="w-full p-2 border rounded-lg" placeholder="+243..." />
             </div>
             <button type="submit" className="px-6 py-2 bg-slate-900 text-white rounded-lg font-bold">Créer & Générer Code</button>
          </form>
        </div>
      )}

      {selectedClientId && (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mb-6 border-l-4 border-l-green-500">
          <h4 className="font-bold mb-4">Ajouter un livrable</h4>
          <form onSubmit={handleUploadDeliverable} className="flex gap-4 items-end">
             <div className="flex-1">
               <label className="block text-xs font-bold mb-1">Titre (ex: Maquette Logo, Contrat de base)</label>
               <input required value={deliverableTitle} onChange={e=>setDeliverableTitle(e.target.value)} className="w-full p-2 border rounded-lg" />
             </div>
             <div className="flex-1">
               <label className="block text-xs font-bold mb-1">URL du fichier (Google Drive, WeTransfer, etc.)</label>
               <input required value={deliverableUrl} onChange={e=>setDeliverableUrl(e.target.value)} type="url" className="w-full p-2 border rounded-lg" placeholder="https://" />
             </div>
             <button type="submit" className="px-6 py-2 bg-green-600 text-white rounded-lg font-bold">Envoyer au client</button>
             <button type="button" onClick={() => setSelectedClientId(null)} className="px-4 py-2 text-slate-500 hover:bg-slate-100 rounded-lg">Annuler</button>
          </form>
        </div>
      )}

      {managingProject && (
        <div className="bg-white p-8 rounded-3xl shadow-2xl border border-indigo-100 mb-6 border-l-8 border-l-indigo-600 animate-in fade-in slide-in-from-top duration-300">
           <div className="flex justify-between items-center mb-6">
             <div>
               <h4 className="text-xl font-black text-slate-900 tracking-tight">Gestion du Projet & Roadmap</h4>
               <p className="text-xs text-slate-500 font-medium">Suivez et validez les étapes de construction pour <span className="text-indigo-600 font-bold">{managingProject.name}</span></p>
             </div>
             <button onClick={() => setManagingProject(null)} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400"><span className="material-symbols-outlined">close</span></button>
           </div>

           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
             {Object.entries(JSON.parse(managingProject.milestones || '{}')).map(([key, val]) => (
               <button 
                key={key} 
                disabled={isUpdatingProject}
                onClick={() => handleUpdateMilestone(managingProject.project_id, key, val as number)}
                className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-3 relative overflow-hidden group ${val === 1 ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-slate-100 bg-slate-50 text-slate-400 hover:border-indigo-200'}`}
               >
                 <span className="material-symbols-outlined text-2xl group-hover:scale-110 transition-transform">
                   {key === 'branding' ? 'palette' : key === 'catalog' ? 'inventory' : key === 'payment' ? 'payments' : key === 'marketing' ? 'campaign' : key === 'testing' ? 'app_registration' : 'rocket_launch'}
                 </span>
                 <span className="text-[10px] font-black uppercase tracking-widest text-center">{key === 'payment' ? 'Paiement' : key === 'catalog' ? 'Catalogue' : key === 'branding' ? 'Design' : key === 'marketing' ? 'Marketing' : key === 'testing' ? 'Tests' : 'Final'}</span>
                 {val === 1 && <span className="absolute top-2 right-2 material-symbols-outlined text-sm font-bold">check_circle</span>}
               </button>
             ))}
           </div>

           <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
             <div className="flex-1">
               <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">État Global du Projet</p>
               <div className="flex gap-2">
                 {['setup', 'in_progress', 'delivered'].map((s) => (
                   <button 
                     key={s} 
                     onClick={() => handleUpdateStatus(managingProject.project_id, s)}
                     className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${managingProject.project_status === s ? 'bg-indigo-600 text-white shadow-lg' : 'bg-white text-slate-400 border border-slate-200 hover:bg-slate-50'}`}
                   >
                     {s === 'delivered' ? 'Livré / Live' : s === 'in_progress' ? 'En cours' : 'Préparation'}
                   </button>
                 ))}
               </div>
             </div>
             <div className="text-right">
                <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Dernière Action</p>
                <p className="text-xs font-black text-slate-900">Mise à jour automatique</p>
             </div>
           </div>

           {/* Invoices Section */}
           <div className="mt-8 pt-8 border-t border-slate-100">
              <h5 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4">Historique des Factures</h5>
              <div className="space-y-3">
                 {projectInvoices.length === 0 ? (
                   <p className="text-xs text-slate-400 italic">Aucune facture générée pour ce client.</p>
                 ) : (
                   projectInvoices.map(inv => (
                     <div key={inv.id} className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-2xl">
                        <div className="flex items-center gap-4">
                           <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs ${inv.status === 'paid' ? 'bg-emerald-100 text-emerald-600' : 'bg-orange-100 text-orange-600'}`}>
                              {inv.id.split('-')[0]}
                           </div>
                           <div>
                              <p className="text-sm font-black text-slate-900 tracking-tight">Facture {inv.id}</p>
                              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                                {inv.stage === 'initial60' ? 'Acompte 60%' : inv.stage === 'final40' ? 'Solde 40%' : 'Paiement Complet'}
                              </p>
                           </div>
                        </div>
                        <div className="flex items-center gap-6">
                           <div className="text-right">
                              <p className="text-sm font-black text-slate-900">${inv.amount.toLocaleString()}</p>
                              <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${inv.status === 'paid' ? 'bg-emerald-50 text-emerald-600' : 'bg-orange-50 text-orange-600'}`}>
                                 {inv.status === 'paid' ? 'Confirmé' : 'En attente'}
                              </span>
                           </div>
                           {inv.status === 'pending' && (
                              <button 
                                onClick={() => handleMarkAsPaid(inv.id)}
                                disabled={isUpdatingProject}
                                className="px-4 py-2 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 transition-colors"
                              >
                                Confirmer Paiement
                              </button>
                           )}
                           <a 
                             href={`/?invoice=${inv.id}`} 
                             target="_blank" 
                             rel="noreferrer"
                             className="p-2 text-slate-400 hover:text-indigo-600 transition-colors"
                             title="Voir la facture"
                           >
                             <span className="material-symbols-outlined text-lg">open_in_new</span>
                           </a>
                        </div>
                     </div>
                   ))
                 )}
              </div>
           </div>
        </div>
      )}

      <div className="bg-white border text-left border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50 border-b text-[10px] text-slate-500 uppercase font-bold tracking-widest">
              <th className="p-4">Client</th>
              <th className="p-4">Statut Onboarding</th>
              <th className="p-4">Code d'accès</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading ? <tr><td colSpan={4} className="p-10 text-center">Chargement...</td></tr> : clients.length === 0 ? <tr><td colSpan={4} className="p-10 text-center text-slate-400">Aucun client.</td></tr> : clients.map(c => (
              <tr key={c.id} className="hover:bg-slate-50">
                <td className="p-4">
                  <p className="font-bold text-slate-900">{c.name}</p>
                  <p className="text-xs text-slate-500">{c.phone}</p>
                </td>
                <td className="p-4">
                  <span className={`px-2 py-1 text-xs rounded-full border ${c.status === 'completed' ? 'bg-green-50 text-green-700 border-green-200' : c.status === 'active' ? 'bg-indigo-50 text-indigo-700 border-indigo-200' : 'bg-slate-100 text-slate-600'}`}>
                    {c.status === 'pending_onboarding' ? 'En attente' : c.status === 'active' ? 'En cours' : 'Terminé'}
                  </span>
                </td>
                <td className="p-4">
                  <code className="bg-orange-50 text-orange-700 px-2 py-1 text-xs border border-orange-100 rounded font-mono font-bold tracking-widest">
                    {c.access_code}
                  </code>
                </td>
                <td className="p-4 text-right space-x-2">
                  <button 
                    onClick={() => setManagingProject(c)} 
                    className={`px-3 py-1.5 rounded text-xs font-bold transition-all ${managingProject?.id === c.id ? 'bg-indigo-600 text-white' : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100'}`}
                  >
                    🛠️ Gérer Projet
                  </button>
                  <button onClick={() => setSelectedClientId(c.id)} className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded text-xs font-bold">
                    + Livrable
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
