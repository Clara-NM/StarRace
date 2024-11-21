// Obtener los nombres de los niños desde localStorage o establecer los nombres predeterminados
let childrenNames = JSON.parse(localStorage.getItem("children")) || ["Ana", "Luis", "María", "Carlos"];

// Función para crear la lista de niños con estrellas iniciales y botones para añadir, quitar estrellas y eliminar
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

  // Si el niño alcanza 5 estrellas, se activa una animación de confeti
  if (starsCount == 5) {
    const applause = document.getElementById("applause");
    applause.play(); // Reproducir sonido de aplausos
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

// Función para mostrar un cuadro de alerta bonito
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
  confetti({
    particleCount: 150,
    spread: 70,
    origin: { y: 0.6 },
  });
}

// Inicializar la lista de niños al cargar la página
initializeChildren();
