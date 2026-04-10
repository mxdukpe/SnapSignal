import React from 'react'; // Importation du moteur React
import { motion } from 'framer-motion'; // Importation de la librairie d'animation (framer-motion)
import AlertForm from './components/AlertForm'; // On importe notre composant principal qui contient le formulaire

// Le composant "App" est le composant racine (la base de notre page web complète)
function App() {
  return (
    // La <div> principale englobe toute la page. 
    // "min-h-screen" s'assure qu'elle prenne 100% de la hauteur de l'écran. 
    // "bg-neutral-950" met le fond très sombre. "overflow-hidden" empêche la page de scroller sur le côté ou d'avoir une barre de défilement liée aux animations.
    <div className="min-h-screen bg-neutral-950 flex flex-col items-center justify-center p-4 selection:bg-blue-500/30 overflow-hidden">
      
      {/* En-tête (Navbar) de notre application */}
      {/* <motion.header> remplace un simple <header>. Cela permet d'y accrocher des animations. */}
      <motion.header 
        initial={{ y: -50, opacity: 0 }} // Configuration du départ de l'animation : 50 pixels plus haut, et 100% transparent.
        animate={{ y: 0, opacity: 1 }} // Configuration d'arrivée : il descend à sa place normale (y:0) et devient 100% visible.
        transition={{ duration: 0.6, ease: "easeOut" }} // L'animation dure 0.6 seconde de manière fluide.
        className="absolute top-0 w-full p-6 flex justify-between items-center max-w-7xl mx-auto" // Stylisation : positionné tout en haut, espacé.
      >
        <div className="flex items-center gap-2">
          {/* Ceci est le petit logo carré avec le point clignotant blanc */}
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center">
            {/* Le point blanc avec l'animation CSS native "animate-pulse" (clignotement) pour faire très "alerte en temps réel" */}
            <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
          </div>
          {/* Le nom de l'application */}
          <span className="text-white font-bold text-xl tracking-tight">SnapSignal</span>
        </div>
        {/* Un faux badge "Alerte Système" pour faire professionnel sur la droite */}
        <div className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-sm font-medium text-gray-300 backdrop-blur-md">
          Alerte Système
        </div>
      </motion.header>

      {/* Le corps central de la page web */}
      <main className="w-full mt-24 sm:mt-0 font-sans z-10 relative">
        {/* On appelle ici notre gros composant (le formulaire). C'est lui qui gère le cœur du test technique. */}
        <AlertForm />
      </main>
      
      {/* Le petit pied de page (Footer) */}
      <motion.footer 
        initial={{ y: 20, opacity: 0 }} // Il commence légèrement plus bas, transparent.
        animate={{ y: 0, opacity: 1 }} // Remonte et devient opaque.
        transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }} // On met un délai (delay: 0.4) pour qu'il apparaisse un peu après le reste !
        className="absolute bottom-6 text-gray-600 text-sm"
      >
        © {new Date().getFullYear()} SnapSignal - Service de messagerie d'alerte en temps réel.
      </motion.footer>
    </div>
  );
}

export default App; // On exporte le composant pour que Vite puisse l'intégrer au site.
