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

      const form = modalContent.querySelector("#checkupForm");
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

          modal.classList.remove("show");
          modalContent.innerHTML = "";
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

openModalBtns.forEach((button) => {
  button.addEventListener("click", () => {
    modal.classList.add("show");
    loadForm(modal, modalContent);
  });
});

window.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.classList.remove("show");
    modalContent.innerHTML = "";
  }
});
