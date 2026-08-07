import { updateView } from "./updateView.js";
import { viewState } from "./viewState.js";

export function handleFilter() {
  const filterSelect = document.getElementById("filterSelect");

  viewState.filterType = filterSelect.value.toLowerCase();
  
  updateView();
}
