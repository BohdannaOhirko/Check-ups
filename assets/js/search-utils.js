export function getSearchValue() {
  return document.getElementById("searchInput").value.trim().toLowerCase();
}

export function filterCheckups(searchValue, checkups) {
  const normalized = searchValue.trim().toLowerCase();
  if (!normalized) return [];

  const words = normalized.split(/\s+/);

  return checkups.filter((item) => {
    const name = (item.name || "").toLowerCase();
    const description = (item.description || "").toLowerCase();
    const keywords = (item.keywords || []).join(" ").toLowerCase();

    return words.every(
      (word) =>
        name.includes(word) ||
        description.includes(word) ||
        keywords.includes(word)
    );
  });
}
