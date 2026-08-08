import { updateFilters } from "./updateFilters.js";
import { filtersState } from "./filtersState.js";

export function handleFilter() {
  const filterSelect = document.getElementById("filterSelect");

  filtersState.filterType = filterSelect.value.toLowerCase();
  
  updateFilters();
}
