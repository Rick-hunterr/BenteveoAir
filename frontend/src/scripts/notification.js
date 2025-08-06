const notification = document.getElementById("notification");
const addToCartBtns = document.querySelectorAll(".add-to-cart");
let counter = JSON.parse(localStorage.getItem("packages") || "[]").length;

if (addToCartBtns.length > 0) {
  addToCartBtns.forEach((addToCartBtn) => {
    addToCartBtn.addEventListener("click", () => {
      counter++;
      notification.textContent = counter;
    });
  });
}

notification.textContent = counter;
