import { updateFilters } from "./updateFilters.js";
import { filtersState } from "./filtersState.js";

export function handleSort() {
  const sortSelect = document.getElementById("sortSelect");

  filtersState.sortOrder = sortSelect.value;

  updateFilters();
}