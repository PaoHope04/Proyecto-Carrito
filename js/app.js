const carrito = document.querySelector("#carrito");

const listaDeCursos = document.querySelector("#lista-cursos");

const contenedorCarrito = document.querySelector("#lista-carrito tbody");

const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");

let articulosCarrito = [];

cargarEventListener();

function cargarEventListener() {
  //* Cuando se presiona "Agregar Carrito"
  listaDeCursos.addEventListener("click", agregarCurso);

  //* Eliminar del Carrito

  carrito.addEventListener("click", eliminarCurso);

  //* Vaciar el carrito
  vaciarCarritoBtn.addEventListener('click', () => {
    //* Reiniciamos el arreglo

    articulosCarrito = []
    
    limpiarHTML() //? Eliminamos el HTML
    



  })
}

//! Funciones

function agregarCurso(e) {
  e.preventDefault();
  if (e.target.classList.contains("agregar-carrito")) {
    const cursoSeleccionado = e.target.parentElement.parentElement;

    leerDatosCurso(cursoSeleccionado);
  }
}

//* Elimina un curso
function eliminarCurso(e) {
  if (e.target.classList.contains("borrar-curso")) {
    const cursoId = e.target.getAttribute("data-id");
    
    //Elimina del arreglo  
    articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId)
    
    carritoHTML() //? iteramos sobre el carrito 
  }
}

//* lee el contenido del HTML al que le dimos click y extrae la informaion del curso.

function leerDatosCurso(curso) {
  //console.log(curso);

  //? Objeto con el curso que se clickee

  const infoCurso = {
    imagen: curso.querySelector("img").src,
    titulo: curso.querySelector("h4").textContent,
    precio: curso.querySelector(".precio span").textContent,
    id: curso.querySelector("a").getAttribute("data-id"),
    cantidad: 1,
  };
  //console.log(infoCurso);
  //* Revisa si un elemento ya existe en el carrito
  const existe = articulosCarrito.some((curso) => curso.id === infoCurso.id);
  if (existe) {
    //? Actualizar la cantidad
    const cursos = articulosCarrito.map((curso) => {
      if (curso.id === infoCurso.id) {
        curso.cantidad++;
        return curso; //? retornamos el objeto actualizado
      } else {
        return curso; //? Objeto que no esta duplicado
      }
    });
    articulosCarrito = [...cursos];
  } else {
    //? Agregamos al carrito
    articulosCarrito = [...articulosCarrito, infoCurso];
  }


  carritoHTML();
}

//* Muestra carrito en HTML

function carritoHTML() {
  //? Limpiar HTML
  limpiarHTML();

  //? Recorre eñ carrito y gebera el HTML
  articulosCarrito.forEach((curso) => {
    const { imagen, titulo, precio, cantidad, id } = curso;
    const row = document.createElement("tr");
    row.innerHTML = `
    <td>
        <img src="${imagen}" width= "100">
       <td/>

    <td> ${titulo}<td/>
    <td> ${precio}<td/>
    <td> ${cantidad}<td/>
<td>
 <a href="#" class="borrar-curso" data-id="${id}"> X <a/>

<td/>
    `;

    //? agrega HTML del carrito al tbody
    contenedorCarrito.appendChild(row);
  });
}

//* Elimina los cursos del tbody
function limpiarHTML() {
  //! forma lenta
  //! contenedorCarrito.innerHTML = ''

  //* mejor performance
  while (contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);
  }
}
