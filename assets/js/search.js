import { replaceBannerWithCheckup } from "./checkup-renderer.js";

let allCheckupsData = [];
let initialBannerElement;

function getSearchValue() {
  return document.getElementById("searchInput").value.trim().toLowerCase();
}

function toggleContentVisibility(showResults) {
  if (initialBannerElement) {
    initialBannerElement.style.display = showResults ? "none" : "block";
  }
  const resultsContainer = document.getElementById("resultsContainer");
  if (resultsContainer) {
    resultsContainer.style.display = showResults ? "block" : "none";
  }
}

function displayInitialContent() {
  toggleContentVisibility(false);
}

function filterCheckups(searchValue) {
  const normalizedSearch = searchValue.trim().toLowerCase();

  return allCheckupsData.filter((item) => {
    const name = item.name?.toLowerCase() || "";
    const description = item.description?.toLowerCase() || "";
    const keywords = (item.keywords || []).join(" ").toLowerCase();

    return (
      name.includes(normalizedSearch) ||
      description.includes(normalizedSearch) ||
      keywords.includes(normalizedSearch)
    );
  });
}

// function renderDetailedCheckup(checkup, container) {
//   container.innerHTML = `
//         <div class="checkup">
//             <header>
//                 <img src="${checkup.image}" alt="${checkup.name} чекап" class="checkup-img" />
//                 <h3>${checkup.name} чекап</h3>
//                 <p>${checkup.description}</p>
//             </header>
//             <nav aria-label="Перемикач пакета">
//                 <ul>
//                     <li><button class="switch-btn" data-type="basic">Базовий</button></li>
//                     <li><button class="switch-btn" data-type="extended">Розширений</button></li>
//                 </ul>
//             </nav>
//             <div class="package-details"></div>
//         </div>
//     `;

//   const detailsDiv = container.querySelector(".package-details");
//   const showPackage = (type) => {
//     const pkg = checkup.packages[type];
//     if (!pkg) {
//       detailsDiv.innerHTML = `<p>Дані для пакету "${type}" відсутні.</p>`;
//       return;
//     }
//     detailsDiv.innerHTML = `
//             <h4>${pkg.name} пакет</h4>
//             <ul>
//                 ${pkg.services
//                   .map(
//                     (s) =>
//                       `<li><i class="fas fa-check" style="color: green; margin-right: 10px;"></i>${s}</li>`
//                   )
//                   .join("")}
//             </ul>
//             <p>Базова вартість: <span class="price-color">від ${
//               pkg.base_price
//             } грн</span></p>
//         `;
//   };

//   showPackage("basic");

//   const buttons = container.querySelectorAll(".switch-btn");
//   buttons.forEach((btn) => {
//     btn.addEventListener("click", () => {
//       showPackage(btn.dataset.type);
//     });
//   });

//   container.classList.remove("banner");
//   container.classList.add("detailed-checkup-display");
// }

function displayResults(filtered, container) {
  const banner = document.getElementById("initialBanner");

  if (filtered.length === 1) {
    container.style.display = "none";
    replaceBannerWithCheckup(filtered[0]);

    if (banner) banner.style.display = "none";
  } else if (filtered.length > 1) {
    container.innerHTML = filtered
      .map(
        (item) => `
          <div class="item">
            <span class="item__name">${item.name}</span>
          </div>`
      )
      .join("");

    container.style.display = "block";
    if (banner) banner.style.display = "block";
  } else {
    container.innerHTML = `<div class="no-results-found">Нічого не знайдено</div>`;
    container.style.display = "block";
    if (banner) banner.style.display = "block";
  }
}

function performSearch() {
  const searchValue = getSearchValue();
  const resultsContainer = document.getElementById("resultsContainer");

  if (!resultsContainer) {
    console.error("Елемент #resultsContainer не знайдено.");
    return;
  }

  if (searchValue === "") {
    displayInitialContent();
    return;
  }

  const filtered = filterCheckups(searchValue);
  displayResults(filtered, resultsContainer);
}

function handleEnterKey(e) {
  if (e.key === "Enter") {
    e.preventDefault();
    performSearch();
  }
}

function handleInput() {
  if (getSearchValue() === "") performSearch();
}

function toggleDropdown(e) {
  e.preventDefault();
  const dropdown = e.target.closest(".dropdown");
  const dropdownContent = dropdown.querySelector(".dropdown-content");
  const isOpen = dropdown.classList.toggle("open");
  e.target.textContent = isOpen ? "−" : "+";
  dropdownContent.style.display =
    dropdownContent.style.display === "block" ? "none" : "block";
}

function closeDropdowns(e) {
  if (!e.target.closest(".dropdown")) {
    document.querySelectorAll(".dropdown-content").forEach((menu) => {
      menu.style.display = "none";
    });
  }
}

export function initSearchModule() {
  const searchInput = document.getElementById("searchInput");
  const searchForm = document.getElementById("searchForm");
  const searchIcon = document.getElementById("searchIcon");
  const resultsContainer = document.getElementById("resultsContainer");
  initialBannerElement = document.getElementById("initialBanner");

  fetch("/data/data.json")
    .then((res) => res.json())
    .then((data) => {
      allCheckupsData = data.checkups;

      displayInitialContent();

      if (searchInput) {
        searchInput.addEventListener("keydown", handleEnterKey);
        searchInput.addEventListener("input", handleInput);
      }

      if (searchForm) {
        searchForm.addEventListener("submit", (e) => {
          e.preventDefault();
          performSearch();
        });
      }

      if (searchIcon) {
        searchIcon.addEventListener("click", () => {
          performSearch();
        });
      }

      const plusIcons = document.querySelectorAll(".plus");
      plusIcons.forEach((plus) => {
        plus.addEventListener("click", toggleDropdown);
      });

      document.addEventListener("click", closeDropdowns);
    })
    .catch((err) => {
      console.error("Помилка при завантаженні data.json:", err);
      if (resultsContainer) {
        resultsContainer.innerHTML = `<p>Не вдалося завантажити дані чекапів. Спробуйте пізніше.</p>`;
        toggleContentVisibility(true);
      }
    });
}
