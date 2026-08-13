import { loadUsersFromLocalStorage } from "../../storage/userStorage.js";
import { handleAuthFormSubmit } from "./authForm.js";
import { getLoggedInUser, saveLoggedInId } from "../../storage/userStorage.js";
import { showToast } from "../../ui/toast.js";
import { clearErrors } from "./authForm.js";

const loginForm = document.getElementById("loginForm");
const loginBtn = document.getElementById("loginBtn");

document.addEventListener("DOMContentLoaded", onLoad);
loginForm.addEventListener("submit", onSubmit);

function onLoad() {
  loadUsersFromLocalStorage();
}

function onSubmit(event) {
  event.preventDefault();
  
  const formData = handleAuthFormSubmit(event, "login") ;

   if (formData === null) return;

   const user = getLoggedInUser(formData);

  if (!user) {
    showToast("invalidCredentials", "error");
    loginForm.reset();
    clearErrors("login");
  } else {
    saveLoggedInId(user);
    showToast("login", "success");
    window.location.replace("index.html");
  }
}
