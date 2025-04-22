// main.js
import { Chart, registerables } from 'chart.js';
import style from './page.module.css';

Chart.register(...registerables);
// Importando o Chart.js e registrando os componentes necessários
// para evitar o erro de "Chart is not a constructor".
// Isso é necessário para que o Chart.js funcione corretamente
// em ambientes que não suportam módulos ES6 nativamente.

export const chartData = {
    labels: ['pão', 'bolo', 'torta', 'pudim', 'leite'],
    data: [30, 17, 10, 7, 36],
};


// const ul = document.querySelector('.card .details ul');
let doughnutChartInstance;

export function initChart(canvasElement) {
    if (canvasElement) {
        if (doughnutChartInstance) {
            doughnutChartInstance.destroy();
        }
        doughnutChartInstance = new Chart(canvasElement, {

            type: 'doughnut',
            data: {
                labels: chartData.labels,
                datasets: [{
                    label: 'Produtos mais vendidos',
                    data: chartData.data,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.8)',
                        'rgba(54, 162, 235, 0.8)',
                        'rgba(255, 206, 86, 0.8)',
                        'rgba(75, 192, 192, 0.8)',
                        'rgba(153, 102, 255, 0.8)',

                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                    ],
                    borderWidth: 1,
                }],
            },
            options: {
                borderWidth: 10,
                borderRadius: 2,
                hoverBorderWidth: 0,
                plugins: {
                    legend: {
                        display: false,
                    },
                },
            },
        });
    }
}



let barChartInstance;
export function initBarChart(canvasElement) {
    if (canvasElement) {
        if (barChartInstance) {
            barChartInstance.destroy();
        }
        barChartInstance = new Chart(canvasElement, {
            type: 'bar',
            data: {
                labels: barData.labels,
                datasets: [{
                    label: 'Produtos mais vendidos',
                    data: barData.data,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.8)',
                        'rgba(54, 162, 235, 0.8)',
                        'rgba(255, 206, 86, 0.8)',
                        'rgba(75, 192, 192, 0.8)',
                        'rgba(153, 102, 255, 0.8)',
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                    ],
                    borderWidth: 1,
                }],
            },
            options: {
                borderWidth: 10,
                borderRadius: 8,
                hoverBorderWidth: 0,
                plugins: {
                    legend: {
                        display: false,
                    },
                },
            },
        })
    }
}

// Cria uma nova instância do gráfico
// Verifica se o elemento canvas existe
// Se existir, cria um novo gráfico de linha
// e destrói a instância anterior, se houver.


let lineChartInstance;
export function initLineChart(canvasElement) {
    if (canvasElement) {
        if (lineChartInstance) {
            lineChartInstance.destroy();
        }
        lineChartInstance = new Chart(canvasElement, {
            type: 'line',
            data: {
                labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai'], // Os rótulos do eixo X (meses, por exemplo)
                datasets: [
                    {
                        label: 'Margem de Ganho',
                        data: [1500, 3000, 2500, 3500, 4000], // Seus dados de margem de ganho
                        // backgroundColor: 'rgba(75, 192, 192, 0.8)', // Cor de fundo da área sob a linha (opcional)
                        borderColor: '#0033FF',       // Cor da linha
                        borderWidth: 0.5,                             // Espessura da linha
                        tension: 0.3,                               // Suavização da curva (0 para linha reta)
                        pointRadius: 0.2,                             // Raio dos pontos
                        pointBackgroundColor: '0033FF', // Cor dos pontos
                    },
                    {
                        label: 'Margem de Gasto',
                        data: [1000, 2000, 2800, 1500, 3200], // Seus dados de margem de gasto
                        // backgroundColor: 'rgba(255, 99, 132, 0.8)',  // Cor de fundo da área sob a linha (opcional)
                        borderColor: '#0033FF',        // Cor da linha
                        borderWidth: 2,                              // Espessura da linha
                        tension: 0.3,                                // Suavização da curva (0 para linha reta)
                        pointRadius: 0.5,                              // Raio dos pontos
                        pointBackgroundColor: '0033FF ',// Cor dos pontos
                        borderDash: [3, 3]
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true, // Começar o eixo Y em 0
                        title: {
                            display: true,
                            text: 'Valor (R$)' // Título do eixo Y
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Mês' // Título do eixo X
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: true,
                        position: 'top', //alinha a legenda em cima
                        align: 'end', //alinha a legend no fim da 'linha'
                        labels: {
                            generateLabels: (chart) => {
                                const original = Chart.defaults.plugins.legend.labels.generateLabels(chart);
                                return original.map(label => {
                                    if (label.datasetIndex === 1) { // Índice do dataset da Margem de Gasto
                                        label.lineDash = [5, 5];
                                    } else {
                                        label.lineDash = [];
                                    }
                                    return label;
                                });
                            }
                        }
                    }
                }
            },
        });
    }
}


export const populateUl = (ulElement, chartData) => {
    if (ulElement) {
        chartData.labels.forEach((label, index) => {
            let li = document.createElement('li');
            li.innerHTML = `${label}: <span class="${style.percentage}">${chartData.data[index]}%</span>`;
            ulElement.appendChild(li);
        });
    }
};
populateUl();


// export const chartData = {
//     labels: ['pão', 'bolo', 'torta', 'pudim', 'leite'],
//     data: [30, 17, 10, 7, 36],
// };
const barData = {
    labels: ['pão', 'bolo', 'torta', 'pudim', 'leite'],
    data: [1000, 3500, 458, 2000, 30218],
};