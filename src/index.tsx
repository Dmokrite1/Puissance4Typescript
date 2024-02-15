import { render } from "react-dom"; // Importe la fonction render de react-dom pour afficher le composant dans le DOM

import App from "./App"; // Importe le composant principal de l'application depuis le fichier App.tsx

const rootElement = document.getElementById("root"); // Sélectionne l'élément du DOM avec l'ID "root" où l'application sera rendue
render(<App />, rootElement); // Rend le composant App dans l'élément du DOM sélectionné
