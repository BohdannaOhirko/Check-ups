import { loadForm } from "./form-validation.js";
import { initCheckupPage } from "./checkup-detailes.js";
import { initSearchModule } from "./search.js";

document.addEventListener("DOMContentLoaded", () => {
  // Ініціалізація чекап-модуля
  if (document.getElementById("checkup-container")) {
    initCheckupPage();
  }

  // Ініціалізація пошуку
  if (document.getElementById("searchInput")) {
    initSearchModule();
  }

  // Модальне вікно форми
  const modal = document.getElementById("formModal");
  const modalContent = document.getElementById("modal");
  const openModalBtns = document.querySelectorAll(".openFormBtn");

  openModalBtns.forEach((button) => {
    button.addEventListener("click", () => {
      modal.classList.add("show");
      loadForm(modal, modalContent); // завантаження форми і всієї логіки
    });
  });

  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.classList.remove("show");
      modalContent.innerHTML = "";
    }
  });
});
