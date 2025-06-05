const listaTurnos = document.getElementById("lista-turnos");

function Menu () {
  const sidebar = document.getElementById('sidebar');
  const toggleButton = document.getElementById('toggleSidebar');

  toggleButton.addEventListener('click', () => {
    sidebar.classList.toggle('-translate-x-full');
  });
}

Menu();

function renderizarTodosLosTurnos() {
  listaTurnos.innerHTML = ""; // Limpiar antes de renderizar de nuevo
  const datos = JSON.parse(localStorage.getItem("turnosGuardados")) || [];

  datos.forEach(turno => {
    const li = document.createElement("span");
    li.innerHTML = `
      <div class="text-gray-100 p-6 m-2 border rounded shadow bg-gray-800 flex flex-col sm:flex-row justify-evenly gap-5">
        <div>
          <h2 class="pb-3 text-2xl font-bold">${turno.nombre}</h2>
          <p><b>DNI: </b>${turno.dni}</p>
          <p><b>Teléfono: </b>${turno.telefono}</p>
        </div>
        <div class="text-xl p-2">
         <p><b>Día:</b> ${turno.fecha}</p>
          <p><b>Hora: </b>${turno.hora}</p>
          <p><b>Médico:</b> ${turno.medico || "No asignado"}</p>
        </div>
        <div class="flex flex-col aligh-center gap-2">
          <button 
            class="text-gray-900 bg-red-400 p-2 rounded-xl hover:bg-red-300 eliminar-btn"
            data-dni="${turno.dni}">
            Eliminar turno
          </button>
        </div>
      </div>
    `;

    listaTurnos.appendChild(li);
  });

  // Asociar evento a cada botón de eliminar
  const botonesEliminar = document.querySelectorAll(".eliminar-btn");

  botonesEliminar.forEach(btn => {
    btn.addEventListener("click", (e) => {
      const dniAEliminar = e.target.getAttribute("data-dni");
      eliminarTurno(dniAEliminar);
    });
  });
}

function eliminarTurno(dni) {
  let turnos = JSON.parse(localStorage.getItem("turnosGuardados")) || [];
  // Filtramos quitando el turno con ese DNI
  const turnosActualizados = turnos.filter(t => t.dni !== dni);
  // Guardamos en localStorage
  localStorage.setItem("turnosGuardados", JSON.stringify(turnosActualizados));
  // Volvemos a mostrar la lista
  renderizarTodosLosTurnos();
}

renderizarTodosLosTurnos();
