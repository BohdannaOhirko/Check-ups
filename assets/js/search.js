const checkups = [
  { name: "Дорослий чекап", category: "adult" },
  { name: "Дорослий базовий чекап", category: "adult" },
  { name: "Дорослий розширений чекап", category: "adult" },
  { name: "Жіночий чекап", category: "women" },
  { name: "Жіночий базовий чекап", category: "women" },
  { name: "Жіночий розширений чекап", category: "women" },
  { name: "Чоловічий чекап", category: "men" },
  { name: "Чоловічий базовий чекап", category: "men" },
  { name: "Чоловічий розширений чекап", category: "men" },
  { name: "Дитячий чекап", category: "children" },
  { name: "Дитячий базовий", category: "children" },
  { name: "Дитячий розширений", category: "children" },
];

function getSearchValue() {
  return document.getElementById("searchInput").value.trim().toLowerCase();
}

function displayHint(container) {
  container.innerHTML = `<div class="hint">Введіть текст для пошуку...</div>`;
}

function filterCheckups(searchValue) {
  return checkups.filter((item) =>
    item.name.toLowerCase().includes(searchValue)
  );
}

function displayResults(filtered, container) {
  container.innerHTML = filtered.length
    ? filtered
        .map(
          (item) => `
          <div class="item">
            <span class="item__name">${item.name}</span>
          </div>`
        )
        .join("")
    : `<div class="no-results">Нічого не знайдено</div>`;
}

function performSearch() {
  const searchValue = getSearchValue();
  const resultsContainer = document.getElementById("resultsContainer");

  if (searchValue === "") {
    displayHint(resultsContainer);
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
  document
    .getElementById("searchInput")
    .addEventListener("keydown", handleEnterKey);
  document.getElementById("searchInput").addEventListener("input", handleInput);

  const plusIcons = document.querySelectorAll(".plus");
  plusIcons.forEach((plus) => {
    plus.addEventListener("click", toggleDropdown);
  });

  document.addEventListener("click", closeDropdowns);
}
