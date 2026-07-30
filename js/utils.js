const categoryMap = {
  Income: [
    "Salary",
    "Bonus",
    "Freelance",
    "Business",
    "Investment",
    "Interest",
    "Gift",
    "Other Income",
  ],

  Expense: [
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

  Transfer: [
    "Savings",
    "Checking",
    "Credit Card Payment",
    "Internal Transfer",
    "External Transfer",
  ],
};

export function populateCategories() {
  const typeSelect = document.getElementById("type");

  typeSelect.addEventListener("change", updateCategories);

}

function updateCategories() {
     const typeSelect = document.getElementById("type");

     const categorySelect = document.getElementById("category");

     /* update categories for the selected type */
     const categories = categoryMap[typeSelect.value] || null;

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

export function handleFormSubmit(event) {

  /* Prevent default behaviour of the browser */
  event.preventDefault();

  const formData = getFormData();

  const isErrors = validateForm(formData);

  /* check if isErrors object has properties */
  if(Object.keys(isErrors).length > 0) {
    displayErrors(isErrors);
    return null;
  }

  return formData;
};

function getFormData() {
  const titleInput = document.getElementById("title");
  const amountInput = document.getElementById("amount");
  const typeSelect = document.getElementById("type");
  const categorySelect = document.getElementById("category");

  const title = titleInput.value;
  const amount = Number(amountInput.value);
  const type = typeSelect.value;
  const category = categorySelect.value;

  return {
     title,
     amount,
     type,
     category
  };
}

 function validateForm(formData) {
  const errors = {};
  
  if(formData.title.trim() === "")
    errors.title = "Please enter the title";

  if(formData.amount <= 0)
    errors.amount = "Amount must be greater than zero";

  if(formData.type === "")
    errors.type = "Please select the type";

  if(formData.category === "")
    errors.category = "Please select the category";

  /* return errors object */
  return errors;
};

function displayErrors(errors) {
  clearErrors();

  if(errors.title) {
     document.getElementById("titleError").textContent = errors.title;
  }

  if (errors.amount) 
     document.getElementById("amountError").textContent = errors.amount;

  if (errors.type)
      document.getElementById("typeError").textContent = errors.type;

  if (errors.category)
      document.getElementById("categoryError").textContent = errors.category;
};

function clearErrors() {
  document.getElementById("titleError").textContent = "";
  document.getElementById("amountError").textContent = "";
  document.getElementById("typeError").textContent = "";
  document.getElementById("categoryError").textContent = "";
};

