const labelsGroup = document.getElementById('labels');
const rect = document.getElementById('graph-rect');
const polygon = document.getElementById('graph-polygon');
const path = document.getElementById('graph-path');
const svg = document.getElementById("graph-svg");

const centerX = 250;
const centerY = 250;
const ONE_UNIT_PX = 47;

let currentR = 0;
let selectedR = 0;

const labels = {
    x: {
        r: document.getElementById('label-x-r'),
        rHalf: document.getElementById('label-x-r-half'),
        negRHalf: document.getElementById('label-x-neg-r-half'),
        negR: document.getElementById('label-x-neg-r'),
    },
    y: {
        r: document.getElementById('label-y-r'),
        rHalf: document.getElementById('label-y-r-half'),
        negRHalf: document.getElementById('label-y-neg-r-half'),
        negR: document.getElementById('label-y-neg-r'),
    }
};

function showToast(message, type = 'info') {
    const container = document.getElementById('notification-container');
    if (!container) return; // На случай, если контейнер не добавлен в HTML

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerText = message;

    // авто-удаление через 4 секунды
    setTimeout(() => {
        if (toast.parentNode) {
            toast.style.opacity = '0';
            toast.style.transition = 'opacity 0.5s ease';
            setTimeout(() => toast.remove(), 500);
        }
    }, 4000);

    container.appendChild(toast);
}

document.addEventListener('DOMContentLoaded', () => {
    currentR = parseFloat(window.lastR) || 0;
    selectedR = currentR;

    updateGraph(currentR);
    drawHistoryPoints(window.historyPoints, currentR);

    const rRadios = document.querySelectorAll('input[name="r"]');
    rRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            currentR = parseFloat(radio.value);
            selectedR = currentR;
            updateGraph(currentR);
            drawHistoryPoints(window.historyPoints, currentR);
        });
    });

    const form = document.getElementById('check-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(form);
            const x = formData.get('x');
            const y = formData.get('y');
            const r = formData.get('r');

            if(!x || !y || !r) {
                showToast("Заполните все поля", "warning");
                return;
            }

            sendDnsRequest(x, y, r);
        });
    }

    setupGraphInteractive();
});

async function sendDnsRequest(x, y, r) {
    const domainName = `x${x}y${y}r${r}.w624.lab`;
    const url = `${window.contextPath}/doh?name=${encodeURIComponent(domainName)}&type=TXT`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Network response was not ok");

        const jsonResponse = await response.json();

        if (jsonResponse.status === "NOERROR") {
            const resultData = JSON.parse(jsonResponse.txtData);
            handleSuccess(resultData);
            showToast("Точка успешно проверена", "success");
        } else {
            showToast("DNS Error: " + jsonResponse.txtData, "error");
        }
    } catch (error) {
        console.error("DoH Fetch Error:", error);
        showToast("Ошибка выполнения DNS-запроса", "error");
    }
}

function handleSuccess(result) {
    window.historyPoints.push(result);
    drawHistoryPoints(window.historyPoints, currentR);

    const tableBody = document.querySelector(".results-container tbody");
    if (tableBody) {
        const newRow = document.createElement("tr");
        newRow.innerHTML = `
            <td>${result.x}</td>
            <td>${result.y}</td>
            <td>${result.r}</td>
            <td>${result.hit ? "Попадание" : "Промах"}</td>
            <td>${result.currentTime}</td>
            <td>${result.executionTime}</td>
        `;
        if (tableBody.firstChild) {
            tableBody.insertBefore(newRow, tableBody.firstChild);
        } else {
            tableBody.appendChild(newRow);
        }
    }
}

export function updateGraph(R) {
    if (isNaN(Number(R)) || R <= 0) {
        if(rect) rect.setAttribute('visibility', 'hidden');
        if(polygon) polygon.setAttribute('visibility', 'hidden');
        if(path) path.setAttribute('visibility', 'hidden');
        return;
    }
    currentR = Number(R);
    drawShapes(currentR);
    updateLabels(currentR);
}

function drawShapes(R) {
    if(!rect || !polygon || !path) return;

    rect.setAttribute('visibility', 'visible');
    polygon.setAttribute('visibility', 'visible');
    path.setAttribute('visibility', 'visible');

    // Прямоугольник
    rect.setAttribute('x', centerX);
    rect.setAttribute('y', centerY);
    rect.setAttribute('width', R * ONE_UNIT_PX);
    rect.setAttribute('height', (R / 2) * ONE_UNIT_PX);

    // Треугольник
    const p1 = `${centerX},${centerY}`;
    const p2 = `${centerX - (R / 2) * ONE_UNIT_PX},${centerY}`;
    const p3 = `${centerX},${centerY - (R / 2) * ONE_UNIT_PX}`;
    polygon.setAttribute('points', `${p1} ${p2} ${p3}`);

    // Сектор
    const radiusInPixels = (R / 2) * ONE_UNIT_PX;
    const pathData = `M ${centerX},${centerY}
                      L ${centerX},${centerY + radiusInPixels}
                      A ${radiusInPixels},${radiusInPixels} 0 0,1
                      ${centerX - radiusInPixels},${centerY}
                      Z`;
    path.setAttribute('d', pathData);
}

function updateLabels(R) {
    labels.x.r.textContent = R;
    labels.x.rHalf.textContent = R / 2;
    labels.x.negR.textContent = -R;
    labels.x.negRHalf.textContent = -R / 2;

    labels.y.r.textContent = R;
    labels.y.rHalf.textContent = R / 2;
    labels.y.negRHalf.textContent = -R / 2;
    labels.y.negR.textContent = -R;

    const r_px = R * ONE_UNIT_PX;
    const r_half_px = (R / 2) * ONE_UNIT_PX;

    labels.x.r.setAttribute('x', centerX + r_px - 5);
    labels.x.rHalf.setAttribute('x', centerX + r_half_px - 10);
    labels.x.negRHalf.setAttribute('x', centerX - r_half_px - 20);
    labels.x.negR.setAttribute('x', centerX - r_px - 15);

    labels.y.r.setAttribute('y', centerY - r_px + 5);
    labels.y.rHalf.setAttribute('y', centerY - r_half_px + 5);
    labels.y.negRHalf.setAttribute('y', centerY + r_half_px + 5);
    labels.y.negR.setAttribute('y', centerY + r_px + 5);
}

function drawHistoryPoints(history, R) {
    const historyPointsContainer = document.getElementById('history-points');
    if (!historyPointsContainer) return;
    historyPointsContainer.innerHTML = '';

    if (!history || R <= 0) return;

    history.forEach(point => {
        const xVal = parseFloat(String(point.x).replace(',', '.'));
        const yVal = parseFloat(String(point.y).replace(',', '.'));

        const cx = centerX + xVal * ONE_UNIT_PX;
        const cy = centerY - yVal * ONE_UNIT_PX;

        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("cx", cx);
        circle.setAttribute("cy", cy);
        circle.setAttribute("r", "4");
        circle.setAttribute("fill", point.hit ? "#4CAF50" : "#F44336");
        circle.setAttribute("stroke", "white");

        historyPointsContainer.appendChild(circle);
    });
}

function setupGraphInteractive() {
    if (!svg) return;
    svg.addEventListener('click', event => {
        if (currentR <= 0) {
            showToast("Сначала выберите радиус R!", "warning");
            return;
        }

        const svgRect = svg.getBoundingClientRect();
        const clickX_px = event.clientX - svgRect.left;
        const clickY_px = event.clientY - svgRect.top;

        let mathX = (clickX_px - centerX) / ONE_UNIT_PX;
        let mathY = (centerY - clickY_px) / ONE_UNIT_PX;

        mathX = mathX.toFixed(3);
        mathY = mathY.toFixed(3);

        sendDnsRequest(mathX, mathY, currentR);
    });
}