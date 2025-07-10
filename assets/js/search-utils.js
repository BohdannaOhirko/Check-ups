export function getSearchValue() {
  return document.getElementById("searchInput").value.trim().toLowerCase();
}

export function filterCheckups(searchValue, checkups) {
  const normalized = searchValue.trim().toLowerCase();

  if (!normalized) return [];

  return checkups.filter((item) => {
    const name = item.name?.toLowerCase() || "";
    const description = item.description?.toLowerCase() || "";
    const keywords = (item.keywords || []).join(" ").toLowerCase();

    return (
      name.includes(normalized) ||
      description.includes(normalized) ||
      keywords.includes(normalized)
    );
  });
}
