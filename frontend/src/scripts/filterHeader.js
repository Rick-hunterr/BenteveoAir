const allFilterBtn = document.getElementById("all-btn");
const natFilterBtn = document.getElementById("nat-btn");
const interFilterBtn = document.getElementById("inter-btn");

packages.forEach((package) => {
  const typePackage = package.getAttribute("data-type");

  allFilterBtn.addEventListener("click", () => {
    package.classList.remove("hidden");
    package.classList.add("flex");
  });

  natFilterBtn.addEventListener("click", () => {
    if (typePackage == "international") {
      package.classList.remove("flex");
      package.classList.add("hidden");
    } else {
      package.classList.remove("hidden");
      package.classList.add("flex");
    }
  });

  interFilterBtn.addEventListener("click", () => {
    if (typePackage == "national") {
      package.classList.remove("flex");
      package.classList.add("hidden");
    } else {
      package.classList.remove("hidden");
      package.classList.add("flex");
    }
  });
});