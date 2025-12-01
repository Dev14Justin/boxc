BoxExcel — Plan de développement complet

Ce document décrit en détail le projet BoxExcel : une plateforme de vente de modèles Excel prêts à l’emploi. Il est rédigé pour aider un agent IA de développement (ou à une équipe) afin qu’il comprenne exactement quoi, pourquoi et comment développer la plateforme.

1. Contexte & vision

Contexte
BoxExcel est une marketplace/plateforme SaaS qui permet à des professionnels, PME, indépendants et particuliers d’acheter des modèles Excel automatisés (budgets, planning annuel, tableaux de bord, gestion de stock, facturation, etc.). Le modèle est digitale : un même fichier peut être vendu plusieurs fois. Le marché initial principal est le Togo / Afrique francophone.

Vision
Fournir des templates Excel premium, ergonomiques et fiables, vendus via une plateforme moderne, sécurisée et facile d’utilisation. L’UX doit permettre à l’utilisateur de comprendre, tester, acheter et télécharger rapidement. Le support & la mise à jour des fichiers sont prévus.

Objectifs principaux

Catalogue de templates (page produit)

Système d’achat et téléchargement (paiement Mobile Money + cartes)

Authentification et gestion des accès (Utilisateur / Admin / SuperAdmin)

Tableau de bord Admin pour CRUD produits & suivi ventes

Personnel : interface claire, thème clair/sombre, palette validée

2. Public cible & personas

Entrepreneur : veut un budget/trésorerie prêt à l’emploi.

PME / Responsable admin : cherche planning RH, gestion de stock.

Freelance / Consultant : veut un template facturation / CRM.

Étudiant / Particulier : souhaite un planificateur annuel, budget familial.

3. Fonctionnalités (haute-niveau)
Utilisateur (Front)

Inscription / Connexion (email/password + social optional)

Parcours catalogue : filtres par catégorie, recherche, tri

Page produit : description, captures, démo (aperçu), prix, pack

Paiement : Mobile Money (Togo), carte (Visa/Mastercard), historique d’achat

Téléchargement du fichier après paiement

Espace client : fichiers achetés, support, factures

Avis & notes 

Admin

Authentification Admin

CRUD templates (titre, description, images, prix, catégorie, tags, slug) — pour ce début, fichiers Excel seront ajoutés manuellement depuis le code source / repository

Gestion des commandes & remboursements

Statistiques avec tableaux de bord (ventes, utilisateurs, revenu, etc.....)

SuperAdmin

Gestion utilisateurs (CRUD + rôles)

Gestion Admins (création / autorisation)

Accès à toutes les statistiques et logs

Paramètres de la plateforme (méthodes de paiement, tarifs, promos)

Sécurité & Auth

Rôles : user, admin, superadmin

Auth via Firebase Auth (email/password ou Google). Token-based sessions (JWT via Firebase).

Règles Firestore strictes basées sur rôle.

4. Stack technique (privilégié / requis)

Frontend / Backend (fullstack) : Next.js (React intégré) — rendu SSR/SSG pour le catalogue, API routes pour certaines actions.

Base de données & Auth & hébergement d’assets : Firebase (Firestore, Firebase Auth).

NB : fichiers les Excel pour MVP ne seront pas stockés dans Firebase — ils seront intégrés manuellement dans le repo (folder /public/templates/ ou /assets/templates/) et servis via Next.js static routes.

Paiement : Intégrer Mobile Money (fournisseur local : Flooz/TMoney via API ou passerelle tierce (Monéroo)) + cartes (Visa/Mastercard).

Hébergement : Vercel (Next.js) ou autre.

CI / CD : GitHub Actions (lint, tests, build, deploy)

Logs & Monitoring : Sentry (erreurs), Google Analytics / GA4, Firebase Analytics

Styles & composants : Tailwind CSS (ou Tailwind + components), Heroicons / Lucide, Framer Motion pour animations douces.

Lint / Format : ESLint, Prettier, TypeScript recommandé.

Testing : Jest + React Testing Library (unit + integration), Cypress (E2E) si possible.

5. Architecture & flux

Client (navigateur) accède au site Next.js.

Pages publiques (le landing page, la page d'accueil le catalogue, la page produit, la page des produits, la page des Profile Data Analyse qui ajouter les Templates Excel, Le profil public des Data Analyse qui ajouter les Templates Excel, la page de contact, la page de mentions légales, la page de politique de confidentialité, la page de politique de retour, la page de politique de cookies, etc...... ) servies SSR/SSG.

Actions authentifiées utilisent Firebase Auth + API routes (Next.js) pour vérifier tokens.

Paiements déclenchent webhooks (Flooz/TMoney) → API route Next.js reçoit webhook → enregistre la commande dans Firestore → déclenche e-mail + autorisation téléchargement.

Fichiers Excel sont servis depuis un url externe https://boxexcel-files.vercel.app et telechargable automatiquement au clic du bouton telecharger. (Danc les fichier ne seront pas stocké dans ce projet)

Admin & SuperAdmin utilisent interfaces protégées par rôle (vérifiées côté client & serveur).

6. Schéma de la base de données (Firestore — collections principales)

Utiliser Firestore en mode documents/collections.

Collections et exemples

users (document userId)

{
  "email": "user@exemple.tg",
  "displayName": "Nom Prénom",
  "role": "user", // "user" | "admin" | "superadmin"
  "createdAt": 1690000000,
  "lastLogin": 1690000000
}


templates (document templateId)

{
  "title": "Plan budgétaire annuel",
  "slug": "plan-budget-annuel",
  "description": "Template Excel de budget...",
  "description long": "Template Excel de budget et planification annuelle .......",
  "price": 2500, // en FCFA
  "currency": "XOF",
  "category": "Finance",
  "images": ["https://example.com/image1.jpg", "https://example.com/image2.jpg (Les image seron ajouter depuit un url externe)"],
  "filePath": "https://boxexcel-files.vercel.app/plan_budget_annuel.xlsx", (Le fichier Excel seron ajouter et telechargable automatiquement depuis un url externe)",
  "DemoFile": "https://youtube.com/plan_budget_annuel", (Le video Demo du produit sera ajouter depuis Youtube)",
  "pre-requis": ["Excel- 2022", "Données"],
  "tags": ["budget", "finance"],
  "createdAt": 1690000000,
  "updatedAt": 1690000000,
  "isPublished": true
}


orders (document orderId)

{
  "userId": "uid123",
  "templateId": "tpl123",
  "amount": 2500,
  "currency": "XOF",
  "status": "paid", // "pending", "paid", "failed", "refunded"
  "paymentProvider": "momo" | "stripe",
  "createdAt": 1690000000,
  "downloaded": false
}

admins (document adminId) — optionnel si stocker dans users avec role

{
  "email": "user@exemple.tg",
  "displayName": "Nom Prénom",
  "role": "admin", // "admin" | "superadmin"
  "titre": "Data Analyste",
  "bio": "Bio",
  "images": ["https://example.com/image1.jpg", "https://example.com/image2.jpg (Les image seron ajouter depuit un url externe)"],
  "linkding": "https://linkedin.com/in/user",
  "facebook": "https://facebook.com/user",
  "twitter": "https://twitter.com/user",
  "tiktok": "https://tiktok.com/user",
  "contact": "user@example.com",
  "tel": "123456789",
  "createdAt": 1690000000,
  "lastLogin": 1690000000
}

audit_logs (event docs) — conserve actions importantes

7. Sécurité & règles Firebase (exemples)

Rules Firestore (simplifié)

users : lecture pour l’utilisateur propriétaire / admins, écriture pour owner/admin.

templates : lecture publique si isPublished==true, écriture réservée aux admins.

orders : création par functions/API, lecture par owner/admin/superadmin.

Ajouter des validations pour éviter des modifications non-autorisées.

8. Structure du projet (arborescence recommandée)
boxexcel/
├─ public/
│  ├─ images/templates/
├─ src/
│  ├─ pages/                    # Next.js pages (index, /product/[slug], /admin, /auth)
│  ├─ pages/api/                 # routes API (webhooks, commandes, admin actions)
│  ├─ components/                # composants UI réutilisables (Button, Card, Modal)
│  ├─ ui/                        # design system (tailwind config, tokens)
│  ├─ lib/
│  │  ├─ firebase.ts             # init firebase
│  │  ├─ payments/               # intégrations payment providers
│  ├─ hooks/
│  ├─ styles/
│  ├─ utils/
├─ tests/
├─ .env.local.example
├─ next.config.js
├─ tailwind.config.js
├─ package.json

9. Pages & routes détaillées
Public

/ — home / hero / catégories

/catalogue — listing avec filtres

/product/[slug] — description, images, aperçu, CTA acheter

/auth/login, /auth/register, /auth/forgot

/pricing — packs & offres

/terms, /privacy

Utilisateur (auth)

/account — profil & historique achats

/download/[orderId] — lien sécurisé de téléchargement (vérifier ownership & status paid)

Admin

/admin — dashboard (stats)

/admin/templates — listing + create/edit (metadata only; fichiers ajoutés manuellement)

/admin/orders — suivi commandes

/admin/users — voir utilisateurs

SuperAdmin

/superadmin — surveillance, gestion admins, paramètres globaux

API routes (Next.js)

/api/webhook/flooz — webhook flooz

/api/webhook/tmoney — webhook tmoney

/api/orders/create — création commande (backed by payment init)

/api/auth/verify — token verification for SSR

10. Authentification & gestion des rôles

Utiliser Firebase Auth (email/password).

Après login, récupérer JWT / session et stocker user role en Firestore.

Middleware Next.js pour protéger routes (app router middleware ou getServerSideProps vérification token).

UI & API doivent vérifier rôle côté serveur (ne pas se fier uniquement au client).

11. Gestion des templates (MVP : fichiers manuels)

Fichiers Excel seront stocké sur un projet externe et accessible via un URL public (ex : https://boxexcel-files.vercel.app).

Lors d’un achat, la plateforme crée un ordre orders et, si paid, génère une URL de téléchargement sécurisée (temporaire) ou affiche le lien direct si sécurité suffisante.


12. Paiement & flux d’achat
Flux d’achat (simplifié)

Utilisateur clique sur acheter → App initie POST /api/orders/create (création ordre pending).

Backend renvoie instructions paiement (checkout url tmoney ou init flooz).

Utilisateur paye ; fournisseur envoie webhook à /api/webhook/....

Webhook vérifie payment → met orders.status = "paid".

Système envoie e-mail + active lien de téléchargement.

Providers recommandés

Mobile Money (Togo) : intégrer fournisseur local ou API opérateur si disponible (tmoney, flooz).

Visa/Mastercard : pour cartes internationales/locales.

Sécurité & Fraude

Mettre en place vérification des webhooks (signatures).

Logs des paiements.

Politique de remboursement.

13. UI / UX / Branding & contraintes

Nom : BoxExcel

Palette (définie)

Vert principal : #34D399 (dominante)

Bleu secondaire : #1A73E8

Jaune accent : #FACC15

Gris clair : #E2E8F0

Noir profond (dark bg) : #0F172A

Blanc : #FFFFFF

Thèmes : Light & Dark (utiliser Tailwind theme + CSS variables).

Typographie

Titres : Inter (ou Sora si premium)

Corps : Poppins ou Inter

Respecter taille responsive et contraste AA/AAA.

Guidelines visuelles (strictes)

Ne PAS utiliser de dégradés (gradients) dans le design.

Ne PAS utiliser d’emojis dans l’interface.

Privilégier les icônes importées (Heroicons / Lucide).

Animations : douces et subtiles (Framer Motion), pas de mouvements violents.

Composants : boutons arrondis 8px, ombres légères, spacing généreux.

14. Accessibilité & performance

Respect WCAG AA: contrastes, labels ARIA, focus visible, navigation clavier.

Optimisation images (next/image), lazy-loading, bundle splitting, SSG pour pages publiques.

Lighthouse score >= 90 idéal.

15. Tests & QA

Tests unitaires (Jest) pour utilitaires et composants critiques.

Tests d’intégration (React Testing Library) pour flows d’achat et auth.

E2E (Cypress) tests pour parcours critiques (checkout, login, admin CRUD).

Revue manuelle avant release (token flows, webhooks).

16. CI / CD & déploiement

GitHub Actions pipeline :

on: push → lint (ESLint), tests, build Next.js

on: merge -> main → deploy to Vercel (ou autre)

Variables d’environnement (exemples dans .env.local.example) :

NEXT_PUBLIC_FIREBASE_API_KEY

FIREBASE_AUTH_DOMAIN

FIREBASE_PROJECT_ID

FIREBASE_STORAGE_BUCKET

FIREBASE_MESSAGING_SENDER_ID

FIREBASE_APP_ID

STRIPE_SECRET_KEY

STRIPE_WEBHOOK_SECRET

MOMO_API_KEY (si applicable)

PAYMENT_CALLBACK_URL

NEXT_PUBLIC_SITE_URL

17. Observabilité & analytics

Intégrer Sentry (erreurs frontend/backend).

Google Analytics / Firebase Analytics pour suivre conversions.

Tableaux de bord Admin pour KPIs (ventes par jour, recettes, top templates).

19. Checklist de livraison (pour agent IA / dev team)

 Repo initialisé avec Next.js + TypeScript + Tailwind

 Firebase initialisé (project + Auth + Firestore)

 Routes publiques (home, catalogue, produit, etc, .......) prêtes

 Auth email/password (Firebase) intégrée

 Paiement flooz + tmoney + visa/mastercard (au moins un) intégré + webhooks testés

 Orders & users CRUD en Firestore + règles sécurité

 Admin dashboard (templates metadata CRUD)

 SuperAdmin pages & permissions

 Tests unitaires et pipeline CI configuré

 Déploiement sur Vercel (ou autre) configuré

20. Documentation & onboarding developers

Ne jamain Fournir README dev contenant, apres l'execution d'une tache

Processus pour ajouter un template Excel ( admin panel a travers un url public (https://boxexcel-files.vercel.app)) :

ajouter un document dans Firestore templates avec filePath → /url_files/nom.xlsx

uploader images d’aperçu depuit un url public (https://boxexcel-files.vercel.app/images)

publiez via Admin panel (isPublished=true)

22. Livrables attendus

Repo GitHub complet

Environnements : dev (local), staging (preview), production (Vercel)

Guide de mise en production & rollback

Scripts d’import initial des templates (si besoin)

23. Rôles & responsabilités (qui fait quoi)

Agent IA / développeur : implémentation features côté Next.js, intégration Firebase & payment, tests, documentation.

Moi (Product Owner) : décisions produit, contenu templates, pricing, validations, tests UX.

Opérations : support client, gestion remboursements, marketing.


24. Prompt — directive à l’agent IA de développement

Tu es un assistant développeur IA spécialisé en développement Web fullstack. Ton rôle : implémenter et livrer la plateforme BoxExcel suivant le plan de développement détaillé ci-dessus. Travaille étape par étape, propose un plan d’action, exécute les tâches de code.

Ta mission :

Lire et comprendre entièrement ce README.

Proposer une roadmap découpée en tâches (issues) priorisées pour avancer sur le projet.

Exécuter les tâches en suivant les bonnes pratiques (TypeScript, tests, lint).

Produire du code propre, documenté et testable.

Préparer des instructions de déploiement (GitHub Actions + Vercel).

À la fin de chaque grande étape, c'est moi un retour.

Contraintes UI/UX & Branding à respecter strictement :

Couleur dominante : VERT #34D399. Couleur secondaire BLEU #1A73E8, accent JAUNE #FACC15. Ne pas changer ces codes sans validation.

Thèmes clair & sombre : utiliser #E2E8F0 (gris clair) et #0F172A (noir profond).

Ne pas utiliser de dégradés (gradients).

Ne pas utiliser d’emojis dans l’interface, textes officiels, ou composants UI.

Utiliser des icônes vectorielles (Heroicons, Lucide).

Animations : douces, subtiles (Framer Motion). Eviter animations intrusives.

Typographie : Inter ou Poppins.

Respecter l’accessibilité (WCAG AA).

Contraintes fonctionnelles & techniques :

Utiliser Next.js (app or pages router) comme framework principal.

Firebase pour Auth & Firestore. Fournir un fichier firebase.ts pour l’init.

Paiement : implémenter MobileMoney tmoney, flooz, visa/mastercard. Webhooks sécurisés.

fichiers Excel seront stockés sur projet externe et assecible via un lien https://boxexcel-files.vercel.app

Sécurité : vérifier les rôles côté serveur + règles Firestore.

CI/CD : config GitHub Actions (lint, tests, build) + déploiement automatisé.

Fournir tests unitaires et d’intégration pour les flows critiques (auth, paiement, download).

Ce que tu NE DOIS PAS faire :

Ne pas utiliser de gradients ou couleurs non listées.

Ne pas inclure d’emojis ni de contenus informels dans l’UI.

Ne pas stocker les templates dans des buckets publics sans signed URLs

Ne pas exécuter de paiement réel en production sans environnement de test et clés valides.

Livrables attendus à chaque sprint :

Liste des issues PRIO (MVP) → estimations → commits & PRs.

Environnements : dev, staging, production.

Documentation : guide déploiement.

Tests automatisés.

Démo fonctionnelle (staging) avec un template test, achat simulé, et téléchargement.

Si tu as besoin de ressources externes, dis-le explicitement (exemples) :

Accès aux clés API flooz, tmoney, visa/mastercard.

Accès au projet Firebase (console) ou permissions pour créer le projet.

Identifiants Vercel / GitHub pour déploiement si tu dois configurer le CI.

25. Notes finales

Ce README est conçu pour guider un agent IA ou une équipe. Il est exhaustif pour le MVP, mais flexible pour itérations futures.