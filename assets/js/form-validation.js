export function initModalClose() {
  const openButtons = document.querySelectorAll(".openFormBtn");
  const closeBtn = document.getElementById("closeFormModal");
  const modal = document.getElementById("formModal");
  const iframe = document.getElementById("modalIframe");

  openButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      iframe.src = "/main/apointment-form.html";
      modal.style.display = "flex";
    });
  });

  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
    iframe.src = "";
  });
}
