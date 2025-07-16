import { StorageManager } from "./storage-manager.js";

import {
  getPricesForAllPackages,
  formatPrice,
  updatePriceDisplay,
} from "./price-calculator.js";

export async function renderCheckup(checkupId) {
  try {
    const response = await fetch("../data/data.json");
    const data = await response.json();

    const checkups = data.checkups;
    const checkup = checkups.find((c) => c.id === checkupId);
    if (!checkup) {
      console.error("Чекап не знайдено:", checkupId);
      return;
    }

    replaceBannerWithCheckup(checkup);
  } catch (err) {
    console.error("Помилка при завантаженні чекапів:", err);
  }
}

export function renderCheckupDetails(
  checkup,
  container,
  initialType = "basic",
  showPackageToggle = true
) {
  if (!checkup || !container) {
    console.error("Не передано чекап або контейнер");
    return;
  }

  const storageKey = `selectedPackage-${checkup.id}`;
  const savedType = initialType || StorageManager.load(storageKey) || "basic";

  container.innerHTML = `
    <div class="checkup-layout">
      <div class="checkup-image-column">
        <img src="${checkup.image}" alt="Заставка чекапу ${
    checkup.name
  }" class="checkup-img" />
      </div>
      <div class="checkup-info-column">
        <h3>${checkup.name} чекап</h3>
        <p>${checkup.description}</p>

        ${showPackageToggle ? renderTabs(savedType) : ""}

        <div class="package-details"></div>
      </div>
    </div>
  `;

  const detailsDiv = container.querySelector(".package-details");
  const buttons = container.querySelectorAll(".switch-btn");

  const renderPackage = (type) => {
    const pkg = checkup.packages?.[type];
    if (!pkg) {
      detailsDiv.innerHTML = `<p>Дані для пакету "${type}" відсутні.</p>`;
      return;
    }

    const allPrices = getPricesForAllPackages(checkup);
    const selectedPrices = allPrices[type];

    detailsDiv.innerHTML = `
    <h4>${pkg.name} пакет</h4>
    <ul>
      ${pkg.services
        .map(
          (s) => `<li><i class="fas fa-check" aria-hidden="true"></i>${s}</li>`
        )
        .join("")}
    </ul>
    <div class="checkup-price-box">
  <p class="price-color">Загальна вартість: від <span data-price="total"></span></p>
</div>
  `;

    updatePriceDisplay(detailsDiv, selectedPrices);

    buttons.forEach((b) => {
      const isActive = b.dataset.type === type;
      b.classList.toggle("active", isActive);
      b.setAttribute("aria-selected", isActive);
    });

    StorageManager.save(storageKey, type);
  };

  if (showPackageToggle) {
    renderPackage(savedType);

    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        renderPackage(btn.dataset.type);
      });
    });

    container.addEventListener("keydown", (e) => {
      if (!["ArrowLeft", "ArrowRight"].includes(e.key)) return;
      const current = [...buttons].findIndex((b) =>
        b.classList.contains("active")
      );
      const next =
        e.key === "ArrowRight"
          ? (current + 1) % buttons.length
          : (current - 1 + buttons.length) % buttons.length;
      buttons[next].focus();
      buttons[next].click();
    });
  } else {
    renderPackage("basic");
  }
}

function renderTabs(activeType) {
  return `
    <nav aria-label="Перемикач пакета" role="tablist">
      <ul>
        <li><button role="tab" class="switch-btn ${
          activeType === "basic" ? "active" : ""
        }" data-type="basic" aria-selected="${
    activeType === "basic"
  }">Базовий</button></li>
        <li><button role="tab" class="switch-btn ${
          activeType === "extended" ? "active" : ""
        }" data-type="extended" aria-selected="${
    activeType === "extended"
  }">Розширений</button></li>
      </ul>
    </nav>
  `;
}

export function replaceBannerWithCheckup(checkup) {
  const oldBanner = document.getElementById("initialBanner");
  if (!oldBanner) {
    console.error("Банер не знайдено");
    return;
  }

  const newBanner = document.createElement("section");
  newBanner.className = "checkup-details";
  newBanner.id = "initialBanner";

  document.body.replaceChild(newBanner, oldBanner);
  renderCheckupDetails(checkup, newBanner, "basic", true);
}
