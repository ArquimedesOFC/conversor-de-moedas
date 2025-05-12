let moedas = { USD: 0, EUR: 0, GBP: 0, JPY: 0 };
const moedaAPI = "https://economia.awesomeapi.com.br/last/";

async function getMoedas() {
    const response = await fetch(`${moedaAPI}USD-BRL,EUR-BRL,GBP-BRL,JPY-BRL`);
    const data = await response.json();

    moedas.USD = parseFloat(data.USDBRL.high);
    moedas.EUR = parseFloat(data.EURBRL.high);
    moedas.GBP = parseFloat(data.GBPBRL.high);
    moedas.JPY = parseFloat(data.JPYBRL.high);

    renderChart();
}

function renderChart() {
    const ctx = document.getElementById('currencyChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Dólar', 'Euro', 'Libra', 'Iene'],
            datasets: [{
                label: 'Taxas de câmbio para 1 Real',
                data: [moedas.USD, moedas.EUR, moedas.GBP, moedas.JPY],
                backgroundColor: ['#3498db', '#e67e22', '#2ecc71', '#f39c12'],
                borderColor: ['#2980b9', '#d35400', '#27ae60', '#e74c3c'],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function toggleTheme() {
    const body = document.body;
    const themeToggleBtn = document.querySelector(".theme-toggle");

    // Verificar qual tema está ativo
    const isDarkTheme = body.classList.contains('dark-theme');

    // Alternar entre tema claro e escuro
    if (isDarkTheme) {
        // Remover o tema escuro
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
        themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>'; // Ícone do sol
    } else {
        // Remover o tema claro
        body.classList.remove('light-theme');
        body.classList.add('dark-theme');
        themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>'; // Ícone da lua
    }
}

// Chamar a função para aplicar o tema ao carregar a página
toggleTheme();





async function converter() {
    const valorReal = parseFloat(document.getElementById("valor-real").value);
    const moedaOrigem = document.getElementById("moeda-origem").value;
    if (isNaN(valorReal)) return alert("Digite um valor válido");

    let resultado = valorReal;

    if (moedaOrigem === "USD") {
        resultado = valorReal / moedas.USD;
    } else if (moedaOrigem === "EUR") {
        resultado = valorReal / moedas.EUR;
    } else if (moedaOrigem === "GBP") {
        resultado = valorReal / moedas.GBP;
    } else if (moedaOrigem === "JPY") {
        resultado = valorReal / moedas.JPY;
    }

    document.getElementById("valor-convertido").value = resultado.toFixed(2);
    salvarHistorico(valorReal, moedaOrigem, resultado);
}

function salvarHistorico(valor, moeda, resultado) {
    const historico = document.getElementById("historico-lista");
    const li = document.createElement("li");
    li.textContent = `${valor} ${moeda} convertido para ${resultado.toFixed(2)}`;
    historico.appendChild(li);
}

function limpar() {
    document.getElementById("valor-real").value = "";
    document.getElementById("valor-convertido").value = "";
}

// Carregar dados das moedas ao iniciar
getMoedas();
