## 1. HTTP (Hypertext Transfer Protocol)

**HTTP** — протокол прикладного уровня, основанный на модели «клиент-сервер». Используется для передачи гипертекста (обычно Hypertext Markup Language (HTML) — язык разметки гипертекста) между клиентом (браузером) и сервером.

### Версии:
- **HTTP/1.0**: одно соединение на один запрос.
- **HTTP/1.1**: поддержка постоянных соединений, pipelining.
- **HTTP/2**: мультиплексирование, сжатие заголовков, приоритизация.
- **HTTP/3**: на основе QUIC (UDP), уменьшение задержек.

### Методы HTTP:
- **OPTIONS** — получение поддерживаемых методов.
- **GET** — получение содержимого ресурса.
- **HEAD** — как GET, но без тела ответа.
- **POST** — отправка данных (создание или обработка).
- **PUT** — замена ресурса целиком.

- **PATCH** — частичное обновление ресурса.
- **DELETE** — удаление ресурса.
- **TRACE** — диагностика, возвращает полученный запрос.
- **CONNECT** — используется для туннелирования (например, для HTTPS).

### Заголовки HTTP (Headers):
Заголовки — это пары «ключ: значение», которые передают метаданные запроса или ответа.

**Группы заголовков:**
1. **General Headers** — общие для запроса и ответа (например, `Cache-Control`).
2. **Request Headers** — только в запросе (например, `User-Agent`, `Referer`).
3. **Response Headers** — только в ответе (например, `Server`, `Allow`).
4. **Entity Headers** — описывают тело сообщения (например, `Content-Type`, `Content-Length`).

**Пример заголовков:**
```
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64)
Content-Type: application/json
Authorization: Bearer token123
```

---

## 2. URI, URL, URN

- **URI (Uniform Resource Identifier)** — строка, идентифицирующая ресурс.
      URI: <схема>:<идентификатор-в-зависимости-от-схемы>
- **URL (Uniform Resource Locator)** — URI, который указывает местоположение ресурса (схема + путь). URL: `http://cs.ifmo.ru/spip.html
../task.shtml
mailto:Joe.Bloggs@somedomain.com`
- **URN (Uniform Resource Name)** — URI, который именует ресурс, но не указывает его местоположение. Пример: `urn:isbn:0451450523`.

---

## 3. Сетевые модели OSI и TCP/IP

**Модель OSI (7 уровней):**
1. Физический
2. Канальный
3. Сетевой
4. Транспортный
5. Сеансовый
6. Представления
7. Прикладной

**Модель TCP/IP (4 уровня):**
1. Прикладной (HTTP, FTP)
2. Транспортный (TCP, UDP)
3. Сетевой (IP)
4. Канальный (Ethernet)

**Как сервер узнает, куда отправить ответ без IP в HTTP-запросе?**
IP-адрес содержится в TCP-пакете, а не в HTTP-запросе. HTTP работает поверх TCP, который устанавливает соединение по IP-адресу и порту. Сервер отвечает на то же TCP-соединение, через которое пришёл запрос.

---

## 4. DOM (Document Object Model)

**DOM** — платформенно-независимый интерфейс, позволяющий программам и скриптам динамически изменять структуру, стиль и содержимое HTML-документа.

Документ представляется в виде **дерева узлов** (нод), где каждый узел — элемент, атрибут или текст.

**Пример работы с DOM через JavaScript:**
```javascript
let element = document.getElementById("myId");
element.innerHTML = "Новый текст";
```

---

## 5. AJAX (Asynchronous JavaScript and XML)

**AJAX** — подход к построению интерактивных веб-интерфейсов, при котором данные обмениваются с сервером без перезагрузки страницы.

**Основные принципы:**
- Использование `XMLHttpRequest` или `Fetch API`.
- Асинхронная отправка запросов.
- Динамическое обновление DOM.

**Пример на XMLHttpRequest:**
```javascript
let xhr = new XMLHttpRequest();
xhr.open('GET', '/api/data', true);
xhr.onload = function() {
    if (xhr.status == 200) {
        console.log(xhr.responseText);
    }
};
xhr.send();
```

---

## 6. CORS (Cross-Origin Resource Sharing)

**CORS** — механизм, позволяющий веб-страницам запрашивать ресурсы с другого домена.

**Как включить CORS на сервере:**
Нужно добавить заголовки в ответ:
```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, PUT
Access-Control-Allow-Headers: Content-Type
```

**Preflight-запрос** — предварительный запрос методом OPTIONS, который проверяет, разрешён ли кросс-доменный запрос.

---

## 7. Методы PUT, POST, PATCH

- **POST** — создание ресурса (может быть неидемпотентным).
- **PUT** — полная замена ресурса (идемпотентный).
- **PATCH** — частичное обновление ресурса (может быть неидемпотентным).

**Идемпотентность** — свойство метода, при котором повторный запрос с теми же данными даёт тот же результат (GET, PUT, DELETE идемпотентны, POST — нет).

---

## 8. ECMAScript (ES) и новые возможности

**ECMAScript** — стандарт, на котором основан JavaScript.

**ES6 (ES2015):**
- `let` и `const` (блочная область видимости).
- Стрелочные функции `() => {}`.
- Шаблонные строки `` `Hello ${name}` ``.
- Деструктуризация `const { a, b } = obj`.
- Классы `class MyClass {}`.
- Промисы `Promise`.
- Spread `...arr` и Rest `...args` операторы.

**ES7 (ES2016):**
- `Array.prototype.includes`
- Оператор возведения в степень `**`

**Promise.finally** — выполняется независимо от того, завершился промис успешно или с ошибкой.

**rest**
Representational State Transfer (передача состояния представления) - подход к архитектуре сетевых протоколов, обеспечивающих доступ к информационным ресурсам.
● Основные концепции:
● Данные должны передаваться в виде небольшого числа
стандартных форматов (HTML, XML, JSON).
● Сетевой протокол должен поддерживать кэширование,
не должен зависеть от сетевого слоя, не должен
сохранять информацию о состоянии между парами
«запрос-ответ».
● Антипод REST — подход, основанный на вызове удаленных
процедур (Remote Procedure Call — RPC).

---

## 9. WebSockets и SSE (Server-Sent Events)

**WebSocket** — протокол полнодуплексной связи поверх TCP, позволяет серверу отправлять данные без запроса клиента.

**SSE** — механизм односторонней отправки событий от сервера клиенту по HTTP.

**Разница с AJAX:**
- AJAX — запрос-ответ.
- WebSocket — двустороннее постоянное соединение.
- SSE — односторонний поток событий.

---

## 10. Коды состояния HTTP

- **1xx (Информационные)**: например, `100 Continue`, `101 Switching Protocols`.
- **2xx (Успех)**: `200 OK`, `201 Created`.
- **3xx (Перенаправление)**: `301 Moved Permanently`, `302 Found`.
- **4xx (Ошибка клиента)**: 
  - `400 Bad Request` — неверный запрос.
  - `401 Unauthorized` — требуется аутентификация.
  - `403 Forbidden` — доступ запрещён.
  - `404 Not Found` — ресурс не найден.
  - `422 Unprocessable Entity` — ошибка валидации.
  - `429 Too Many Requests` — слишком много запросов (заголовок `Retry-After` указывает время повтора).
- **5xx (Ошибка сервера)**: `500 Internal Server Error`, `502 Bad Gateway`.

---

## 11. HTTP Range

Позволяет запрашивать только часть ресурса (например, для докачки файлов).

**Заголовки:**
- `Range: bytes=0-499`
- В ответе: `Content-Range: bytes 0-499/1000`

---

## 12. Fetch API

Современная альтернатива XMLHttpRequest для работы с HTTP.

```javascript
fetch('/api/data')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));
```

Поддерживает промисы, удобный синтаксис, настройку заголовков и тела запроса.

---

## 13. Промисы (Promises)

**Промис** — объект, представляющий результат асинхронной операции (ожидание, выполнен, отклонён).

```javascript
let promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve("Готово!"), 1000);
});

promise
    .then(result => console.log(result))
    .catch(error => console.error(error))
    .finally(() => console.log("Завершено"));
```

---

## 14. Event Loop в JavaScript

**Event Loop** — механизм выполнения асинхронного кода в JavaScript.

**Принцип работы:**
1. Выполняется синхронный код.
2. Асинхронные операции (таймеры, запросы) попадают в очередь задач (Task Queue).
3. После завершения стека вызовов Event Loop берёт задачи из очереди.
4. Микрозадачи (Promise, async/await) имеют приоритет и выполняются перед макрозадачами.

**Связь с асинхронностью:** Коллбэки, промисы и async/await используют Event Loop для отложенного выполнения.

---

## 15. let, const, var и Hoisting

- **var** — область видимости функция, поднимается (hoisting) с инициализацией `undefined`.
- **let** и **const** — блочная область видимости, тоже поднимаются, но попадают в **временную мёртвую зону (TDZ)** до объявления.
- **TDZ** — период от входа в блок до объявления переменной, когда к ней нельзя обратиться.

**Пример:**
```javascript
console.log(a); // undefined
var a = 5;

console.log(b); // ReferenceError (TDZ)
let b = 10;
```

**Глобальные переменные** — переменные, объявленные вне функций, доступны везде.

---

## 16. Canvas

**Canvas** — HTML-элемент `<canvas>`, позволяющий рисовать графику через JavaScript (2D и 3D).

**Пример:**
```javascript
let canvas = document.getElementById('myCanvas');
let ctx = canvas.getContext('2d');
ctx.fillStyle = 'red';
ctx.fillRect(10, 10, 50, 50);
```

---

## 17. CSS-анимации

CSS-анимации позволяют плавно изменять свойства элементов.

**Пример:**
```css
@keyframes slide {
    from { transform: translateX(0); }
    to { transform: translateX(100px); }
}

.box {
    animation: slide 2s infinite;
}
```

---

## 18. CGI и FastCGI

**CGI (Common Gateway Interface)** — стандарт для вызова программ на сервере. Каждый запрос запускает новый процесс.

**FastCGI** — улучшенный CGI, где процессы могут обрабатывать множество запросов.

**FastCGI Record** — структура данных для обмена между веб-сервером и FastCGI-приложением.

**Состав записи:**
- Версия протокола
- Тип записи (начало, параметры, данные, конец)
- Идентификатор запроса
- Длина содержимого
- Данные

**Типы записей:**
- `BEGIN_REQUEST`
- `PARAMS`
- `STDIN`
- `STDOUT`
- `END_REQUEST`

**Как общается веб-сервер с FastCGI:** Через сокеты (UNIX или TCP), отправляя записи FastCGI.

---

## 19. BOM (Browser Object Model)

**BOM** — API для работы с окном браузера (не стандартизировано).

**Основные объекты:**
- `window` — окно браузера.
- `navigator` — информация о браузере.
- `location` — URL страницы.
- `history` — история навигации.
- `screen` — информация об экране.

---

## 20. Cookies

**Cookies** — небольшие данные, хранимые браузером и отправляемые на сервер с каждым запросом.

**Установка через HTTP-заголовок:**
```
Set-Cookie: sessionId=abc123; Path=/; HttpOnly
```

**Чтение в JavaScript:**
```javascript
document.cookie
```

---

## 21. MIME-типы

**MIME (Multipurpose Internet Mail Extensions)** — стандарт для указания типа содержимого.

**Примеры:**
- `text/html`
- `application/json`
- `text/css`
- `application/javascript`
- `image/png`

**Роль в HTTP:** Заголовок `Content-Type` указывает тип данных в теле ответа или запроса.

---

## 22. SCSS/SASS

**SCSS/SASS** — препроцессоры CSS, добавляющие переменные, вложенность, миксины и наследование.

**Пример SCSS (50+ строк):**
```scss
// Переменные
$primary-color: #3498db;
$secondary-color: #2ecc71;
$font-stack: Helvetica, sans-serif;

// Миксин
@mixin border-radius($radius) {
    -webkit-border-radius: $radius;
    -moz-border-radius: $radius;
    border-radius: $radius;
}

// Вложенность
nav {
    ul {
        margin: 0;
        padding: 0;
        list-style: none;
    }

    li {
        display: inline-block;
    }

    a {
        display: block;
        padding: 6px 12px;
        text-decoration: none;
        color: $primary-color;

        &:hover {
            color: darken($primary-color, 10%);
        }
    }
}

// Наследование
%message-shared {
    border: 1px solid #ccc;
    padding: 10px;
    color: #333;
}

.success {
    @extend %message-shared;
    border-color: green;
}

.error {
    @extend %message-shared;
    border-color: red;
}

// Математика
.container {
    width: 100%;
}

article {
    float: left;
    width: 600px / 960px * 100%;
}

aside {
    float: right;
    width: 300px / 960px * 100%;
}
```

**Скомпилированный CSS:**
```css
nav ul {
    margin: 0;
    padding: 0;
    list-style: none;
}
nav li {
    display: inline-block;
}
nav a {
    display: block;
    padding: 6px 12px;
    text-decoration: none;
    color: #3498db;
}
nav a:hover {
    color: #21618c;
}
.success, .error {
    border: 1px solid #ccc;
    padding: 10px;
    color: #333;
}
.success {
    border-color: green;
}
.error {
    border-color: red;
}
.container {
    width: 100%;
}
article {
    float: left;
    width: 62.5%;
}
aside {
    float: right;
    width: 31.25%;
}
```

---

## 23. DOM, BOM, ECMAScript

**Связка:**
- **ECMAScript** — ядро языка (синтаксис, типы, функции).
- **DOM** — работа с документом (HTML/XML).
- **BOM** — работа с браузером (окна, история, экран).

**Пример взаимодействия:**
```javascript
// ECMAScript
let name = "Иван";

// DOM
document.getElementById("user").innerHTML = name;

// BOM
window.alert("Привет, " + name);
```

---

## 24. User-Agent

**User-Agent** — строка, идентифицирующая браузер и ОС.

**Пример:**
```
Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36
```

**Состав:**
- Название браузера/движка
- Версия
- Платформа
- Дополнительные данные

---

## 25. XSS (Cross-Site Scripting)

**Типы XSS:**
1. **Reflected** — вредоносный скрипт передаётся в URL и сразу выполняется.
2. **Stored** — скрипт сохраняется на сервере (например, в базе данных) и выполняется при загрузке страницы.
3. **DOM-based** — скрипт внедряется через манипуляции с DOM на клиенте.

**Защита:** Экранирование данных, валидация, Content Security Policy (CSP).

---

## 26. CSRF (Cross-Site Request Forgery)

**CSRF** — атака, при которой пользователь выполняет нежелательные действия на сайте, где он авторизован.

**Защита:** Использование CSRF-токенов, проверка заголовка `Referer`, SameSite cookies.

---

## 27. HTTPS

**HTTPS** — защищённая версия HTTP, работающая поверх TLS/SSL.

**Принцип:** Шифрование данных между клиентом и сервером, аутентификация сервера (иногда клиента).

**Отличие от HTTP:** Использует порт 443, требует SSL-сертификата.

---

## 28. Long Polling

**Long Polling** — техника, при которой клиент отправляет запрос и ждёт ответа, пока сервер не пришлёт данные или не истечёт таймаут.

**Отличие от AJAX:** Сервер держит соединение открытым, пока не появится новая информация.

---

## 29. CSSOM (CSS Object Model)

**CSSOM** — API для работы с CSS-стилями через JavaScript (аналог DOM для CSS).

**Пример:**
```javascript
let style = document.styleSheets[0];
console.log(style.cssRules);
```

---

## 30. JSON (JavaScript Object Notation)

**JSON** — текстовый формат обмена данными, основанный на синтаксисе JavaScript.

**Пример:**
```json
{
    "name": "Иван",
    "age": 30,
    "isStudent": false
}
```

**Использование в JavaScript:**
```javascript
let obj = JSON.parse('{"name": "Иван"}');
let str = JSON.stringify(obj);
```

---

## 31. Async/Await

**Async/Await** — синтаксический сахар над промисами для работы с асинхронным кодом.

**Пример:**
```javascript
async function fetchData() {
    try {
        let response = await fetch('/api/data');
        let data = await response.json();
        console.log(data);
    } catch (error) {
        console.error(error);
    }
}
```

---

## 32. Semantic HTML

**Семантические элементы** — теги, которые несут смысловую нагрузку (`<article>`, `<section>`, `<header>`, `<footer>`).

**Пример:**
```html
<article>
    <header>
        <h1>Заголовок статьи</h1>
    </header>
    <section>
        <p>Текст статьи...</p>
    </section>
    <footer>
        <p>Автор: Иван</p>
    </footer>
</article>
```

---

## 33. Meta-теги

**Meta-теги** — информация о странице для браузеров и поисковых систем.

**Примеры:**
```html
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="Описание страницы">
<meta name="keywords" content="ключевые, слова">
```

---

## 34. Жизненный цикл HTTP-запроса

**Клиентская часть:**
1. Ввод URL → DNS-запрос → получение IP-адреса.
2. Установка TCP-соединения (3-way handshake).
3. Отправка HTTP-запроса.
4. Получение ответа.
5. Рендеринг страницы (парсинг HTML, CSS, JS).

**Серверная часть:**
1. Получение запроса.
2. Маршрутизация (поиск обработчика).
3. Обработка (сервлет, PHP, Node.js).
4. Формирование ответа.
5. Отправка ответа клиенту.

---

## 35. Media-запросы в CSS

**Media-запросы** — позволяют применять стили в зависимости от характеристик устройства (ширина, высота, ориентация).

**Пример:**
```css
@media (max-width: 768px) {
    body {
        font-size: 14px;
    }
}
```

---

## 36. Контекст наложения в CSS (Stacking Context)

**Контекст наложения** — трёхмерное представление элементов по оси Z. Определяет порядок наложения элементов.

**Создаётся:**
- При `position: absolute/relative/fixed/sticky` и `z-index != auto`.
- При `opacity < 1`.
- При `transform`, `filter`, `will-change`.

---

## 37. Event Delegation

**Делегирование событий** — обработка событий на родительском элементе для дочерних (даже динамически добавленных).

**Пример:**
```javascript
document.getElementById('parent').addEventListener('click', function(event) {
    if (event.target.tagName === 'BUTTON') {
        console.log('Кнопка нажата');
    }
});
```
