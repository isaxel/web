"use strict";


let xVal = '';
let x = -10;
let y = 10;
let rValues = [];

function sendRequest(x, y, r) {
    const url = new URL('./fcgi-bin/my_app.jar', window.location.href);
    url.searchParams.set('x', x);
    url.searchParams.set('y', y);
    url.searchParams.set('r', r);

    return fetch(url.href, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Ошибка сети или сервера');
            }
            return response.text();
        });
}

function addResultToTable(x, y, r, result) {
    const table = document.getElementById("resultsTable");
    const newRow = table.insertRow();

    const jsonResult = JSON.parse(result);

    const xCell = newRow.insertCell(0);
    const yCell = newRow.insertCell(1);
    const rCell = newRow.insertCell(2);
    const answerCell = newRow.insertCell(3);
    const executionTimeCell = newRow.insertCell(4);
    const serverTimeCell = newRow.insertCell(5);

    xCell.innerText = x;
    yCell.innerText = y;
    rCell.innerText = r;
    serverTimeCell.innerText = jsonResult.serverTime;
    executionTimeCell.innerText = jsonResult.executionTime;
    answerCell.innerText = jsonResult.answer ? "Входит" : "Не входит";

    saveDataToStorage();
}

function showError(fieldId, message) {
    const errorElement = document.getElementById(fieldId);
    const errorText = errorElement.querySelector('.error-text');

    if (errorText) {
        errorText.textContent = message;
    } else {
        errorElement.textContent = message;
    }

    errorElement.classList.remove('hidden');
    errorElement.classList.add('visible');

    // Добавляем класс ошибки к родительскому элементу
    const inputElement = errorElement.previousElementSibling ||
                        errorElement.parentElement.querySelector('input, #radios, #checks');
    if (inputElement) {
        inputElement.classList.add('has-error');
    }
}

function hideError(fieldId) {
    const errorElement = document.getElementById(fieldId);
    errorElement.classList.add('hidden');
    errorElement.classList.remove('visible');

    // Убираем класс ошибки с родительского элемента
    const inputElement = errorElement.previousElementSibling ||
                        errorElement.parentElement.querySelector('input, #radios, #checks');
    if (inputElement) {
        inputElement.classList.remove('has-error');
    }
}

function showFormError(message) {
    const errorElement = document.getElementById('formError');
    const errorText = errorElement.querySelector('.error-text');

    if (errorText) {
        errorText.textContent = message;
    } else {
        errorElement.textContent = message;
    }

    errorElement.classList.remove('hidden');
    errorElement.classList.add('visible');
}

function hideFormError() {
    const errorElement = document.getElementById('formError');
    errorElement.classList.add('hidden');
    errorElement.classList.remove('visible');
}

function clearErrors() {
    hideError('xError');
    hideError('yError');
    hideError('rError');
    hideFormError();

    // Убираем классы ошибок со всех элементов
    document.querySelectorAll('.has-error').forEach(el => {
        el.classList.remove('has-error');
    });
}


function validateX() {
    xVal = document.getElementById("xInput").value.trim();

    if (isEmptyString(xVal)) {
        showError('xError', 'Поле X не может быть пустым');
        return false;
    }

    if (xVal.includes('-') && xVal.startsWith('-')) {
            xVal = '-' + xVal.replace(/-/g, '');
    }

    xVal = xVal.replace(",", ".");

    const numX = parseFloat(xVal);

    if (isNaN(numX)) {
        showError('xError', 'X должен быть числом');
        return false;
    }

    if (numX < -5 || numX > 3) {
        showError('xError', 'X должен быть в диапазоне от -5 до 3');
        return false;
    }

    x = numX;
    hideError('xError');
    return true;
}


function validateY() {
    const radios = document.getElementsByName('number');
    let selectedY = null;

    for (const radio of radios) {
        if (radio.checked) {
            selectedY = radio.value;
            break;
        }
    }

    if (!selectedY) {
        showError('yError', 'Выберите значение Y');
        return false;
    }

    y = parseFloat(selectedY);
    hideError('yError');
    return true;
}


function validateR() {
    const checks = document.getElementsByName('numberr');
    rValues = [];

    for (const check of checks) {
        if (check.checked) {
            rValues.push(parseFloat(check.value));
        }
    }

    if (rValues.length === 0) {
        showError('rError', 'Выберите хотя бы одно значение R');
        return false;
    }

    hideError('rError');
    return true;
}


function isEmptyString(str) {
    return !str || !str.trim();
}

function saveDataToStorage() {
    const table = document.getElementById("resultsTable");
    const rows = table.rows;
    const data = [];

    for (let i = 1; i < rows.length; i++) {
        const cells = rows[i].cells;
        data.push({
            x: cells[0].textContent,
            y: cells[1].textContent,
            r: cells[2].textContent,
            answer: cells[3].textContent,
            executionTime: cells[4].textContent,
            serverTime: cells[5].textContent
        });
    }

    localStorage.setItem('resultsData', JSON.stringify(data));
}


function loadDataFromStorage() {
    const savedData = localStorage.getItem('resultsData');

    if (savedData) {
        const data = JSON.parse(savedData);
        const table = document.getElementById("resultsTable");

        while (table.rows.length > 1) {
            table.deleteRow(1);
        }

        data.forEach(item => {
            const newRow = table.insertRow();

            const xCell = newRow.insertCell(0);
            const yCell = newRow.insertCell(1);
            const rCell = newRow.insertCell(2);
            const answerCell = newRow.insertCell(3);
            const executionTimeCell = newRow.insertCell(4);
            const serverTimeCell = newRow.insertCell(5);

            xCell.innerText = item.x;
            yCell.innerText = item.y;
            rCell.innerText = item.r;
            answerCell.innerText = item.answer;
            executionTimeCell.innerText = item.executionTime;
            serverTimeCell.innerText = item.serverTime;
        });
    }
}


function clearTable() {
    const table = document.getElementById("resultsTable");

    while (table.rows.length > 1) {
        table.deleteRow(1);
    }

    localStorage.removeItem('resultsData');

    // Cообщение об успехе через блок ошибки (с зеленым цветом)
    showFormError('Таблица успешно очищена');
    const formError = document.getElementById('formError');
    formError.classList.add('success');

    setTimeout(() => {
        hideFormError();
        formError.classList.remove('success');
    }, 3000);
}

// Основная функция обработки
document.getElementById("getButton").onclick = async function () {
    clearErrors();

    const isXValid = validateX();
    const isYValid = validateY();
    const isRValid = validateR();

    if (!isXValid || !isYValid || !isRValid) {
        showFormError('Исправьте ошибки в форме перед отправкой');
        return;
    }

    try {
        hideFormError();

        // Отправляем запросы для каждого выбранного значения R
        for (const r of rValues) {
            const result = await sendRequest(x, y, r);
            addResultToTable(x, y, r, result);
        }

        showFormError(`Запросы успешно выполнены для ${rValues.length} значений R`);
        const formError = document.getElementById('formError');
        formError.classList.add('success');

        setTimeout(() => {
            hideFormError();
            formError.classList.remove('success');
        }, 3000);

    } catch (error) {
        showFormError("Ошибка: " + error.message);
    }
};

// Обработчик для кнопки очистки
document.getElementById("clearButton").onclick = function () {
    if (confirm("Вы уверены, что хотите очистить таблицу?")) {
        clearTable();
    }
};

// Cкрытия ошибок при изменении значений
document.getElementById("xInput").addEventListener('input', function() {
    hideError('xError');
    hideFormError();
});

document.querySelectorAll('input[name="number"]').forEach(radio => {
    radio.addEventListener('change', function() {
        hideError('yError');
        hideFormError();
    });
});

document.querySelectorAll('input[name="numberr"]').forEach(checkbox => {
    checkbox.addEventListener('change', function() {
        hideError('rError');
        hideFormError();
    });
});

// Загрузка сохраненных данных при перезагрузке страницы
window.onload = function () {
    loadDataFromStorage();

    // Восстановление выбранных значений R
    const urlParams = new URLSearchParams(window.location.search);
    const savedR = urlParams.get('r') || localStorage.getItem('selectedR');

    if (savedR) {
        const rValues = savedR.split(',');
        const checks = document.getElementsByName('numberr');

        for (const check of checks) {
            check.checked = rValues.includes(check.value);
        }
    }

};
