import {
  populateCategories,
  updateCategories,
  handleFormSubmit,
  clearErrors
} from "./utils.js";
import { renderStatistics } from "./statistics-cards.js";
import {
  saveTransaction,
  loadDataFromLocalStorage,
} from "../storage/localStorage.js";
import { renderTransactions } from "../ui/renderTransactions.js";
import { createTransactionObject } from "./transaction.js";
import { openModal, closeModal } from "./modal.js";
import { handleDelete } from "./transactions/delete.js";
import { handleSearch } from "./transactions/search.js";
import { handleSort } from "./transactions/sort.js";
import { handleFilter } from "./transactions/filter.js";

const transactionModal = document.getElementById("transactionModal");
const modal = document.getElementById("modal");

const transactionCloseModalBtn = document.getElementById(
  "transactionCloseModal",
);
const transactionCancelModalBtn = document.getElementById(
  "transactionCancelModal",
);

const closeModalBtn = document.getElementById("closeModal");
const cancelModalBtn = document.getElementById("cancelModal");

const transactionForm = document.getElementById("transactionForm");
const form = document.getElementById("form");

const actionBtns = document.querySelectorAll("[data-action]");

 const modalHeading = document.getElementById("modalHeading");

 const modalSubmitBtn = document.getElementById("modalSubmitBtn");

 const transactionTable = document.getElementById("transactionTable");

 const searchInput = document.getElementById("searchInput");

 const sortSelect = document.getElementById("sortSelect");

/* Attach listeners */
document.addEventListener("DOMContentLoaded", loadData);

form.addEventListener("submit", onSubmit);
transactionForm.addEventListener("submit", onSubmit);

transactionCloseModalBtn.addEventListener("click", (event) =>
  resetAndCloseModal(transactionModal, transactionForm, "addTransaction")
);

transactionCancelModalBtn.addEventListener("click", (event) =>
  resetAndCloseModal(transactionModal, transactionForm, "addTransaction")
);

closeModalBtn.addEventListener("click", (event) =>
  resetAndCloseModal(modal, form, "other-actions")
);

cancelModalBtn.addEventListener("click", (event) =>
  resetAndCloseModal(modal, form, "other-actions")
);

/* This listener required to handle delete operation */
transactionTable.addEventListener("click", handleDelete);

/* Fires instantly on every character keystroke, text deletion, or mouse paste */
searchInput.addEventListener("input", handleSearch);

sortSelect.addEventListener("change", handleSort);

filterSelect.addEventListener("change", handleFilter);

function loadData() {
  loadDataFromLocalStorage();
  renderTransactions();
  renderStatistics();
  handleSort();
  handleFilter();
}

/* populate categories once for add transacion action*/
populateCategories();

/* handle events on all buttons: deposit, withdraw, transfer and add transaction */

actionBtns.forEach((button) => {
  button.addEventListener("click", () => {

    // read dataset defined on buttons in index.html as data-action
    const action = button.dataset.action;
 
    switch (action) {
      case "deposit":
        /* define data-action attribute on form dynamically to get action value in form submit handler */
        form.dataset.action = "deposit";
        updateCategories("income");

        modalHeading.textContent = "Deposit Form";

        modalSubmitBtn.textContent = "Deposit";
        openModal(modal);

        break;

      case "withdraw":
        form.dataset.action = "withdraw";
        updateCategories("expense");

        modalHeading.textContent = "Withdraw Form";

        modalSubmitBtn.textContent = "Withdraw";

        openModal(modal);
        break;

      case "transfer":
        form.dataset.action = "transfer";
        updateCategories("transfer");

        modalHeading.textContent = "Transfer Form";

        modalSubmitBtn.textContent = "Transfer";

        openModal(modal);
        break;

      case "add-transaction": // case must be as defined according to dataset; addTransaction is wrong
        transactionForm.dataset.action = "addTransaction";
        openModal(transactionModal);
        break;

      default:
        console.error(`Unknown action: ${action}`);
    }
  });
});

function onSubmit(event) {
  const form = event.currentTarget; // the form that fired submit
  const action = form.dataset.action; // the action button

  const formData = handleFormSubmit(event, action);

  if (formData === null) return;

  const transaction = createTransactionObject(formData);

  saveTransaction(transaction);
  renderTransactions();
  renderStatistics();

  // reset the form
  form.reset();

  if (action === "addTransaction")
    resetAndCloseModal(transactionModal, transactionForm, "addTransaction");
  else // for other actions: deposit, withdraw, transfer
    resetAndCloseModal(modal, form, "other-actions");
}

/* reset and close modal */
function resetAndCloseModal(modal, form, action) {

  form.reset();

  clearErrors(action);

  closeModal(modal);
}