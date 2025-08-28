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

  newtRow.innerHTML += '<td class="tableData"></td>'
  for (let i = 1; i < tCells.length - 1; i++){
    newtRow.innerHTML += '<td contenteditable="true" class="tableData"></td>'
  }
  newtRow.innerHTML += '<td class="tableData"></td>'
  
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

//============================================================================
//============================== BÚSQUEDA ===================================
//============================================================================
const searchInput = document.getElementById('search_input');

searchInput.addEventListener('input', function() {
  filterSpecificTable(
    this.value
  );
});

function filterSpecificTable(searchTerm) {
  if (!tables) return;
  
  let tRows = document.querySelectorAll('tr');
  let tHeader = document.querySelectorAll('thead');

  const term = searchTerm.toLowerCase();
  
  tRows.forEach(row => {
    const text = row.textContent.toLowerCase();
    row.style.display = text.includes(term) ? '' : 'none';
  });

  for (let i = 0; i < tHeader.length; i++){
    console.log(tHeader[i].firstElementChild);
    tHeader[i].firstElementChild.style.display = 'table-row';
  }
}