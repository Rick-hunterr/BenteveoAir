const allFilterBtn = document.getElementById("all-btn");
const natFilterBtn = document.getElementById("nat-btn");
const interFilterBtn = document.getElementById("inter-btn");

const filterPackagesByType = (filterType) => {
  packages.forEach((package) => {
    const typePackage = package.getAttribute("data-type");

    if (filterType === "all" || typePackage === filterType) {
      package.classList.remove("hidden");
      package.classList.add("flex");
    } else {
      package.classList.remove("flex");
      package.classList.add("hidden");
    }
  });
};

allFilterBtn.addEventListener("click", () => {
  filterPackagesByType("all");
});

natFilterBtn.addEventListener("click", () => {
  filterPackagesByType("national");
});

interFilterBtn.addEventListener("click", () => {
  filterPackagesByType("international");
});
