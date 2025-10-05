async function cargarMalla() {
  const respuesta = await fetch("cursos_y_mallaAreas.json");
  const datos = await respuesta.json();

  const mallaContainer = document.getElementById("malla-container");
  const cursos = datos.data;

  // Crear estructura de 5 años con 2 semestres cada uno
  for (let año = 1; año <= 5; año++) {
    const contenedorAño = document.createElement("div");
    contenedorAño.classList.add("semestre");

    const titulo = document.createElement("h3");
    titulo.textContent = `Año ${año}`;
    contenedorAño.appendChild(titulo);

    const cursosDelAño = cursos.filter(c => c.year === año);

    cursosDelAño.forEach(curso => {
      const divCurso = document.createElement("div");
      divCurso.classList.add("curso");
      divCurso.textContent = `${curso.name} (Sem ${curso.semestre})`;
      divCurso.addEventListener("click", () => mostrarDetalles(curso));
      contenedorAño.appendChild(divCurso);
    });

    mallaContainer.appendChild(contenedorAño);
  }
}

function mostrarDetalles(curso) {
  document.getElementById("curso-nombre").textContent = curso.name;
  document.getElementById("curso-ano").textContent = curso.year;
  document.getElementById("curso-semestre").textContent = curso.semestre;
  document.getElementById("curso-area").textContent = curso.area || "No especificada";
  document.getElementById("curso-sct").textContent = curso.sct || "—";
  document.getElementById("curso-prereq").textContent =
    curso.preRequisitos.length > 0 ? curso.preRequisitos.join(", ") : "Ninguno";

  document.getElementById("detalle-curso").classList.remove("oculto");
}

document.getElementById("cerrar-detalle").addEventListener("click", () => {
  document.getElementById("detalle-curso").classList.add("oculto");
});

cargarMalla();
