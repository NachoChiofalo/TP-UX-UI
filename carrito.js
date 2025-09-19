const cargarCarrito = () => {
  carritoContainer.innerHTML = "";
  carritoContainer.style.display = "flex";

  //TITULO CARRITO
  const carritoHeader = document.createElement("div");
  carritoHeader.className = "carrito-header";
  carritoHeader.innerHTML = ` 
    <h1 class="carrito-header-title">Carrito.</h1>
  `;
  carritoContainer.append(carritoHeader);

  //SALIR DEL CARRITO
  const carritoButton = document.createElement("h1");
  carritoButton.innerText = "x";
  carritoButton.className = "carrito-header-button";

  carritoButton.addEventListener("click", () => {
    carritoContainer.style.display = "none";
  });

  carritoHeader.append(carritoButton);
  //CARRITO VACIO
  if (carrito.length === 0) {
    const emptyCartMessage = document.createElement("div");
    emptyCartMessage.className = "empty-cart-message";
    emptyCartMessage.innerHTML = `<p style="font-size: 1.5rem;">El carrito está vacío.</p><br>`;
    carritoContainer.append(emptyCartMessage);

    //CARRITO CON PRODUCTOS
  } else {
    carrito.forEach((producto) => {
      let carritoContent = document.createElement("div");
      carritoContent.className = "carrito-content";
      carritoContent.innerHTML = ` 
      <img src=${producto.img}>
      <h3>${producto.nombre}</h3>
      <p>$${producto.precio}</p>
      <span class="restar"><i class="bi bi-dash-circle"></i></span>
      <p>Cantidad: ${producto.cantidad}</p>
      <span class="sumar"><i class="bi bi-plus-circle"></i></span>
      <p>Total: $${producto.precio * producto.cantidad}</p>
      <span class="eliminar"><i class="bi bi-trash-fill"></i></span>
    `;
      carritoContainer.append(carritoContent);

      //BOTON RESTAR CANTIDAD PRODUCTO
      let restar = carritoContent.querySelector(".restar");
      restar.addEventListener("click", () => {
        if (producto.cantidad !== 1) {
          producto.cantidad--;
          Toastify({
            text: "Producto restado",
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
          saveLocal();
          cargarCarrito();
          contadorCarrito();
        }
      });

      //BOTON SUMAR CANTIDAD PRODUCTO
      let sumar = carritoContent.querySelector(".sumar");
      sumar.addEventListener("click", () => {
        producto.cantidad++;
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
        saveLocal();
        cargarCarrito();
        contadorCarrito();
      });

      //BOTON ELIMINAR PRODUCTO
      let eliminar = carritoContent.querySelector(".eliminar");
      eliminar.addEventListener("click", () => {
        eliminarProducto(producto.id);
        Toastify({
          text: "Producto eliminado",
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
      });
    });

    //TOTAL A PAGAR
    const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0);
    const totalCompra = document.createElement("div");
    totalCompra.className = "total-content";
    totalCompra.innerHTML = `TOTAL: $${total}`;
    carritoContainer.append(totalCompra);

    const buttonsContainer = document.createElement("div");
    buttonsContainer.className = "buttons-container";

    // BOTON VACIAR CARRITO
    const vaciarCarritoButton = document.createElement("button");
    vaciarCarritoButton.innerText = "Vaciar Carrito";
    vaciarCarritoButton.className = "vaciar-carrito-button";
    vaciarCarritoButton.addEventListener("click", () => {
      Swal.fire({
        title: "¿Estás seguro?",
        icon: "question",
        html: `Se van a borrar ${carrito.length} productos.`,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: "Sí",
        cancelButtonText: "No",
        customClass: {
          confirmButton: "custom-swal-confirm",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          carrito = [];
          contadorCarrito();
          saveLocal();
          cargarCarrito();
        }
      });
    });

    // BOTON FINALIZAR COMPRA
    const finalizarCompraButton = document.createElement("button");
    finalizarCompraButton.innerText = "Finalizar Compra";
    finalizarCompraButton.className = "finalizar-compra-button";
    finalizarCompraButton.addEventListener("click", () => {
      Swal.fire({
        title: "¡Compra realizada!",
        text: "¡Muchas gracias por su compra!",
        icon: "success",
        confirmButtonText: "Aceptar",
        customClass: {
          confirmButton: "custom-swal-confirm",
        },
      }).then(() => {
        carrito = [];
        contadorCarrito();
        saveLocal();
        cargarCarrito();
        carritoContainer.style.display = "none";
      });
    });

    buttonsContainer.appendChild(vaciarCarritoButton);
    buttonsContainer.appendChild(finalizarCompraButton);
    carritoContainer.append(buttonsContainer);
  }
};

mostrarCarrito.addEventListener("click", cargarCarrito);

//ELIMINAR EL PRODUCTO SEGUN ID
const eliminarProducto = (id) => {
  carrito = carrito.filter((producto) => producto.id !== id);
  contadorCarrito();
  saveLocal();
  cargarCarrito();
};

//CONTAR CANTIDAD DE PRODUCTOS EN CARRITO
const contadorCarrito = () => {
  cantidadCarrito.style.display = "block";
  let totalProductos = 0;
  carrito.forEach((producto) => {
    totalProductos += producto.cantidad;
  });
  localStorage.setItem("carritoLength", totalProductos);
  cantidadCarrito.innerText = totalProductos;
};

contadorCarrito();
