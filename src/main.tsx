import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./globals.css";
import { applyClientTheme } from "./config/client";

// Aplicar tema personalizado do cliente
applyClientTheme();

createRoot(document.getElementById("root")!).render(<App />);
