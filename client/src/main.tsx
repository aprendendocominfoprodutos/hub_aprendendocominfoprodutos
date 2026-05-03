import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Força o redirecionamento para o Hub na raiz
if (window.location.pathname === "/" && window.location.hash === "") {
  // Apenas redireciona se estiver na raiz exata
  const currentPath = window.location.pathname;
  if (currentPath === "/") {
    // Deixa o React Router lidar com o roteamento
  }
}

createRoot(document.getElementById("root")!).render(<App />);
