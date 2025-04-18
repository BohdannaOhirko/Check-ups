const checkups = [
  { name: "Дорослий чекап", category: "adult" },
  { name: "Дорослий базовий чекап", category: "adult" },
  { name: "Дорослий розширений чекап", category: "women" },
  { name: "Жіночий чекап", category: "women" },
  { name: "Жіночий базовий чекап", category: "women" },
  { name: "Жіночий розширений чекап", category: "women" },
  { name: "Чоловічий чекап", category: "men" },
  { name: "Чоловічий базовий чекап", category: "men" },
  { name: "Чоловічий розширений чекап", category: "men" },
  { name: "Дитячий чекап", category: "men" },
  { name: "Дитячий базовий", category: "children" },
  { name: "Дитячий розширений", category: "children" },
];

function performSearch() {
  const searchValue = document
    .getElementById("searchInput")
    .value.trim()
    .toLowerCase();
  const resultsContainer = document.getElementById("resultsContainer");
  if (searchValue === "") {
    resultsContainer.innerHTML = `<div class="hint">Введіть текст для пошуку...</div>`;
    return;
  }

  const filtered = checkups.filter((item) =>
    item.name.toLowerCase().includes(searchValue)
  );

  resultsContainer.innerHTML = filtered.length
    ? filtered.map((item) => `<div class="item">${item.name}</div>`).join("")
    : `<div class="no-results">Нічого не знайдено</div>`;
}
const searchGlass = document.querySelector(".icon");
searchGlass.addEventListener("click", performSearch);

document.addEventListener("DOMContentLoaded", function () {
  const plusIcons = document.querySelectorAll(".plus");

  plusIcons.forEach((plus) => {
    plus.addEventListener("click", function (e) {
      e.preventDefault();
      const dropdown = this.closest(".dropdown");
      const dropdownContent = dropdown.querySelector(".dropdown-content");

      if (dropdownContent.style.display === "block") {
        dropdownContent.style.display = "none";
      } else {
        dropdownContent.style.display = "block";
      }
    });
  });

  document.addEventListener("click", function (e) {
    if (!e.target.closest(".dropdown")) {
      document.querySelectorAll(".dropdown-content").forEach((menu) => {
        menu.style.display = "none";
      });
    }
  });
});
