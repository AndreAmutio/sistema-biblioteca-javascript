// Trabajo Práctico Final - Introducción a JavaScript
// Sistema de Gestión de Biblioteca
// Nombre : Amutio Andrea Sabrina

const prompt = require("prompt-sync")();

//---------------------------- 1. Estructura de Datos
// Array con objetos que representan libros
// Definimos los datos iniciales de la biblioteca: 10 libros y 5 usuarios.
// Cada libro tiene información básica y un estado de disponibilidad.
// Cada usuario puede tener libros prestados (por ID).

const libros = [
  { id: 1, titulo: "Cien años de soledad", autor: "Gabriel García Márquez", año: 1967, genero: "Realismo Mágico", disponible: true },
  { id: 2, titulo: "Veinte poemas de amor y una canción desesperada", autor: "Pablo Neruda", año: 1924, genero: "Poesía", disponible: true },
  { id: 3, titulo: "La vuelta al mundo en 80 días", autor: "Julio Verne", año: 1873, genero: "Aventura", disponible: true },
  { id: 4, titulo: "Los hijos del Capitán Grant", autor: "Julio Verne", año: 1868, genero: "Aventura", disponible: false },
  { id: 5, titulo: "Corazón, diario de un niño", autor: "Edmundo de Amicis", año: 1886, genero: "Infantil", disponible: true },
  { id: 6, titulo: "Versos sencillos", autor: "José Martí", año: 1891, genero: "Poesía", disponible: true },
  { id: 7, titulo: "Doña Bárbara", autor: "Rómulo Gallegos", año: 1929, genero: "Novela", disponible: true },
  { id: 8, titulo: "A la sombra del roble", autor: "Juan Vasconsuelos", año: 2002, genero: "Drama", disponible: false },
  { id: 9, titulo: "Cuentos de la selva", autor: "Horacio Quiroga", año: 1918, genero: "Infantil", disponible: true },
  { id: 10, titulo: "El Principito", autor: "Antoine de Saint-Exupéry", año: 1943, genero: "Fábula", disponible: true }
];

// Array con objetos que representan personas que usan la biblioteca
const usuarios = [
  { id: 1, nombre: "Lucía Fernández", email: "lucia.fernandez@gmail.com", librosPrestados: [4] },
  { id: 2, nombre: "Martín López", email: "martin.lopez@gmail.com", librosPrestados: [8] },
  { id: 3, nombre: "Sofía García", email: "sofia.garcia@gmail.com", librosPrestados: [] },
  { id: 4, nombre: "Agustín Romero", email: "agustin.romero@gmail.com", librosPrestados: [] },
  { id: 5, nombre: "Valentina Pérez", email: "valentina.perez@gmail.com", librosPrestados: [2, 5] }
];

//---------------------------- 2. Funciones de Gestión de Libros
/* Describo funciones: 
agregarLibro(id, titulo, autor, anio, genero): Añade un nuevo libro al array.
buscarLibro(criterio, valor): Busca libros filtrando por título, autor o género.
ordenarLibros(criterio): Ordena con bubble sort por año o título.
borrarLibro(id): Elimina un libro por su ID.*/

const agregarLibro = (id, titulo, autor, anio, genero) => {
  libros.push({ id, titulo, autor, año: anio, genero, disponible: true });
  console.log(" Libro agregado exitosamente.");
};

const buscarLibro = (criterio, valor) => {
  const resultado = libros.filter(libro => libro[criterio].toLowerCase().includes(valor.toLowerCase()));
  console.log(" Libros encontrados:", resultado);
};

const ordenarLibros = (criterio) => {
  for (let i = 0; i < libros.length - 1; i++) {
    for (let j = 0; j < libros.length - i - 1; j++) {
      if (libros[j][criterio] > libros[j + 1][criterio]) {
        let temp = libros[j];
        libros[j] = libros[j + 1];
        libros[j + 1] = temp;
      }
    }
  }
  console.log(` Libros ordenados por ${criterio}:`, libros);
};

const borrarLibro = (id) => {
  const index = libros.findIndex(libro => libro.id === id);
  if (index !== -1) {
    const borrado = libros.splice(index, 1);
    console.log(" Libro eliminado:", borrado);
  } else {
    console.log("Libro no encontrado.");
  }
};

//---------------------------- 3. Gestión de Usuarios
// Funciones para registrar, buscar, mostrar o eliminar usuarios.
// Permite gestionar el acceso de usuarios a la biblioteca.

/* registrarUsuario(nombre, email): Crea un nuevo usuario.
mostrarTodosLosUsuarios(): Lista completa de usuarios.
buscarUsuario(email): Busca un usuario exacto por email.
borrarUsuario(nombre, email): Elimina un usuario por nombre y email exactos. */

const registrarUsuario = (nombre, email) => {
  usuarios.push({ id: usuarios.length + 1, nombre, email, librosPrestados: [] });
  console.log(" Usuario registrado exitosamente.");
};

const mostrarTodosLosUsuarios = () => {
  console.log(" Usuarios registrados:", usuarios);
};

const buscarUsuario = (email) => {
  const usuario = usuarios.find(u => u.email.toLowerCase() === email.toLowerCase());
  console.log(" Usuario encontrado:", usuario || "No encontrado");
};

const borrarUsuario = (nombre, email) => {
  const index = usuarios.findIndex(u => u.nombre === nombre && u.email === email);
  if (index !== -1) {
    const eliminado = usuarios.splice(index, 1);
    console.log(" Usuario eliminado:", eliminado);
  } else {
    console.log(" Usuario no encontrado.");
  }
};

//---------------------------- 4. Sistema de Préstamos
// Lógica para prestar y devolver libros.
// Cambia el estado de disponibilidad del libro y actualiza el array del usuario.
// Previene errores si el libro ya está prestado o el usuario no existe.

/* prestarLibro(idLibro, idUsuario): Marca un libro como no disponible y lo añade a los libros prestados de un usuario.
devolverLibro(idLibro, idUsuario): Marca el libro como disponible y lo elimina de la lista del usuario. */

const prestarLibro = (idLibro, idUsuario) => {
  const libro = libros.find(l => l.id === idLibro);
  const usuario = usuarios.find(u => u.id === idUsuario);
  if (libro && libro.disponible && usuario) {
    libro.disponible = false;
    usuario.librosPrestados.push(libro.id);
    console.log(`"${libro.titulo}" fue prestado a ${usuario.nombre}`);
  } else {
    console.log("No se puede prestar el libro.");
  }
};

const devolverLibro = (idLibro, idUsuario) => {
  const libro = libros.find(l => l.id === idLibro);
  const usuario = usuarios.find(u => u.id === idUsuario);
  if (libro && usuario) {
    libro.disponible = true;
    usuario.librosPrestados = usuario.librosPrestados.filter(id => id !== idLibro);
    console.log(` "${libro.titulo}" fue devuelto por ${usuario.nombre}`);
  } else {
    console.log(" No se puede devolver el libro.");
  }
};

//---------------------------- 5. Reportes
// Se usan métodos avanzados de array para generar estadísticas de los libros.
// Ideal para obtener una visión general del estado de la biblioteca.

/* generarReporteLibros(): Usa .filter(), .reduce() y .length para mostrar:
-Total de libros
-Cuántos están prestados
-Cuántos hay por género
-El más antiguo y el más nuevo */ 

const generarReporteLibros = () => {
  const total = libros.length;
  const prestados = libros.filter(l => !l.disponible).length;
  const porGenero = libros.reduce((acc, l) => {
    acc[l.genero] = (acc[l.genero] || 0) + 1;
    return acc;
  }, {});
  const antiguo = libros.reduce((a, b) => a.año < b.año ? a : b);
  const nuevo = libros.reduce((a, b) => a.año > b.año ? a : b);

  console.log("Reporte:");
  console.log("Total libros:", total);
  console.log("Libros prestados:", prestados);
  console.log("Por género:", porGenero);
  console.log("Más antiguo:", antiguo.titulo, antiguo.año);
  console.log("Más nuevo:", nuevo.titulo, nuevo.año);
};

//---------------------------- 6. Títulos válidos
// Busca títulos válidos con más de una palabra y sin caracteres no permitidos.
// Ayuda a filtrar datos limpios y legibles para reportes o análisis.

/* librosConPalabrasEnTitulo(): Muestra solo los libros que:
-Tienen más de una palabra en el título
-No contienen números ni símbolos */

const librosConPalabrasEnTitulo = () => {
  const permitidos = [..."abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZáéíóúÁÉÍÓÚ "];
  const resultado = libros.filter(l => {
    const palabras = l.titulo.trim().split(/\s+/);
    return palabras.length > 1 && [...l.titulo].every(c => permitidos.includes(c));
  });
  console.log(" Títulos válidos:", resultado.map(l => l.titulo));
};

//---------------------------- 7. Estadísticas
// Análisis numérico de los años de publicación.
// Ideal para ver tendencias históricas en los libros disponibles.

/* calcularEstadisticas(): Calcula:
-Años de publicación
-Promedio de años
-Año más frecuente
-Diferencia entre libro más nuevo y más antiguo */

const calcularEstadisticas = () => {
  const años = libros.map(l => l.año);
  const promedio = (años.reduce((a, b) => a + b, 0) / años.length).toFixed(2);
  const frec = {};
  años.forEach(a => frec[a] = (frec[a] || 0) + 1);
  const masFrecuente = Object.entries(frec).reduce((a, b) => b[1] > a[1] ? b : a)[0];
  const diferencia = Math.max(...años) - Math.min(...años);

  console.log("Estadísticas:");
  console.log("Promedio:", promedio);
  console.log("Más frecuente:", masFrecuente);
  console.log("Diferencia años:", diferencia);
};

//---------------------------- 8. Manejo de cadenas
// Mejora la calidad de los datos: emails en minúscula, títulos uniformes.
// Útil para evitar duplicados y mantener consistencia en búsquedas.

/*normalizarDatos(): Transforma los datos para:
-Títulos > mayúsculas
-Autores > sin espacios sobrantes
-Emails > minúsculas*/

const normalizarDatos = () => {
  const titulos = libros.map(l => l.titulo.toUpperCase());
  const autores = libros.map(l => l.autor.trim());
  const mails = usuarios.map(u => u.email.toLowerCase());
  console.log(" Títulos:", titulos);
  console.log("Autores:", autores);
  console.log("Emails:", mails);
};

//---------------------------- 9. Menú con prompt
// Interfaz interactiva con el usuario usando prompt-sync.
// Permite navegar entre todas las funcionalidades con un menú claro.
// Usa un bucle while para mantenerse activo hasta elegir "salir".

/* menuPrincipal(): Es un menú de consola que se repite hasta que elegís salir.
-Usa prompt-sync para pedir al usuario datos y tomar decisiones.
-Muestra todas las funcionalidades anteriores para ejecutarlas con un número.*/

const menuPrincipal = () => {
  let continuar = true;

  while (continuar) {
    console.log(`\n MENÚ PRINCIPAL`);
    console.log("1. Ver libros\n2. Agregar libro\n3. Buscar libro\n4. Ordenar libros\n5. Borrar libro");
    console.log("6. Registrar usuario\n7. Ver usuarios\n8. Buscar usuario\n9. Borrar usuario");
    console.log("10. Prestar libro\n11. Devolver libro");
    console.log("12. Reporte libros\n13. Títulos válidos\n14. Estadísticas\n15. Normalizar datos\n16. Salir");

    const op = prompt("Seleccioná opción: ");

    switch (op) {
      case "1": console.log(libros); break;
      case "2":
        agregarLibro(
          parseInt(prompt("ID: ")),
          prompt("Título: "),
          prompt("Autor: "),
          parseInt(prompt("Año: ")),
          prompt("Género: ")
        ); break;
      case "3": buscarLibro(prompt("Criterio: "), prompt("Valor: ")); break;
      case "4": ordenarLibros(prompt("Criterio (titulo/año): ")); break;
      case "5": borrarLibro(parseInt(prompt("ID: "))); break;
      case "6": registrarUsuario(prompt("Nombre: "), prompt("Email: ")); break;
      case "7": mostrarTodosLosUsuarios(); break;
      case "8": buscarUsuario(prompt("Email: ")); break;
      case "9": borrarUsuario(prompt("Nombre: "), prompt("Email: ")); break;
      case "10": prestarLibro(parseInt(prompt("ID libro: ")), parseInt(prompt("ID usuario: "))); break;
      case "11": devolverLibro(parseInt(prompt("ID libro: ")), parseInt(prompt("ID usuario: "))); break;
      case "12": generarReporteLibros(); break;
      case "13": librosConPalabrasEnTitulo(); break;
      case "14": calcularEstadisticas(); break;
      case "15": normalizarDatos(); break;
      case "16": console.log("Hasta luego!"); continuar = false; break;
      default: console.log(" Opción inválida."); break;
    }
  }
};

menuPrincipal();

