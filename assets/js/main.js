// Масив чекапів
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

// Пошук чекапів
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

// Отримати значення з поля пошуку
function getSearchValue() {
  return document.getElementById("searchInput").value.trim().toLowerCase();
}

// Вивести підказку для користувача
function displayHint(container) {
  container.innerHTML = `<div class="hint">Введіть текст для пошуку...</div>`;
}

// Фільтрація чекапів за значенням пошуку
function filterCheckups(searchValue) {
  return checkups.filter((item) =>
    item.name.toLowerCase().includes(searchValue)
  );
}

// Вивести результати пошуку або повідомлення про відсутність результатів
function displayResults(filtered, container) {
  container.innerHTML = filtered.length
    ? filtered
        .map(
          (item) =>
            `<div class="item">
               <span class="item__name">${item.name}</span>
             </div>`
        )
        .join("")
    : `<div class="no-results">Нічого не знайдено</div>`;
}

// Обробка натискання Enter
function handleEnterKey(e) {
  if (e.key === "Enter") {
    e.preventDefault();
    performSearch();
  }
}

// Динамічне очищення результатів пошуку
function handleInput() {
  if (getSearchValue() === "") performSearch();
}

// Зміна знаку плюс/мінус
function toggleDropdown(e) {
  e.preventDefault();
  const dropdown = e.target.closest(".dropdown");
  const dropdownContent = dropdown.querySelector(".dropdown-content");
  const isOpen = dropdown.classList.toggle("open");

  // Заміна знака на мінус або плюс
  e.target.textContent = isOpen ? "−" : "+";

  // Показ або приховування підменю
  dropdownContent.style.display =
    dropdownContent.style.display === "block" ? "none" : "block";
}

// Закрити меню, якщо клікнули поза ним
function closeDropdowns(e) {
  if (!e.target.closest(".dropdown")) {
    document.querySelectorAll(".dropdown-content").forEach((menu) => {
      menu.style.display = "none";
    });
  }
}

// Ініціалізація слухачів подій
function initEventListeners() {
  // Слухач події для пошуку
  document
    .getElementById("searchInput")
    .addEventListener("keydown", handleEnterKey);
  document.getElementById("searchInput").addEventListener("input", handleInput);

  // Слухачі для меню плюс/мінус
  const plusIcons = document.querySelectorAll(".plus");
  plusIcons.forEach((plus) => {
    plus.addEventListener("click", toggleDropdown);
  });

  // Закриття меню, якщо клікнули поза ним
  document.addEventListener("click", closeDropdowns);
}

// Запуск ініціалізації при завантаженні документа
document.addEventListener("DOMContentLoaded", initEventListeners);
