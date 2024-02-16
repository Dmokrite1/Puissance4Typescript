
/*
* besoin d'implémenter l'algorythme MinMax et sa méthode d'élagage Alpha-Bêta afin de jouer contre une AI performante, il est aussi possible d'ajusté la profondeur "depth" pour ajusté le niveau de difficulté = Facile, Normal, Difficile, Master
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
        alert("Impossible de poser un jeton ici !");
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

    const timeoutId = setTimeout(() => {
      const column = chooseCorrectly(array); // Choisit intelligemment la colonne où placer le jeton pour l'ordinateur
      placeToken(column, false); // Place un jeton à la colonne choisie
    }, 2000);
    return () => clearTimeout(timeoutId)
    
  }, [playerHumanTurn, placeToken, array, isFinished]);

  return ( // Rendu JSX de l'application
    <div className="App"> // Conteneur principal de l'application
      <h1>Puissance 4</h1> // Titre du jeu 
      <h2>Choose your destiny !</h2> // Sous-titre du jeu 
      <div style={gameStyle}> // Élément de jeu avec les styles définis 
        <Grille // Composant Grille pour afficher la grille de jeu
          width={tokenSize * 7} // Largeur de la grille en fonction de la taille des jetons et du nombre de colonnes
          height={tokenSize * 6} // Hauteur de la grille en fonction de la taille des jetons et du nombre de lignes
          onClick={clickOnGrid} // Gestionnaire de clic sur la grille
        />
        {tokens} // Affiche les jetons sur la grille
      </div>
    </div>
  );
};

export default App; // Exporte le composant App pour pouvoir l'utiliser dans d'autres fichiers
*/

/*
* Base de réflexion MinMax + élagage Alpha-Bêta
class YourClass {
    // Définir les propriétés et méthodes de la classe ici

    // Méthode Minimax avec profondeur
    minmax(board: number[][], depth: number, maximizingPlayer: boolean): Object {
        let res: any = {}; // Déclaration du résultat

        // Déterminer si le nœud est terminal
        let isTerminalNode: boolean = this.is_won(board, 1) || this.is_won(board, 2);

        // Cas de base : profondeur maximale atteinte ou nœud terminal
        if (depth === 0 || isTerminalNode) {
            if (isTerminalNode) {
                // Si le jeu est gagné par l'ordinateur ou le joueur humain
                res["Moove"] = 'None';
                res["Score"] = this.evaluate(board); // Évaluation de la position
            } else {
                // Si la profondeur maximale est atteinte
                res["Moove"] = 'None';
                res["Score"] = 0; // Score nul
            }
        } else {
            // Cas récursif : effectuer l'algorithme Minimax
            if (maximizingPlayer) {
                // Joueur maximisant (ordinateur)
                let value: number = Number.NEGATIVE_INFINITY;
                // Boucle sur tous les coups possibles
                for (let col of this.getMovePlayable(board)) {
                    let tempBoard: number[][] = this.copyBoard(board);
                    let row: number = this.get_open_row(tempBoard, col);
                    tempBoard[row][col] = 2; // Simulation du coup de l'ordinateur
                    let newScore: any = this.minmax(tempBoard, depth - 1, false); // Appel récursif avec joueur minimisant
                    value = Math.max(value, newScore["Score"]);
                }
                res["Moove"] = 'None';
                res["Score"] = value;
            } else {
                // Joueur minimisant (joueur humain)
                let value: number = Number.POSITIVE_INFINITY;
                // Boucle sur tous les coups possibles
                for (let col of this.getMovePlayable(board)) {
                    let tempBoard: number[][] = this.copyBoard(board);
                    let row: number = this.get_open_row(tempBoard, col);
                    tempBoard[row][col] = 1; // Simulation du coup du joueur humain
                    let newScore: any = this.minmax(tempBoard, depth - 1, true); // Appel récursif avec joueur maximisant
                    value = Math.min(value, newScore["Score"]);
                }
                res["Moove"] = 'None';
                res["Score"] = value;
            }
        }

        return res; // Renvoyer le résultat
    }
}

// Appel initial avec profondeur de 10
const yourClassInstance = new YourClass();
const result = yourClassInstance.minmax(board, 10, true); // Supposons que "board" soit votre plateau de jeu initial
*/

import React, { useCallback, useEffect, useState } from "react";
import Grille from "./grille";
import Token from "./jeton";
import { CreateArrayOnPlay, verifyWinner } from "./utils";
import ErrorMessage from "./ErrorMessage";
import "./styles.css";

const tokenSize = 100;

const gameStyle: React.CSSProperties = {
  position: "relative",
  width: "fit-content"
};

const App: React.FC = () => {
  const [tokens, setTokens] = useState<React.ReactNode[]>([]);
  const [currentColor, setCurrentColor] = useState("yellow");
  const [array, setArray] = useState<string[][]>(() =>
    Array.from({ length: 7 }, () => Array.from({ length: 6 }, () => ""))
  );
  const [winner, setWinner] = useState<string | undefined>();
  const [errorMessage, setErrorMessage] = useState<string | undefined>(); // Ajoutez un état pour le message d'erreur

  const isFinished = !!winner;

  const addToken = useCallback((token) => {
    setTokens((prevTokens) => [...prevTokens, token]);
  }, []);

  useEffect(() => {
    if (isFinished) {
      return;
    }
    const winner = verifyWinner(array);
    if (winner) {
      console.log(`{winner} flawless victory`);
      
      setWinner(winner);
    }
  }, [isFinished, array]);

  const placeToken = useCallback(
    (x: number): void => {
      const [newArray, y] = CreateArrayOnPlay(
        array,
        x,
        currentColor
      );
      if (!newArray) {
        setErrorMessage("Try again, mais avec les yeux ouverts !");
        return;
      }
      setArray(newArray as string[][]);
      addToken(
        <Token key={`${x}-${y}`} color={currentColor} x={x} y={y} />
      );
      setCurrentColor(currentColor === "yellow" ? "red" : "yellow");
      setErrorMessage(undefined); 
    },
    [addToken, currentColor, array]
  );

  const clickOnGrid = useCallback(
    (event: React.MouseEvent<HTMLImageElement>) => {
      if (isFinished) {
        return;
      }
      const rect = event.currentTarget.getBoundingClientRect();
      const x = (event.clientX - rect.left) / tokenSize;
      const roundedX = Math.floor(x);
      placeToken(roundedX);
    },
    [placeToken, isFinished]
  );

  return (
    <div className="App">
      <h1>Puissance 4 : Choose your destiny !</h1>
      <div style={gameStyle}>
        <Grille
          width={tokenSize * 7}
          height={tokenSize * 6}
          onClick={clickOnGrid}
        />
        {tokens}
      </div>
      {winner && (
        <div className="WinnerMessage">
          <h3>{`${winner} wins, flawless victory !`}</h3>
        </div>
      )}
      <h3>{errorMessage && <ErrorMessage message={errorMessage} />}</h3>
    </div>
  );
};

export default App;

