import wheelIconUrl from "./spinningwheel.jpg";
import "./style.css";

let speed = 0;
let acceleration = 0;

interface Item {
  name: string;
  cost: number;
  rate: number;
  count: number;
}

const availableItems: Item[] = [
  { name: "Alloy Wheels", cost: 10, rate: 0.1, count: 0 },
  { name: "Turbo Tires", cost: 100, rate: 2, count: 0 },
  { name: "Nitro Boost", cost: 1000, rate: 50, count: 0 },
];

document.body.innerHTML = `
  <h1>🏁 Speed Clicker: Spin to Win 🏎️</h1>

  <button id="wheelButton" class="main-button">
    <img src="${wheelIconUrl}" alt="Spinning Wheel" width="100" />
    <p>Spin the Wheel!</p>
  </button>

  <div id="speedDisplay">0.000 mph</div>
  <div id="accelDisplay">0.000 mph/sec</div>

  <h2>🧰 Upgrades</h2>
  <div id="upgrades">
    ${
  availableItems
    .map(
      (item) => `
        <div>
          <button id="buy-${item.name.replace(/\s+/g, "")}" disabled>
            Buy ${item.name} (${item.cost.toFixed(1)} mph)
          </button>
          <span id="count-${item.name.replace(/\s+/g, "")}">Owned: 0</span>
        </div>
      `,
    )
    .join("")
}
  </div>
`;

const wheelButton = document.getElementById("wheelButton") as HTMLButtonElement;
const speedDisplay = document.getElementById("speedDisplay") as HTMLDivElement;
const accelDisplay = document.getElementById("accelDisplay") as HTMLDivElement;

const upgradeButtons = availableItems.map(
  (item) =>
    document.getElementById(
      `buy-${item.name.replace(/\s+/g, "")}`,
    ) as HTMLButtonElement,
);
const upgradeCounts = availableItems.map(
  (item) =>
    document.getElementById(
      `count-${item.name.replace(/\s+/g, "")}`,
    ) as HTMLSpanElement,
);

function updateDisplay() {
  speedDisplay.textContent = `${speed.toFixed(3)} mph`;
  accelDisplay.textContent = `${acceleration.toFixed(3)} mph/sec`;

  availableItems.forEach((item, i) => {
    upgradeButtons[i].textContent = `Buy ${item.name} (${
      item.cost.toFixed(1)
    } mph)`;
    upgradeButtons[i].disabled = speed < item.cost;
    upgradeCounts[i].textContent = `Owned: ${item.count}`;
  });
}

wheelButton.addEventListener("click", () => {
  speed++;
  updateDisplay();
});

availableItems.forEach((item, i) => {
  upgradeButtons[i].addEventListener("click", () => {
    if (speed >= item.cost) {
      speed -= item.cost;
      item.count++;
      acceleration += item.rate;
      item.cost *= 1.15;
      updateDisplay();
    }
  });
});

let lastTime = performance.now();
function animate(time: number) {
  const dt = (time - lastTime) / 1000;
  lastTime = time;

  speed += acceleration * dt;
  updateDisplay();

  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
updateDisplay();
