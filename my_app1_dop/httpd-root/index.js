"use strict";

let xVal = '';
let x = -10;
let y = 10;
let rValues = [];
let cryptoKeyPair = null;
let resultsHistory = [];

// Web Crypto API
async function initCrypto() {
    try {
        const savedKey = localStorage.getItem('cryptoKeyPair');
        if (savedKey) {
            const keyData = JSON.parse(savedKey);
            cryptoKeyPair = {
                publicKey: await crypto.subtle.importKey(
                    'jwk',
                    keyData.publicKey,
                    { name: 'ECDSA', namedCurve: 'P-256' },
                    true,
                    ['verify']
                ),
                privateKey: await crypto.subtle.importKey(
                    'jwk',
                    keyData.privateKey,
                    { name: 'ECDSA', namedCurve: 'P-256' },
                    true,
                    ['sign']
                )
            };
            updateKeyStatus('Ключ загружен из памяти');
        } else {
            updateKeyStatus('Ключ не сгенерирован');
        }
    } catch (error) {
        console.error('Ошибка инициализации криптографии:', error);
        updateKeyStatus('Ошибка загрузки ключа', true);
    }
}

async function generateNewKey() {
    try {
        cryptoKeyPair = await crypto.subtle.generateKey(
            {
                name: 'ECDSA',
                namedCurve: 'P-256'
            },
            true,
            ['sign', 'verify']
        );

        const publicKeyJwk = await crypto.subtle.exportKey('jwk', cryptoKeyPair.publicKey);
        const privateKeyJwk = await crypto.subtle.exportKey('jwk', cryptoKeyPair.privateKey);

        localStorage.setItem('cryptoKeyPair', JSON.stringify({
            publicKey: publicKeyJwk,
            privateKey: privateKeyJwk
        }));

        updateKeyStatus('Ключ сгенерирован');
        return true;
    } catch (error) {
        console.error('Ошибка генерации ключа:', error);
        updateKeyStatus('Ошибка генерации ключа', true);
        return false;
    }
}

function updateKeyStatus(message, isError = false) {
    const keyStatus = document.getElementById('keyStatus');
    if (keyStatus) {
        keyStatus.textContent = message;
        keyStatus.style.color = isError ? '#ff6b6b' : '#4caf50';
    }
}

function updateSignatureStatus(message, isError = false) {
    const signatureStatus = document.getElementById('signatureStatus');
    if (signatureStatus) {
        signatureStatus.textContent = message;
        signatureStatus.style.color = isError ? '#ff6b6b' : '#4caf50';
    }
}

async function signData(x, y, r, timestamp) {
    if (!cryptoKeyPair) {
        throw new Error('Ключ не инициализирован');
    }

    try {
        // данные в том же формате, что и на сервере!
        const payload = {
            x: x.toString(),
            y: y.toString(),
            r: r.toString(),
            timestamp: timestamp.toString()
        };

        const encoder = new TextEncoder();
        const dataBuffer = encoder.encode(JSON.stringify(payload));

        const signature = await crypto.subtle.sign(
            {
                name: 'ECDSA',
                hash: { name: 'SHA-256' }
            },
            cryptoKeyPair.privateKey,
            dataBuffer
        );

        // Конвертируем подпись в hex
        const signatureArray = Array.from(new Uint8Array(signature));
        const signatureHex = signatureArray.map(b => b.toString(16).padStart(2, '0')).join('');

        updateSignatureStatus('Подпись создана');
        return signatureHex;
    } catch (error) {
        console.error('Ошибка создания подписи:', error);
        updateSignatureStatus('Ошибка создания подписи', true);
        throw error;
    }
}

async function sendRequest(x, y, r) {
    const url = new URL('./fcgi-bin/my_app.jar', window.location.href);
    const timestamp = Date.now();

    try {
        let signature = null;
        let publicKeyJwk = null;

        if (cryptoKeyPair) {
            signature = await signData(x, y, r, timestamp);
            publicKeyJwk = await crypto.subtle.exportKey('jwk', cryptoKeyPair.publicKey);
        } else {
            updateSignatureStatus('Подпись не создана (ключ отсутствует)');
        }

        url.searchParams.set('x', x);
        url.searchParams.set('y', y);
        url.searchParams.set('r', r);

        if (signature && publicKeyJwk) {
            url.searchParams.set('timestamp', timestamp);
            url.searchParams.set('signature', signature);
        }

        console.log('Отправка запроса на:', url.toString());
        console.log('PublicKey JSON:', publicKeyJwk ? JSON.stringify(publicKeyJwk).substring(0, 100) + '...' : 'нет');
        console.log('Подпись:', signature ? signature.substring(0, 50) + '...' : 'нет');

        const response = await fetch(url.href, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Ошибка сервера:', errorText);
            throw new Error(`HTTP ошибка ${response.status}: ${errorText}`);
        }

        const responseText = await response.text();
        console.log('Ответ от сервера:', responseText);
        return responseText;
    } catch (error) {
        console.error('Ошибка отправки запроса:', error);
        throw error;
    }
}

async function testCrypto() {
    try {
        console.log('=== Тестирование криптографии ===');

        // Проверяем, поддерживается ли Web Crypto API
        if (!window.crypto || !window.crypto.subtle) {
            console.error('Web Crypto API не поддерживается');
            return false;
        }

        console.log('Web Crypto API поддерживается');

        // Генерируем тестовый ключ
        const testKeyPair = await crypto.subtle.generateKey(
            {
                name: 'ECDSA',
                namedCurve: 'P-256'
            },
            true,
            ['sign', 'verify']
        );

        console.log('Ключ сгенерирован');

        // Экспортируем ключ
        const publicKeyJwk = await crypto.subtle.exportKey('jwk', testKeyPair.publicKey);
        console.log('PublicKey JWK:', publicKeyJwk);
        console.log('Длина publicKey JSON:', JSON.stringify(publicKeyJwk).length);

        const testData = {
            x: "1",
            y: "2",
            r: "3",
            timestamp: "1234567890"
        };

        // Создаем подпись
        const encoder = new TextEncoder();
        const dataBuffer = encoder.encode(JSON.stringify(testData));

        const signature = await crypto.subtle.sign(
            {
                name: 'ECDSA',
                hash: { name: 'SHA-256' }
            },
            testKeyPair.privateKey,
            dataBuffer
        );

        // Конвертируем в hex
        const signatureArray = Array.from(new Uint8Array(signature));
        const signatureHex = signatureArray.map(b => b.toString(16).padStart(2, '0')).join('');

        console.log('Тестовая подпись (первые 50 символов):', signatureHex.substring(0, 50) + '...');
        console.log('Длина подписи:', signatureHex.length);

        // Проверяем подпись
        const isValid = await crypto.subtle.verify(
            {
                name: 'ECDSA',
                hash: { name: 'SHA-256' }
            },
            testKeyPair.publicKey,
            signature,
            dataBuffer
        );

        console.log('Тестовая проверка подписи:', isValid ? 'УСПЕХ' : 'ОШИБКА');

        return isValid;
    } catch (error) {
        console.error('Ошибка тестирования криптографии:', error);
        return false;
    }
}

function addResultToTable(x, y, r, result) {
    const table = document.getElementById("resultsTable");
    if (!table) {
        console.error('Таблица не найдена');
        return;
    }

    const newRow = table.insertRow();

    try {
        let jsonResult;
        try {
            jsonResult = JSON.parse(result);
        } catch (parseError) {
            console.error('Ошибка парсинга JSON:', parseError, 'Ответ:', result);
            // Пытаемся извлечь данные из текста
            const answerMatch = result.match(/"answer":\s*(true|false)/);
            const execTimeMatch = result.match(/"executionTime":\s*"([^"]+)"/);
            const serverTimeMatch = result.match(/"serverTime":\s*"([^"]+)"/);

            jsonResult = {
                answer: answerMatch ? answerMatch[1] === 'true' : false,
                executionTime: execTimeMatch ? execTimeMatch[1] : '0',
                serverTime: serverTimeMatch ? serverTimeMatch[1] : new Date().toISOString()
            };
        }

        const xCell = newRow.insertCell(0);
        const yCell = newRow.insertCell(1);
        const rCell = newRow.insertCell(2);
        const answerCell = newRow.insertCell(3);
        const executionTimeCell = newRow.insertCell(4);
        const serverTimeCell = newRow.insertCell(5);
        const signatureCell = newRow.insertCell(6);

        xCell.innerText = x;
        yCell.innerText = y;
        rCell.innerText = r;
        serverTimeCell.innerText = jsonResult.serverTime || new Date().toLocaleString();
        executionTimeCell.innerText = jsonResult.executionTime || '0';

        if (jsonResult.answer === true || jsonResult.answer === 'true') {
            answerCell.innerText = "Входит";
            answerCell.style.color = "#4caf50";
        } else {
            answerCell.innerText = "Не входит";
            answerCell.style.color = "#ff6b6b";
        }

        signatureCell.innerText = cryptoKeyPair ? "Подпись отправлена" : "Без подписи";
        signatureCell.style.color = cryptoKeyPair ? "#4caf50" : "#888";

        resultsHistory.push({
            answer: jsonResult.answer === true || jsonResult.answer === 'true',
            timestamp: new Date().toISOString()
        });

        saveDataToStorage();

        if (window.ChartModule && window.ChartModule.updateChart) {
            window.ChartModule.updateChart(resultsHistory);
        }

    } catch (error) {
        console.error('Ошибка обработки ответа:', error, 'Ответ:', result);
        const errorCell = newRow.insertCell(0);
        errorCell.colSpan = 7;
        errorCell.innerText = 'Ошибка: ' + error.message;
        errorCell.style.color = '#ff6b6b';
    }
}

function showError(fieldId, message) {
    const errorElement = document.getElementById(fieldId);
    if (errorElement) {
        const errorText = errorElement.querySelector('.error-text');

        if (errorText) {
            errorText.textContent = message;
        } else {
            errorElement.textContent = message;
        }

        errorElement.classList.remove('hidden');
        errorElement.classList.add('visible');
    }
}

function hideError(fieldId) {
    const errorElement = document.getElementById(fieldId);
    if (errorElement) {
        errorElement.classList.add('hidden');
        errorElement.classList.remove('visible');
    }
}

function showFormError(message, isSuccess = false) {
    const errorElement = document.getElementById('formError');
    if (errorElement) {
        const errorText = errorElement.querySelector('.error-text');

        if (errorText) {
            errorText.textContent = message;
        } else {
            errorElement.textContent = message;
        }

        errorElement.classList.remove('hidden');
        errorElement.classList.add('visible');

        if (isSuccess) {
            errorElement.classList.add('success');
            errorElement.classList.remove('error');
        } else {
            errorElement.classList.add('error');
            errorElement.classList.remove('success');
        }
    }
}

function hideFormError() {
    const errorElement = document.getElementById('formError');
    if (errorElement) {
        errorElement.classList.add('hidden');
        errorElement.classList.remove('visible');
        errorElement.classList.remove('success');
        errorElement.classList.remove('error');
    }
}

function clearErrors() {
    hideError('xError');
    hideError('yError');
    hideError('rError');
    hideFormError();
}

function validateX() {
    xVal = document.getElementById("xInput").value.trim();

    if (!xVal) {
        showError('xError', 'Поле X не может быть пустым');
        return false;
    }

    xVal = xVal.replace(",", ".");
    const numX = parseFloat(xVal);

    if (isNaN(numX)) {
        showError('xError', 'X должен быть числом');
        return false;
    }

    if (numX < -5 || numX > 3) {
        showError('xError', 'X должен быть от -5 до 3');
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

// Работа с данными
function saveDataToStorage() {
    const table = document.getElementById("resultsTable");
    if (!table) return;

    const rows = table.rows;
    const data = [];

    for (let i = 1; i < rows.length; i++) {
        const cells = rows[i].cells;
        if (cells.length >= 7) {
            const answerText = cells[3].textContent;
            data.push({
                x: cells[0].textContent,
                y: cells[1].textContent,
                r: cells[2].textContent,
                answer: answerText === "Входит",
                executionTime: cells[4].textContent,
                serverTime: cells[5].textContent,
                signatureValid: cells[6].textContent === "Подпись отправлена"
            });
        }
    }

    localStorage.setItem('resultsData', JSON.stringify(data));
    localStorage.setItem('resultsHistory', JSON.stringify(resultsHistory));
}

function loadDataFromStorage() {
    const savedData = localStorage.getItem('resultsData');
    const savedHistory = localStorage.getItem('resultsHistory');

    if (savedHistory) {
        try {
            resultsHistory = JSON.parse(savedHistory);
        } catch (e) {
            resultsHistory = [];
        }
    }

    if (savedData) {
        try {
            const data = JSON.parse(savedData);
            const table = document.getElementById("resultsTable");

            if (!table) return;

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
                const signatureCell = newRow.insertCell(6);

                xCell.innerText = item.x;
                yCell.innerText = item.y;
                rCell.innerText = item.r;
                answerCell.innerText = item.answer ? "Входит" : "Не входит";
                answerCell.style.color = item.answer ? "#4caf50" : "#ff6b6b";
                executionTimeCell.innerText = item.executionTime;
                serverTimeCell.innerText = item.serverTime;
                signatureCell.textContent = item.signatureValid ? "Подпись отправлена" : "Без подписи";
                signatureCell.style.color = item.signatureValid ? "#4caf50" : "#888";
            });

            if (window.ChartModule && window.ChartModule.updateChart) {
                window.ChartModule.updateChart(resultsHistory);
            }

        } catch (e) {
            console.error('Ошибка загрузки данных:', e);
        }
    }
}

// Обработчики событий
document.getElementById("getButton").onclick = async function () {
    clearErrors();

    if (!validateX() || !validateY() || !validateR()) {
        showFormError('Исправьте ошибки в форме');
        return;
    }

    try {
        hideFormError();

        for (const r of rValues) {
            try {
                const result = await sendRequest(x, y, r);
                addResultToTable(x, y, r, result);
            } catch (error) {
                console.error('Ошибка для R=' + r + ':', error);
            }
        }

        showFormError(`Запросы отправлены для ${rValues.length} значений R`, true);

    } catch (error) {
        console.error('Общая ошибка:', error);
        showFormError("Ошибка: " + error.message);
    }
};

document.getElementById("generateKeyButton").onclick = async function () {
    const success = await generateNewKey();
    if (success) {
        showFormError('Новый ключ сгенерирован', true);
    }
};

document.getElementById("clearButton").onclick = function () {
    if (confirm("Очистить таблицу и статистику?")) {
        const table = document.getElementById("resultsTable");
        if (table) {
            while (table.rows.length > 1) {
                table.deleteRow(1);
            }
        }
        resultsHistory = [];
        localStorage.removeItem('resultsData');
        localStorage.removeItem('resultsHistory');

        if (window.ChartModule && window.ChartModule.clearChart) {
            window.ChartModule.clearChart();
        }

        showFormError('Таблица и статистика очищены', true);
    }
};

window.onload = async function () {
    console.log('=== Инициализация приложения ===');

    await testCrypto();

    await initCrypto();
    loadDataFromStorage();

    if (window.ChartModule && window.ChartModule.initChart) {
        window.ChartModule.initChart();
    }

    console.log('Приложение инициализировано');
};