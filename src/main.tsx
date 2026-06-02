import { createRoot } from "react-dom/client";
import "./styles.css";
import { App } from "./components/App";

const rootElement = document.getElementById("app");
if (!rootElement) {
	throw new Error('Root element "#app" not found');
}

createRoot(rootElement).render(<App />);
