import { nextStep, prevStep } from "./checkup-renderer.js"; // обов'язково!

const modal = document.getElementById("formModal");
const openModalBtns = document.querySelectorAll(".openFormBtn");
const modalContent = document.getElementById("modal");

export function loadForm(modal, modalContent) {
  fetch("/main/apointment-form.html")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Помилка при завантаженні форми: " + response.status);
      }
      return response.text();
    })
    .then((data) => {
      modalContent.innerHTML = data;

      // 👉 Знаходимо кнопки після вставки форми
      const nextBtn = modalContent.querySelector("#nextBtn");
      const prevBtn = modalContent.querySelector("#prevBtn");
      const form = modalContent.querySelector("#checkupForm");

      if (nextBtn) nextBtn.addEventListener("click", nextStep);
      if (prevBtn) prevBtn.addEventListener("click", prevStep);

      if (form) {
        form.addEventListener("submit", (event) => {
          event.preventDefault();

          const formData = new FormData(event.target);
          console.log("Name:", formData.get("name"));
          console.log("Phone:", formData.get("phone"));
          console.log("Email:", formData.get("email"));
          console.log("Datetime:", formData.get("datetime"));
          console.log("Checkup:", formData.get("checkup"));
          console.log("Consent:", formData.get("consent"));

          // Показуємо повідомлення про успіх
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
      console.error("Помилка:", error);
      modalContent.innerHTML = "<p>Вибачте, не вдалося завантажити форму.</p>";
    });
}
