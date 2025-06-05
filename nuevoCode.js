let turnos = JSON.parse(localStorage.getItem("turnosGuardados")) || [];

const hoy = new Date();
hoy.setHours(0, 0, 0, 0);

const turnosHoy = turnos.lista.filter(turno => {
  const fechaTurno = new Date(turno.fecha);
  fechaTurno.setHours(0, 0, 0, 0);
  return fechaTurno.getTime() === hoy.getTime();
});

document.getElementById("total-turnos-hoy").textContent = turnosHoy.length;