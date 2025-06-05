let turnos = JSON.parse(localStorage.getItem("turnosGuardados")) || [];

// Paso 1: Fecha actual sin hora
const hoy = new Date();
hoy.setHours(0, 0, 0, 0);

// Paso 2: Filtrar turnos futuros o de hoy
const turnosFuturos = turnos.filter(turno => {
  const fecha = new Date(turno.fecha);
  fecha.setHours(0, 0, 0, 0);
  return fecha >= hoy;
});

// Paso 3: Encontrar la fecha más cercana
let fechaMasCercana = null;
if (turnosFuturos.length > 0) {
  fechaMasCercana = turnosFuturos.reduce((min, turno) => {
    return new Date(turno.fecha) < new Date(min.fecha) ? turno : min;
  }).fecha;
}

// Paso 4: Filtrar turnos de esa fecha
const turnosMasCercanos = fechaMasCercana
  ? turnosFuturos.filter(turno => turno.fecha === fechaMasCercana)
  : [];

// Paso 5: Renderizar los turnos en la tabla
const tablaBody = document.getElementById("tabla-turnos");
tablaBody.innerHTML = ""; // Limpiar contenido anterior

turnosMasCercanos.forEach(turno => {
  const tr = document.createElement("tr");
  tr.classList.add("border-t");

  tr.innerHTML = `
    <td class="py-2 px-4">${turno.nombre}</td>
    <td class="py-2 px-4">${formatearFecha(turno.fecha)}</td>
    <td class="py-2 px-4">${turno.hora}</td>
    <td class="py-2 px-4">${turno.medico}</td>
    <td class="py-2 px-4 text-green-600">Confirmado</td>
  `;

  tablaBody.appendChild(tr);
});

// Paso 7: Mostrar cantidad de turnos hoy
const turnosHoy = turnos.filter(turno => {
  const fechaTurno = new Date(turno.fecha);
  fechaTurno.setHours(0, 0, 0, 0);
  return fechaTurno.getTime() === hoy.getTime();
});
document.getElementById("total-turnos-hoy").textContent = turnosHoy.length;

// Función para mostrar la fecha en formato dd/mm/yyyy
function formatearFecha(fechaStr) {
  const [año, mes, dia] = fechaStr.split("-");
  return `${dia}/${mes}/${año}`;
}
