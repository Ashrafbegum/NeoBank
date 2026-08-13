class User {
  constructor(userName, email, password) {
    this.id = crypto.randomUUID();
    this.userName = userName,
    this.email = email,
    this.password = password
  }
}

export function createUserObject(data) {
  let user = new User(data.userName, data.email, data.password);
  return user;
}
