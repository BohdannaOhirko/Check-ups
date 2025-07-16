import { StorageManager } from "./storage-manager.js";
import { renderCheckupDetails } from "./checkup-renderer.js";

export function initCheckupPage() {
  const checkupId = new URLSearchParams(window.location.search).get("checkup");
  const container = document.getElementById("checkup-container");

  if (!checkupId || !container) {
    container.innerHTML = "<p>Чекап не знайдено.</p>";
    return;
  }

  fetch("/data/data.json")
    .then((res) => res.json())
    .then((data) => {
      const checkup = data.checkups.find((item) => item.id === checkupId);
      if (!checkup) {
        container.innerHTML = "<p>Чекап не знайдено.</p>";
        return;
      }

      const selected = StorageManager.getSelectedCheckup();
      const selectedPackage = selected.package || "basic";

      renderCheckupDetails(checkup, container, selectedPackage);
    })
    .catch((err) => {
      console.error("Помилка при завантаженні JSON:", err);
      container.innerHTML =
        "<p>Не вдалося завантажити дані. Спробуйте пізніше.</p>";
    });
}
