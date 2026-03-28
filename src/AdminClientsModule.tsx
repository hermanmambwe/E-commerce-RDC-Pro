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
