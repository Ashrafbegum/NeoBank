import {
  populateCategories,
  updateCategories,
  handleFormSubmit,
  clearErrors
} from "./utils.js";
import { renderStatistics } from "./statistics-cards.js";
import {
  saveTransaction,
  renderTransactions,
  loadDataFromLocalStorage,
} from "../storage/localStorage.js";
import { createTransactionObject } from "./transaction.js";
import { openModal, closeModal } from "./modal.js";

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

function loadData() {
  loadDataFromLocalStorage();
  renderTransactions();
  renderStatistics();
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