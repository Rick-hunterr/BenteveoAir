const API_URL = 'http://localhost:3000';

//=========================================================================
//======================== Mostrar inicio de sesion =======================
//=========================================================================

const modalWrapper = document.getElementById('inicioWrapper');
const modal = document.getElementById('inicio');
const openModal = document.getElementById('openInicio');
const closeModal = document.getElementById('closeInicio');
const volverI = document.getElementById('volver-I');
const volverR = document.getElementById('volver-R');

const cerrarModal = document.getElementById("cerrarModal")
const confirmarPaquete =  document.getElementById("confirmarPaquete");
const modal1 = document.getElementById("modalPaquete");

openModal.addEventListener('click', () => {
  modalWrapper.classList.remove('hidden');
  modal.showModal();
});

volverR.addEventListener('click', (e) => {
  e.preventDefault();
  modal.close();
  modalWrapper.classList.add('hidden');
  registroWrapper.classList.remove('hidden');
  registro.showModal();
});

closeModal.addEventListener('click', () => {
  modal.close();
  modalWrapper.classList.add('hidden');
});

modalWrapper.addEventListener('click', (e) => {
  if (e.target === modalWrapper) {
    modal.close();
  }
});

modal.addEventListener('click', (e) => {
  e.stopPropagation();
});

// Ejemplo de nombre admin

document.querySelector("#inicioWrapper").addEventListener("submit", (e) => {
  e.preventDefault();

  const username = document.querySelector("#email-login").value;
  const password = document.querySelector("#password-login").value;

  if (username === "Carlos" && password === "2123") {
    localStorage.setItem("usuarioActual", JSON.stringify({
      nombre: username,
      rol: "admin"
    }));

    window.location.href = "admin.html";
  } else {
    localStorage.setItem("usuarioActual", JSON.stringify({
      nombre: username,
      rol: "usuario"
    }));

    window.location.href = "index.html";
  }
});

//=========================================================================
//======================== Mostrar registro ===============================
//=========================================================================

const registroWrapper = document.getElementById('registroWrapper');
const registro = document.getElementById('registro');
const openRegistro = document.getElementById('openRegistro');
const closeRegistro = document.getElementById('closeRegistro');


openRegistro.addEventListener('click', () => {
  registroWrapper.classList.remove('hidden');
  registro.showModal();
});

closeRegistro.addEventListener('click', () => {
  registro.close();
  registroWrapper.classList.add('hidden');
});

volverI.addEventListener('click', (e) => {
  e.preventDefault();
  registro.close();
  registroWrapper.classList.add('hidden');
  modalWrapper.classList.remove('hidden');
  modal.showModal();
});

registroWrapper.addEventListener('click', (e) => {
  if (e.target === registroWrapper) {
    registro.close();
  }
});

//=========================================================================
//======================== Mostrar/ocultar contraseña =====================
//=========================================================================

/* Inicio de sesión */
const passwordLogin = document.getElementById("password-login");
const mostrarLogin = document.getElementById("mostrar-login");
const ocultarLogin = document.getElementById("ocultar-login");

mostrarLogin.addEventListener("click", () => {
  passwordLogin.type = "text";
  mostrarLogin.classList.add("hidden");
  ocultarLogin.classList.remove("hidden");
});

ocultarLogin.addEventListener("click", () => {
  passwordLogin.type = "password";
  ocultarLogin.classList.add("hidden");
  mostrarLogin.classList.remove("hidden");
});

/* Registro */
const passwordRegister = document.getElementById("password-register");
const mostrarRegister = document.getElementById("mostrar-register");
const ocultarRegister = document.getElementById("ocultar-register");

mostrarRegister.addEventListener("click", () => {
  passwordRegister.type = "text";
  mostrarRegister.classList.add("hidden");
  ocultarRegister.classList.remove("hidden");
});

ocultarRegister.addEventListener("click", () => {
  passwordRegister.type = "password";
  ocultarRegister.classList.add("hidden");
  mostrarRegister.classList.remove("hidden");
});



//=========================================================================
//=============== modal de confirmación cargar paquete ====================
//=========================================================================
if (confirmarPaquete) {
  confirmarPaquete.addEventListener("click", () => {
    modal1.classList.add("hidden");
});
}





//=========================================================================
//=============GUARDAR DATOS DEL FORMULARIO EN LA BASE DE DATOS===========
//=========================================================================


const formLogin = document.getElementById("form-inicio");
const formRegistro = document.getElementById("form-registro");  

//=========================================================================
//============================== LOGIN ====================================
//=========================================================================
if (formLogin) {
  formLogin.addEventListener("submit", async e => {
    console.log("Formulario de inicio de sesión enviado");
    e.preventDefault();

    const email = document.getElementById("email-login").value.trim();
    const contraseña = document.getElementById("password-login").value;

    if (!email || !contraseña) {
      alert("Email y contraseña son requeridos");
      return;
    }

    try {
      const resp = await fetch(`${API_URL}/usuarios/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, contraseña })
      });
      const data = await resp.json();

      if (!resp.ok) {
        alert(data.error || "Error en login");
        return;
      }

      localStorage.setItem("token", data.token);
      alert("¡Login exitoso!");
      modal.close();
      modalWrapper.classList.add("hidden");


    } catch (err) {
      console.error("Fetch login:", err);
      alert("No se pudo conectar al servidor");
    }
  });
}

//=========================================================================
//============================== CERRAR SESIÓN ==========================
//=========================================================================
const userMenuBtn = document.getElementById("userMenuBtn");
const userDropdown = document.getElementById("userDropdown");
const logoutBtn = document.getElementById("logoutBtn");

if (userMenuBtn && userDropdown) {
  userMenuBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    userDropdown.classList.toggle("hidden");
  });

  window.addEventListener("click", (e) => {
    if (!userMenuBtn.contains(e.target) && !userDropdown.contains(e.target)) {
      userDropdown.classList.add("hidden");
    }
  });
}

if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("token");
    alert("Sesión cerrada");
    location.reload(); 
  });
}


//=========================================================================
//============================== REGISTRO =================================
//=========================================================================

if (formRegistro) {
  formRegistro.addEventListener("submit", async e => {
    console.log("Formulario de registro enviado");
    e.preventDefault();

    const nombre = document.getElementById("user-register").value.trim();
    const email = document.getElementById("email-register").value.trim();
    const contraseña = document.getElementById("password-register").value;

    if (!nombre || !email || !contraseña) {
      alert("Todos los campos son obligatorios");
      return;
    }
    if (contraseña.length < 4) {
      alert("La contraseña debe tener al menos 4 caracteres");
      return;
    }

    try {
      const resp = await fetch(`${API_URL}/usuarios`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, email, contraseña, rol: "cliente" })
      });
      const data = await resp.json();

      if (!resp.ok) {
        alert(data.error || "Error al registrar");
        return;
      }

      alert("Registro exitoso. Por favor inicia sesión.");
      registro.close();
      registroWrapper.classList.add("hidden");
      modalWrapper.classList.remove("hidden");
      modal.showModal();

    } catch (err) {
      console.error("Fetch registro:", err);
      alert("No se pudo conectar al servidor");
    }
  });
}