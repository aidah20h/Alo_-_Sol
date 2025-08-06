let pedidos = [];

function agregarPedido(nombre, precio) {
  pedidos.push({ nombre, precio });
  actualizarListaPedidos();
  mostrarNotificacion("Producto agregado a tus pedidos");
}

function actualizarListaPedidos() {
  const lista = document.getElementById("listaPedidos");
  lista.innerHTML = "";

  if (pedidos.length === 0) {
    lista.innerHTML = "<p>No hay pedidos aún.</p>";
    return;
  }

  pedidos.forEach((pedido, index) => {
    const div = document.createElement("div");
    div.className = "pedido-item";
    div.innerHTML = `
      <span>${pedido.nombre} - $${pedido.precio.toFixed(2)}</span>
      <button onclick="eliminarPedido(${index})">Eliminar</button>
    `;
    lista.appendChild(div);
  });
}

function eliminarPedido(indice) {
  pedidos.splice(indice, 1);
  actualizarListaPedidos();
}

function eliminarPedidos() {
  if (confirm("¿Deseas eliminar todos los pedidos?")) {
    pedidos = [];
    actualizarListaPedidos();
  }
}

function mostrarPedidos() {
  document.getElementById("ventanaPedidos").style.display = "block";
}

function cerrarPedidos() {
  document.getElementById("ventanaPedidos").style.display = "none";
}

function mostrarPago() {
  if (pedidos.length === 0) {
    alert("No tienes pedidos para pagar.");
    return;
  }
  cerrarPedidos();
  document.getElementById("ventanaPago").style.display = "block";
}

function cerrarPago() {
  document.getElementById("ventanaPago").style.display = "none";
}

function mostrarNotificacion(mensaje) {
  const notificacion = document.getElementById("notificacion");
  notificacion.textContent = mensaje;
  notificacion.style.opacity = 1;
  setTimeout(() => {
    notificacion.style.opacity = 0;
  }, 2500);
}

// Validación tarjeta (Luhn)
function validarNumeroTarjeta(numero) {
  const num = numero.replace(/\D/g, "");
  let suma = 0;
  let alternar = false;

  for (let i = num.length - 1; i >= 0; i--) {
    let n = parseInt(num.charAt(i), 10);
    if (alternar) {
      n *= 2;
      if (n > 9) n -= 9;
    }
    suma += n;
    alternar = !alternar;
  }
  return (suma % 10) === 0;
}

function enviarPago(event) {
  event.preventDefault();

  const numeroTarjeta = document.getElementById("numeroTarjeta").value.trim();
  const nombreTitular = document.getElementById("nombreTitular").value.trim();
  const cvv = document.getElementById("cvv").value.trim();

  if (!numeroTarjeta || !nombreTitular || !cvv) {
    alert("Por favor, completa todos los campos.");
    return;
  }

  if (!validarNumeroTarjeta(numeroTarjeta)) {
    alert("Número de tarjeta inválido.");
    return;
  }

  if (!/^\d{3,4}$/.test(cvv)) {
    alert("CVV inválido. Debe tener 3 o 4 dígitos.");
    return;
  }

  if (!/^[a-zA-Z\s]{2,}$/.test(nombreTitular)) {
    alert("Nombre inválido. Usa solo letras y espacios.");
    return;
  }

  alert("Pago realizado con éxito. ¡Gracias por tu compra!");

  pedidos = [];
  actualizarListaPedidos();
  cerrarPago();

  // Limpiar formulario
  document.getElementById("numeroTarjeta").value = "";
  document.getElementById("nombreTitular").value = "";
  document.getElementById("cvv").value = "";
}
