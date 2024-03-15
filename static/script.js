document.addEventListener("DOMContentLoaded", function () {
    var dashboardLink = document.getElementById("dashboard-link");
    var contactLink = document.getElementById("contact-link");
    var dashboardContent = document.getElementById("dashboard-content");
    var cryptoMoreDiv = document.getElementById("crypto-more");
    var totalContainer = document.getElementById("total-container-id");

    dashboardLink.addEventListener("click", function (event) {
        event.preventDefault();
        toggleContentContainers(dashboardContent, cryptoMoreDiv, totalContainer);
    });

    contactLink.addEventListener("click", function (event) {
        event.preventDefault();
        toggleContentContainers(cryptoMoreDiv, dashboardContent, totalContainer);
    });

    function toggleContentContainers(showElement, hideElement, toggleElement) {
        showElement.style.display = "block";
        hideElement.style.display = "none";
        toggleElement.style.display = (showElement === dashboardContent) ? "block" : "none";
        dashboardContent.style.overflowY = (showElement === dashboardContent) ? "auto" : "hidden";
    }
});


document.addEventListener("DOMContentLoaded", function () {
    // Obtener todos los campos de entrada
    var amountInputs = document.querySelectorAll(".crypto-amount");

    // Agregar evento de escucha a cada campo de entrada
    amountInputs.forEach(function (input) {
        input.addEventListener("input", function () {
            // Obtener el precio de la moneda de los datos del atributo
            var price = parseFloat(input.dataset.price);
            // Obtener la cantidad introducida por el usuario
            var amount = parseFloat(input.value);

            // Verificar si el valor es un número válido
            if (!isNaN(amount)) {
                // Calcular el valor total
                var totalValue = price * amount;
                // Redondear a 2 decimales y convertir a string
                totalValue = totalValue.toFixed(2).replace(/\.00$/, "");
            } else {
                // Si no es un número válido, establecer el valor total en 0
                var totalValue = "0";
            }

            // Obtener la fila actual
            var row = input.closest("tr");
            // Encontrar la celda de resultado en la misma fila
            var totalCell = row.querySelector(".crypto-total");
            // Mostrar el valor total en la celda de resultado
            totalCell.textContent = totalValue;
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    // Función para actualizar el total
    function updateTotal() {
        // Obtener el elemento span del total
        var totalSpan = document.getElementById("total-value");

        // Obtener todas las celdas de crypto-total
        var totalCells = document.querySelectorAll(".crypto-total");

        // Calcular la suma de los valores
        var totalSum = 0;
        totalCells.forEach(function (cell) {
            totalSum += parseFloat(cell.textContent);
        });

        // Mostrar la suma en el span del total
        totalSpan.textContent = "$" + totalSum.toFixed(2);
    }

    // Actualizar el total al cargar la página
    updateTotal();

    // Obtener todos los campos de entrada
    var amountInputs = document.querySelectorAll(".crypto-amount");

    // Agregar evento de escucha a cada campo de entrada
    amountInputs.forEach(function (input) {
        input.addEventListener("input", function () {
            // Obtener la fila actual
            var row = input.closest("tr");
            // Encontrar la celda de resultado en la misma fila
            var totalCell = row.querySelector(".crypto-total");

            // Obtener el precio de la moneda de los datos del atributo
            var price = parseFloat(input.dataset.price);
            // Obtener la cantidad introducida por el usuario
            var amount = parseFloat(input.value);

            // Verificar si el valor es un número válido
            if (!isNaN(amount)) {
                // Calcular el valor total
                var totalValue = price * amount;
                // Redondear a 2 decimales y convertir a string
                totalValue = totalValue.toFixed(2);
            } else {
                // Si no es un número válido, establecer el valor total en 0
                var totalValue = "0";
            }

            // Mostrar el valor total en la celda de resultado
            totalCell.textContent = totalValue;

            // Actualizar el total
            updateTotal();
        });
    });
});
