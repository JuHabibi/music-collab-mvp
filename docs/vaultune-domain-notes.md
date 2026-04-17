# Vaultune — Notes produit & domaine (MVP)

## Vision produit

**Ce que Vaultune résout**
- Aider musiciens et créateurs à trouver des **collaborateurs sérieux** plus vite, avec moins de bruit et moins d’allers-retours.

**Douleurs à éliminer**
- **Profils vagues**: difficile d’évaluer niveau, style, compatibilité.
- **Faibles taux de réponse**: messages génériques, manque de contexte et d’intention.
- **Mauvais fit**: découverte trop large, peu de signaux pertinents.
- **Intentions floues**: discussions qui n’aboutissent pas.
- **Temps gaspillé**: beaucoup de navigation, peu de décisions.

**Promesse MVP**
- **Profils clairs** (structure + exigences minimales)
- **Découverte pertinente** (visibilité conditionnelle + filtres simples)
- **Demandes de collab structurées** (intention + contexte avant le chat)

---

## Entités cœur (MVP)

### User
- **But**: identité + accès.
- **Champs typiques**: `id`, `email`, `authProvider`, `onboardingStatus`, `createdAt`, `lastActiveAt`.
- **Notes**: un `User` n’est pas “publiable” en soi; c’est le `Profile` qui l’est.

### Profile
- **But**: vitrine publiable et base de découverte.
- **Champs typiques**: `userId` (unique), `displayName`, `primaryRole`, `genres`, `lookingFor`, `availability`, `collaborationMode`, `city`, `bio` (optionnel), `influences` (optionnel), `portfolioLinks` (optionnel), `publishStatus`.
- **Visibilité**: contrôlée par des règles (complétude + onboarding + publication).

### CollaborationRequest
- **But**: démarrer une collab avec un cadre clair.
- **Champs typiques**:
  - identifiants: `id`, `requesterUserId`, `targetUserId`/`targetProfileId`
  - contenu: `intentType`, `requestedRole`, `scope`, `constraints` (deadline/rythme/remote), `referenceLinks`, `introMessage`
  - état: `status` (`draft`/`sent`/`accepted`/`declined`/`cancelled`/`expired`), `createdAt`
- **Notes**: c’est l’objet central pour réduire le bruit et améliorer les réponses.

### Conversation
- **But**: canal de discussion (souvent post-acceptation).
- **Champs typiques**: `id`, `participantUserIds` (2), `collaborationRequestId` (optionnel mais recommandé), `status` (`active`/`archived`/`blocked`), `createdAt`.
- **Notes**: dans le MVP, la conversation s’ouvre **uniquement après** acceptation d’une `CollaborationRequest`.

### Message
- **But**: échanges dans une conversation.
- **Champs typiques**: `id`, `conversationId`, `senderUserId`, `body`, `type` (`user`/`system`), `createdAt`, `readAt` (optionnel).
- **Notes**: le MVP privilégie la clarté, pas les features de chat avancées.

---

## Règles métier (MVP)

### Identité & structure
- **1 user = 1 profile**
- `Profile.userId` est **unique**
- Le profil peut être **brouillon** (non publiable) ou **publié** (découvrable)

### Accès & onboarding
- **Non-onboardé = accès limité**
  - découverte limitée (ou lecture partielle)
  - **impossible d’envoyer** une `CollaborationRequest` tant que le profil n’est pas au minimum requis
- Un profil **incomplet** est **caché de Discover**

### Qualité des profils
- Un profil doit contenir des **signaux concrets** (rôle + genres + preuve de travail)
- Certaines catégories de rôles exigent **au moins 1 lien portfolio** (règle conditionnelle)
- La **bio n’est pas requise** au MVP, mais elle améliore fortement la confiance et la qualité

### CollaborationRequest (anti-bruit)
- Une collab **commence par une demande structurée**, pas par un “salut”
- Une demande doit inclure au minimum:
  - `intentType` (type de collab)
  - `scope` (ce qui est attendu / livrable)
  - `requestedRole` (ce que tu demandes à l’autre)
  - au moins 1 `referenceLink` si le contexte n’est pas trivial
- **Pas de chat en premier** (règle produit): on envoie une `CollaborationRequest`, le destinataire accepte/refuse, puis **la Conversation s’ouvre seulement si accepté**

### Découverte
- Discover montre uniquement les profils avec `publishStatus = published`
- La découverte favorise une **pertinence V1** (simple, pas un moteur avancé):
  - compatibilité de rôle (ce que l’un cherche vs ce que l’autre est)
  - overlap de genres
  - compatibilité `lookingFor`
  - compatibilité `city` / `collaborationMode`
  - complétude du profil (plus complet = plus visible)

---

## Règles “Profil publiable”

### Requis pour publier (MVP)
- `displayName`
- `primaryRole`
- au moins 1 `genre`
- `lookingFor`
- `availability`
- `collaborationMode` (remote / local / both)
- `city`
- au moins 1 **signal de preuve**:
  - soit 1 `influence`
  - soit 1 `portfolioLink`

### Optionnel mais recommandé
- `bio` (non requis au MVP; recommandé car améliore confiance et qualité)
- compétences supplémentaires (`extraSkills`)
- liens additionnels (`additionalLinks`)
- préférences détaillées (`detailedPreferences`)

### Conditionnel (léger au MVP)
- Certains rôles (ex: producer / beatmaker) pourront exiger **au moins 1 `portfolioLink`** plus tard, mais ce n’est pas bloquant au MVP

### Définition de “Published”
- `publishStatus = published` seulement si:
  - onboarding terminé
  - tous les requis remplis
  - règles conditionnelles satisfaites

---

## Flows principaux (MVP)

### Visitor
- Découvre la promesse + quelques profils en exemple (lecture limitée)
- CTA: s’inscrire pour voir les détails / filtrer / contacter

### Signed up user (onboarding incomplet)
- Crée/édite son profil en brouillon
- Accès limité à Discover
- Objectif: atteindre le seuil pour publier et débloquer l’envoi de demandes

### Onboarded user (profil publiable)
- Publie son profil → devient visible
- Utilise Discover (filtres simples) pour trouver des profils pertinents
- Peut initier une `CollaborationRequest`

### Envoyer une CollaborationRequest (flow clé)
- Depuis un profil cible → “Proposer une collaboration”
- Form guidé:
  - type de collab (`intentType`)
  - rôle demandé (`requestedRole`)
  - scope / livrable (`scope`)
  - contraintes (deadline/rythme/remote)
  - liens de référence (`referenceLinks`)
  - intro contextualisée (`introMessage`)
- Envoi → `sent`, notification au destinataire
- Destinataire: `accept` ou `decline`
- Si `accept` → ouverture d’une `Conversation` liée à la demande

---

## Hors scope volontaire (MVP)
- Matching avancé / moteur de recommandation sophistiqué
- Upload audio natif (hébergement + droits + player)
- Collaboration live temps réel
- Réputation avancée (notes, reviews, anti-fraude complexe)

---

## Invariants / garde-fous produit
- **Qualité > volume**
- **Pas de profils vagues** (structure + minimum requis)
- **Découverte orientée pertinence**
- **Moins de bruit, moins de temps perdu**
- **Collaboration = intention + contexte avant chat**
- **Anti-spam basique** (limites, statuts, expiration, blocage)

