import { renderizarTurno } from "./renderTurnos.js";

let turnos = JSON.parse(localStorage.getItem("turnosGuardados")) || [];
let pacienteActivo = null;

function normalizarTexto(texto) {
  return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

export function leerData(data, url, contenedorFetch, contenedorMedicos) {
  const buscadores = document.querySelectorAll(".buscador");

  if (url.includes("pacientes") && contenedorFetch) {
    function mostrarPacientes(lista) {
      contenedorFetch.innerHTML = "";
      lista.forEach(paciente => {
        const div = document.createElement("div");
        div.className = "p-6 m-2 border rounded shadow bg-blue-100 flex flex-col sm:flex-row justify-evenly gap-5";
        div.innerHTML = `
          <div>
            <h2 class="pb-3 text-2xl font-bold">${paciente.nombre}</h2>
            <p><b>DNI: </b>${paciente.dni}</p>
            <p><b>Obra Social: </b>${paciente.obraSocial}</p>
          </div>
          <div class="p-2">
            <p><b>Edad: </b>${paciente.edad}</p>
            <p><b>Dirección: </b>${paciente.direccion}</p>
            <p><b>Teléfono: </b>${paciente.telefono}</p>
            <p><b>Email: </b>${paciente.email}</p>
          </div>
          <div class="flex flex-col aligh-center gap-5">
            <button class="asignar-turno bg-blue-300 p-2 rounded-xl hover:bg-blue-400">Asignar<br>Turno</button>
          </div>
        `;

        const btnTurno = div.querySelector(".asignar-turno");
        const modal = document.getElementById("modal-turno");
        const formTurno = document.getElementById("form-turno");
        const inputNombre = document.getElementById("nombre-paciente");
        const inputFecha = document.getElementById("fecha-turno");
        const inputHora = document.getElementById("hora-turno");
        const cancelarBtn = document.getElementById("cancelar-turno");

        btnTurno.addEventListener("click", () => {
          pacienteActivo = paciente;
          inputNombre.value = `${paciente.nombre} (DNI: ${paciente.dni})`;
          inputFecha.value = "";
          inputHora.value = "";
          modal.classList.remove("hidden");

          formTurno.onsubmit = e => {
            e.preventDefault();
            const fecha = inputFecha.value;
            const hora = inputHora.value;

            const selectMedico = document.getElementById("medico-turno");
            const medico = selectMedico.options[selectMedico.selectedIndex].text;

            if (fecha && hora && pacienteActivo) {
              const nuevoTurno = {
                nombre: pacienteActivo.nombre,
                dni: pacienteActivo.dni,
                telefono: pacienteActivo.telefono,
                fecha,
                hora,
                medico
              };

              turnos.unshift(nuevoTurno);
              localStorage.setItem("turnosGuardados", JSON.stringify(turnos));
              renderizarTurno(nuevoTurno);
              modal.classList.add("hidden");
              pacienteActivo = null;
            }
          };

          cancelarBtn.onclick = () => {
            modal.classList.add("hidden");
            pacienteActivo = null;
          };
        });

        contenedorFetch.appendChild(div);
      });
    }

    mostrarPacientes(data);

    buscadores.forEach(buscador => {
      buscador.addEventListener("input", () => {
        const texto = normalizarTexto(buscador.value);
        const filtrados = data.filter(p =>
          normalizarTexto(p.nombre).includes(texto) ||
          normalizarTexto(p.direccion).includes(texto) ||
          p.dni.toString().includes(texto)
        );
        mostrarPacientes(filtrados);
      });
    });
  }

  if (url.includes("medicos") && contenedorMedicos) {
    function mostrarMedicos(lista) {
      contenedorMedicos.innerHTML = "";
      lista.forEach(medico => {
        contenedorMedicos.innerHTML += `
          <div class="p-6 m-2 border rounded shadow bg-green-100 flex flex-col sm:flex-row justify-evenly gap-5">
            <div>
              <h2 class="pb-3 text-2xl font-bold">${medico.nombre}</h2>
              <p><b>Matrícula: </b>${medico.matricula}</p>
            </div>
            <div class="p-2">
              <p><b>Especialidad: </b>${medico.especialidad}</p>
              <p><b>Teléfono: </b>${medico.telefono}</p>
              <p><b>Email: </b>${medico.email}</p>
            </div>
          </div>
        `;
      });
    }

    mostrarMedicos(data);

    buscadores.forEach(buscador => {
      buscador.addEventListener("input", () => {
        const texto = normalizarTexto(buscador.value);
        const filtrados = data.filter(m =>
          normalizarTexto(m.nombre).includes(texto) ||
          normalizarTexto(m.especialidad).includes(texto) ||
          m.matricula.toString().includes(texto)
        );
        mostrarMedicos(filtrados);
      });
    });
  }
}

