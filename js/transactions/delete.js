import { deleteTransaction } from "../../storage/localStorage.js";
import { showToast, toastMessages } from "../../ui/toast.js";

export function handleDelete(event) {
  /* closest() is a built-in DOM method that searches upward in the HTML tree for the nearest ancestor (or the element itself) that matches a CSS selector.
  
  Here it matches button element */

  const deleteBtn = event.target.closest(".delete-btn");

  if (deleteBtn) {
    const id = deleteBtn.dataset.id;
    deleteTransaction(id);
    showToast("delete", "success");
  }
};