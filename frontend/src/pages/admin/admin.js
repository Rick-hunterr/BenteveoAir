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
//============================== BOTONES DE ACCIONES =========================
//============================================================================
const confirmDelete_Modal = document.getElementById("confirmDelete_Modal");
const cellValues = [];
let tRow;
let tCells;

function editarLinea(edit_Btn){
  tRow = edit_Btn.parentNode.parentNode.parentNode;
  tCells = tRow.children;
  
  for (let i = 1; i < tCells.length - 1; i++){
    cellValues[i] = tCells[i].innerText;
    tCells[i].contentEditable = "true";
  }
  
  edit_Btn.style.display = "none";
  edit_Btn.nextElementSibling.style.display = "none";
  edit_Btn.nextElementSibling.nextElementSibling.style.display = "inline-block";
  edit_Btn.nextElementSibling.nextElementSibling.nextElementSibling.style.display = "inline-block";
}

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
  tCells = tRow.children;

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
  tCells = tRow.children;

  for (let i = 1; i < tCells.length - 1; i++){
    tCells[i].innerText = cellValues[i];
    tCells[i].contentEditable = "false";
  }
  
  cancel_Btn.previousElementSibling.previousElementSibling.previousElementSibling.style.display = "inline-block";
  cancel_Btn.previousElementSibling.previousElementSibling.style.display = "inline-block";
  cancel_Btn.previousElementSibling.style.display = "none";
  cancel_Btn.style.display = "none";
}

function crearLinea(create_Btn){
  tRow = create_Btn.parentNode.parentNode.parentNode;
  tCells = tRow.children;
  const alltRows = tRow.parentNode.children;
  let isEmpty;

  for (let i = 1; i < tCells.length - 1; i++){
    if(tCells[i].innerText == ""){
      isEmpty = true;
    }
    else{tCells[i].contentEditable = "false";}
  }
  
  if(isEmpty){
    alert("Por favor llene todas las columnas");
  }
  else{
    tCells[0].innerText = alltRows.length;

    nuevaLineaVacia();

    create_Btn.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.style.display = "inline-block";
    create_Btn.previousElementSibling.previousElementSibling.previousElementSibling.style.display = "inline-block";

    create_Btn.parentElement.removeChild(create_Btn);
  }
}

function nuevaLineaVacia(){
  const newtRow = document.createElement("tr");

  newtRow.innerHTML += '<td class="border border-gray-400 px-4 py-2"></td>'
  for (let i = 1; i < tCells.length - 1; i++){
    newtRow.innerHTML += '<td contenteditable="true" class="border border-gray-400 px-4 py-2"></td>'
  }
  newtRow.innerHTML += '<td class="border border-gray-400 px-4 py-2"></td>'
  
  let newtCells = newtRow.children;

  newtCells[newtCells.length - 1].innerHTML += '<div class="flex flex-wrap gap-2 justify-center">' + '<button onclick="editarLinea(this)" class="editRow_Btn hidden">Editar</button>' +
  '<button onclick="eliminarLinea(this)" class="deleteRow_Btn hidden">Eliminar</button>' + '<button onclick="confirmarLinea(this)" class="confirmRow_Btn hidden">Confirmar</button>' +
  '<button onclick="cancelarLinea(this)" class="cancelRow_Btn hidden">Cancelar</button>' + '<button onclick="crearLinea(this)" class="createRow_Btn">Crear</button></div>';

  tRow.parentNode.appendChild(newtRow);

  newtRow.classList.add("text-center", "bg-gray-100", "hover:bg-gray-200");
  for (let i = 0; i < newtCells.length; i++){
    newtCells[i].classList.add("border", "border-gray-400", "px-4", "py-2");
  }
}