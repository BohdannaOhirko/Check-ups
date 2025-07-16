import { renderCheckup } from "./checkup-renderer.js";

document.addEventListener("DOMContentLoaded", function () {
  const submenus = document.querySelectorAll(".submenu > a");

  submenus.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const content = this.nextElementSibling;
      content.classList.toggle("open");
    });
  });

  const submenuLinks = document.querySelectorAll(".submenu-content a");

  submenuLinks.forEach((link) => {
    link.addEventListener("click", async function (e) {
      e.preventDefault();
      const hash = this.getAttribute("href");
      if (!hash || !hash.startsWith("#")) return;

      const checkupId = hash.substring(1);
      await renderCheckup(checkupId);
    });
  });
});
