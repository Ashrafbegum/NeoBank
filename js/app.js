import { createTransactionObject } from "./transaction.js";
import { populateCategories,   handleFormSubmit } from "./utils.js";
import { saveTransaction, renderTransactions } from "../storage/localStorage.js";

const addTransactionBtn = document.getElementById("addTransactionBtn");
const modal = document.getElementById("transactionModal");
const form = document.getElementById("transactionForm");
const closeModalMark = document.getElementById("closeModal");
const cancelModalBtn = document.getElementById("cancelModal");

/* Attach listeners */
addTransactionBtn.addEventListener("click", addTransaction);
form.addEventListener("submit", onSubmit);
closeModalMark.addEventListener("click", closeModal);
cancelModalBtn.addEventListener("click", closeModal);

  /* populate categories once*/
  populateCategories();

function addTransaction() {

    /* open modal */
  modal.classList.add("show");
}

function onSubmit(event) {
    const formData = handleFormSubmit(event);
    
    if(formData === null)
        return;

    const transaction = createTransactionObject(formData);

    saveTransaction(transaction);
    renderTransactions();

    // reset the form
    form.reset();

    closeModal();

}

function closeModal() {
  /* close modal */
  modal.classList.remove("show");
}