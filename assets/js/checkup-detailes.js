export function initCheckupPage() {
  const checkupId = new URLSearchParams(window.location.search).get("checkup");

  fetch("/data/data.json")
    .then((res) => res.json())
    .then((data) => {
      const container = document.getElementById("checkup-container");
      const checkup = data.checkups.find((item) => item.id === checkupId);

      if (checkup) {
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
          detailsDiv.innerHTML = `
              <h4>${pkg.name} пакет</h4>
              <ul>
                ${pkg.services.map((s) => `<li>${s}</li>`).join("")}
              </ul>
              <p>Базова вартість: від ${pkg.base_price} грн</p>
            `;
        };

        showPackage("basic");

        const buttons = container.querySelectorAll(".switch-btn");
        buttons.forEach((btn) => {
          btn.addEventListener("click", () => {
            showPackage(btn.dataset.type);
          });
        });
      } else {
        container.innerHTML = "<p>Чекап не знайдений.</p>";
      }
    })
    .catch((err) => {
      console.error("Помилка при завантаженні JSON:", err);
    });
}
