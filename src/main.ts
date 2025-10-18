import exampleIconUrl from "./noun-paperclip-7598668-00449F.png";
import "./style.css";

let counter: number = 0;
let growthRate: number = 0;

interface Upgrade {
  name: string;
  cost: number;
  rate: number;
  count: number;
}

const upgrades: Upgrade[] = [
  { name: "A", cost: 10, rate: 0.1, count: 0 },
  { name: "B", cost: 100, rate: 2.0, count: 0 },
  { name: "C", cost: 1000, rate: 50.0, count: 0 },
];

document.body.innerHTML = `
  <button id="iconButton">
    <img src="${exampleIconUrl}" alt="Paperclip Icon" width="100" />
  </button>

  <div id="counterDisplay">0 paperclips</div>
  <div id="growthRateDisplay">0.0 paperclips/sec</div>

  <div id="upgrades">
    ${
  upgrades
    .map(
      (u) => `
        <div>
          <button id="buy-${u.name}" disabled>
            Buy ${u.name} (${u.cost} paperclips)
          </button>
          <span id="count-${u.name}">Owned: 0</span>
        </div>
      `,
    )
    .join("")
}
  </div>
`;

const iconButton = document.getElementById("iconButton") as HTMLButtonElement;
const counterDisplay = document.getElementById(
  "counterDisplay",
) as HTMLDivElement;
const growthRateDisplay = document.getElementById(
  "growthRateDisplay",
) as HTMLDivElement;

const upgradeButtons = upgrades.map((u) =>
  document.getElementById(`buy-${u.name}`) as HTMLButtonElement
);
const upgradeCounts = upgrades.map((u) =>
  document.getElementById(`count-${u.name}`) as HTMLSpanElement
);

function updateDisplay() {
  counterDisplay.textContent = `${counter.toFixed(3)} paperclip${
    Math.floor(counter) === 1 ? "" : "s"
  }`;
  growthRateDisplay.textContent = `${growthRate.toFixed(3)} paperclips/sec`;

  upgrades.forEach((u, i) => {
    upgradeButtons[i].textContent = `Buy ${u.name} (${
      u.cost.toFixed(1)
    } paperclips)`;
    upgradeButtons[i].disabled = counter < u.cost;
    upgradeCounts[i].textContent = `Owned: ${u.count}`;
  });
}

iconButton.addEventListener("click", () => {
  counter++;
  updateDisplay();
});

upgrades.forEach((u, i) => {
  upgradeButtons[i].addEventListener("click", () => {
    if (counter >= u.cost) {
      counter -= u.cost;
      u.count++;
      growthRate += u.rate;
      u.cost *= 1.15;
      updateDisplay();
    }
  });
});

let lastTime = performance.now();
function animate(time: number) {
  const dt = (time - lastTime) / 1000;
  lastTime = time;

  counter += growthRate * dt;
  updateDisplay();

  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
updateDisplay();
