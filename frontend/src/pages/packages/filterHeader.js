const allFilterBtn = document.getElementById("all-btn");
const natFilterBtn = document.getElementById("nat-btn");
const interFilterBtn = document.getElementById("inter-btn");
const packages = document.querySelectorAll("#turistic-packages .packageCard");

const filterPackagesByType = (filterType) => {
  packages.forEach((pkg) => {
    const typePackage = pkg.getAttribute("data-type");

    if (filterType === "all" || typePackage === filterType) {
      pkg.classList.remove("hidden");
      pkg.classList.add("flex");
    } else {
      pkg.classList.remove("flex");
      pkg.classList.add("hidden");
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
