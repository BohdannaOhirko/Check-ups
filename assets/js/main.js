import { initCheckupPage } from "./checkup-detailes.js";
import { initSearchModule } from "./search.js";
import { initModalClose } from "./form-validation.js";

document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("checkup-container")) {
    initCheckupPage();
  }

  if (document.getElementById("searchInput")) {
    initSearchModule();
  }
});
