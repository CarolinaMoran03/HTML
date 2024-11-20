const materias = {
    // Primer Nivel
    'ALP101': { nombre: 'ALGORITMO Y LÓGICA DE PROGRAMACIÓN', nivel: 1, requisitos: [], creditos: 3 },
    'CAL101': { nombre: 'CÁLCULO', nivel: 1, requisitos: [], creditos: 5 },
    'IIS101': { nombre: 'INTRODUCCIÓN A LA INGENIERÍA DE SOFTWARE', nivel: 1, requisitos: [], creditos: 4 },
    'LYC101': { nombre: 'LENGUAJE Y COMUNICACIÓN', nivel: 1, requisitos: [], creditos: 3 },

    // Segundo Nivel
    'ALG201': { nombre: 'ALGEBRA LINEAL', nivel: 2, requisitos: ['CAL101'], creditos: 2 },
    'FIS201': { nombre: 'FISICA', nivel: 2, requisitos: ['CAL101'], creditos: 4 },
    'IRS201': { nombre: 'INGENIERÍA DE REQUERIMIENTOS DE SOFTWARE', nivel: 2, requisitos: ['IIS101'], creditos: 3 },
    'TDP201': { nombre: 'TÉCNICA DE PROGRAMACIÓN', nivel: 2, requisitos: ['ALP101'], creditos: 3 },
    'INV201': { nombre: 'INVESTIGACIÓN', nivel: 2, requisitos: ['LYC101'], creditos: 3 },

    // Tercer Nivel
    'PYE301': { nombre: 'PROBABILIDAD Y ESTADÍSTICA', nivel: 3, requisitos: ['FIS201'], creditos: 3 },
    'MDS301': { nombre: 'MODELAMIENTO DE SOFTWARE', nivel: 3, requisitos: ['IRS201'], creditos: 3 },
    'MAD301': { nombre: 'MATEMÁTICAS DISCRETAS', nivel: 3, requisitos: ['ALG201'], creditos: 2 },
    'ECD301': { nombre: 'ECUACIONES DIFERENCIALES', nivel: 3, requisitos: ['CAL101'], creditos: 3 },
    'EDD301': { nombre: 'ESTRUCTURA DE DATOS', nivel: 3, requisitos: ['TDP201'], creditos: 4 },

    // Cuarto Nivel
    'BDD401': { nombre: 'BASE DE DATOS', nivel: 4, requisitos: ['EDD301', 'MDS301'], creditos: 4 },
    'POO401': { nombre: 'PROGRAMACIÓN ORIENTADA A OBJETOS', nivel: 4, requisitos: ['EDD301'], creditos: 4 },
    'SOP401': { nombre: 'SISTEMAS OPERATIVOS', nivel: 4, requisitos: [], creditos: 2 },
    'ADG401': { nombre: 'ADMINISTRACIÓN GENERAL', nivel: 4, requisitos: [], creditos: 2 },
    'ADS401': { nombre: 'ARQUITECTURA Y DISEÑO DE SOFTWARE', nivel: 4, requisitos: ['EDD301'], creditos: 3 },

    // Quinto Nivel
    'CDS501': { nombre: 'CONSTRUCCIÓN DE SOFTWARE', nivel: 5, requisitos: ['ADS401', 'POO401'], creditos: 2 },
    'IDO501': { nombre: 'INVESTIGACIÓN DE OPERACIONES', nivel: 5, requisitos: ['ECD301', 'MAD301', 'PYE301'], creditos: 3 },
    'RDD501': { nombre: 'REDES DE DATOS', nivel: 5, requisitos: ['SOP401'], creditos: 3 },
    'IES501': { nombre: 'INGENIERÍA ECONÓMICA PARA SOFTWARE', nivel: 5, requisitos: ['ADG401'], creditos: 2 },
    'ABD501': { nombre: 'ADMINISTRACIÓN DE BASE DE DATOS', nivel: 5, requisitos: ['BDD401'], creditos: 3 },

    // Sexto Nivel
    'SDS601': { nombre: 'SEGURIDAD DE SOFTWARE', nivel: 6, requisitos: ['RDD501'], creditos: 3 },
    'FAB601': { nombre: 'FUNDAMENTOS DE AGRONOMÍA Y BIOLOGÍA', nivel: 6, requisitos: [], creditos: 2 },
    'MMS601': { nombre: 'MODELO MATEMÁTICOS Y SIMULACIÓN', nivel: 6, requisitos: ['IDO501'], creditos: 3 },
    'CEE601': { nombre: 'CIRCUITOS ELÉCTRICOS Y ELECTRÓNICOS', nivel: 6, requisitos: [], creditos: 2 },
    'VVS601': { nombre: 'VERIFICACIÓN Y VALIDACIÓN DE SOFTWARE', nivel: 6, requisitos: ['CDS501'], creditos: 3 },

    // Séptimo Nivel
    'GPI701': { nombre: 'GESTIÓN DE PROYECTOS INFORMÁTICOS', nivel: 7, requisitos: ['IES501'], creditos: 2 },
    'PCS701': { nombre: 'PROCESOS Y CALIDAD DE SOFTWARE', nivel: 7, requisitos: ['VVS601'], creditos: 2 },
    'GTI701': { nombre: 'GESTIÓN DE TECNOLOGÍA DE LA INFORMACIÓN', nivel: 7, requisitos: ['IES501'], creditos: 2 },
    'INA701': { nombre: 'INTELIGENCIA ARTIFICIAL', nivel: 7, requisitos: ['ABD501', 'MMS601'], creditos: 2 },
    'AYB701': { nombre: 'AGROMÁTICA Y BIOINFORMÁTICA', nivel: 7, requisitos: ['FAB601'], creditos: 2 },
    'AUN701': { nombre: 'AUTOMATIZACIÓN NEUMÁTICA', nivel: 7, requisitos: ['CEE601'], creditos: 2 },

    // Octavo Nivel
    'GCS801': { nombre: 'GESTIÓN DE LA CONFIGURACIÓN DE SOFTWARE', nivel: 8, requisitos: ['PCS701'], creditos: 2 },
    'SAI801': { nombre: 'SISTEMA DE AUTOMATIZACIÓN INDUSTRIAL', nivel: 8, requisitos: ['AUN701'], creditos: 2 },
    'DWB801': { nombre: 'DESARROLLO WEB', nivel: 8, requisitos: ['PCS701', 'SDS601'], creditos: 3 },
    'IDN801': { nombre: 'INTELIGENCIA DE NEGOCIOS', nivel: 8, requisitos: ['INA701'], creditos: 3 },
    'DIC801': { 
        nombre: 'DISEÑO DE INTEGRACIÓN CURRICULAR', 
        nivel: 8, 
        requisitos: ['GPI701', 'GTI701', 'PCS701', 'INA701', 'AYB701'], 
        creditos: 5 
    }
};

let materiasSeleccionadas = [];
let materiasAprobadas = [];
let nivelActual = 0;
let semestreActual = 7;

function validarPromedioGeneral() {
    const promedio = parseFloat(document.getElementById('promedio').value);
    const mensaje = document.getElementById('mensaje');
    
    materiasSeleccionadas = materiasSeleccionadas.filter(codigo => {
        const materia = materias[codigo];
        if (materia.nivel >= 3 && promedio < 8.0) {
            mensaje.className = 'warning';
            mensaje.textContent = 'Se han removido materias avanzadas debido a que tu promedio es menor a 8.0';
            return false;
        }
        return true;
    });
    actualizarListaMaterias();
    filtrarPorNivel(nivelActual);
}

function actualizarMaximoMaterias() {
    const ultimoSemestre = document.getElementById('ultimo-semestre').value === 'si';
    const maxMaterias = ultimoSemestre ? 6 : 5;
    
    if (materiasSeleccionadas.length > maxMaterias) {
        const mensaje = document.getElementById('mensaje');
        mensaje.className = 'warning';
        mensaje.textContent = `Se han removido algunas materias para cumplir con el máximo de ${maxMaterias} materias permitidas.`;
        
        materiasSeleccionadas = materiasSeleccionadas.slice(0, maxMaterias);
        actualizarListaMaterias();
    }
}

function agregarMateriaAprobada() {
    const select = document.getElementById('materias-aprobadas');
    const selectedOptions = Array.from(select.selectedOptions).map(option => option.value);
    
    materiasAprobadas = [...new Set([...materiasAprobadas, ...selectedOptions])];
    actualizarListaMateriasAprobadas();
    filtrarPorNivel(nivelActual);
}

function actualizarListaMateriasAprobadas() {
    const select = document.getElementById('materias-aprobadas');
    select.innerHTML = '';
    
    Object.keys(materias)
        .filter(codigo => !materiasAprobadas.includes(codigo))
        .forEach(codigo => {
            const option = document.createElement('option');
            option.value = codigo;
            option.textContent = `${codigo} - ${materias[codigo].nombre}`;
            select.appendChild(option);
        });
}

function filtrarPorNivel(nivel) {
    nivelActual = nivel;
    const contenedor = document.getElementById('materias-disponibles');
    const promedio = parseFloat(document.getElementById('promedio').value);
    contenedor.innerHTML = '';

    Object.keys(materias)
        .filter(codigo => materias[codigo].nivel === nivel)
        .forEach(codigo => {
            const materia = materias[codigo];
            const card = document.createElement('div');
            card.className = 'materia-card';
            
            const cumpleRequisitos = verificarRequisitos(codigo);
            const cumplePromedio = materia.nivel < 3 || promedio >= 8.0;
            const disabled = !cumpleRequisitos || !cumplePromedio;
            
            if (disabled) {
                card.classList.add('disabled');
            }

            const requisitosText = materia.requisitos.length > 0 
                ? `<div class="precedencia">Requisitos: ${materia.requisitos.map(req => `${req} - ${materias[req]?.nombre || req}`).join(', ')}</div>`
                : '<div class="precedencia">Sin requisitos previos</div>';

            card.innerHTML = `
                <h4>${materia.nombre} (${codigo})</h4>
                ${requisitosText}
                <div class="creditos">Créditos: ${materia.creditos}</div>
                <button onclick="agregarMateria('${codigo}')" ${disabled ? 'disabled' : ''}>
                    ${disabled ? 'No Disponible' : 'Agregar'}
                </button>
            `;
            contenedor.appendChild(card);
        });
}

function verificarRequisitos(codigo) {
    const materia = materias[codigo];
    return materia.requisitos.every(req => materiasAprobadas.includes(req));
}

function agregarMateria(codigo) {
    const ultimoSemestre = document.getElementById('ultimo-semestre').value === 'si';
    const maxMaterias = ultimoSemestre ? 6 : 5;
    const mensaje = document.getElementById('mensaje');
    const promedio = parseFloat(document.getElementById('promedio').value);

    const materia = materias[codigo];
    if (materia.nivel >= 3 && promedio < 8.0) {
        mensaje.className = 'error';
        mensaje.textContent = '❌ Tu promedio debe ser al menos 8.0 para materias avanzadas';
        return; 
    }

    if (materiasSeleccionadas.length >= maxMaterias) {
        mensaje.className = 'error';
        mensaje.textContent = `❌ No puedes inscribir más de ${maxMaterias} materias.`;
        return;
    }

    if (materiasSeleccionadas.includes(codigo)) {
        mensaje.className = 'error';
        mensaje.textContent = '❌ Esta materia ya está seleccionada.';
        return;
    }

    if (!verificarRequisitos(codigo)) {
        mensaje.className = 'error';
        mensaje.textContent = '❌ No cumples con los requisitos previos para esta materia.';
        return;
    }

    materiasSeleccionadas.push(codigo);
    actualizarListaMaterias();
    
    mensaje.className = 'success';
    mensaje.textContent = '✅ Materia agregada exitosamente.';
}


function actualizarMateriasPorNivel() {
    const nivelAprobado = parseInt(document.getElementById('nivel-aprobado').value);
    let materiasAprobadasPorNivel = [];

    Object.keys(materias).forEach(codigo => {
        const materia = materias[codigo];
        if (materia.nivel <= nivelAprobado) {
            materiasAprobadasPorNivel.push(codigo);
        }
    });


    materiasAprobadas = materiasAprobadasPorNivel;

    actualizarListaMateriasAprobadas();
    filtrarPorNivel(nivelActual); 
}

function actualizarListaMateriasAprobadas() {
    const select = document.getElementById('materias-aprobadas');
    select.innerHTML = '';

    materiasAprobadas.forEach(codigo => {
        const option = document.createElement('option');
        option.value = codigo;
        option.textContent = `${codigo} - ${materias[codigo].nombre}`;
        select.appendChild(option);
    });
}

function actualizarListaMaterias() {
    const lista = document.getElementById('lista-materias');
    const resumen = document.getElementById('resumen-materias');
    lista.innerHTML = '';
    let totalCreditos = 0;

    materiasSeleccionadas.forEach(codigo => {
        const materia = materias[codigo];
        totalCreditos += materia.creditos;

        const li = document.createElement('li');
        li.textContent = `${codigo} - ${materia.nombre} (${materia.creditos} créditos)`;
        const btnEliminar = document.createElement('button');
        btnEliminar.textContent = 'Eliminar';
        btnEliminar.style.marginLeft = '10px';
        btnEliminar.onclick = () => eliminarMateria(codigo);
        li.appendChild(btnEliminar);
        lista.appendChild(li);
    });

    const totalLi = document.createElement('li');
    totalLi.style.marginTop = '10px';
    totalLi.style.fontWeight = 'bold';
    totalLi.textContent = `Total de créditos: ${totalCreditos}`;
    lista.appendChild(totalLi);

    resumen.innerHTML = `
        <p>Total de materias seleccionadas: ${materiasSeleccionadas.length}</p>
        <p>Total de créditos: ${totalCreditos}</p>
    `;
}

function eliminarMateria(codigo) {
    materiasSeleccionadas = materiasSeleccionadas.filter(c => c !== codigo);
    actualizarListaMaterias();
    document.getElementById('mensaje').className = 'success';
    document.getElementById('mensaje').textContent = 'Materia eliminada exitosamente.';
}

function validarInscripcion() {
    const validacionFinal = document.getElementById('validacion-final');
    const promedio = parseFloat(document.getElementById('promedio').value);
    const ultimoSemestre = document.getElementById('ultimo-semestre').value === 'si';
    const maxMaterias = ultimoSemestre ? 6 : 5;
    
    let mensajes = [];
    let esValido = true;

    if (materiasSeleccionadas.length === 0) {
        mensajes.push('❌ Debes seleccionar al menos una materia');
        esValido = false;
    }

    if (materiasSeleccionadas.length > maxMaterias) {
        mensajes.push(`❌ Excedes el máximo de ${maxMaterias} materias permitidas`);
        esValido = false;
    }

    const materiasAvanzadas = materiasSeleccionadas.filter(codigo => materias[codigo].nivel >= 3);
    if (materiasAvanzadas.length > 0 && promedio < 8.0) {
        mensajes.push('❌ Tu promedio es insuficiente para materias avanzadas');
        esValido = false;
    }

    for (const codigo of materiasSeleccionadas) {
        const materia = materias[codigo];
        if (!verificarRequisitos(codigo)) {
            mensajes.push(`❌ No cumples con los requisitos para ${codigo} - ${materia.nombre}`);
            esValido = false;
        }
    }

    validacionFinal.style.display = 'block';
    validacionFinal.className = esValido ? 'success' : 'error';

    if (esValido) {
        validacionFinal.innerHTML = `
            <h3>✅ Inscripción Válida</h3>
            <p>Tu inscripción cumple con todos los requisitos:</p>
            <ul>
                <li>Número de materias: ${materiasSeleccionadas.length}/${maxMaterias}</li>
                <li>Promedio general: ${promedio}</li>
                <li>Todos los requisitos previos están cumplidos</li>
            </ul>
            <button onclick="confirmarInscripcion()">Confirmar Inscripción</button>
        `;
    } else {
        validacionFinal.innerHTML = `
            <h3>❌ Hay problemas con tu inscripción</h3>
            <p>Por favor corrige los siguientes problemas:</p>
            <ul>
                ${mensajes.map(msg => `<li>${msg}</li>`).join('')}
            </ul>
        `;
    }
}


function confirmarInscripcion() {
    const validacionFinal = document.getElementById('validacion-final');
    
    validacionFinal.innerHTML = `
        <h3>🎉 ¡Inscripción Completada!</h3>
        <p>Tu inscripción ha sido procesada exitosamente.</p>
        <p>Materias inscritas:</p>
        <ul>
            ${materiasSeleccionadas.map(codigo => 
                `<li>${codigo} - ${materias[codigo].nombre}</li>`
            ).join('')}
        </ul>
        <button onclick="nuevaInscripcion()">Nueva Inscripción</button>
    `;
}

function nuevaInscripcion() {
    materiasSeleccionadas = [];
    document.getElementById('promedio').value = '8.5';
    document.getElementById('ultimo-semestre').value = 'no';
    document.getElementById('validacion-final').style.display = 'none';
    document.getElementById('mensaje').textContent = '';
    actualizarListaMaterias();
    filtrarPorNivel(1);
}

function inicializarMateriasAprobadas() {
    const select = document.getElementById('materias-aprobadas');
    Object.keys(materias).forEach(codigo => {
        const option = document.createElement('option');
        option.value = codigo;
        option.textContent = `${codigo} - ${materias[codigo].nombre}`;
        select.appendChild(option);
    });
}

window.onload = () => {
    inicializarMateriasAprobadas();
    filtrarPorNivel(1);
};
