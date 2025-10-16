import exampleIconUrl from "./noun-paperclip-7598668-00449F.png";
import "./style.css";

let counter: number = 0;

document.body.innerHTML = `
  <button id="iconButton">
    <img src="${exampleIconUrl}" alt="Paperclip Icon" width="100" />
  </button>
    <div id="counterDisplay">0 paperclips</div>
`;

const button = document.getElementById("iconButton") as HTMLButtonElement;
const counterDisplay = document.getElementById(
  "counterDisplay",
) as HTMLDivElement;

function updateDisplay() {
  counterDisplay.textContent = `${counter} paperclip${
    counter === 1 ? "" : "s"
  }`;
}

button.addEventListener("click", () => {
  counter++;
  counterDisplay.textContent = `${counter} paperclip${
    counter === 1 ? "" : "s"
  }`;
});

setInterval(() => {
  counter++;
  updateDisplay();
}, 1000);
updateDisplay();

let lt = performance.now();

function animate(time: number) {
  const dt = (time - lt) / 1000;
  lt = time;
  counter += dt;
  updateDisplay();

  requestAnimationFrame(animate);
}
requestAnimationFrame(animate);
updateDisplay();
