export const toastMessages = {
  deposit: "Amount deposited successfully",
  withdraw: "Amount withdrawn successfully",
  transfer: "Amount transfered successfully",
  delete: "Transaction deleted successfully",
  addTransaction: "Transaction added successfully",
  insufficientAmount: "Insufficient amount",
};

const toastTypes = ["success", "error"];
export function showToast(message, type = "success") {
  const toast = document.getElementById("toast");

  // if type is not in the list , set to success
  if (!toastTypes.includes(type)) type = "success";

  toast.textContent = toastMessages[message];
  toast.className = `toast ${type} show`;

  /* Another way to add classes:
    
    //First Remove previous type
    toast.classList.remove("success", "error", "warning");

    //then add type
    toast.classList.add(type, "show"); */

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}
