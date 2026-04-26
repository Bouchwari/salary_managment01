# محاسبي / Mes Comptes — Documentation complète

> Application mobile de finance personnelle — bilingue Arabe / Français  
> Packagée en APK Android via Capacitor · Construite automatiquement par GitHub Actions

---

## Table des matières

1. [Vue d'ensemble](#1-vue-densemble)
2. [Stack technique](#2-stack-technique)
3. [Structure des fichiers](#3-structure-des-fichiers)
4. [Architecture (DDD)](#4-architecture-ddd)
5. [Modèles de données](#5-modèles-de-données)
6. [Clés de stockage](#6-clés-de-stockage)
7. [Catégories](#7-catégories)
8. [Catégories personnalisées](#8-catégories-personnalisées)
9. [Logique financière](#9-logique-financière)
10. [Fonctionnalités](#10-fonctionnalités)
11. [Thèmes et couleurs](#11-thèmes-et-couleurs)
12. [Construire l'APK](#12-construire-lapk)
13. [GitHub Actions (CI/CD)](#13-github-actions-cicd)
14. [Modifier l'application](#14-modifier-lapplication)
15. [Problèmes connus](#15-problèmes-connus)

---

## 1. Vue d'ensemble

**محاسبي / Mes Comptes** est une application de suivi des dépenses personnelles conçue pour un usage marocain :

| Détail | Valeur |
|--------|--------|
| Langues | Arabe (RTL, défaut) + Français |
| Devise | MAD (Dirham marocain) |
| Plateforme | Android APK |
| Stockage | `localStorage` (hors-ligne, aucun serveur) |
| Esthétique | Inspiration marocaine : crème/parchemin, émeraude, terre de sienne, or, zellige |

---

## 2. Stack technique

| Couche | Technologie |
|--------|-------------|
| Interface | React 18 (JSX) |
| Bundler | Vite 5 |
| CSS | Tailwind CSS (CDN dans `index.html`) + styles inline |
| Graphiques | Recharts (PieChart, BarChart) |
| Icônes | lucide-react 0.383.0 |
| Stockage web | `window.storage` (polyfill → `localStorage` dans `main.jsx`) |
| Wrapper mobile | Capacitor 6 |
| CI/CD | GitHub Actions → APK debug |
| Polices | Google Fonts : Fraunces, Plus Jakarta Sans, Tajawal |

---

## 3. Structure des fichiers

```
mes-comptes/
├── src/
│   ├── App.jsx          ← Application entière (~1980 lignes, architecture DDD)
│   └── main.jsx         ← Point d'entrée + polyfill localStorage
├── android/             ← Projet Capacitor Android (ne pas modifier manuellement)
├── public/
│   ├── icon.svg         ← Icône de l'application
│   ├── manifest.json    ← Manifeste PWA
│   └── sw.js            ← Service Worker (support hors-ligne)
├── .github/
│   └── workflows/
│       └── build-apk.yml← Pipeline CI/CD GitHub Actions
├── index.html           ← HTML principal (Tailwind CDN ici)
├── vite.config.js       ← Config Vite (base: './' pour Capacitor)
├── capacitor.config.json← Config Capacitor
├── package.json
├── .gitignore
└── DOCS.md              ← Ce fichier
```

---

## 4. Architecture (DDD)

Le code est organisé en 4 couches dans un seul fichier `src/App.jsx` :

### Couche 1 — Domaine (logique pure)
Fonctions pures sans effets de bord :

```
Entry       — Écritures comptables (dépense / revenu)
Recurring   — Charges mensuelles fixes
Budget      — Limites de dépenses par catégorie
FinancialProfile — Calculs : salaire → disponible → restant → taux d'épargne
Goal        — Objectifs d'épargne (dépôt / retrait)
```

### Couche 2 — Infrastructure
```
Storage     — Adaptateur async : window.storage.get/set → JSON
              Polyfillé vers localStorage dans main.jsx pour l'APK
```

### Couche 3 — Application
Le composant `App` orchestre le domaine et l'infrastructure :
- État global (useState)
- Chargement / persistance (useEffect)
- Cas d'utilisation (commandes : addOrUpdateEntry, applyRecurring, upsertGoal…)

### Couche 4 — Interface
Composants purement présentationnels recevant données + callbacks en props.  
Aucune logique métier dans l'interface.

---

## 5. Modèles de données

### Entry (écriture comptable)
```js
{
  id:         string,           // uid('e')
  type:       'expense'|'income',
  amount:     number,           // MAD
  category:   string,           // id de catégorie
  date:       string,           // 'YYYY-MM-DD'
  note:       string,           // optionnel
  recurringId:string,           // optionnel — lié à une charge récurrente
}
```

### Recurring (charge mensuelle fixe)
```js
{
  id:            string,        // uid('r')
  category:      string,
  amount:        number,
  note:          string,
  dayOfMonth:    number,        // 1–28 : jour du mois
  appliedMonths: string[],      // ['2025-01', '2025-02'…]
}
```
> Les charges récurrentes servent à **deux fins** :
> 1. Leur total est déduit automatiquement du salaire (disponible)
> 2. Elles apparaissent comme "en attente" sur l'accueil quand leur jour arrive

### Goal (objectif d'épargne)
```js
{
  id:         string,           // uid('g')
  name:       string,
  iconId:     'umrah'|'travel'|'emergency'|'car'|'home'|'edu'|'other',
  target:     number,           // montant cible
  saved:      number,           // montant actuel
  targetDate: string|null,      // 'YYYY-MM-DD' optionnel
}
```

### Budget
```js
{ [categoryId]: number }        // limite mensuelle par catégorie
```

### CustomCat (catégorie personnalisée)
```js
{
  id:       string,             // uid('cc')
  type:     'expense'|'income',
  label:    string,             // nom affiché (même en AR et FR)
  iconName: string,             // clé dans ICON_MAP
  color:    string,             // code hexadécimal
  rule:     'needs'|'wants',    // pour la règle 50/30/20 (dépenses uniquement)
}
```

---

## 6. Clés de stockage

| Clé | Contenu | Défaut |
|-----|---------|--------|
| `mca:entries` | Entry[] | `[]` |
| `mca:budgets` | Budget | `{}` |
| `mca:lang` | `'ar'`\|`'fr'` | `'ar'` |
| `mca:goals` | Goal[] | `[]` |
| `mca:templates` | Template[] | `[]` |
| `mca:recurring` | Recurring[] | `[]` |
| `mca:theme` | `'light'`\|`'dark'` | `'light'` |
| `mca:salary` | number | `0` |
| `mca:payday` | number (jour du mois) | `0` |
| `mca:custom_cats` | CustomCat[] | `[]` |

---

## 7. Catégories

### Dépenses (intégrées)
| ID | Arabe | Français | Règle 50/30/20 |
|----|-------|----------|----------------|
| food | طعام | Alimentation | needs |
| transport | تنقل | Transport | needs |
| bills | فواتير | Factures | needs |
| health | صحة | Santé | needs |
| leisure | ترفيه | Loisirs | wants |
| education | تعليم | Éducation | needs |
| shopping | تسوق | Shopping | wants |
| other | أخرى | Autres | wants |

### Revenus (intégrés)
| ID | Arabe | Français |
|----|-------|----------|
| salary | راتب | Salaire |
| freelance | عمل حر | Indépendant |
| gift_inc | هدية | Cadeau |
| other_inc | دخل آخر | Autre revenu |

---

## 8. Catégories personnalisées

L'utilisateur peut créer ses propres catégories depuis l'écran **Ajouter**.

### Comment créer une catégorie
1. Ouvrir l'écran **Ajouter** (bouton + en bas)
2. Choisir le type : Dépense ou Revenu
3. Dans la grille de catégories, appuyer sur la tuile **Créer / جديدة** (en pointillés)
4. Remplir le formulaire :
   - **Nom** — texte libre
   - **Icône** — grille de 24 icônes
   - **Couleur** — palette de 14 couleurs
   - **Type** (dépense uniquement) — Besoins / Envies (pour la règle 50/30/20)
5. Appuyer sur **Créer la catégorie**

### Où apparaissent les catégories personnalisées
| Écran | Effet |
|-------|-------|
| Formulaire Ajouter | Visible dans la grille, sélectionnable |
| Journal | Dans les filtres de catégories |
| Stats → Camembert | Secteur propre avec la couleur choisie |
| Stats → 50/30/20 | Classé correctement selon Besoins/Envies |
| Budget | Peut recevoir une limite mensuelle |
| Accueil → récents | Icône et nom affichés correctement |

### Fonctionnement interne
Les catégories sont enregistrées dans `mca:custom_cats`. Un registre de module (`_customCats`) est mis à jour de façon synchrone avant chaque rendu React. Les fonctions `getCat()`, `expenseCats()`, `incomeCats()` consultent ce registre en premier, puis reviennent aux catégories intégrées — **aucune modification des composants enfants n'est nécessaire**.

---

## 9. Logique financière

```
Salaire effectif  = salary > 0 ? salary : somme(revenus du mois)
Total récurrent   = somme(toutes les charges récurrentes)
Disponible        = Salaire effectif − Total récurrent
Restant           = Disponible − Dépenses variables du mois
Taux d'épargne    = Restant / Salaire effectif × 100
Budget journalier = Restant / Jours restants dans le mois

Règle 50/30/20 :
  Besoins   = Total récurrent + entrées tagguées 'needs'
  Envies    = entrées tagguées 'wants'
  Épargne   = Salaire effectif − Total récurrent − Toutes dépenses variables
  Cibles    = salaire × [0.5, 0.3, 0.2]

Projection fin de mois :
  = (totalDépenses / joursÉcoulés) × joursInMonth
```

---

## 10. Fonctionnalités

### Accueil (Dashboard)
- Carte principale : Salaire − Récurrent − Variable = **Restant** + barre de progression
- Navigateur de mois (← →)
- Compte à rebours jusqu'au jour de salaire
- Liste des charges récurrentes en attente + boutons "Ajouter" / "Tout ajouter"
- Aperçu des objectifs d'épargne (3 premiers)
- Alertes de budget (catégories ≥ 80 %)
- Opérations récentes (5 dernières)
- Conseil financier du jour

### Ajouter une opération
- Bascule Dépense / Revenu
- Ajout rapide depuis les modèles sauvegardés
- Montant, grille de catégories (4 colonnes), date, note
- Case "Sauvegarder comme modèle"
- Case "Rendre récurrent" (choisir le jour du mois)
- **Créer une catégorie personnalisée** (tuile "+" dans la grille)

### Journal
- Filtres : type (Tout / Dépenses / Revenus) + catégorie
- Groupé par date avec solde journalier
- Modifier en appuyant sur une ligne
- Supprimer (bouton toujours visible, 40×40 px — compatible tactile)

### Statistiques
- Résumé Revenus / Dépenses
- **Règle 50/30/20** avec barres réelles vs cibles
- **Taux d'épargne** (vert ≥ 20 %, or 10–20 %, rouge < 10 %)
- **Projection fin de mois**
- Graphique camembert par catégorie
- Graphique barres journalier
- Comparaison 6 mois revenus vs dépenses

### Budget
- Limite mensuelle par catégorie
- Barre de budget globale
- Alertes à 80 % et 100 %

### Paramètres
- Salaire mensuel (calcul du disponible en temps réel)
- Résumé des charges récurrentes
- Jour de salaire (compte à rebours)
- Thème clair / sombre
- Langue arabe / français
- Gérer : Objectifs d'épargne, Modèles rapides, Charges récurrentes
- Données : Exporter CSV, Exporter JSON, Importer JSON, Effacer tout

### Objectifs d'épargne
- Types : Omra 🌙, Voyage ✈️, Urgence 🛡️, Voiture 🚗, Maison 🏢, Études 🎓, Autre 🎯
- Dépôt / Retrait avec confirmation
- Barre de progression
- Date cible optionnelle

### Modèles rapides
- Sauvegardés depuis n'importe quelle opération
- Remplissage en un tap

### Charges récurrentes
- Nom, montant, catégorie, jour du mois
- Déduites automatiquement du salaire
- Apparaissent comme "en attente" sur l'accueil à leur date d'échéance

---

## 11. Thèmes et couleurs

### Thème clair
| Token | Valeur | Usage |
|-------|--------|-------|
| `BG` | `#F7F2E7` | Fond principal (parchemin) |
| `BG_DEEP` | `#EFE7D4` | Fond secondaire |
| `SURFACE` | `#FFFDF8` | Cartes |
| `INK` | `#1A1A1A` | Texte principal |
| `MUTED` | `#6B6457` | Texte secondaire |
| `BORDER` | `#E2D8BE` | Bordures |
| `EMERALD` | `#0E4D3A` | Couleur principale (revenus, boutons) |
| `TERRA` | `#C1440E` | Alertes, dépenses |
| `GOLD` | `#B8893D` | Accents, objectifs |

### Thème sombre
| Token | Valeur |
|-------|--------|
| `BG` | `#0D1A1A` |
| `BG_DEEP` | `#152424` |
| `SURFACE` | `#152424` |
| `INK` | `#F7F2E7` |
| `EMERALD` | `#2E8B6E` |
| `TERRA` | `#E8734A` |
| `GOLD` | `#D4A84E` |

### Bande zellige (en-tête)
```
repeating-linear-gradient(90deg,
  EMERALD 0 14px, GOLD 14px 18px, TERRA 18px 22px,
  GOLD 22px 26px, EMERALD 26px 40px)
```
La bande couvre automatiquement la zone de la barre de statut Android via `env(safe-area-inset-top)`.

---

## 12. Construire l'APK

### Option A — GitHub Actions (recommandé, aucun logiciel requis)

1. Créer un dépôt GitHub (gratuit)
2. Pousser le code :
   ```bash
   git init
   git add .
   git commit -m "initial"
   git remote add origin https://github.com/VOTRE_NOM/mes-comptes.git
   git push -u origin main
   ```
3. Aller dans l'onglet **Actions** de votre dépôt GitHub
4. Attendre ~5 minutes que le build se termine (icône verte ✓)
5. Cliquer sur le build → section **Artifacts** → télécharger **mes-comptes-apk**
6. Dézipper → `app-debug.apk`
7. Transférer sur le téléphone (USB ou WhatsApp) et installer

> ⚠️ Le téléphone demande d'activer "Installer depuis des sources inconnues" — c'est normal pour un APK de développement.

### Option B — Build local (nécessite Node.js + Java 17 + Android SDK)

```bash
# 1. Installer les dépendances
npm install

# 2. Construire les assets web
npm run build

# 3. Synchroniser avec Android
npx cap sync android

# 4. Construire l'APK
cd android
./gradlew assembleDebug --no-daemon

# 5. L'APK se trouve ici :
# android/app/build/outputs/apk/debug/app-debug.apk
```

---

## 13. GitHub Actions (CI/CD)

Le fichier `.github/workflows/build-apk.yml` déclenche automatiquement un build à chaque push.

### Ordre des étapes (important)
```
checkout → Node.js + npm install → npm run build (dist/)
→ Java 17 → Android SDK → npx cap sync android
→ chmod gradlew → ./gradlew assembleDebug → upload artifact
```

> **Pourquoi `npm run build` avant Gradle ?**  
> Capacitor copie le dossier `dist/` dans l'application Android lors du sync.  
> Sans `dist/`, l'APK est vide — l'app s'ouvre sur un écran blanc.

### Télécharger l'APK généré
```
GitHub → votre dépôt → onglet Actions
→ cliquer sur le dernier build réussi (✓)
→ section Artifacts en bas → mes-comptes-apk
```
L'artifact est conservé **30 jours**.

---

## 14. Modifier l'application

### Ajouter une fonctionnalité
1. Ajouter les traductions dans `T.ar` et `T.fr` (parité bilingue obligatoire)
2. Si nouvelles données → définir le modèle dans la Couche 1 (Domaine)
3. Ajouter la clé de stockage dans `STORAGE_KEYS`, charger/persister dans `App`
4. Créer le cas d'utilisation (commande) dans `App`
5. Passer données + callback en props au composant UI
6. Construire le composant UI dans la Couche 4

### Modifier une traduction
Dans `src/App.jsx`, chercher `export const T = {` :
```js
T.ar.maClé = 'النص بالعربية'
T.fr.maClé = 'Le texte en français'
```

### Ajouter une catégorie intégrée
Dans `CATEGORIES` (chercher `export const CATEGORIES`), ajouter :
```js
{
  id:'mon_id', type:'expense',
  ar:'اسم بالعربية', fr:'Nom en français',
  icon:MonIcone, color:'#hexcode', rule:'needs'|'wants'
}
```

### Changer les couleurs du thème
Chercher `const THEMES = {` et modifier les valeurs hexadécimales.

### Ajouter une sous-vue (écran plein)
Les sous-vues (Objectifs, Modèles, Récurrents) suivent ce pattern :
```js
// Dans App, avant le return principal :
if (subView === 'ma_vue')
  return <Shell ...><MaVue ... onBack={() => setSubView(null)} /></Shell>;
```
> ⚠️ Les sous-vues doivent inclure **leurs propres modales** (confirmation, etc.)
> car le `<Confirm>` du `return` principal n'est pas monté dans ce chemin.

---

## 15. Problèmes connus

| Problème | Cause | Contournement |
|----------|-------|---------------|
| APK signé pour Google Play | Build actuel = debug uniquement | Configurer keystore + signing dans Gradle |
| Icône de l'app | SVG placeholder | Générer des PNG : 72/96/128/144/152/192/384/512 px |
| Écran de démarrage | Non configuré | Ajouter `@capacitor/splash-screen` |
| Export CSV / Import JSON | `URL.createObjectURL` ne fonctionne pas dans Capacitor WebView | Ajouter `@capacitor/filesystem` |
| Polices hors-ligne | Google Fonts nécessite internet au premier lancement | Intégrer les polices localement |
| Validation des champs | Salaire / jour de salaire acceptent les nombres négatifs | Ajouter `min="0"` et validation onBlur |
| Suppression de catégories personnalisées | Non implémentée | À ajouter dans une future version |

---

## Identifiants Capacitor

```json
{
  "appId": "ma.mescomptes.app",
  "appName": "محاسبي",
  "webDir": "dist",
  "server": { "androidScheme": "https" },
  "android": { "backgroundColor": "#F7F2E7" }
}
```

---

*صُنع بالمغرب · Fait au Maroc 🇲🇦*
