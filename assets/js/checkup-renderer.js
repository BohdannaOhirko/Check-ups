let currentStep = 1;

export function showStep(step) {
  document.querySelectorAll(".form-step").forEach((el, index) => {
    if (index === step - 1) {
      el.classList.remove("hide");
      el.classList.add("show");
    } else {
      el.classList.remove("show");
      el.classList.add("hide");
    }
  });
}

export function nextStep() {
  currentStep = 2;
  showStep(currentStep);
}

export function prevStep() {
  currentStep = 1;
  showStep(currentStep);
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("checkupForm");
  const nextBtn = document.getElementById("nextBtn");
  const prevBtn = document.getElementById("prevBtn");

  if (nextBtn) {
    nextBtn.addEventListener("click", nextStep);
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", prevStep);
  }

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      document
        .querySelectorAll(".form-step")
        .forEach((el) => el.classList.add("hide"));
      document.getElementById("successMessage").classList.remove("hide");
      document.getElementById("successMessage").classList.add("show");
    });
  }
});
