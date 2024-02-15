export function calculLine(
  array: readonly (readonly string[])[], // Représente le tableau de jeu
  x: number // Représente la colonne dans laquelle vérifier la ligne
): number | undefined { // Renvoie la position de la ligne vide ou undefined si la colonne est pleine
  const column = array[x]; // Récupère la colonne du tableau à l'indice x
  if (!column) { // Vérifie si la colonne existe
    return undefined; // Si la colonne n'existe pas, retourne undefined
  }
  let y = column.length - 1; // Initialise la position y à la dernière ligne du tableau
  while (y >= 0) { // Parcourt les lignes de bas en haut
    if (column[y] === "") { // Si la ligne est vide
      return y; // Renvoie la position de la ligne vide
    }
    y--; // Passe à la ligne précédente
  }
}

export function CreateArrayOnPlay(
  array: readonly (readonly string[])[], // Représente le tableau de jeu
  x: number, // Représente la colonne dans laquelle placer le jeton
  color: string // Représente la couleur du jeton à placer
): [undefined | readonly (readonly string[])[], number] { // Renvoie le nouveau tableau avec le jeton placé et sa position
  const y = calculLine(array, x); // Récupère la position y où placer le jeton
  if (y === undefined) { // Si la colonne est pleine
    return [undefined, -1]; // Retourne undefined et -1 pour indiquer que le jeton ne peut pas être placé
  }
  return [ // Retourne le nouveau tableau avec le jeton placé et sa position
    array.map((column, columnX) => // Parcourt chaque colonne du tableau
      column.map((value, lineY) => { // Parcourt chaque ligne de la colonne
        if (columnX === x && lineY === y) { // Si c'est la position où placer le jeton
          return color; // Place le jeton de la couleur spécifiée
        }
        return value; // Sinon, conserve la valeur existante
      })
    ),
    y // Renvoie la position y où le jeton a été placé
  ];
}

export function verifyWinner(
  array: readonly (readonly string[])[] // Représente le tableau de jeu
): string | undefined { // Renvoie la couleur du gagnant ou undefined s'il n'y a pas de gagnant
  for (const color of ["yellow", "red"]) { // Parcourt chaque couleur de jeton
    // Vérifie les diagonales de bas-gauche à haut-droite.
    for (let position = 0; position < 4; position++) { // Parcourt les positions de départ possibles
      for (let floor = 5; floor > 2; floor--) { // Parcourt les étages possibles
        if ( // Vérifie si une diagonale de bas-gauche à haut-droite est complète
          array[position][floor] === color &&
          array[position + 1][floor - 1] === color &&
          array[position + 2][floor - 2] === color &&
          array[position + 3][floor - 3] === color
        ) {
          return color; // Renvoie la couleur du gagnant
        }
      }
    }

    // Vérifie les diagonales de haut-gauche à bas-droite.
    for (let position = 0; position < 4; position++) {
      for (let floor = 0; floor < 3; floor++) {
        if (
          array[position][floor] === color &&
          array[position + 1][floor + 1] === color &&
          array[position + 2][floor + 2] === color &&
          array[position + 3][floor + 3] === color
        ) {
          return color;
        }
      }
    }

    // Vérifie les horizontales de gauche à droite.
    for (let position = 0; position < 4; position++) {
      for (let floor = 0; floor < 6; floor++) {
        if (
          array[position][floor] === color &&
          array[position + 1][floor] === color &&
          array[position + 2][floor] === color &&
          array[position + 3][floor] === color
        ) {
          return color;
        }
      }
    }

    // Vérifie les verticales de bas en haut.
    for (let position = 0; position < 7; position++) {
      for (let floor = 5; floor > 2; floor--) {
        if (
          array[position][floor] === color &&
          array[position][floor - 1] === color &&
          array[position][floor - 2] === color &&
          array[position][floor - 3] === color
        ) {
          return color;
        }
      }
    }
  }
}

export function otherColor(color: string): string { // Renvoie la couleur opposée
  if (color === "yellow") { // Si la couleur est jaune
    return "red"; // Renvoie rouge
  }
  return "yellow"; // Sinon, renvoie jaune
}

// Ajout de la fonction chooseCorrectly si nécessaire
export function chooseCorrectly(array: readonly (readonly string[])[]): number { // Choix de colonne aléatoire
  return Math.floor(Math.random() * array.length); // Renvoie un nombre aléatoire entre 0 et la longueur du tableau
}
