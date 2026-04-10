import React from 'react'; // Obligatoire pour créer un composant React
// On importe les icônes nécessaires depuis Lucide-React
import { AlertCircle, AlertTriangle, Info } from 'lucide-react';

// Voici un tableau (Array) de configuration. 
// Plutôt que de coder les 3 boutons manuellement, je crée une liste des "recettes" des 3 priorités pour les générer automatiquement en boucle plus bas.
// Ça permet de changer très facilement les couleurs (c'est très professionnel).
const priorities = [
  { 
    id: 'Faible', // Le vrai nom de la priorité
    label: 'Faible', // Le texte affiché
    icon: Info, // Le composant Icône récupéré de Lucide
    color: 'text-emerald-400', // Couleur du texte 
    bg: 'bg-emerald-400/10', // Couleur de fond (10 = 10% d'opacité)
    border: 'border-emerald-500/30', // Bordure légère
    activeBg: 'bg-emerald-500/20', // Fond plus fort quand c'est sélectionné
    activeBorder: 'border-emerald-400' // Bordure forte quand sélectionné
  },
  { 
    id: 'Moyen', 
    label: 'Moyen', 
    icon: AlertTriangle,
    color: 'text-amber-400',
    bg: 'bg-amber-400/10',
    border: 'border-amber-500/30',
    activeBg: 'bg-amber-500/20',
    activeBorder: 'border-amber-400'
  },
  { 
    id: 'Critique', 
    label: 'Critique', 
    icon: AlertCircle,
    color: 'text-rose-400',
    bg: 'bg-rose-400/10',
    border: 'border-rose-500/30',
    activeBg: 'bg-rose-500/20',
    activeBorder: 'border-rose-400'
  }
];

// Voici notre composant. Note qu'il reçoit deux "props" (paramètres) de son parent (AlertForm):
// `selected` : Laquelle est cochée en ce moment ? (ex: "Moyen")
// `onChange` : La fonction talkie-walkie pour prévenir le parent que ça a changé.
export default function PrioritySelector({ selected, onChange }) {
  return (
    <div className="space-y-2">
      {/* Petit texte au-dessus des boutons */}
      <label className="text-sm font-medium text-gray-300">Niveau de priorité</label>
      
      {/* Une grille CSS (grid). En "md" (ordinateur), il y aura 3 colonnes. Par défaut (mobile), 1 colonne. */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        
        {/* On demande à React de faire "une boucle" (map) sur notre tableau "priorities" pour afficher 3 boutons */}
        {priorities.map((priority) => {
          // On isole le composant d'icône (Info, Triangle ou Cercle)
          const Icon = priority.icon;
          // Une variable "Vrai ou Faux" : est-ce que CE bouton est celui qui est sélectionné ?
          const isActive = selected === priority.id;
          
          return (
            // On créé un vrai bouton cliquable
            <button
              key={priority.id} // React a besoin d'une "clé" unique pour chaque élément d'une boucle (exigence de performance).
              type="button" // Type "button" et pas "submit", sinon ça enverrait le formulaire immédiatement par erreur !
              onClick={() => onChange(priority.id)} // Quand on clique, on appelle le Parent en lui criant "Hey, l'utilisateur a cliqué sur 'Faible' !"
              // Ici on fait marcher notre style "conditionnel".
              // Si "isActive" est VRAI, on applique les grosses couleurs colorées.
              // Si "isActive" est FAUX, on applique les couleurs grises et tristes par défaut.
              className={`flex items-center justify-center gap-2 p-3 rounded-xl border transition-all duration-200 
                ${isActive 
                  ? `${priority.activeBg} ${priority.activeBorder} ${priority.color} shadow-[0_0_15px_rgba(0,0,0,0.1)] shadow-${priority.color.split('-')[1]}/20` 
                  : `${priority.bg} ${priority.border} text-gray-400 hover:text-gray-200 hover:border-gray-500`
                }`}
            >
              <Icon size={18} className={isActive ? priority.color : 'text-gray-400'} />
              <span className="font-medium">{priority.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
