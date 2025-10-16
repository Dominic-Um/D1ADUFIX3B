import exampleIconUrl from "./noun-paperclip-7598668-00449F.png";
import "./style.css";

let counter: number = 0;

document.body.innerHTML = `
  <button id="iconButton" style="border:none; background:none; padding:0; cursor:pointer;">
    <img src="${exampleIconUrl}" alt="Paperclip Icon" width="100" />
  </button>
  <div id="counterDisplay">0 paperclips</div>
`;

const button = document.getElementById("iconButton") as HTMLButtonElement;
const counterDisplay = document.getElementById(
  "counterDisplay",
) as HTMLDivElement;

button.addEventListener("click", () => {
  counter++;
  counterDisplay.textContent = `${counter} paperclip${
    counter === 1 ? "" : "s"
  }`;
});
