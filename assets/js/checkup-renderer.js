export function renderCheckupDetails(
  checkup,
  container,
  showPackageToggle = true
) {
  console.log("replaceBannerWithCheckup запускається", checkup);
  if (!checkup || !container) {
    console.error("Не передано чекап або контейнер");
    return;
  }

  container.innerHTML = `
  <div class="checkup-layout">
    <div class="checkup-image-column">
      <img src="${checkup.image}" alt="${checkup.name}" class="checkup-img" />
    </div>
    <div class="checkup-info-column">
      <h3>${checkup.name} чекап</h3>
      <p>${checkup.description}</p>

      ${
        showPackageToggle
          ? `
        <nav aria-label="Перемикач пакета">
          <ul>
            <li><button class="switch-btn active" data-type="basic">Базовий</button></li>
            <li><button class="switch-btn" data-type="extended">Розширений</button></li>
          </ul>
        </nav>
      `
          : ""
      }

      <div class="package-details"></div>
    </div>
  </div>
`;

  const detailsDiv = container.querySelector(".package-details");

  const showPackage = (type) => {
    const pkg = checkup.packages?.[type];
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
      <p class="price-color">Базова вартість: від ${pkg.base_price} грн</p>
    `;
  };

  if (showPackageToggle) {
    showPackage("basic");
    const buttons = container.querySelectorAll(".switch-btn");
    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        buttons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        showPackage(btn.dataset.type);
      });
    });
  } else {
    showPackage("basic");
  }
}
export function replaceBannerWithCheckup(checkup) {
  const oldBanner = document.getElementById("initialBanner");
  if (!oldBanner) {
    console.error(" Банер не знайдено");
    return;
  }

  const newBanner = document.createElement("section");
  newBanner.className = "checkup-details";
  newBanner.id = "initialBanner";

  document.body.replaceChild(newBanner, oldBanner);

  renderCheckupDetails(checkup, newBanner, true);
}
