import { loadForm } from "./form-validation.js";
import { initCheckupPage } from "./checkup-detailes.js";
import { initSearchModule } from "./search.js";

document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("checkup-container")) {
    initCheckupPage();
  }

  if (document.getElementById("searchInput")) {
    initSearchModule();
  }

  const modal = document.getElementById("formModal");
  const modalContent = document.getElementById("modal");
  const openModalBtns = document.querySelectorAll(".openFormBtn");

  openModalBtns.forEach((button) => {
    button.addEventListener("click", () => {
      modal.classList.add("show");
      loadForm(modal, modalContent);
    });
  });

  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.classList.remove("show");
      modalContent.innerHTML = "";
    }
  });
});
