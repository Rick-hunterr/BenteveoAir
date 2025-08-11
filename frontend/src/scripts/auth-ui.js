const user = localStorage.getItem("token");
const registerBtn = document.getElementById("openRegistro");
const loginBtn = document.getElementById("openInicio");
const userContainer = document.getElementById("user-container");

if (user) {
  registerBtn.classList.add("hidden");
  loginBtn.classList.add("hidden");
  userContainer.classList.remove("hidden");
}
