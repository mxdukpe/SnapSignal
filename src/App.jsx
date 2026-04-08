import React from 'react';
import { motion } from 'framer-motion';
import AlertForm from './components/AlertForm';

function App() {
  return (
    <div className="min-h-screen bg-neutral-950 flex flex-col items-center justify-center p-4 selection:bg-blue-500/30 overflow-hidden">
      
      {/* Navbar minimaliste */}
      <motion.header 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="absolute top-0 w-full p-6 flex justify-between items-center max-w-7xl mx-auto"
      >
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center">
            <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
          </div>
          <span className="text-white font-bold text-xl tracking-tight">SnapSignal</span>
        </div>
        <div className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-sm font-medium text-gray-300 backdrop-blur-md">
          Alerte Système
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="w-full mt-24 sm:mt-0 font-sans z-10 relative">
        <AlertForm />
      </main>
      
      {/* Footer minimal */}
      <motion.footer 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
        className="absolute bottom-6 text-gray-600 text-sm"
      >
        © {new Date().getFullYear()} SnapSignal - Service de messagerie d'alerte en temps réel.
      </motion.footer>
    </div>
  );
}

export default App;
