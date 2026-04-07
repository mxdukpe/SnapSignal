# 🚨 SnapSignal (AlertBot)

Un système de signalement d'incidents qui connecte une interface web moderne directement à un canal Telegram en temps réel.
Ce projet a été réalisé en tant qu'exercice de démonstration pour un recrutement technique, avec pour mots d'ordre : **design qualitatif (UI/UX), rapidité d'exécution et intégration pertinente de l'API Telegram**.

## 🌟 Fonctionnalités

- **Formulaire interactif** : Nom, type d'incident (liste déroulante), niveau de priorité avec code couleur ciblé, et un champ de description détaillé.
- **Feedback UI en temps réel** : Bouton de soumission dynamique (Loader d'attente, validation visuelle de succès).
- **Design Premium** : Interface basée sur un mode sombre (*Dark Mode*) avec effet "Glassmorphism" (transparence et reflets) et des micro-animations.
- **Intégration API Telegram** : Envoi immédiat des données via une requête HTTP sécurisée, avec un formatage très lisible contenant des emojis.

## 🛠️ Stack Technique

- **Frontend** : [React.js](https://reactjs.org/) (Framework) / [Vite](https://vitejs.dev/) (Bundler très rapide).
- **Style** : [TailwindCSS v4](https://tailwindcss.com/) pour la conception "Utility-first" et la rapidité de création du design.
- **Icônes** : [Lucide React](https://lucide.dev/)
- **Backend / Communication** : API officielle des Bots Telegram.

## 📂 Architecture des fichiers importants

L'application est découpée de manière logique (composants réutilisables) :

- 📄 `src/App.jsx` : C'est le chef d'orchestre de l'interface. Il gère la structure de la page (le fond sombre, l'en-tête, le pied de page) et intègre le composant principal.
- 📄 `src/components/AlertForm.jsx` : Le "cœur" logique. Il contient toute l'apparence du formulaire, surveille ce que tape l'utilisateur, et possède la fonction magique qui "téléphone" à Telegram pour livrer le message.
- 📄 `src/components/PrioritySelector.jsx` : Un petit "lego" détachable. C'est le composant qui affiche les 3 jolis boutons de priorité (Faible, Moyen, Critique) avec leurs changements de couleurs.
- 📄 `.env.local` : Le "coffre-fort" local (qui n'est jamais publié ici par sécurité) contenant les mots de passe de notre Bot Telegram et la destination du message.
- 📄 `src/index.css` & `vite.config.js` : Les fichiers de configuration qui activent le super-pouvoir visuel de TailwindCSS.

## 🚀 Comment lancer le projet localement ?

### 1. Cloner le repository
\`\`\`bash
git clone https://github.com/mxdukpe/SnapSignal.git
cd SnapSignal
\`\`\`

### 2. Installer les dépendances
\`\`\`bash
npm install
\`\`\`

### 3. Configurer les clés secrètes
Créez un fichier textuel nommé exactement **`.env.local`** à la racine absolue du projet (au même niveau que `package.json`), et ajoutez-y la configuration suivante :
\`\`\`env
VITE_TELEGRAM_BOT_TOKEN=Votre_Token_Donné_Par_BotFather
VITE_TELEGRAM_CHAT_ID=Votre_ID_De_Groupe_Ou_Canal_Telegram
\`\`\`

### 4. Démarrer le serveur de développement
\`\`\`bash
npm run dev
\`\`\`
Puis, ouvrez le lien généré dans votre terminal (en général `http://localhost:5173`).

## 🤖 Utilisation de l'Intelligence Artificielle

Ce projet assume l'utilisation de l'IA (LLMs professionnels) en tant qu'assistant de "Pair-Programming". 
L'IA a été consciemment utilisée pour :
- Bootstraper (démarrer) l'architecture la plus moderne du moment (Vite + Tailwind v4).
- Générer un design avancé très rapidement, en appliquant les bonnes pratiques d'UI/UX que j'ai spécifiées.
- Garantir de l'absence de bugs lors de la rédaction de la syntaxe de la requête API (`fetch` Telegram).
Ce processus s'inscrit dans une optique de productivité moderne : déléguer les lignes de code répétitives ou les configurations triviales, pour se concentrer sur l'architecture globale, la sécurité des données (conservation des clés dans un fichier env masqué) et l'expérience utilisateur final.

## ✍️ Contributeurs
- **Anaïs ASSE AKAKPO** - *Développement & Architecture*
