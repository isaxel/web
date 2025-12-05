// chart.js - модуль для работы с диаграммами
"use strict";

let chartInstance = null;

function initChart() {
    // Создание контейнера для диаграммы если его нет
    if (!document.getElementById('chartContainer')) {
        const resultsHeader = document.querySelector('h2');
        if (!resultsHeader) return;

        const chartContainer = document.createElement('div');
        chartContainer.id = 'chartContainer';
        chartContainer.className = 'chart-container';
        chartContainer.style.display = 'none';

        const chartHTML = `
            <h2>Статистика попаданий</h2>
            <div class="chart-wrapper">
                <canvas id="resultsChart"></canvas>
            </div>
            <div id="chartStats" class="chart-stats"></div>
        `;
        chartContainer.innerHTML = chartHTML;

        // Вставка диаграммы перед таблицей
        resultsHeader.insertAdjacentElement('afterend', chartContainer);
    }
}

// Обновление круговой диаграммы
function updateChart(resultsHistory) {
    if (!resultsHistory || resultsHistory.length < 5) {
        clearChart();
        return;
    }

    // Подсчет статистики
    const hits = resultsHistory.filter(r => r.answer).length;
    const misses = resultsHistory.length - hits;
    const hitPercentage = ((hits / resultsHistory.length) * 100).toFixed(1);

    // Проверка, есть ли контейнер для диаграммы
    let chartContainer = document.getElementById('chartContainer');
    if (!chartContainer) {
        initChart();
        chartContainer = document.getElementById('chartContainer');
        if (!chartContainer) return;
    }

    chartContainer.style.display = 'block';

    // Обновление статистики
    const chartStats = document.getElementById('chartStats');
    if (chartStats) {
        chartStats.innerHTML = `
            Всего проверок: ${resultsHistory.length}<br>
            Попаданий: ${hits} (${hitPercentage}%)<br>
            Промахов: ${misses}
        `;
    }

    const canvas = document.getElementById('resultsChart');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    // Уничтожение старой диаграммы если есть
    if (chartInstance) {
        chartInstance.destroy();
    }

    // Создание новой диаграммы
    chartInstance = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Попадания', 'Промахи'],
            datasets: [{
                data: [hits, misses],
                backgroundColor: ['#4caf50', '#ff6b6b'],
                borderColor: ['#388e3c', '#d32f2f'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: '#ffffff',
                        font: {
                            size: 14
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.raw || 0;
                            const percentage = ((value / resultsHistory.length) * 100).toFixed(1);
                            return `${label}: ${value} (${percentage}%)`;
                        }
                    }
                }
            }
        }
    });
}

// Очистка диаграммы
function clearChart() {
    const chartContainer = document.getElementById('chartContainer');
    if (chartContainer) {
        chartContainer.style.display = 'none';
    }

    if (chartInstance) {
        chartInstance.destroy();
        chartInstance = null;
    }
}

// Экспортация функции
window.ChartModule = {
    initChart: initChart,
    updateChart: updateChart,
    clearChart: clearChart
};