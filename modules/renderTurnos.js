export function renderizarTurno(turno) {
  const listaTurnos = document.getElementById("lista-turnos");
  if (!listaTurnos) {
    console.error("No se encontró el elemento con id 'lista-turnos'");
    return;
  }

  const li = document.createElement("li");
  li.textContent = `${turno.nombre} (DNI: ${turno.dni}) (Telefono: ${turno.telefono}) - ${turno.fecha} a las ${turno.hora}`;
  listaTurnos.appendChild(li);
}
