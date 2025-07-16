export const StorageManager = {
  saveCheckup(checkupId, packageType) {
    try {
      localStorage.setItem("selectedCheckup", checkupId);
      localStorage.setItem("selectedPackage", packageType);
    } catch (e) {
      console.error("Помилка збереження чекапу:", e);
    }
  },

  getSelectedCheckup() {
    try {
      return {
        id: localStorage.getItem("selectedCheckup"),
        package: localStorage.getItem("selectedPackage") || "basic",
      };
    } catch (e) {
      console.error("Помилка зчитування чекапу:", e);
      return { id: null, package: "basic" };
    }
  },

  clearSelection() {
    try {
      localStorage.removeItem("selectedCheckup");
      localStorage.removeItem("selectedPackage");
    } catch (e) {
      console.error("Помилка очищення чекапу:", e);
    }
  },

  save(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error(`Помилка збереження даних по ключу "${key}"`, e);
    }
  },

  load(key) {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (e) {
      console.error(`Помилка зчитування даних по ключу "${key}"`, e);
      return null;
    }
  },

  remove(key) {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.error(`Помилка видалення ключа "${key}"`, e);
    }
  },

  clearAll() {
    try {
      localStorage.clear();
    } catch (e) {
      console.error("Помилка повного очищення localStorage", e);
    }
  },
};
