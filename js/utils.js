const categoryMap = {
  income: [
    "Salary",
    "Bonus",
    "Freelance",
    "Business",
    "Investment",
    "Interest",
    "Gift",
    "Other Income",
  ],

  expense: [
    "Groceries",
    "Rent",
    "Utilities",
    "Shopping",
    "Travel",
    "Food & Dining",
    "Healthcare",
    "Entertainment",
    "Fuel",
    "Other Expense",
  ],

  transfer: [
    "Savings",
    "Checking",
    "Credit Card Payment",
    "Internal Transfer",
    "External Transfer",
  ],
};

export function populateCategories() {
  const typeSelect = document.getElementById("transactionType");

  typeSelect.addEventListener("change", () => updateCategories("addTransaction"));
}

export function updateCategories(action) {
  let typeSelect = "";
  let categorySelect = "";
  let categories = [];
  if(action === "addTransaction") {
      typeSelect = document.getElementById("transactionType");

     categorySelect = document.getElementById("transactionCategory");

     /* update categories for the selected type */
    categories = categoryMap[typeSelect.value] || [];
  }

  else {
      /* update categories for the type: deposit/withdraw/transfer */
     categorySelect = document.getElementById("category");  
    categories = categoryMap[action] || [];
  }

  /* Remove old select category options , if any */
  categorySelect.textContent = "";
  categorySelect.innerHTML = `<option value="">Select Category</option>`;

  /* Create category options for the selected type */
  categories.forEach((categoryName) => {
    const option = document.createElement("option");
    option.textContent = categoryName;
    categorySelect.appendChild(option);
  });
}

export function handleFormSubmit(event, action) {
  
  /* Prevent default behaviour of the browser */
  event.preventDefault();

  switch (action) {
    case "deposit": 
    case "withdraw":
    case "transfer": {
      const formData = getFormData(action);

      const errors = validateForm(formData, action);

      const hasErrors = checkErrors(errors, action);

      if (hasErrors)
         return null;

      return formData;
    }

    case "addTransaction": {
      const formData = getFormData(action);

      const errors = validateForm(formData, action);

      const hasErrors = checkErrors(errors, action);

      if (hasErrors) 
        return null;

      return formData;
    }
    default:
      console.error(`Unknown action: ${action}`);
  }
}

function getFormData(action) {
  let typeValue = "";
  if (action === "addTransaction") {
    return {
      title: document.getElementById("transactionTitle").value,
      amount: Number(document.getElementById("transactionAmount").value),
      type: document.getElementById("transactionType").value,
      category: document.getElementById("transactionCategory").value,
    };
  }

  if(action === "deposit")
      typeValue = "income";
  else if (action === "withdraw")
      typeValue = "expense";
  else
      typeValue = "transfer";

  return {
    title: document.getElementById("title").value,
    amount: Number(document.getElementById("amount").value),
    type: typeValue,
    category: document.getElementById("category").value,
  };
}

function validateForm(formData, action) {
  const errors = {};

  if (formData.title.trim() === "") errors.title = "Please enter the title";

  if (formData.amount <= 0) errors.amount = "Amount must be greater than zero";

  if (formData.category === "") errors.category = "Please select the category";

  if (action === "addTransaction" && formData.type === "")
    errors.type = "Please select the type";

  /* return errors object */
  return errors;
}

function checkErrors(errors, action) {
  /* check if isErrors object has properties */
  if (Object.keys(errors).length > 0) {
    displayErrors(errors, action);
    return true;
  }

  clearErrors(action);

  return false;
}

function displayErrors(errors, action) {
  clearErrors(action);

  if (action === "addTransaction") {
    if (errors.title)
      document.getElementById("transactionTitleError").textContent =
        errors.title;

    if (errors.amount)
      document.getElementById("transactionAmountError").textContent =
        errors.amount;

    if (errors.type)
      document.getElementById("transactionTypeError").textContent = errors.type;

    if (errors.category)
      document.getElementById("transactionCategoryError").textContent =
        errors.category;

    return;
  }

  if (errors.title)
    document.getElementById("titleError").textContent = errors.title;

  if (errors.amount)
    document.getElementById("amountError").textContent = errors.amount;

  if (errors.category)
    document.getElementById("categoryError").textContent = errors.category;
}

export function clearErrors(action) {
  
  if (action === "addTransaction") {
    document.getElementById("transactionTitleError").textContent = "";
    document.getElementById("transactionAmountError").textContent = "";
    document.getElementById("transactionTypeError").textContent = "";
    document.getElementById("transactionCategoryError").textContent = "";

    return;
  }

  document.getElementById("titleError").textContent = "";
  document.getElementById("amountError").textContent = "";
  document.getElementById("categoryError").textContent = "";
}