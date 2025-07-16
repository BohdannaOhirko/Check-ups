import { StorageManager } from './storage-manager.js';

export const FormValidator = {
  rules: {
    name: {
      required: true,
      minLength: 2,
      pattern: /^[а-яА-ЯіІїЇєЄґҐa-zA-Z\s'-]+$/,
    },
    phone: {
      required: true,
      pattern: /^(\+38)?0\d{9}$/,
    },
    email: {
      required: true,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
  },

  validate(field) {
    const rules = this.rules[field.name];
    const value = field.value.trim();

    if (rules?.required && !value) {
      return { valid: false, message: "Це поле обов'язкове" };
    }

    if (rules?.minLength && value.length < rules.minLength) {
      return { valid: false, message: `Мінімум ${rules.minLength} символи` };
    }

    if (rules?.pattern && !rules.pattern.test(value)) {
      return { valid: false, message: "Неправильний формат" };
    }

    return { valid: true };
  },

  showError(field, message) {
    this.clearError(field);
    const errorEl = document.createElement("span");
    errorEl.className = "error-message";
    errorEl.textContent = message;
    field.classList.add("error");
    field.parentElement.appendChild(errorEl);
  },

  clearError(field) {
    field.classList.remove("error");
    const errorEl = field.parentElement.querySelector(".error-message");
    if (errorEl) errorEl.remove();
  },
};


const FORM_KEY = "checkupFormData";

function saveFormData(form) {
  const data = {};
  Array.from(form.elements).forEach((el) => {
    if (!el.name) return;
    data[el.name] = el.type === 'checkbox' ? el.checked : el.value;
  });
  StorageManager.save(FORM_KEY, data);
}

function loadFormData(form) {
  const data = StorageManager.load(FORM_KEY);
  if (!data) return;
  Object.entries(data).forEach(([name, value]) => {
    const el = form.elements[name];
    if (!el) return;
    if (el.type === 'checkbox') {
      el.checked = value;
    } else {
      el.value = value;
    }
  });
}

function clearFormData() {
  StorageManager.remove(FORM_KEY);
}

export function initFormValidation() {
  const form = document.getElementById("checkupForm");
  loadFormData(form);
  form.addEventListener('input', () => saveFormData(form));
  if (!form) return;

  const nextBtn = document.getElementById("nextBtn");
  const prevBtn = document.getElementById("prevBtn");

  nextBtn?.addEventListener("click", () => {
    let isValid = true;

    ["name", "phone", "email"].forEach((fieldName) => {
      const field = form.elements[fieldName];
      const result = FormValidator.validate(field);

      if (!result.valid) {
        isValid = false;
        FormValidator.showError(field, result.message);
      } else {
        FormValidator.clearError(field);
      }
    });

    if (isValid) {
      clearFormData();
      form
        .querySelectorAll(".form-step")
        .forEach((step) => step.classList.add("hide"));
      form.querySelectorAll(".form-step")[1].classList.remove("hide");
    }
  });

  prevBtn?.addEventListener("click", () => {
    form
      .querySelectorAll(".form-step")
      .forEach((step) => step.classList.add("hide"));
    form.querySelectorAll(".form-step")[0].classList.remove("hide");
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let isValid = true;

    const datetime = form.elements["datetime"];
    const checkup = form.elements["checkup"];
    const consent = form.elements["consent"];

    if (!datetime.value.trim()) {
      isValid = false;
      showError(datetime, "Це поле обов'язкове");
    } else {
      clearError(datetime);
    }

    if (!checkup.value) {
      isValid = false;
      showError(checkup, "Це поле обов'язкове");
    } else {
      clearError(checkup);
    }

    if (!consent.checked) {
      isValid = false;
      showError(consent, "Необхідна згода");
    } else {
      clearError(consent);
    }

    if (isValid) {
      clearFormData();
      form.querySelector("#successMessage").style.display = "block";
      form.reset();
    }
  });
}

function showError(field, message) {
  const errorEl =
    field.parentElement.querySelector(".error-message") ||
    document.createElement("span");
  errorEl.className = "error-message";
  errorEl.textContent = message;
  field.classList.add("error");
  field.parentElement.appendChild(errorEl);
}

function clearError(field) {
  field.classList.remove("error");
  const errorEl = field.parentElement.querySelector(".error-message");
  if (errorEl) errorEl.remove();
}
