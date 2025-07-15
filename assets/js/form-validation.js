import { nextStep, prevStep } from "./form-renderer.js";

/**
 * Завантажує HTML форми у модальне вікно
 * @param {HTMLElement} modal - модалка (#formModal)
 * @param {HTMLElement} modalContent - вміст модалки (#modal)
 */
export function loadForm(modal, modalContent) {
  modalContent.innerHTML = "";

  fetch("/main/apointment-form.html")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Помилка при завантаженні форми: " + response.status);
      }
      return response.text();
    })
    .then((html) => {
      modalContent.innerHTML = html;

      const nextBtn = modalContent.querySelector("#nextBtn");
      const prevBtn = modalContent.querySelector("#prevBtn");
      const form = modalContent.querySelector("#checkupForm");

      if (nextBtn) nextBtn.addEventListener("click", nextStep);
      if (prevBtn) prevBtn.addEventListener("click", prevStep);

      if (form) {
        form.addEventListener("submit", (event) => {
          event.preventDefault();

          const formData = new FormData(event.target);
          console.table(Object.fromEntries(formData.entries()));

          form
            .querySelectorAll(".form-step")
            .forEach((el) => el.classList.add("hide"));

          const successMsg = form.querySelector("#successMessage");
          if (successMsg) {
            successMsg.classList.remove("hide");
            successMsg.classList.add("show");
          }
        });
      }

      const closeModalBtn = modalContent.querySelector("#closeFormModal");
      if (closeModalBtn) {
        closeModalBtn.addEventListener("click", () => {
          modal.classList.remove("show");
          modalContent.innerHTML = "";
        });
      }
    })
    .catch((error) => {
      console.error("Помилка завантаження форми:", error);
      modalContent.innerHTML =
        "<p class='form-error' style='text-align:center;'>Форма недоступна. Спробуйте пізніше.</p>";
    });
  console.log("Форма вставлена в DOM:", modalContent.innerHTML);
}
