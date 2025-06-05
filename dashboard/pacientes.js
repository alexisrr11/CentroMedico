async function cargarMedicos() {
    try {
        const respuesta = await fetch("../medicos.json");
        const medicos = await respuesta.json();

        const select = document.getElementById('medico-turno');
        select.innerHTML = '<option value="">Seleccionar médico</option>';

        medicos.forEach(medico => {
            const option = document.createElement('option');
            option.value = medico.id;
            option.textContent = medico.nombre;
            select.appendChild(option);
        });
    } catch (error) {
        console.error('Error al cargar médicos:', error);
    }
}

const modalTurno = document.getElementById('modal-turno');
const observer = new MutationObserver((mutations) => {
    mutations.forEach(mutation => {
        if (mutation.target.classList.contains('flex')) {
            cargarMedicos();
        }
    });
});

observer.observe(modalTurno, { attributes: true, attributeFilter: ['class'] });
