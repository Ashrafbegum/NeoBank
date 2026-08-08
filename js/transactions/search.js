import { updateFilters } from "./updateFilters.js";
import { filtersState } from "./filtersState.js";

export function handleSearch(event){
  filtersState.searchTerm = event.target.value.toLowerCase().trim();

  updateFilters();
};