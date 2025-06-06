import { leerData } from "./leerData.js";

export async function initApp() {
  const urls = ["https://raw.githubusercontent.com/alexisrr11/CentroMedico/refs/heads/main/pacientes.json", "https://raw.githubusercontent.com/alexisrr11/CentroMedico/refs/heads/main/medicos.json"];
  const sidebar = document.getElementById('sidebar');
  const toggleButton = document.getElementById('toggleSidebar');
  const contenedorFetch = document.querySelector(".contenedorJson");
  const contenedorMedicos = document.querySelector("#contenedor-medicos");

  if (toggleButton && sidebar) {
  // Al hacer clic en el botón, alterna el sidebar
  toggleButton.addEventListener('click', (e) => {
    e.stopPropagation(); // Evita que el clic se propague al body
    sidebar.classList.toggle('-translate-x-full');
  });

  // Al hacer clic dentro del sidebar, no se propaga el evento al body
  sidebar.addEventListener('click', (e) => {
    e.stopPropagation();
  });

  // Si hacés clic en cualquier parte del documento
  document.addEventListener('click', () => {
    if (!sidebar.classList.contains('-translate-x-full')) {
      sidebar.classList.add('-translate-x-full'); // Lo cerramos
    }
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
