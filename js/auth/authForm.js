import { getLoggedInId } from "../../storage/userStorage.js";

export function handleAuthFormSubmit(event, formType) {
  event.preventDefault();
  const formData = getFormData(event, formType);
  const errors = validateForm(formData, formType);
  const hasErrors = checkErrors(errors, formType);

  if (hasErrors) return null;

  return formData;
}

function getFormData(event, formType) {
  let data = {};
  // get login and register form data
  data.email = document.getElementById("email").value;

  data.password = document.getElementById("password").value;

  // get register form data
  if (formType === "register") {
    data.userName = document.getElementById("username").value;

    data.confirmPassword = document.getElementById("confirmPassword").value;
  }
  return data;
}

function validateForm(formData, formType) {
  const errors = {};

  if (formData.email.trim() === "") errors.email = "Please enter email address";
  else {
    const result = testEmail(formData.email);
    if (!result) errors.email = "Please enter correct email address";
  }

  if (formData.password === "") errors.password = "Please enter password";
  else {
    const result = checkPasswordStrength(formData.password);
    if (result === "Weak password")
      errors.password = "Please enter a strong password";
  }

  if (formType === "register") {
    if (formData.userName.trim() === "")
      errors.userName = "Please enter user name";

    if (formData.confirmPassword === "")
      errors.confirmPassword = "Please enter confirm password";
    if (formData.password !== formData.confirmPassword)
      errors.confirmPassword = "Password and confirm password don't match";
  }

  /* return errors object */
  return errors;
}

function checkErrors(errors, formType) {
  /* check if errors object has properties */
  if (Object.keys(errors).length > 0) {
    displayErrors(errors, formType);
    return true;
  }

  clearErrors();

  return false;
}

function displayErrors(errors, formType) {
  clearErrors();

  if (errors.email)
    document.getElementById("emailError").textContent = errors.email;

  if (errors.password)
    document.getElementById("passwordError").textContent = errors.password;

  if (formType === "register") {
    if (errors.userName)
      document.getElementById("usernameError").textContent = errors.userName;

    if (errors.confirmPassword)
      document.getElementById("confirmPasswordError").textContent =
        errors.confirmPassword;
  }
}

export function clearErrors(formType) {
  document.getElementById("emailError").textContent = "";
  document.getElementById("passwordError").textContent = "";

  if (formType === "register") {
    document.getElementById("usernameError").textContent = "";
    document.getElementById("confirmPasswordError").textContent = "";
  }
}

function testEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

function checkPasswordStrength(password) {
  if (password.length < 8) return "Weak password";
  else {
    //test checks if the pattern exists in a string
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasDigits = /[0-9]/.test(password);
    const hasSpecial = /[!@#$%^&*]/.test(password);

    if (hasUpper && hasLower && hasDigits && hasSpecial)
      return "Strong password";
    else return "Medium password";
  }
}

export function checkAuthentication() {
  const loggedInUserId = sessionStorage.getItem("LoggedInUserId");
  if(!loggedInUserId) {
    window.location.href = "login.html";
    return false;
  }

  return true;
}