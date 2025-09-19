const contentidoNegocio = document.getElementById("contentidoNegocio");
const mostrarCarrito = document.getElementById("mostrarCarrito");
const carritoContainer = document.getElementById("carrito-container");
const cantidadCarrito = document.getElementById("cantidadCarrito");
const inputBusqueda = document.getElementById("input-busqueda");
const botonBuscar = document.getElementById("boton-buscar");

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

//LEE ARCHIVO DATA.JSON
fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    const products = data;

    const mostrarProductos = (productsToMostrar) => {
      contentidoNegocio.innerHTML = "";

      productsToMostrar.forEach((product) => {
        let content = document.createElement("div");
        content.className = "card";
        content.innerHTML = `
          <img src="${product.imagen}">
          <h3>${product.nombre}</h3>
          <p>${product.tipo} - ${product.gradoAlcohol}%</p>
          <p class="price">$${product.precio}</p>
        `;

        contentidoNegocio.append(content);

        //BOTON COMPRAR PRODUCTO
        let comprar = document.createElement("button");
        comprar.innerText = "Comprar";
        comprar.className = "comprar";
        content.append(comprar);

        comprar.addEventListener("click", () => {
          const repeat = carrito.some(
            (repeatProduct) => repeatProduct.id === product.id
          );

          Toastify({
            text: "Producto agregado",
            duration: 3000,
            close: true,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
            style: {
              background: "linear-gradient(to right, #313030, #464444)",
              borderRadius: "2rem",
              textTransform: "uppercase",
              fontSize: ".75rem",
            },
            offset: {
              x: "1.5rem",
              y: "1.5rem",
            },
            onClick: function () {},
          }).showToast();

          if (repeat) {
            carrito.map((prod) => {
              if (prod.id === product.id) {
                prod.cantidad++;
              }
              actualizarCarrito();
            });
          } else {
            carrito.push({
              id: product.id,
              img: product.imagen,
              nombre: product.nombre,
              precio: product.precio,
              cantidad: product.cantidad || 1,
            });

            saveLocal();
            actualizarCarrito();
          }
        });
      });
    };

    //SE MUESTRAN LOS PRODUCTOS
    mostrarProductos(products);

    botonBuscar.addEventListener("click", () => {
      const textoBusqueda = inputBusqueda.value.trim().toLowerCase();

      if (textoBusqueda !== "") {
        const productosFiltrados = products.filter((product) =>
          product.tipo.toLowerCase().includes(textoBusqueda)
        );

        if (productosFiltrados.length > 0) {
          mostrarProductos(productosFiltrados);
        } else {
          contentidoNegocio.innerHTML = `
            <h3>No se encontraron productos con ese tipo</h3>
            <button id="botonVolver"><i class="bi bi-arrow-return-left"></i>Volver al inicio</button>
          `;

          const botonVolver = document.getElementById("botonVolver");
          botonVolver.addEventListener("click", () => {
            mostrarProductos(products);
            inputBusqueda.value = "";
          });
        }
      } else {
        mostrarProductos(products);
      }
    });
  })
  .catch((error) => {
    console.error("Error al cargar los datos:", error);
  });

// GUARDAR ITEMS
const saveLocal = () => {
  localStorage.setItem("carrito", JSON.stringify(carrito));
};

//ACTUALIZAR ITEMS
const actualizarCarrito = () => {
  localStorage.setItem("carrito", JSON.stringify(carrito));
  contadorCarrito();
};

/*function comprar() {
  let opcion;
  let subtot = 0;
  do {
    opcion = prompt(
      "Ingrese la opcion deseada:\n1 - Cerveza Éter \n2 - Cerveza Astral \n3 - Cerveza Fénix \n4 - Cerveza Éxtasis\n0 - Salir"
    );
    const id = parseInt(opcion);
    const cerveza = cervezas.find((c) => c.id === id);
    if (cerveza) {
      subtot += cerveza.precio;
    } else if (opcion !== "0") {
      alert("Opción no válida");
    }
  } while (opcion !== "0");
  return subtot;
}

function filtrarPorTipo(tipo) {
  return cervezas.filter(
    (cerveza) => cerveza.tipo.toUpperCase() === tipo.toUpperCase()
  );
}

let opcion;
let total = 0;
let edad = parseInt(prompt("Ingrese su edad:"));

while (isNaN(edad) || edad < 18) {
  alert("Lo siento, debe ser mayor o igual a 18 años para comprar cerveza.");
  edad = parseInt(prompt("Ingrese su edad:"));
}

alert("Bienvenido a La Casa de la Espuma");

do {
  opcion = prompt(
    "Ingrese la opcion deseada:\n1 - Comprar\n2 - Filtrar por tipo\n3 - Checkout\n0 - Salir"
  );
  if (opcion === "1") {
    total += comprar();
  } else if (opcion === "2") {
    const tipo = prompt("Ingrese el tipo de cerveza a filtrar:");
    const cervezasFiltradas = filtrarPorTipo(tipo);
    if (cervezasFiltradas.length > 0) {
      alert("Cervezas encontradas:");
      cervezasFiltradas.forEach((cerveza) =>
        alert(`${cerveza.nombre} - ${cerveza.tipo}`)
      );
    } else {
      alert("No se encontraron cervezas de ese tipo.");
    }
  } else if (opcion === "3") {
    alert("Total a pagar: $" + total);
  } else if (opcion !== "0") {
    alert("Opción no válida");
  }
} while (opcion !== "0");
*/
