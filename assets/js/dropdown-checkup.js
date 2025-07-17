import { renderCheckup } from "./checkup-renderer.js";

document.addEventListener("DOMContentLoaded", function () {
  const dropdownToggle = document.querySelector(".dropdown-toggle");
  const dropdown = dropdownToggle.closest(".dropdown");

  let lockOpen = false;

  dropdownToggle.addEventListener("click", function (e) {
    e.preventDefault();
    lockOpen = !dropdown.classList.contains("open");
    dropdown.classList.toggle("open");
  });

  dropdown.addEventListener("mouseenter", () => {
    if (!lockOpen) dropdown.classList.add("open");
  });

  dropdown.addEventListener("mouseleave", () => {
    if (!lockOpen) {
      dropdown.classList.remove("open");
      document
        .querySelectorAll(".submenu-content")
        .forEach((submenu) => submenu.classList.remove("open"));
    }
  });

  const submenus = document.querySelectorAll(".submenu");

  submenus.forEach((submenu) => {
    submenu.addEventListener("mouseenter", function () {
      submenus.forEach((s) => {
        if (s !== submenu) {
          const content = s.querySelector(".submenu-content");
          if (content) content.classList.remove("open");
        }
      });
    });
  });

  const submenuLinks = document.querySelectorAll(".submenu > a");

  submenuLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const clickedContent = this.nextElementSibling;

      document.querySelectorAll(".submenu-content").forEach((submenu) => {
        if (submenu !== clickedContent) submenu.classList.remove("open");
      });

      if (
        clickedContent &&
        clickedContent.classList.contains("submenu-content")
      ) {
        clickedContent.classList.toggle("open");
      }
    });
  });

  // ✅ ЦЕ ГОЛОВНЕ: обробка кліку по пункту чекапу
  const checkupLinks = document.querySelectorAll(".submenu-content a");

  checkupLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const hash = this.getAttribute("href");
      if (!hash || !hash.startsWith("#")) return;

      const checkupId = hash.substring(1);
      renderCheckup(checkupId);
    });
  });

  document.addEventListener("click", function (e) {
    if (!dropdown.contains(e.target)) {
      dropdown.classList.remove("open");
      lockOpen = false;
      document
        .querySelectorAll(".submenu-content")
        .forEach((submenu) => submenu.classList.remove("open"));
    }
  });
});
