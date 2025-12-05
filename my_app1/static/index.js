"use strict";

// список чис
let xVal = '';
let x = -10;
let y = 10;
let r = 0;

function sendRequest() {
    const url = new URL('./fcgi-bin/my_app.jar', window.location.href);
    url.searchParams.set('x', x);
    url.searchParams.set('y', y);
    url.searchParams.set('r', r);

    fetch(url.href, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Ошибка сети или сервера');
            }
            return response.text(); // возвр ответ в текст форм
        })
        .then(result => {
            const table = document.getElementById("resultsTable");
            const newRow = table.insertRow(); // нов строка

            // ячейки строки
            const xCell = newRow.insertCell(0);
            const yCell = newRow.insertCell(1);
            const rCell = newRow.insertCell(2);
            const answerCell = newRow.insertCell(3);
            const executionTimeCell = newRow.insertCell(4);
            const serverTimeCell = newRow.insertCell(5);

            xCell.innerText = x; // x из рез
            yCell.innerText = y;
            rCell.innerText = r;

            const jsonResult = JSON.parse(result);
            serverTimeCell.innerText = jsonResult.serverTime;
            executionTimeCell.innerText = jsonResult.executionTime;
            answerCell.innerText = jsonResult.answer ? "Входит" : "Не входит"; // отв
            // createNotification("Ответ сервера: " + result); // увед
        })
        .catch(error => {
            // createNotification("Ошибка: " + error.message); // не сраб пофикс
        });
}

function isEmptyString(str) {
    return !str || !str.trim();
}

document.getElementById("getButton").onclick = async function () {
    xVal = document.getElementById("xInput").value;
    if (xVal.includes('-') && xVal.startsWith('-')) {
        xVal = '-' + xVal.replace(/-/g, '');
    }
    x = parseFloat(xVal.toString().replace(",", "."));
    //x = document.getElementById("xInput").value;
    const radios = document.getElementsByName('number');
    // Ищем выбранное значение
    for (const radio of radios) {
        if (radio.checked) {
            y = radio.value;
            break;
        }
    }
    const checks = document.getElementsByName('numberr');
    for (const check of checks) {
        if (check.checked) {
            r = check.value;
            break;
        }
    }

    if ("Notification" in window) {
        // разреш увед
        Notification.requestPermission().then(permission => {
            if (permission === "granted") {
                if (isEmptyString(xVal) || x < -5 || x > 3) {
                    // увед
                    const notification = new Notification("Некорректное значение для x", {
                        body: "X должен быть числом от -5 до 3",
                        icon: "URL_вашего_значка" // url
                    });
                    notification.onclick = () => {
                        window.open("http://ваш_сайт.com"); // сайт на клик откр
                    };
                    return;
                } else if (y === 10) {
                    // Создаем уведомление
                    const notification = new Notification("Некорректное значение для y", {
                        body: "Выберите одно из предложенных значений для Y",
                        icon: "URL_вашего_значка" // url
                    });
                    notification.onclick = () => {
                        window.open("http://ваш_сайт.com"); // сайт на клик откр
                    };
                    return;
                } else if (r === 0) {
                    // увед
                    const notification = new Notification("Некорректное значение для R", {
                        body: "Выберите одно из предложенных значений для R",
                        icon: "URL_вашего_значка" // url
                    });
                    notification.onclick = () => {
                        window.open("http://ваш_сайт.com"); // сайт на клик откр
                    };
                    return;
                } else {
                    sendRequest()
                }
            } else {
                console.log("Разрешение на уведомления не получено.");
            }
        });
    } else {
        console.log("Ваш браузер не поддерживает уведомления.");
    }
}