interface GridProps { // Définit une interface pour les propriétés du composant Grille
  width: number; // Largeur de la grille
  height: number; // Hauteur de la grille
  onClick: (event: React.MouseEvent<HTMLImageElement>) => void; // Gestionnaire de clic sur la grille
}

const Grid: React.FC<GridProps> = ({ width, height, onClick }) => { // Définit le composant Grille avec les propriétés spécifiées
  return ( // Rendu JSX du composant Grille
    <div className="grid-container" style={{ width, height }}> {/* Conteneur de la grille avec les styles de largeur et hauteur spécifiés */}
      <img src="grille.png" width="100%" height="100%" onClick={onClick} alt="" /> {/* Image de la grille avec gestionnaire de clic */}
    </div>
  );
};

export default Grid; // Exporte le composant Grille pour pouvoir l'utiliser dans d'autres fichiers
