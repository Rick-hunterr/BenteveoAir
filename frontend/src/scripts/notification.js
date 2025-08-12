const notification = document.getElementById("notification");
const modalPackage = document.getElementById("package-modal");
let counter = JSON.parse(localStorage.getItem("packages") || "[]").length;

if (modalPackage) {
  const confirmPkgBtn = modalPackage.querySelector("#confirm-package");

  confirmPkgBtn.addEventListener("click", () => {
    counter++;
    notification.textContent = counter;
  });
}

notification.textContent = counter;
