import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Получаем элемент с типом HTMLDivElement | null
const container = document.getElementById("root");

if (!container) {
  throw new Error("Root container not found");
}

const root = createRoot(container);
root.render(<App />);
