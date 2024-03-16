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

    // 'Phantom wallet' connection function
    document.getElementById("connect-wallet-btn").addEventListener("click", async () => {
        try {
            if (window.solana && window.solana.connect) {
                const connected = await window.solana.connect();
                if (connected) {
                    const balance = await obtenerSaldo(connected.publicKey);
                    document.getElementById("wallet-name").textContent = "Wallet: " + connected.publicKey.toString();
                    mostrarSaldo(balance);
                } else {
                    console.log("La conexión de la billetera falló");
                }
            } else {
                console.error("Solana wallet not available.");
            }
        } catch (error) {
            console.error("Error al conectar la billetera:", error);
        }
    });

    document.getElementById("disconnect-wallet-btn").addEventListener("click", async () => {
        try {
            if (window.solana && window.solana.disconnect) {
                await window.solana.disconnect();
                document.getElementById("wallet-name").textContent = "Wallet: Not Connected";
                document.getElementById("wallet-balance").textContent = "Balance: Not Available";
            } else {
                console.error("Solana wallet disconnect function not available.");
            }
        } catch (error) {
            console.error("Error al desconectar la billetera:", error);
        }
    });

    async function obtenerSaldo(publicKey) {
        try {
            if (window.solanaWeb3 && window.solanaWeb3.Connection) {
                const connection = new window.solanaWeb3.Connection("https://api.mainnet-beta.solana.com");
                const balance = await connection.getBalance(publicKey);
                const solBalance = balance / (10 ** 9); // Convertir lamports a SOL
                console.log("Saldo en lamports:", balance);
                console.log("Saldo en SOL:", solBalance);
                return solBalance;
            } else {
                console.error("Solana Web3 library not available.");
                return 0;
            }
        } catch (error) {
            console.error("Error al obtener el saldo de la cuenta:", error);
            return 0;
        }
    }


    function mostrarSaldo(balance) {
        document.getElementById("wallet-balance").textContent = "Balance: " + balance + " SOL";
    }
});