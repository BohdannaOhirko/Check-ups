import { initCheckupPage } from "./checkup-detailes.js";
import { initSearchModule } from "./search.js";

document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("checkup-container")) {
    initCheckupPage();
  }

  if (document.getElementById("searchInput")) {
    initSearchModule();
  }
});

fetch("/data/data.json")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.error("Помилка при завантаженні JSON:", error);
  });
