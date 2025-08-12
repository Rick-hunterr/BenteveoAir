const user = localStorage.getItem("token");
const registerBtn = document.getElementById("open-register");
const loginBtn = document.getElementById("open-login");
const userContainer = document.getElementById("user-container");

if (user) {
  registerBtn.classList.add("hidden");
  loginBtn.classList.add("hidden");
  userContainer.classList.remove("hidden");
}
