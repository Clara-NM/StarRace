// Detectar si el dispositivo es móvil
function isMobile() {
  return window.innerWidth <= 768; // Detecta dispositivos con ancho menor o igual a 768px
}

// Función para inicializar los niños
function initializeChildren() {
  const childrenContainer = document.getElementById("children");
  childrenContainer.innerHTML = ""; // Limpia el contenedor antes de agregar niños

  childrenNames.forEach((name, index) => {
    // Crear el contenedor principal para cada niño
    const childDiv = document.createElement("div");
    childDiv.className = "child";
    childDiv.dataset.stars = 2; // Cada niño comienza con 2 estrellas

    // Crear el nombre del niño
    const nameElement = document.createElement("div");
    nameElement.className = "name";
    nameElement.textContent = name;

    // Crear el contenedor de estrellas
    const starsElement = document.createElement("div");
    starsElement.className = "stars";
    starsElement.innerHTML = "⭐️⭐️";

    // Crear el contenedor para los botones
    const buttonsDiv = document.createElement("div");
    buttonsDiv.className = "buttons";

    // Botón para añadir estrellas
    const addStarButton = document.createElement("button");
    addStarButton.textContent = "+";
    addStarButton.className = "add-star";
    addStarButton.addEventListener("click", () => {
      if (childDiv.dataset.stars < 5) {
        childDiv.dataset.stars++;
        updateStars(childDiv);
      }
    });

    // Botón para quitar estrellas
    const removeStarButton = document.createElement("button");
    removeStarButton.textContent = "-";
    removeStarButton.className = "remove-star";
    removeStarButton.addEventListener("click", () => {
      if (childDiv.dataset.stars > 0) {
        childDiv.dataset.stars--;
        updateStars(childDiv);
      }
    });

    // Botón para eliminar al niño
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "🗑️";
    deleteButton.className = "delete-button";
    deleteButton.addEventListener("click", () => {
      deleteChild(index);
    });

    // Agregar botones al contenedor de botones
    buttonsDiv.appendChild(addStarButton);
    buttonsDiv.appendChild(removeStarButton);

    // Agregar todos los elementos al contenedor principal del niño
    childDiv.appendChild(nameElement);
    childDiv.appendChild(starsElement);
    childDiv.appendChild(buttonsDiv);

    // Agregar el contenedor del niño al contenedor principal
    childrenContainer.appendChild(childDiv);
  });
}

// Función para actualizar visualmente las estrellas
function updateStars(childDiv) {
  const starsElement = childDiv.querySelector(".stars");
  const starsCount = childDiv.dataset.stars;
  starsElement.innerHTML = "⭐️".repeat(starsCount);

  // Si el niño alcanza 5 estrellas, se activa confeti y sonido de aplausos
  if (starsCount == 5) {
    const applause = document.getElementById("applause");
    applause.currentTime = 0; // Reiniciar el sonido de aplausos
    applause.play(); // Reproducir sonido
    launchConfetti(); // Lanza confeti
  }
}

// Función para eliminar un niño
function deleteChild(index) {
  showConfirmationDialog("¿Estás seguro de que quieres eliminar a este niño?", () => {
    childrenNames.splice(index, 1); // Elimina el niño del array
    localStorage.setItem("children", JSON.stringify(childrenNames)); // Actualiza localStorage
    initializeChildren(); // Actualiza la lista
  });
}

// Función para añadir un niño
function addChild(name) {
  if (name) {
    childrenNames.push(name);
    localStorage.setItem("children", JSON.stringify(childrenNames));
    showAlertDialog(`¡El niño/a "${name}" ha sido añadido correctamente!`);
    initializeChildren(); // Actualiza la lista
  }
}

// Función para mostrar un cuadro de confirmación personalizado
function showConfirmationDialog(message, onConfirm) {
  const dialogContainer = document.createElement("div");
  dialogContainer.className = "dialog-container";

  const dialog = document.createElement("div");
  dialog.className = "dialog";

  const messageElement = document.createElement("p");
  messageElement.textContent = message;

  const confirmButton = document.createElement("button");
  confirmButton.textContent = "Aceptar";
  confirmButton.className = "confirm-button";
  confirmButton.addEventListener("click", () => {
    onConfirm(); // Ejecuta la acción confirmada
    document.body.removeChild(dialogContainer); // Elimina el cuadro de diálogo
  });

  const cancelButton = document.createElement("button");
  cancelButton.textContent = "Cancelar";
  cancelButton.className = "cancel-button";
  cancelButton.addEventListener("click", () => {
    document.body.removeChild(dialogContainer); // Cierra el cuadro de diálogo
  });

  dialog.appendChild(messageElement);
  dialog.appendChild(confirmButton);
  dialog.appendChild(cancelButton);
  dialogContainer.appendChild(dialog);
  document.body.appendChild(dialogContainer);
}

// Función para mostrar un cuadro de alerta
function showAlertDialog(message) {
  const dialogContainer = document.createElement("div");
  dialogContainer.className = "dialog-container";

  const dialog = document.createElement("div");
  dialog.className = "dialog alert";

  const messageElement = document.createElement("p");
  messageElement.textContent = message;

  const closeButton = document.createElement("button");
  closeButton.textContent = "Cerrar";
  closeButton.className = "close-button";
  closeButton.addEventListener("click", () => {
    document.body.removeChild(dialogContainer); // Cierra el cuadro de diálogo
  });

  dialog.appendChild(messageElement);
  dialog.appendChild(closeButton);
  dialogContainer.appendChild(dialog);
  document.body.appendChild(dialogContainer);
}

// Función para lanzar confeti
function launchConfetti() {
  if (isMobile()) return; // No lanzar confeti en móviles
  confetti({
    particleCount: 150,
    spread: 70,
    origin: { y: 0.6 },
  });
}

// Función para generar estrellas fugaces
function createShootingStar() {
  if (isMobile()) return; // No generar estrellas en dispositivos móviles

  const starContainer = document.getElementById("star-container");
  const star = document.createElement("div");
  star.className = "shooting-star";

  // Posición inicial aleatoria
  const startX = Math.random() * window.innerWidth; // Posición horizontal aleatoria
  const startY = Math.random() * window.innerHeight / 2; // Posición vertical limitada a la mitad superior

  // Establecer la posición inicial
  star.style.left = `${startX}px`;
  star.style.top = `${startY}px`;

  // Agregar la estrella al contenedor
  starContainer.appendChild(star);

  // Eliminar la estrella después de la animación
  setTimeout(() => {
    star.remove();
  }, 3000); // Coincide con la duración de la animación
}

// Crear estrellas fugaces periódicamente si no es móvil
if (!isMobile()) {
  setInterval(createShootingStar, 500);
}

// Inicializar la lista de niños al cargar la página
let childrenNames = JSON.parse(localStorage.getItem("children")) || ["Ana", "Luis", "María", "Carlos"];
initializeChildren();
