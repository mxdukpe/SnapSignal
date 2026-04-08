import React, { useState } from 'react';
import { Send, User, AlertCircle, FileText, CheckCircle2, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import PrioritySelector from './PrioritySelector';

export default function AlertForm() {
  const [formData, setFormData] = useState({
    name: '',
    type: 'Urgence',
    description: '',
    priority: 'Moyen'
  });
  
  const [status, setStatus] = useState('idle'); // idle, submitting, success, error
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    
    const now = new Date();
    const dateStr = now.toLocaleDateString('fr-FR', {
      day: '2-digit', month: '2-digit', year: 'numeric'
    });
    const timeStr = now.toLocaleTimeString('fr-FR', {
      hour: '2-digit', minute: '2-digit'
    }).replace(':', 'h');

    const text = `🚨 *NOUVELLE ALERTE*
    
👤 *De :* ${formData.name}
📌 *Type :* ${formData.type}
⚡ *Priorité :* ${formData.priority.toUpperCase()}
📝 *Description :*
${formData.description}

📅 *Reçu le :* ${dateStr} à ${timeStr}`;

    try {
      const botToken = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
      const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID;
      
      const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: text,
          parse_mode: 'Markdown'
        })
      });

      if (!response.ok) throw new Error("Erreur lors de l'envoi");
      
      setStatus('success');
      setFormData({ name: '', type: 'Urgence', description: '', priority: 'Moyen' });
      setTimeout(() => setStatus('idle'), 4000);
      
    } catch (error) {
      console.error(error);
      setStatus('error');
      setErrorMsg("Impossible d'envoyer l'alerte. Veuillez réessayer.");
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  // Variants d'animation
  const containerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="w-full max-w-2xl mx-auto p-8 bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl rounded-3xl relative"
    >
      
      {/* Decorative gradient blob avec animation d'apparition douce */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute -top-32 -right-32 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" 
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
        className="absolute -bottom-32 -left-32 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" 
      />

      <div className="relative z-10">
        <motion.div variants={itemVariants} className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Signaler un Incident</h2>
          <p className="text-gray-400">Remplissez ce formulaire pour alerter les équipes en temps réel via Telegram.</p>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          <motion.div variants={itemVariants} className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Nom & Prénom</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-500" />
              </div>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Ex. Jean Dupont"
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 text-white placeholder-gray-500 outline-none transition-all"
              />
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Type d'incident</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <AlertCircle className="h-5 w-5 text-gray-500" />
              </div>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 text-white outline-none transition-all appearance-none"
              >
                <option value="Urgence">Urgence logicielle</option>
                <option value="Information">Information système</option>
                <option value="Alerte">Alerte sécurité</option>
                <option value="Autre">Autre problème</option>
              </select>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <PrioritySelector 
              selected={formData.priority} 
              onChange={(val) => setFormData(prev => ({ ...prev, priority: val }))} 
            />
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Description détaillée</label>
            <div className="relative">
              <div className="absolute top-3 left-3 pointer-events-none">
                <FileText className="h-5 w-5 text-gray-500" />
              </div>
              <textarea
                name="description"
                required
                value={formData.description}
                onChange={handleChange}
                placeholder="Décrivez précisément le problème rencontré..."
                rows={4}
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 text-white placeholder-gray-500 outline-none transition-all resize-none"
              />
            </div>
          </motion.div>

          <motion.button
            variants={itemVariants}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={status === 'submitting' || status === 'success'}
            className={`w-full py-4 px-6 rounded-xl font-medium text-white shadow-lg transition-colors ${
              status === 'success' 
                ? 'bg-emerald-500 hover:bg-emerald-600' 
                : status === 'error'
                ? 'bg-rose-500 hover:bg-rose-600'
                : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              {status === 'idle' && (
                <>
                  <Send className="w-5 h-5" />
                  Envoyer le signalement
                </>
              )}
              {status === 'submitting' && (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Envoi en cours...
                </>
              )}
              {status === 'success' && (
                <>
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}>
                    <CheckCircle2 className="w-5 h-5" />
                  </motion.div>
                  Alerte envoyée avec succès !
                </>
              )}
              {status === 'error' && (
                <>
                  <AlertCircle className="w-5 h-5" />
                  {errorMsg}
                </>
              )}
            </div>
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
}
