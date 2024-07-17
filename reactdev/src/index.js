import { StrictMode } from "react"; //wrapper component that identifies problems by adding additional checks and warnings
import { createRoot } from "react-dom/client"; //imports function that creates a HTML element 'root' where the app will be rendered

import "./styles.css";

import App from "./App"; //imports app component of app.js file, main component of react app

const root = createRoot(document.getElementById("root")); //selects DOM element with HTML id 'root', calls createRoot
root.render( //renders React components to DOM
  <StrictMode>
    <App /> //App conponent beind rendered
  </StrictMode>
);
