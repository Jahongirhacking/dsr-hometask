import logo from "./assets/logo.png";
import "./styles.scss";

const img = document.createElement("img");
img.src = logo;
document.body.appendChild(img);

console.log("Hello Webpack + TypeScript + SCSS!");
