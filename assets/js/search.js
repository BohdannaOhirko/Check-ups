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
  return allCheckupsData.filter((item) =>
    item.name.toLowerCase().includes(searchValue)
  );
}

function renderDetailedCheckup(checkup, container) {
  container.innerHTML = `
        <div class="checkup">
            <header>
                <img src="${checkup.image}" alt="${checkup.name} чекап" class="checkup-img" />
                <h3>${checkup.name} чекап</h3>
                <p>${checkup.description}</p>
            </header>
            <nav aria-label="Перемикач пакета">
                <ul>
                    <li><button class="switch-btn" data-type="basic">Базовий</button></li>
                    <li><button class="switch-btn" data-type="extended">Розширений</button></li>
                </ul>
            </nav>
            <div class="package-details"></div>
        </div>
    `;

  const detailsDiv = container.querySelector(".package-details");
  const showPackage = (type) => {
    const pkg = checkup.packages[type];
    if (!pkg) {
      detailsDiv.innerHTML = `<p>Дані для пакету "${type}" відсутні.</p>`;
      return;
    }
    detailsDiv.innerHTML = `
            <h4>${pkg.name} пакет</h4>
            <ul>
                ${pkg.services
                  .map(
                    (s) =>
                      `<li><i class="fas fa-check" style="color: green; margin-right: 10px;"></i>${s}</li>`
                  )
                  .join("")}
            </ul>
            <p>Базова вартість: <span class="price-color">від ${
              pkg.base_price
            } грн</span></p>
        `;
  };

  showPackage("basic");

  const buttons = container.querySelectorAll(".switch-btn");
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      showPackage(btn.dataset.type);
    });
  });

  container.classList.remove("banner");
  container.classList.add("detailed-checkup-display");
}

function displayResults(filtered, container) {
  if (filtered.length === 1) {
    renderDetailedCheckup(filtered[0], container);
  } else if (filtered.length > 1) {
    container.innerHTML = filtered
      .map(
        (item) => `
                <div class="item">
                    <span class="item__name">${item.name}</span>
                </div>`
      )
      .join("");
    container.classList.add("banner");
    container.classList.remove("detailed-checkup-display");
  } else {
    container.innerHTML = `<div class="no-results">Нічого не знайдено</div>`;
    container.classList.add("banner");
    container.classList.remove("detailed-checkup-display");
  }
  toggleContentVisibility(true);
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

// const checkups = [
//   { name: "Дорослий чекап", category: "adult" },
//   { name: "Дорослий базовий чекап", category: "adult" },
//   { name: "Дорослий розширений чекап", category: "adult" },
//   { name: "Жіночий чекап", category: "women" },
//   { name: "Жіночий базовий чекап", category: "women" },
//   { name: "Жіночий розширений чекап", category: "women" },
//   { name: "Чоловічий чекап", category: "men" },
//   { name: "Чоловічий базовий чекап", category: "men" },
//   { name: "Чоловічий розширений чекап", category: "men" },
//   { name: "Дитячий чекап", category: "children" },
//   { name: "Дитячий базовий", category: "children" },
//   { name: "Дитячий розширений", category: "children" },
// ];

// function getSearchValue() {
//   return document.getElementById("searchInput").value.trim().toLowerCase();
// }

// function displayHint(container) {
//   container.innerHTML = `<div class="hint">Введіть текст для пошуку...</div>`;
// }

// function filterCheckups(searchValue) {
//   return checkups.filter((item) =>
//     item.name.toLowerCase().includes(searchValue)
//   );
// }

// function displayResults(filtered, container) {
//   container.innerHTML = filtered.length
//     ? filtered
//         .map(
//           (item) => `
//           <div class="item">
//             <span class="item__name">${item.name}</span>
//           </div>`
//         )
//         .join("")
//     : `<div class="no-results">Нічого не знайдено</div>`;
// }

// function performSearch() {
//   const searchValue = getSearchValue();
//   const resultsContainer = document.getElementById("resultsContainer");

//   if (searchValue === "") {
//     displayHint(resultsContainer);
//     return;
//   }

//   const filtered = filterCheckups(searchValue);
//   displayResults(filtered, resultsContainer);
// }

// function handleEnterKey(e) {
//   if (e.key === "Enter") {
//     e.preventDefault();
//     performSearch();
//   }
// }

// function handleInput() {
//   if (getSearchValue() === "") performSearch();
// }

// function toggleDropdown(e) {
//   e.preventDefault();
//   const dropdown = e.target.closest(".dropdown");
//   const dropdownContent = dropdown.querySelector(".dropdown-content");
//   const isOpen = dropdown.classList.toggle("open");
//   e.target.textContent = isOpen ? "−" : "+";
//   dropdownContent.style.display =
//     dropdownContent.style.display === "block" ? "none" : "block";
// }

// function closeDropdowns(e) {
//   if (!e.target.closest(".dropdown")) {
//     document.querySelectorAll(".dropdown-content").forEach((menu) => {
//       menu.style.display = "none";
//     });
//   }
// }

// export function initSearchModule() {
//   document
//     .getElementById("searchInput")
//     .addEventListener("keydown", handleEnterKey);
//   document.getElementById("searchInput").addEventListener("input", handleInput);

//   const plusIcons = document.querySelectorAll(".plus");
//   plusIcons.forEach((plus) => {
//     plus.addEventListener("click", toggleDropdown);
//   });

//   document.addEventListener("click", closeDropdowns);
// }
