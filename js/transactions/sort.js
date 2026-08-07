import { updateView } from "./updateView.js";
import { viewState } from "./viewState.js";

export function handleSort() {
  const sortSelect = document.getElementById("sortSelect");

  viewState.sortOrder = sortSelect.value;
  console.log("sort order");
  console.log(viewState.sortOrder);

  updateView();
}