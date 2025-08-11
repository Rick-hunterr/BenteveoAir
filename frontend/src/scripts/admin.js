//============================================================================
//============================== MODALES ===================================
//============================================================================
const modalsContainer = document.getElementById("modalsContainer");

//============================================================================
//========================= MODAL DE USUARIO ===============================
//============================================================================
const userMenu_Btn = document.getElementById("userMenu_Btn");
const perfilModal = document.getElementById("perfilModal");
const closePerfil = document.getElementById("closePerfil");

if (userMenu_Btn && modalsContainer) {
  userMenu_Btn.addEventListener("click", (e) => {
    e.stopPropagation();
    modalsContainer.classList.remove("hidden");
    perfilModal.classList.remove("hidden");
    perfilModal.showModal();
  });

  window.addEventListener("click", (e) => {
    if (!userMenu_Btn.contains(e.target) && !modalsContainer.contains(e.target)){
      perfilModal.close();
      perfilModal.classList.add("hidden");
      modalsContainer.classList.add("hidden");
    }
  });
}

closePerfil.addEventListener("click", () => {
  perfilModal.close();
  perfilModal.classList.add("hidden");
  modalsContainer.classList.add("hidden");
});

// //============================================================================
// //========================= CAMBIAR DATOS MODAL ============================
// //============================================================================
const cambiarDatosAdmin_Btn = document.getElementById("cambiarDatosAdmin_Btn");
const datosAdmin_Modal = document.getElementById("datosAdmin_Modal");
const guardarDatosAdmin_Btn = document.getElementById("guardarDatosAdmin_Btn");
const cerrarDatosAdmin = document.getElementById("cerrarDatosAdmin");

cambiarDatosAdmin_Btn.addEventListener("click", (e) => {
  e.preventDefault();
  perfilModal.close();
  perfilModal.classList.add("hidden");

  datosAdmin_Modal.classList.remove("hidden");
  datosAdmin_Modal.showModal();
});

cerrarDatosAdmin.addEventListener("click", () => {
  datosAdmin_Modal.close();
  datosAdmin_Modal.classList.add("hidden");
  modalsContainer.classList.add("hidden");
});

guardarDatosAdmin_Btn.addEventListener("click", () => {
  datosAdmin_Modal.close();
  datosAdmin_Modal.classList.add("hidden");
  modalsContainer.classList.add("hidden");
});

//=========================================================================
//============================== CERRAR SESIÓN ==========================
//=========================================================================
const logout_Btn = document.getElementById("logout_Btn");

if (logout_Btn) {
  logout_Btn.addEventListener("click", () => {
    perfilModal.close();
    perfilModal.classList.add("hidden");
    modalsContainer.classList.add("hidden");
    
    localStorage.removeItem("token");
    alert("Sesión cerrada");
    location.reload();
  });
}

//============================================================================
//============================== FILTROS ===================================
//============================================================================
const allTables_Btn = document.getElementById("allTables_Btn");
const packagesTable_Btn = document.getElementById("packagesTable_Btn");
const usersTable_Btn = document.getElementById("usersTable_Btn");

const filterPackagesByType = (filterType) => {
  tables.forEach((table) => {
    const typeTable = table.getAttribute("data-type");

    if (filterType === "all" || typeTable === filterType) {
      table.classList.remove("hidden");
      table.classList.add("flex");
    } else {
      table.classList.remove("flex");
      table.classList.add("hidden");
    }
  });
};

allTables_Btn.addEventListener("click", () => {
  console.log("all");
  filterPackagesByType("all");
});

packagesTable_Btn.addEventListener("click", () => {
  console.log("packages");
  filterPackagesByType("packages");
});

usersTable_Btn.addEventListener("click", () => {
  console.log("users");
  filterPackagesByType("users");
});

//============================================================================
//============================== BOTONES DE ACCIONES =========================
//============================================================================
const confirmDelete_Modal = document.getElementById("confirmDelete_Modal");
const cellValues = [];
let tRow;

function editarLinea(edit_Btn){
  let tRow = edit_Btn.parentNode.parentNode.parentNode;
  const tCells = tRow.children;
  
  for (let i = 1; i < tCells.length - 1; i++){
    cellValues[i] = tCells[i].innerText;
    tCells[i].contentEditable = "true";
  }
  
  edit_Btn.style.display = "none";
  edit_Btn.nextElementSibling.style.display = "none";
  edit_Btn.nextElementSibling.nextElementSibling.style.display = "inline-block";
  edit_Btn.nextElementSibling.nextElementSibling.nextElementSibling.style.display = "inline-block";
}

let isDelete;

function eliminarLinea(delete_Btn){
  tRow = delete_Btn.parentNode.parentNode.parentNode;

  modalsContainer.style.display = "flex";
  confirmDelete_Modal.style.display = "flex";
  confirmDelete_Modal.showModal();
}

function closeDelete_Modal(isDelete){
  modalsContainer.style.display = "none";
  confirmDelete_Modal.style.display = "none";
  confirmDelete_Modal.close();
  
  if(isDelete){
    tRow.parentNode.removeChild(tRow);
  }; 
}

function confirmarLinea(confirm_Btn){
  tRow = confirm_Btn.parentNode.parentNode.parentNode;
  const tCells = tRow.children;

  for (let i = 1; i < tCells.length - 1; i++){
    tCells[i].contentEditable = "false";
  }
  
  confirm_Btn.previousElementSibling.previousElementSibling.style.display = "inline-block";
  confirm_Btn.previousElementSibling.style.display = "inline-block";
  confirm_Btn.style.display = "none";
  confirm_Btn.nextElementSibling.style.display = "none";
}

function cancelarLinea(cancel_Btn){
  tRow = cancel_Btn.parentNode.parentNode.parentNode;
  const tCells = tRow.children;

  for (let i = 1; i < tCells.length - 1; i++){
    tCells[i].innerText = cellValues[i];
    tCells[i].contentEditable = "false";
  }
  
  cancel_Btn.previousElementSibling.previousElementSibling.previousElementSibling.style.display = "inline-block";
  cancel_Btn.previousElementSibling.previousElementSibling.style.display = "inline-block";
  cancel_Btn.previousElementSibling.style.display = "none";
  cancel_Btn.style.display = "none";
}