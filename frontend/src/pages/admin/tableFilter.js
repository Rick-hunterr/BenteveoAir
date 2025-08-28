//============================================================================
//============================== FILTROS ===================================
//============================================================================
const allTables_Btn = document.getElementById("allTables_Btn");
const packagesTable_Btn = document.getElementById("packagesTable_Btn");
const ordersTable_Btn = document.getElementById("ordersTable_Btn");
const usersTable_Btn = document.getElementById("usersTable_Btn");
const tables = document.querySelectorAll("table");

const filterPackagesByType = (filterType) => {
  tables.forEach((table) => {
    const typeTable = table.getAttribute("data-type");

    if (filterType === "all" || typeTable === filterType) {
      table.classList.remove("hidden");
    } else {
      table.classList.add("hidden");
    }
  });
};

allTables_Btn.addEventListener("click", () => {
  filterPackagesByType("all");
});

packagesTable_Btn.addEventListener("click", () => {
  filterPackagesByType("packages_Table");
});

ordersTable_Btn.addEventListener("click", () => {
  filterPackagesByType("orders_Table");
});

usersTable_Btn.addEventListener("click", () => {
  filterPackagesByType("users_Table");
});