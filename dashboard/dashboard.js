let turnos = JSON.parse(localStorage.getItem("turnosGuardados")) || [];
const hoy = new Date();
hoy.setHours(0, 0, 0, 0);

// Filtrar turnos futuros o de hoy
const turnosFuturos = turnos.filter(turno => {
  const fecha = new Date(turno.fecha + "T00:00:00");
  fecha.setHours(0, 0, 0, 0);
  return fecha >= hoy;
});

//Encontrar la fecha más cercana
let fechaMasCercana = null;
if (turnosFuturos.length > 0) {
  fechaMasCercana = turnosFuturos.reduce((min, turno) => {
    return new Date(turno.fecha + "T00:00:00") < new Date(min.fecha + "T00:00:00") ? turno : min;
  }).fecha;
}

// Filtrar turnos de esa fecha
const turnosMasCercanos = fechaMasCercana
  ? turnosFuturos.filter(turno => turno.fecha === fechaMasCercana)
  : [];

//Renderizar turnos en la tabla
const tablaBody = document.getElementById("tabla-turnos");
tablaBody.innerHTML = "";

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

//Mostrar cantidad de turnos hoy 
const turnosHoy = turnos.filter(turno => {
  const fechaTurno = new Date(turno.fecha + "T00:00:00");
  return fechaTurno.getTime() === hoy.getTime();
});
document.getElementById("total-turnos-hoy").textContent = turnosHoy.length;

function formatearFecha(fechaStr) {
  const [año, mes, dia] = fechaStr.split("-");
  return `${dia}/${mes}/${año}`;
}
