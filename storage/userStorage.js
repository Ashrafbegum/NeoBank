let users = [];

//Local storage for registered users
export function loadUsersFromLocalStorage() {
  users = JSON.parse(localStorage.getItem("RegisteredUsers")) || [];
}

export function saveUsersToLocalStorage() {
  localStorage.setItem("RegisteredUsers", JSON.stringify(users));
}

export function saveUser(user) {
  users.push(user);
  saveUsersToLocalStorage();
}

//session storage to save logged In user 
export function saveLoggedInId(user) {
  sessionStorage.setItem("LoggedInUserId", JSON.stringify(user.id));
}

export function getLoggedInId() {
  return JSON.parse(sessionStorage.getItem("LoggedInUserId"));
}

export function getLoggedInUser(data) {
  return users.find(
    (user) =>
      user.email === data.email && user.password === data.password,
  );
}

export function getLoggedInUserById(id) {

  return users.find((user) => user.id === id);
}

export function logoutUser(id) {
  sessionStorage.removeItem("LoggedInUserId");
}