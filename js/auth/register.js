import { handleAuthFormSubmit } from "./authForm.js";
import { createUserObject } from "./user.js";
import { saveUser } from "../../storage/userStorage.js";
import { showToast } from "../../ui/toast.js";
import { clearErrors } from "./authForm.js";

const registerForm = document.getElementById("registerForm");

registerForm.addEventListener("submit", onSubmit);

function onSubmit(event) {
    event.preventDefault();

    const formData = handleAuthFormSubmit(event, "register");   
    if (formData === null) return;

    const user = createUserObject(formData);
    
      saveUser(user);
      showToast("register", "success"); 
      registerForm.reset();
      clearErrors("register");
      setTimeout (() =>  {
        window.location.replace("login.html"), 5000 
      });
}
