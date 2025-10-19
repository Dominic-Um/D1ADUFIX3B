import wheelIconUrl from "./spinningwheel.jpg";
import "./style.css";

let speed: number = 0;
let acceleration: number = 0;

interface Upgrade {
  name: string;
  cost: number;
  rate: number;
  count: number;
}

const upgrades: Upgrade[] = [
  { name: "Alloy Wheels", cost: 10, rate: 0.1, count: 0 },
  { name: "Turbo Tires", cost: 100, rate: 2.0, count: 0 },
  { name: "Nitro Boost", cost: 1000, rate: 50.0, count: 0 },
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
  upgrades
    .map(
      (u) => `
        <div>
          <button id="buy-${u.name.replace(/\s+/g, "")}" disabled>
            Buy ${u.name} (${u.cost.toFixed(1)} mph)
          </button>
          <span id="count-${u.name.replace(/\s+/g, "")}">Owned: 0</span>
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

const upgradeButtons = upgrades.map((u) =>
  document.getElementById(
    `buy-${u.name.replace(/\s+/g, "")}`,
  ) as HTMLButtonElement
);
const upgradeCounts = upgrades.map((u) =>
  document.getElementById(
    `count-${u.name.replace(/\s+/g, "")}`,
  ) as HTMLSpanElement
);

function updateDisplay() {
  speedDisplay.textContent = `${speed.toFixed(3)} mph`;
  accelDisplay.textContent = `${acceleration.toFixed(3)} mph/sec`;

  upgrades.forEach((u, i) => {
    upgradeButtons[i].textContent = `Buy ${u.name} (${u.cost.toFixed(1)} mph)`;
    upgradeButtons[i].disabled = speed < u.cost;
    upgradeCounts[i].textContent = `Owned: ${u.count}`;
  });
}

wheelButton.addEventListener("click", () => {
  speed++;
  updateDisplay();
});

upgrades.forEach((u, i) => {
  upgradeButtons[i].addEventListener("click", () => {
    if (speed >= u.cost) {
      speed -= u.cost;
      u.count++;
      acceleration += u.rate;
      u.cost *= 1.15;
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
