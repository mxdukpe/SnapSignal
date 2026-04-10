import React, { useState } from 'react'; // Importation de React et de "useState" (notre fameux Hook pour la "mémoire" du composant).
import { Send, User, AlertCircle, FileText, CheckCircle2, Loader2 } from 'lucide-react'; // Nos belles petites icônes !
import { motion } from 'framer-motion'; // Pour l'animation d'entrée en cascade.
import PrioritySelector from './PrioritySelector'; // Notre sous-composant qu'on a codé à part.

export default function AlertForm() {
  
  // 1️⃣ NOTRE PREMIER "STATE" : La mémoire des champs du formulaire
  // "formData" contient toutes les données. "setFormData" est l'outil pour les modifier.
  const [formData, setFormData] = useState({
    name: '',
    type: 'Urgence',
    description: '',
    priority: 'Moyen'
  });
  
  // 2️⃣ NOTRE DEUXIÈME "STATE" : La mémoire "visuelle" du bouton Envoyer.
  // Peut être "idle" (repos), "submitting" (chargement), "success" (coché vert) ou "error" (alerte rouge).
  const [status, setStatus] = useState('idle'); 
  // 3️⃣ NOTRE TROISIÈME "STATE" : Mémoriser le texte de l'erreur s'il y a un plantage.
  const [errorMsg, setErrorMsg] = useState('');

  // 📝 Cette fonction fait en sorte qu'à chaque fois que l'utilisateur tape une lettre dans un champ Texte, 
  // la valeur est injectée instantanément dans notre mémoire "formData". (Sinon le texte se bloquerait !)
  const handleChange = (e) => {
    const { name, value } = e.target;
    // On copie les anciennes données (...prev) et on remplace jute le champ concerné par la nouvelle valeur.
    setFormData(prev => ({ ...prev, [name]: value })); 
  };

  // 🚀 L'ÉVÉNEMENT MAGIQUE : La fonction qui se déclenche quand on appuie sur le bouton "Submit"
  const handleSubmit = async (e) => {
    // Étape cruciale : on dit au navigateur de ne surtout pas fermer/recharger la page (comportement d'un vrai formulaire des années 90)
    e.preventDefault();
    
    // On change de suite l'état (le bouton va se transformer en sablier/loader qui tourne !)
    setStatus('submitting');
    
    // 🕰️ Création de l'horodatage. (Format demandé par le brief : "07/04/2025 à 14h32")
    const now = new Date();
    const dateStr = now.toLocaleDateString('fr-FR', {
      day: '2-digit', month: '2-digit', year: 'numeric'
    });
    const timeStr = now.toLocaleTimeString('fr-FR', {
      hour: '2-digit', minute: '2-digit'
    }).replace(':', 'h');

    const escapeHtml = (unsafe) => {
      return (unsafe || '').replace(/[&<"']/g, function(m) {
        switch (m) {
          case '&': return '&amp;';
          case '<': return '&lt;';
          case '"': return '&quot;';
          case "'": return '&#039;';
          default: return m;
        }
      });
    };

    // 🏗️ Construction de la lettre/du message. 
    const text = `🚨 <b>NOUVELLE ALERTE</b>
    
👤 <b>De :</b> ${escapeHtml(formData.name)}
📌 <b>Type :</b> ${formData.type}
⚡ <b>Priorité :</b> ${formData.priority.toUpperCase()}
📝 <b>Description :</b>
${escapeHtml(formData.description)}

📅 <b>Reçu le :</b> ${dateStr} à ${timeStr}`;

    // Le fameux bloc TRY...CATCH (Essaie de faire la requête, et si y a un bug de connexion, fais ce qu'il y a dans "catch")
    try {
      // 🔒 On récupère nos mots de passes cachés de l'environnement (notre coffre fort caché .env.local !)
      const botToken = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
      const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID;
      
      // 🌐 La Requête API vers les serveurs de Telegram ("fetch")
      // On envoie en méthode "POST", avec une étiquette JSON, et on met tous les infos dans le "body" de la requête
      const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: chatId, // A qui je parle
          text: text, // Le fameux texte avec les tirets et émojis
          parse_mode: 'HTML' // Telegram doit comprendre que les balises HTML font du gras
        })
      });

      // Si le serveur dit que ce n'est pas OK du tout, on déclenche volontairement une erreur qui ira se cracher dans le "Catch" plus bas.
      if (!response.ok) throw new Error("Erreur lors de l'envoi");
      
      // SI ON EST ICI : C'EST UNE RÉUSSITE !! 🎉
      // On passe le super bouton en succès (vert)
      setStatus('success');
      // On nettoie les champs de notre état "formData" pour vider le formulaire pour une éventuelle autre alerte
      setFormData({ name: '', type: 'Urgence', description: '', priority: 'Moyen' });
      
      // Un "Minuteur" JS tout simple : au bout de 4 secondes (4000ms), on remet le bouton au stade initial (idle = au repos)
      setTimeout(() => setStatus('idle'), 4000);
      
    } catch (error) {
      // ❌ OOPS y'a un bug de réseau !
      console.error(error); // Je garde la vraie erreur côté développeur (console)
      setStatus('error'); // J'allume le bouton en ROUGE en indiquant "error" !
      setErrorMsg("Impossible d'envoyer l'alerte. Veuillez réessayer.");
      setTimeout(() => setStatus('idle'), 4000); // Idem, je l'éteins au bout de 4 secondes
    }
  };

  // 🎭 VARIABLES DE CONFIGURATION D'ANIMATION (Framer Motion)
  // Comment doit glisser le grand "récipient" central ? (de bas en haut, opacity: 0 -> 1)
  const containerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      // "staggerChildren: 0.1" est LA magie pure. Ca dit : fais apparaitre chaque élément enfant à l'intérieur avec 0.1s de retard sur le précédent pour faire un "Effet Escalier".
      transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.1 }
    }
  };

  // Comment chaque pauvre petit élément (champ texte...) à l'intérieur glisse ?
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } // 0.4sec
  };

  return (
    // "motion.div" est une div normale, mais animée. On attache nos configs "variants".
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="w-full max-w-2xl mx-auto p-8 bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl rounded-3xl relative"
    >
      
      {/* 🎨 Nos ronds décoratifs en arrière plan. 
          "pointer-events-none" fait que notre curseur va traverser ces formes floutées pour ne pas nous gêner pour cliquer. */}
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

      {/* Zone du formulaire réel au premier plan (z-10) */}
      <div className="relative z-10">
        
        {/* Titre : on met "variants={itemVariants}" pour qu'il bénéficie de l'effet d'escalier que l'on a demandé plus haut ! */}
        <motion.div variants={itemVariants} className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Signaler un Incident</h2>
          <p className="text-gray-400">Remplissez ce formulaire pour alerter les équipes en temps réel via Telegram.</p>
        </motion.div>

        {/* 📋 Le formulaire (form). Le "onSubmit" est branché à notre fameuse fonction handleSubmit codée tout en haut ! */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Bloc Nom Prénom */}
          <motion.div variants={itemVariants} className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Nom & Prénom</label>
            <div className="relative">
              {/* Conteneur de l'icône, en absolute collé à gauche. */}
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-500" />
              </div>
              {/* Le champ HTML propre. Note la propriété "value" accrochée à "formData.name" et "onChange" accroché à notre fonction mémoire ! */}
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

          {/* Bloc Catégorie (la liste Select) */}
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

          {/* 🌟 L'insertion de notre fameux composant enfant : PrioritySelector ! */}
          <motion.div variants={itemVariants}>
            {/* C'est ici l'interaction parfaite. On injecte dans l'enfant la propriété sélectionnée ("val") qui est stockée dans la mémoire parent,
            	et l'enfant pourra nous balancer un appel "onChange" pour forcer le Parent à mettre à jour la mémoire ! */}
            <PrioritySelector 
              selected={formData.priority} 
              onChange={(val) => setFormData(prev => ({ ...prev, priority: val }))} 
            />
          </motion.div>

          {/* Bloc Description avec balise magique <textarea> (qui fait plusieurs lignes) */}
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
                onChange={handleChange} // Toujours connecté à la fonction "j'ai tapé au clavier" !
                placeholder="Décrivez précisément le problème rencontré..."
                rows={4} // 4 lignes de base pour que ça soit confortable visuellement
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 text-white placeholder-gray-500 outline-none transition-all resize-none"
              />
            </div>
          </motion.div>

          {/* 🔘 MEGA BOUTON D'ENVOI ANIMÉ DYNAMIQUE ! */}
          <motion.button
            variants={itemVariants}
            whileHover={{ scale: 1.01 }} // Si on survole (souris), le bouton gonfle lègérement de 1%
            whileTap={{ scale: 0.98 }} // Mais si on clique, le bouton "s'enfonce" de suite ! (Ressort génial)
            type="submit"
            // Important: Le bouton est grisé (inutilisable) s'il est déjà en train de charger 
            // pour qu'un utilisateur mécontent ne fasse pas 10 clics et n'envoie pas 10 fois l'alerte !!
            disabled={status === 'submitting' || status === 'success'}
            // La classe CSS "dynamique" en JS. Grâce aux bactick `, on injecte du vrai code dans du html. 
            // Si status = success ? Alors fond vert. Sinon fond rouge. Sinon, grand fond dégradé violet classique de base.
            className={`w-full py-4 px-6 rounded-xl font-medium text-white shadow-lg transition-colors ${
              status === 'success' 
                ? 'bg-emerald-500 hover:bg-emerald-600' 
                : status === 'error'
                ? 'bg-rose-500 hover:bg-rose-600'
                : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500'
            }`}
          >
            {/* L'intérieur du bouton (le texte + icône). Lui aussi change magiquement de visage. */}
            <div className="flex items-center justify-center gap-2">
              
              {/* Si on est au repos : */}
              {status === 'idle' && (
                <>
                  <Send className="w-5 h-5" />
                  Envoyer le signalement
                </>
              )}
              
              {/* Si c'est en train de chager le réseau : */}
              {status === 'submitting' && (
                <>
                  {/* Et on remplace l'icône par ça, "animate-spin" pour la faire tourner en boucle ! */}
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Envoi en cours...
                </>
              )}
              
              {/* Si ça a marché : */}
              {status === 'success' && (
                <>
                  {/* Une chouette animation au changement pour afficher l'icône verte ! */}
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}>
                    <CheckCircle2 className="w-5 h-5" />
                  </motion.div>
                  Alerte envoyée avec succès !
                </>
              )}
              
              {/* Si ça as raté (par exemple pas de wifi, ou token invalide) */}
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
