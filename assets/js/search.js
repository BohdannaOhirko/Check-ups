import { replaceBannerWithCheckup } from "./checkup-renderer.js";
import { filterCheckups, getSearchValue } from "./search-utils.js";

let allCheckupsData = [];
let initialBannerElement;
let originalBannerHTML = "";

function toggleContentVisibility(showResults) {
  if (initialBannerElement) {
    initialBannerElement.style.display = showResults ? "none" : "block";
  }
  const resultsContainer = document.getElementById("resultsContainer");
  if (resultsContainer) {
    resultsContainer.style.display = showResults ? "block" : "none";
  }
}

function restoreInitialBanner() {
  const banner = document.getElementById("initialBanner");
  if (banner && originalBannerHTML) {
    banner.innerHTML = originalBannerHTML;
  }
}

function displayInitialContent() {
  restoreInitialBanner();
  toggleContentVisibility(false);
}

function renderResults(results) {
  const resultsContainer = document.getElementById("resultsContainer");
  resultsContainer.innerHTML = "";

  if (results.length === 0) {
    resultsContainer.innerHTML = "<p>Нічого не знайдено.</p>";
    return;
  }

  results.forEach((checkup) => {
    const card = document.createElement("div");
    card.className = "checkup-card";
    card.innerHTML = `
      <img src="${checkup.image}" alt="${checkup.name}" />
      <h4>${checkup.name}</h4>
      <p>${checkup.description}</p>
    `;
    card.addEventListener("click", () => replaceBannerWithCheckup(checkup));
    resultsContainer.appendChild(card);
  });
}

function handleSearch() {
  restoreInitialBanner();

  const searchValue = getSearchValue().trim().toLowerCase();

  if (searchValue.length < 2) {
    displayInitialContent();
    return;
  }

  const results = filterCheckups(searchValue, allCheckupsData);

  if (results.length === 0) {
    toggleContentVisibility(false);
  }

  if (
    results.length === 1 ||
    (searchValue.length >= 3 &&
      results[0].name.toLowerCase().includes(searchValue))
  ) {
    replaceBannerWithCheckup(results[0]);
    toggleContentVisibility(false);
    return;
  }

  toggleContentVisibility(false);
}
export function initSearchPage() {
  initialBannerElement = document.getElementById("initialBanner");
  originalBannerHTML = initialBannerElement.innerHTML;

  fetch("/data/data.json")
    .then((res) => res.json())
    .then((data) => {
      allCheckupsData = data.checkups;
      displayInitialContent();
      return;
    })
    .catch((err) => {
      console.error("Помилка при завантаженні даних:", err);
    });

  const searchInput = document.getElementById("searchInput");
  searchInput.addEventListener("input", handleSearch);
  window.debugSearch = () => {
    const results = filterCheckups("дор", allCheckupsData);
    console.log("Результати пошуку 'дор':", results);
  };
}
