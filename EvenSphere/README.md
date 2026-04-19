# EventSphere - Documentation Technique

## 1. Viewport Meta Tag
Le projet intègre la balise suivante :
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

### Importance du Viewport
- **Sans Viewport** : Le navigateur mobile simule une largeur d'écran de bureau (souvent 980px) et dézoome pour tout afficher. Le texte devient minuscule et illisible, et l'utilisateur doit zoomer manuellement.
- **Avec Viewport** : La largeur de la page s'adapte à la largeur réelle de l'appareil (`width=device-width`). L'échelle initiale est fixée à 1.0, garantissant que le contenu est lisible et que les points d'arrêt (Media Queries) s'activent correctement dès le chargement.

## 2. Utilisation de CSS Flexbox
Flexbox a été privilégié pour les composants unidimensionnels et l'alignement :
- **Navigation (Header)** : Utilisé dans `.nav-container` et `.nav-links` pour espacer le logo et les liens (`justify-content`, `align-items`).
- **Cartes d'événements** : Utilisé dans `.card` et `.card-content` pour gérer l'étirement vertical et l'alignement des boutons en bas de carte.
- **Filtres** : Utilisé dans `.filters` pour aligner les boutons de filtrage avec `gap` et `flex-wrap`.
- **Boutons** : Utilisé dans `.btn` pour centrer les icônes et le texte.

## 3. Utilisation de CSS Grid
Grid a été utilisé pour les structures bidimensionnelles et les mises en page complexes :
- **Liste des événements** : La classe `.events-grid` utilise `grid-template-columns: repeat(auto-fill, minmax(300px, 1fr))` pour créer une grille fluide et automatique.
- **Page Détail** : Utilisé pour séparer le contenu principal de la barre latérale sur grand écran avec des colonnes asymétriques (`2fr 1fr`).
- **Footer** : Utilisé pour organiser les différentes colonnes d'informations de manière alignée.

## 4. Media Queries et Points d'arrêt
Le design est totalement adaptable via les breakpoints suivants :
- **Mobile (< 767px)** : Passage en colonnes uniques, menu "hamburger" activé, réduction des tailles de police (Hero).
- **Tablette (768px - 1023px)** : Grille à 2 colonnes, ajustement de la largeur du conteneur.
- **Desktop (>= 1024px)** : Grille à 3/4 colonnes, mise en page complète avec barre latérale.

## 5. Choix responsive réalisés
- **Images fluides** : Utilisation de `max-width: 100%` et `object-fit: cover` pour éviter les déformations (format WebP utilisé pour l'optimisation).
- **Typographie fluide** : Utilisation de tailles de police relatives et ajustements via Media Queries pour le Hero.
- **Approche Mobile-First** : Bien que les media queries soient explicites, les styles de base privilégient la flexibilité avant l'application des contraintes larges.
