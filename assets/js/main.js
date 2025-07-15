import { loadForm } from "./form-validation.js";
import { initCheckupPage } from "./checkup-details.js";
import { initSearchPage } from "./search.js";
import {
  getPricesForAllPackages,
  updatePriceDisplay,
} from "./price-calculator.js";

document.addEventListener("DOMContentLoaded", () => {
  fetch("/data/data.json")
    .then((res) => res.json())
    .then((data) => {
      const checkups = data.checkups;
      const items = document.querySelectorAll(".checkup-item");

      items.forEach((item) => {
        const id = item.getAttribute("data-id");
        const checkup = checkups.find((c) => c.id === id);
        if (!checkup) return;

        const basicPrices = getPricesForAllPackages(checkup).basic;
        updatePriceDisplay(item, basicPrices);
      });
    })
    .catch((err) => console.error("Помилка завантаження JSON:", err));

  if (document.getElementById("checkup-container")) {
    initCheckupPage();
  }

  if (document.getElementById("searchInput")) {
    initSearchPage();
  }

  const modal = document.getElementById("formModal");
  const modalContent = document.getElementById("modal");

  document.addEventListener("click", (event) => {
    const button = event.target.closest(".openFormBtn");

    if (button) {
      event.preventDefault();
      console.log("Натиснута будь-яка кнопка .openFormBtn");
      modal.classList.add("show");
      loadForm(modal, modalContent);
    }

    if (event.target === modal) {
      modal.classList.remove("show");
      modalContent.innerHTML = "";
    }
  });
});
