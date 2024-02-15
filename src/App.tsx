import React, { useCallback, useEffect, useMemo, useState } from "react"; // Importe les hooks et composants nécessaires depuis React
import Grille from "./grille"; // Importe le composant Grille depuis le fichier grille.tsx
import Token from "./jeton"; // Importe le composant Jeton depuis le fichier jeton.tsx
import { calculLine, CreateArrayOnPlay, verifyWinner, otherColor, chooseCorrectly } from "./utils"; // Importe les fonctions utilitaires depuis le fichier utils.ts
import "./styles.css"; // Importe les styles CSS pour l'application

const tokenSize = 50; // Définit la taille des jetons

const gameStyle: React.CSSProperties = { // Définit les styles CSS pour l'élément de jeu
  position: "relative", // Position relative pour permettre le positionnement absolu des jetons
  width: "fit-content" // Largeur adaptée au contenu pour réduire l'espace vide autour du jeu
};

const App: React.FC = () => { // Définit le composant principal de l'application
  const [tokens, setTokens] = useState<React.ReactNode[]>([]); // État pour stocker les jetons affichés sur la grille
  const [currentColor, setCurrentColors] = useState("yellow"); // État pour stocker la couleur actuelle du joueur
  const [array, setArray] = useState<string[][]>(() => // État pour stocker l'état actuel de la grille de jeu
    Array.from({ length: 7 }, () => Array.from({ length: 6 }, () => ""))
  );
  const [winner, setWinner] = useState<string | undefined>(); // État pour stocker le gagnant du jeu, s'il y en a un

  const isFinished = !!winner; // Indique si le jeu est terminé en fonction de la présence d'un gagnant
  const playerHumanTurn = currentColor === "yellow"; // Indique si c'est le tour du joueur humain en fonction de la couleur actuelle

  const addToken = useCallback((token) => { // Fonction pour ajouter un jeton à l'état des jetons
    setTokens((prevTokens) => [...prevTokens, token]);
  }, []);

  useEffect(() => { // Effet pour vérifier s'il y a un gagnant à chaque changement d'état de fin de jeu ou de grille
    if (isFinished) { // Si le jeu est terminé, retourne
      return;
    }
    const winner = verifyWinner(array); // Vérifie s'il y a un gagnant dans l'état actuel de la grille
    if (winner) { // Si un gagnant est trouvé
      alert(`Flawless victory ${winner} !`); // Affiche un message de victoire
      setWinner(winner); // Met à jour l'état du gagnant
    }
  }, [isFinished, array]);

  const placeToken = useCallback( // Fonction pour placer un jeton sur la grille
    (x: number, isHuman: boolean): void => { // Prend la position x du jeton et un booléen indiquant si c'est le tour du joueur humain
      const [newArray, y] = CreateArrayOnPlay( // Crée un nouveau tableau en ajoutant le jeton à la position spécifiée
        array,
        x,
        currentColor
      );
      if (!newArray) { // Si le placement du jeton est invalide (par exemple, colonne pleine), affiche une alerte et retourne
        alert("Impossible de poser un jeton ici");
        return;
      }
      setArray(newArray as string[][]); // Met à jour l'état de la grille avec le nouveau tableau
      addToken( // Ajoute le jeton à l'état des jetons à afficher sur la grille
        <Token key={`${x}-${y}`} color={currentColor} x={x} y={y} />
      );
      setCurrentColors(currentColor === "yellow" ? "red" : "yellow"); // Change la couleur actuelle du joueur
    },
    [addToken, currentColor, array]
  );

  const clickOnGrid = useCallback( // Fonction pour gérer le clic sur la grille
    (event: React.MouseEvent<HTMLImageElement>) => { // Prend l'événement de clic
      if (isFinished || !playerHumanTurn) { // Si le jeu est terminé ou ce n'est pas le tour du joueur humain, retourne
        return;
      }
      const rect = event.currentTarget.getBoundingClientRect(); // Récupère les dimensions de la grille
      const x = (event.clientX - rect.left) / tokenSize; // Calcule la position x du clic relativement à la grille
      const roundedX = Math.floor(x); // Arrondit la position x à l'entier le plus proche
      placeToken(roundedX, true); // Place un jeton à la position x
    },
    [playerHumanTurn, placeToken, isFinished]
  );

  useEffect(() => { // Effet pour simuler le tour de l'ordinateur
    if (playerHumanTurn || isFinished) { // Si c'est le tour du joueur humain ou que le jeu est terminé, retourne
      return;
    }
    const column = chooseCorrectly(array); // Choisit intelligemment la colonne où placer le jeton pour l'ordinateur
    placeToken(column, false); // Place un jeton à la colonne choisie
  }, [playerHumanTurn, placeToken, array, isFinished]);

  return ( // Rendu JSX de l'application
    <div className="App"> {/* Conteneur principal de l'application */}
      <h1>Puissance 4</h1> {/* Titre du jeu */}
      <h2>Choose your destiny</h2> {/* Sous-titre du jeu */}
      <div style={gameStyle}> {/* Élément de jeu avec les styles définis */}
        <Grille // Composant Grille pour afficher la grille de jeu
          width={tokenSize * 7} // Largeur de la grille en fonction de la taille des jetons et du nombre de colonnes
          height={tokenSize * 6} // Hauteur de la grille en fonction de la taille des jetons et du nombre de lignes
          onClick={clickOnGrid} // Gestionnaire de clic sur la grille
        />
        {tokens} {/* Affiche les jetons sur la grille */}
      </div>
    </div>
  );
};

export default App; // Exporte le composant App pour pouvoir l'utiliser dans d'autres fichiers
