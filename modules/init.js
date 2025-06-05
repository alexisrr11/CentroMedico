import { leerData } from "./leerData.js";

export async function initApp() {
  const urls = ["/pacientes.json", "/medicos.json"];
  const sidebar = document.getElementById('sidebar');
  const toggleButton = document.getElementById('toggleSidebar');
  const contenedorFetch = document.querySelector(".contenedorJson");
  const contenedorMedicos = document.querySelector("#contenedor-medicos");

  if (toggleButton && sidebar) {
    toggleButton.addEventListener('click', () => {
      sidebar.classList.toggle('-translate-x-full');
    });
  }

  for (const url of urls) {
    try {
      const res = await fetch(url);
      const data = await res.json();
      leerData(data, url, contenedorFetch, contenedorMedicos);
    } catch (error) {
      if (contenedorFetch) contenedorFetch.innerHTML += `<p>${error.message}</p>`;
      if (contenedorMedicos) contenedorMedicos.innerHTML += `<p>${error.message}</p>`;
    }
  }

  Promise.all(urls.map(url => fetch(url).then(res => res.json())))
    .then(([pacientes, medicos]) => {
      document.getElementById("total-pacientes").textContent = pacientes.length;
      document.getElementById("total-medicos").textContent = medicos.length;
    })
    .catch(error => {
      console.error("Error al cargar los datos:", error);
    });
}
