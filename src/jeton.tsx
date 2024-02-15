import React, { useEffect, useMemo, useState } from "react"; // Importe les hooks et le composant React depuis la bibliothèque React

// Définition du type Position
type Position = "absolute" | "relative" | "static" | "fixed";

interface TokenProps { // Définit les propriétés attendues par le composant Jeton
  color: string; // Couleur du jeton
  x: number; // Position horizontale du jeton
  y: number; // Position verticale du jeton
}

const sizeToken = 50; // Définit la taille du jeton en pixels

const Token: React.FC<TokenProps> = ({ color: color, x, y }) => { // Définit le composant Jeton en fonction des propriétés JetonProps
  const [shownY, setShownY] = useState(y); // Déclare un état pour stocker la position verticale affichée du jeton

  useEffect(() => { // Utilise l'effet useEffect pour mettre à jour la position verticale affichée du jeton lorsque la position y change
    setShownY(y);
  }, [y]);

  const tokenStyle = useMemo(() => ({ // Utilise useMemo pour calculer le style du jeton de manière efficace
    backgroundColor: color, // Couleur de fond du jeton
    top: y * sizeToken, // Position verticale du jeton
    left: x * sizeToken, // Position horizontale du jeton
    width: sizeToken, // Largeur du jeton
    height: sizeToken, // Hauteur du jeton
    borderRadius: sizeToken, // Bordure arrondie du jeton
    zIndex: -1, // Ordre de superposition du jeton
    position: "absolute" as Position, // Type de positionnement du jeton
    transform: `translateY(${(shownY - y) * sizeToken}px)`, // Translation verticale du jeton pour les animations
    transition: `linear ${y * 60}ms` // Transition pour les animations de déplacement du jeton
  }), [color, x, y, shownY]); // Dépendances du hook useMemo

  return <div style={tokenStyle} />; // Rendu du composant Jeton avec le style calculé
};

export default Token; // Exporte le composant Jeton pour qu'il puisse être utilisé ailleurs dans l'application
