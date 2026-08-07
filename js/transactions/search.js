import { updateView } from "./updateView.js";
import { viewState } from "./viewState.js";

export function handleSearch(event){
  viewState.searchTerm = event.target.value.toLowerCase().trim();

  updateView();
};