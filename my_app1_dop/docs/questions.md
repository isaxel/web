\UseRawInputEncoding
\documentclass[12pt,a4paper]{article}
\usepackage[utf8]{inputenc}
\usepackage[T2A]{fontenc}
\usepackage[russian]{babel}
\usepackage{geometry}
\usepackage{enumitem}
\usepackage{hyperref}
\usepackage{listings}
\usepackage{xcolor}
\usepackage{titlesec}
\usepackage{graphicx}
\usepackage{float}

\geometry{left=2cm,right=2cm,top=2cm,bottom=2cm}

\title{Программирование интернет-приложений \\ Полное учебное пособие}
\author{ИТМО ВТ}
\date{}

\begin{document}

\maketitle
\tableofcontents

\section{Введение в интернет-приложения}

\subsection{Архитектура клиент-сервер}

Интернет-приложения строятся по архитектуре \textbf{клиент-сервер}:

\begin{itemize}
\item \textbf{Клиент} (браузер) отправляет HTTP-запросы
\item \textbf{Сервер} (httpd) обрабатывает запросы и возвращает HTTP-ответы
\item Обмен данными происходит через протокол HTTP (Hypertext Transfer Protocol)
\item Данные передаются в формате HTML (Hypertext Markup Language)
\end{itemize}

\subsection{Стандарты и протоколы}

\begin{itemize}
\item \textbf{HTTP} (Hypertext Transfer Protocol) — протокол прикладного уровня для передачи гипертекста
\item \textbf{HTML} (Hypertext Markup Language) — язык разметки для создания веб-страниц
\item \textbf{URI/URL} (Uniform Resource Identifier/Locator) — идентификаторы и локаторы ресурсов
\item \textbf{REST} (Representational State Transfer) — архитектурный стиль для распределенных систем
\end{itemize}

\section{Протокол HTTP - подробное рассмотрение}

\subsection{Характеристики HTTP}

HTTP является:
\begin{itemize}
\item \textbf{Протоколом прикладного уровня} (7-й уровень модели OSI)
\item Основан на технологии \textbf{клиент-сервер}
\item Может служить \textbf{транспортом} для других протоколов
\item Работает по схеме \textbf{запрос-ответ}
\item \textbf{Stateless-протоколом} — не сохраняет состояние между запросами
\item Для сохранения состояния используются \textbf{cookies}
\end{itemize}

\subsection{URI, URL и URN - подробности}

\subsubsection{URI (Uniform Resource Identifier)}
Уникальный идентификатор ресурса. Примеры:
\begin{lstlisting}
mailto:user@example.com
tel:+1234567890
urn:isbn:0451450523
\end{lstlisting}

\subsubsection{URL (Uniform Resource Locator)}
URI с указанием местоположения. Структура:
\begin{lstlisting}
схема://домен:порт/путь?параметры#якорь
\end{lstlisting}

Примеры:
\begin{itemize}
\item \texttt{http://example.com/index.html}
\item \texttt{https://api.example.com/v1/users?page=2}
\item \texttt{ftp://files.example.com/download.zip}
\end{itemize}

\subsubsection{URN (Uniform Resource Name)}
URI, указывающий только имя без местоположения:
\begin{itemize}
\item \texttt{urn:isbn:0451450523} — книга с ISBN
\item \texttt{urn:uuid:6e8bc430-9c3a-11d9-9669-0800200c9a66} — UUID
\end{itemize}

\subsection{REST - архитектурный стиль}

\textbf{REST (Representational State Transfer)} — архитектурный стиль, основанный на следующих принципах:

\begin{itemize}
\item \textbf{Единообразие интерфейса} — стандартные методы HTTP
\item \textbf{Отсутствие состояния} (stateless) — каждый запрос содержит всю необходимую информацию
\item \textbf{Кэшируемость} — ответы должны указывать, можно ли их кэшировать
\item \textbf{Многоуровневая система} — клиент не знает, соединен ли он с конечным сервером или промежуточным узлом
\item \textbf{Код по требованию} (опционально) — сервер может расширять функциональность клиента
\end{itemize}

\subsubsection{REST против RPC}
\begin{itemize}
\item \textbf{REST} использует методы HTTP для операций с ресурсами
\item \textbf{RPC} (Remote Procedure Call) использует удаленный вызов процедур
\end{itemize}

\subsection{Структура HTTP-сообщений}

\subsubsection{HTTP-запрос}
\begin{lstlisting}
МЕТОД URI HTTP/Версия      # Стартовая строка
Заголовок1: Значение1       # Заголовки
Заголовок2: Значение2
                            # Пустая строка
Тело сообщения              # Тело (опционально)
\end{lstlisting}

\subsubsection{HTTP-ответ}
\begin{lstlisting}
HTTP/Версия Код Пояснение   # Стартовая строка
Заголовок1: Значение1       # Заголовки
Заголовок2: Значение2
                            # Пустая строка
Тело сообщения              # Тело (опционально)
\end{lstlisting}

\subsection{Методы HTTP и их характеристики}

\subsubsection{Основные методы}
\begin{itemize}
\item \textbf{GET} — получение ресурса (идемпотентный, безопасный)
\item \textbf{POST} — создание ресурса или отправка данных
\item \textbf{PUT} — полное обновление ресурса (идемпотентный)
\item \textbf{PATCH} — частичное обновление ресурса
\item \textbf{DELETE} — удаление ресурса (идемпотентный)
\item \textbf{HEAD} — получение только заголовков (идемпотентный, безопасный)
\item \textbf{OPTIONS} — получение поддерживаемых методов
\item \textbf{TRACE} — диагностика, эхо запроса
\item \textbf{CONNECT} — установка туннеля для SSL/TLS
\end{itemize}

\subsubsection{Идемпотентность и безопасность}

\begin{itemize}
\item \textbf{Идемпотентные методы}: GET, HEAD, OPTIONS, TRACE, PUT, DELETE
  \begin{itemize}
  \item Повторный запрос дает тот же результат
  \item Безопасны для повторения при сетевых сбоях
  \end{itemize}
  
\item \textbf{Неидемпотентные методы}: POST, PATCH
  \begin{itemize}
  \item Каждый запрос может создавать новые ресурсы
  \item Требуют механизмов предотвращения дублирования
  \end{itemize}
  
\item \textbf{Безопасные методы}: GET, HEAD, OPTIONS, TRACE
  \begin{itemize}
  \item Не изменяют состояние сервера
  \item Можно кэшировать
  \end{itemize}
\end{itemize}

\subsubsection{Разница между PUT и PATCH}

\begin{itemize}
\item \textbf{PUT} — заменяет весь ресурс:
\begin{lstlisting}
PUT /users/123
{"name": "Иван", "age": 30}  # Полная замена
\end{lstlisting}

\item \textbf{PATCH} — изменяет только указанные поля:
\begin{lstlisting}
PATCH /users/123
{"age": 31}  # Изменение только возраста
\end{lstlisting}
\end{itemize}

\subsection{Коды состояния HTTP}

Коды состоят из 3 цифр, где первая цифра определяет класс:

\subsubsection{1xx - Информационные}
\begin{itemize}
\item \textbf{100 Continue} — продолжить отправку тела запроса
\item \textbf{101 Switching Protocols} — переход на другой протокол
\item \textbf{102 Processing} — запрос обрабатывается
\end{itemize}

\textbf{Зачем нужны 1xx коды}: Для управления соединением и информирования клиента о статусе обработки.

\subsubsection{2xx - Успешное выполнение}
\begin{itemize}
\item \textbf{200 OK} — успешный запрос
\item \textbf{201 Created} — ресурс создан
\item \textbf{204 No Content} — нет содержимого для возврата
\end{itemize}

\subsubsection{3xx - Перенаправление}
\begin{itemize}
\item \textbf{301 Moved Permanently} — постоянное перенаправление
\item \textbf{302 Found} — временное перенаправление
\item \textbf{304 Not Modified} — не изменилось (для кэширования)
\end{itemize}

\subsubsection{4xx - Ошибка клиента}
\begin{itemize}
\item \textbf{400 Bad Request} — неверный синтаксис запроса
\item \textbf{401 Unauthorized} — требуется аутентификация
\item \textbf{403 Forbidden} — доступ запрещен
\item \textbf{404 Not Found} — ресурс не найден
\item \textbf{422 Unprocessable Entity} — ошибка валидации (семантическая ошибка)
\item \textbf{429 Too Many Requests} — превышен лимит запросов
\end{itemize}

\subsubsection{5xx - Ошибка сервера}
\begin{itemize}
\item \textbf{500 Internal Server Error} — внутренняя ошибка сервера
\item \textbf{502 Bad Gateway} — ошибка шлюза
\item \textbf{503 Service Unavailable} — сервис недоступен
\item \textbf{507 Insufficient Storage} — недостаточно места
\end{itemize}

\subsubsection{Retry-After}
Заголовок \texttt{Retry-After} используется с кодами:
\begin{itemize}
\item 429 (Too Many Requests) — когда можно повторить запрос
\item 503 (Service Unavailable) — когда сервис будет доступен
\item 301/302 — минимальное время до следующего запроса
\end{itemize}

Пример:
\begin{lstlisting}
Retry-After: 120  # 120 секунд
Retry-After: Wed, 21 Oct 2024 07:28:00 GMT  # Конкретная дата
\end{lstlisting}

\subsection{Заголовки HTTP}

\subsubsection{4 группы заголовков}

\begin{enumerate}
\item \textbf{General Headers} — общие для запросов и ответов:
\begin{itemize}
\item \texttt{Cache-Control} — управление кэшированием
\item \texttt{Connection} — управление соединением
\item \texttt{Date} — дата и время сообщения
\end{itemize}

\item \textbf{Request Headers} — только для запросов:
\begin{itemize}
\item \texttt{Host} — домен сервера
\item \texttt{User-Agent} — информация о клиенте
\item \texttt{Accept} — допустимые типы контента
\item \texttt{Authorization} — данные для аутентификации
\item \texttt{Referer} — предыдущая страница
\end{itemize}

\item \textbf{Response Headers} — только для ответов:
\begin{itemize}
\item \texttt{Server} — информация о сервере
\item \texttt{Set-Cookie} — установка cookies
\item \texttt{Location} — для перенаправлений
\end{itemize}

\item \textbf{Entity Headers} — метаданные тела сообщения:
\begin{itemize}
\item \texttt{Content-Type} — MIME-тип содержимого
\item \texttt{Content-Length} — размер содержимого
\item \texttt{Content-Encoding} — кодировка (gzip, deflate)
\item \texttt{Content-Language} — язык содержимого
\end{itemize}
\end{enumerate}

\subsection{HTTP Range}

Механизм для запроса части ресурса:

\begin{lstlisting}
Range: bytes=0-999        # Запрос первых 1000 байт
Range: bytes=1000-        # С 1000 байта до конца
Range: bytes=0-499,1000-1499  # Несколько диапазонов
\end{lstlisting}

Сервер отвечает \texttt{206 Partial Content} и заголовком \texttt{Content-Range}:

\begin{lstlisting}
Content-Range: bytes 0-999/5000  # Часть 0-999 из 5000 байт
\end{lstlisting}

\subsection{CORS (Cross-Origin Resource Sharing)}

\subsubsection{Что такое CORS}
Механизм разрешения кросс-доменных запросов в браузерах. Без CORS браузер блокирует запросы к другому домену (Same-Origin Policy).

\subsubsection{Простые и сложные запросы}

\begin{itemize}
\item \textbf{Простые запросы} (Simple Requests):
\begin{itemize}
\item Методы: GET, HEAD, POST
\item Заголовки только из стандартного набора
\item Content-Type: application/x-www-form-urlencoded, multipart/form-data, text/plain
\end{itemize}

\item \textbf{Сложные запросы} (Preflighted Requests):
\begin{itemize}
\item Другие методы (PUT, DELETE, etc.)
\item Нестандартные заголовки
\item Content-Type: application/json
\end{itemize}
\end{itemize}

\subsubsection{Preflight запрос}

Для сложных запросов браузер отправляет предварительный OPTIONS запрос:

\begin{lstlisting}
OPTIONS /resource HTTP/1.1
Origin: https://example.com
Access-Control-Request-Method: PUT
Access-Control-Request-Headers: Content-Type
\end{lstlisting}

Сервер должен ответить:

\begin{lstlisting}
HTTP/1.1 204 No Content
Access-Control-Allow-Origin: https://example.com
Access-Control-Allow-Methods: GET, POST, PUT
Access-Control-Allow-Headers: Content-Type
Access-Control-Allow-Credentials: true
Access-Control-Max-Age: 86400
\end{lstlisting}

\subsubsection{Как настроить CORS}

\begin{enumerate}
\item На сервере добавьте заголовки:
\begin{lstlisting}
Access-Control-Allow-Origin: https://example.com  # или *
Access-Control-Allow-Methods: GET, POST, PUT, DELETE
Access-Control-Allow-Headers: Content-Type, Authorization
Access-Control-Allow-Credentials: true  # для cookies
Access-Control-Max-Age: 86400  # кэширование preflight
\end{lstlisting}

\item Для запросов с credentials (cookies):
\begin{itemize}
\item Сервер: \texttt{Access-Control-Allow-Credentials: true}
\item Клиент: \texttt{fetch(url, \{credentials: 'include'\})}
\item \texttt{Access-Control-Allow-Origin} не может быть \texttt{*}
\end{itemize}
\end{enumerate}

\section{Сетевые модели OSI и TCP/IP}

\subsection{Модель OSI (7 уровней)}

\begin{enumerate}
\item \textbf{Физический} (Physical) — передача битов по среде
\item \textbf{Канальный} (Data Link) — формирование кадров, MAC-адреса
\item \textbf{Сетевой} (Network) — IP-адреса, маршрутизация
\item \textbf{Транспортный} (Transport) — TCP/UDP, порты
\item \textbf{Сеансовый} (Session) — управление сессиями
\item \textbf{Представления} (Presentation) — кодирование, шифрование
\item \textbf{Прикладной} (Application) — HTTP, FTP, SMTP
\end{umerate}

\subsection{Модель TCP/IP (4 уровня)}

\begin{enumerate}
\item \textbf{Сетевой доступ} (Network Access) — физический + канальный OSI
\item \textbf{Интернет} (Internet) — сетевой уровень OSI (IP)
\item \textbf{Транспортный} (Transport) — TCP/UDP
\item \textbf{Прикладной} (Application) — прикладной + представления + сеансовый OSI
\end{enumerate}

\subsection{Как сервер узнает куда отправить ответ без IP в HTTP-запросе}

\begin{itemize}
\item HTTP работает поверх TCP/IP
\item При установке TCP-соединения клиент отправляет свой IP и порт в TCP-сегменте
\item Сервер использует эту информацию из TCP-заголовка
\item HTTP-заголовки действительно не содержат IP-адреса клиента
\item Информация о клиенте может быть в заголовке \texttt{X-Forwarded-For} при использовании прокси
\end{itemize}

\section{Объектная модель документа (DOM)}

\subsection{Что такое DOM}

DOM (Document Object Model) — программный интерфейс для HTML/XML документов, представляющий документ как дерево объектов.

\subsection{Структура DOM}

\begin{itemize}
\item \textbf{Узлы} (Nodes) — элементы, текстовые узлы, комментарии
\item \textbf{Дерево} — иерархическая структура узлов
\item \textbf{Корень} — объект \texttt{document}
\item \textbf{Элементы} — теги HTML (\texttt{<div>}, \texttt{<p>}, etc.)
\end{itemize}

\subsection{Основные операции с DOM}

\begin{lstlisting}[language=JavaScript]
// Получение элементов
document.getElementById('id')
document.querySelector('.class')
document.querySelectorAll('div')

// Создание элементов
const div = document.createElement('div')
const text = document.createTextNode('Hello')

// Изменение элементов
element.innerHTML = '<b>Text</b>'
element.textContent = 'Text'
element.setAttribute('class', 'new-class')

// Удаление элементов
element.removeChild(child)
element.remove()

// Навигация
element.parentNode
element.children
element.firstChild
element.nextSibling
\end{lstlisting}

\subsection{Event Delegation}

Паттерн обработки событий на родительском элементе:

\begin{lstlisting}[language=JavaScript]
// Вместо обработчика на каждом элементе
document.querySelectorAll('button').forEach(btn => {
  btn.addEventListener('click', handleClick)
})

// Обработчик на родителе
document.getElementById('container').addEventListener('click', (e) => {
  if (e.target.matches('button')) {
    handleClick(e)
  }
})
\end{lstlisting}

Преимущества:
\begin{itemize}
\item Работает с динамически добавленными элементами
\item Меньше обработчиков в памяти
\item Лучшая производительность
\end{itemize}

\section{JavaScript - подробное рассмотрение}

\subsection{ECMAScript и версии}

\subsubsection{История версий}
\begin{itemize}
\item \textbf{ES3} (1999) — базовые возможности
\item \textbf{ES5} (2009) — strict mode, JSON, методы массивов
\item \textbf{ES6/ES2015} — let/const, стрелочные функции, классы, промисы
\item \textbf{ES7/ES2016} — \texttt{Array.includes()}, оператор \texttt{**}
\item \textbf{ES8/ES2017} — async/await, \texttt{Object.values()}
\item \textbf{ES9-ES13} — дополнительные улучшения
\end{itemize}

\subsubsection{Новые возможности ES6+}

\begin{itemize}
\item \textbf{let/const} — блочная область видимости
\item \textbf{Стрелочные функции} — \texttt{(a, b) => a + b}
\item \textbf{Классы} — синтаксический сахар над прототипами
\item \textbf{Промисы} — обработка асинхронных операций
\item \textbf{Шаблонные строки} — \texttt{\`Hello \$\{name\}\`}
\item \textbf{Деструктуризация} — \texttt{const \{x, y\} = point}
\item \textbf{Spread/Rest операторы} — \texttt{...array}, \texttt{...args}
\item \textbf{Модули} — \texttt{import/export}
\end{itemize}

\subsection{Spread и Rest операторы}

\subsubsection{Spread (разворот)}
\begin{lstlisting}[language=JavaScript]
// Разворот массива
const arr = [1, 2, 3]
const newArr = [...arr, 4, 5]  // [1, 2, 3, 4, 5]

// Разворот объекта
const obj = {x: 1, y: 2}
const newObj = {...obj, z: 3}  // {x: 1, y: 2, z: 3}

// Передача аргументов
const nums = [1, 2, 3]
Math.max(...nums)  // 3
\end{lstlisting}

\subsubsection{Rest (сбор)}
\begin{lstlisting}[language=JavaScript]
// Сбор аргументов
function sum(...numbers) {
  return numbers.reduce((a, b) => a + b, 0)
}
sum(1, 2, 3)  // 6

// Сбор оставшихся свойств
const {x, ...rest} = {x: 1, y: 2, z: 3}
// x = 1, rest = {y: 2, z: 3}
\end{lstlisting}

\subsection{Промисы (Promises)}

\subsubsection{Что такое Promise}
Объект, представляющий результат асинхронной операции.

\begin{lstlisting}[language=JavaScript]
const promise = new Promise((resolve, reject) => {
  // Асинхронная операция
  setTimeout(() => {
    const success = true
    if (success) {
      resolve('Success!')
    } else {
      reject(new Error('Failed!'))
    }
  }, 1000)
})
\end{lstlisting}

\subsubsection{Цепочки промисов}
\begin{lstlisting}[language=JavaScript]
fetch('/api/data')
  .then(response => response.json())
  .then(data => processData(data))
  .catch(error => console.error(error))
  .finally(() => cleanup())  // ES2018
\end{lstlisting}

\subsubsection{Promise.finally()}
Выполняется всегда, независимо от успеха или ошибки:

\begin{lstlisting}[language=JavaScript]
loadData()
  .then(data => console.log(data))
  .catch(err => console.error(err))
  .finally(() => {
    hideLoadingSpinner()  // Всегда выполнится
  })
\end{lstlisting}

\subsection{Async/Await}

Синтаксический сахар над промисами:

\begin{lstlisting}[language=JavaScript]
async function fetchData() {
  try {
    const response = await fetch('/api/data')
    const data = await response.json()
    return processData(data)
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
}
\end{lstlisting}

\subsection{Event Loop}

\subsubsection{Что такое Event Loop}
Механизм выполнения асинхронного кода в JavaScript.

\subsubsection{Компоненты Event Loop}

\begin{itemize}
\item \textbf{Call Stack} — стек вызовов синхронных функций
\item \textbf{Web APIs} — API браузера (setTimeout, DOM events, etc.)
\item \textbf{Task Queue (Macrotask Queue)} — очередь макрозадач
\item \textbf{Microtask Queue} — очередь микрозадач
\item \textbf{Event Loop} — управляет выполнением задач
\end{itemize}

\subsubsection{Приоритет выполнения}

\begin{enumerate}
\item Выполняется весь синхронный код из Call Stack
\item Выполняются ВСЕ микрозадачи из Microtask Queue
\item Выполняется ОДНА макрозадача из Task Queue
\item Повторяется
\end{enumerate}

\subsubsection{Микрозадачи vs Макрозадачи}

\begin{itemize}
\item \textbf{Микрозадачи} (Microtasks):
\begin{itemize}
\item Promise callbacks (\texttt{.then()}, \texttt{.catch()}, \texttt{.finally()})
\item \texttt{queueMicrotask()}
\item \texttt{MutationObserver}
\end{itemize}

\item \textbf{Макрозадачи} (Macrotasks):
\begin{itemize}
\item \texttt{setTimeout()}, \texttt{setInterval()}
\item \texttt{setImmediate()} (Node.js)
\item I/O операции
\item UI rendering
\end{itemize}
\end{itemize}

Пример:
\begin{lstlisting}[language=JavaScript]
console.log('1')  // Синхронный

setTimeout(() => console.log('2'), 0)  // Макрозадача

Promise.resolve().then(() => console.log('3'))  // Микрозадача

console.log('4')  // Синхронный

// Результат: 1, 4, 3, 2
\end{lstlisting}

\subsection{Переменные: let, const, var}

\subsubsection{var (ES5)}
\begin{itemize}
\item Function scope (область видимости - функция)
\item Hoisting с инициализацией \texttt{undefined}
\item Можно переопределять
\item Нет Temporal Dead Zone
\end{itemize}

\subsubsection{let (ES6)}
\begin{itemize}
\item Block scope (область видимости - блок \{\})
\item Hoisting без инициализации (TDZ)
\item Нельзя переопределять в той же области
\item Можно изменять значение
\end{itemize}

\subsubsection{const (ES6)}
\begin{itemize}
\item Block scope
\item Hoisting без инициализации (TDZ)
\item Нельзя переопределять
\item Для объектов можно изменять свойства
\end{itemize}

\subsubsection{Hoisting (всплытие)}
\begin{lstlisting}[language=JavaScript]
console.log(a)  // undefined (hoisting)
var a = 5

console.log(b)  // ReferenceError (TDZ)
let b = 5

// Что происходит:
var a = undefined  // hoisting
let b             // hoisting (но не инициализация)
console.log(a)    // undefined
console.log(b)    // ReferenceError (TDZ)
a = 5
b = 5
\end{lstlisting}

\subsubsection{Temporal Dead Zone (TDZ)}
Период между входом в область видимости и объявлением переменной, где к ней нельзя обратиться.

\section{Браузерные API}

\subsection{BOM (Browser Object Model)}

Интерфейс для работы с браузером:

\begin{itemize}
\item \textbf{window} — глобальный объект, окно браузера
\item \textbf{navigator} — информация о браузере
\item \textbf{location} — URL текущей страницы
\item \textbf{history} — история навигации
\item \textbf{screen} — информация об экране
\item \textbf{document} — текущий документ (часть DOM)
\end{itemize}

\subsection{Canvas}

HTML-элемент для рисования графики через JavaScript:

\begin{lstlisting}[language=HTML]
<canvas id="myCanvas" width="500" height="500"></canvas>

<script>
const canvas = document.getElementById('myCanvas')
const ctx = canvas.getContext('2d')

// Рисование
ctx.fillStyle = 'red'
ctx.fillRect(10, 10, 100, 100)

// Текст
ctx.font = '20px Arial'
ctx.fillText('Hello Canvas', 10, 50)
</script>
\end{lstlisting}

\subsection{Font Fingerprint}

Техника отслеживания пользователей на основе установленных шрифтов:

\begin{itemize}
\item Браузер рендерит текст скрытым элементом
\item Измеряется ширина/высота текста
\item Разные шрифты дают разные размеры
\item Создается "отпечаток" доступных шрифтов
\end{itemize}

\section{CSS - подробное рассмотрение}

\subsection{Источники стилей}

\begin{enumerate}
\item \textbf{Стили браузера} — стандартные стили по умолчанию
\item \textbf{Пользовательские стили} — настройки пользователя
\item \textbf{Авторские стили}:
\begin{itemize}
\item External — внешние .css файлы
\item Internal — блоки \texttt{<style>} в HTML
\item Inline — атрибут \texttt{style} элементов
\end{itemize}
\end{enumerate}

\subsection{Сила селекторов (Specificity)}

Порядок приоритета (от высшего к низшему):

\begin{enumerate}
\item \texttt{!important} — наивысший приоритет
\item Inline styles (\texttt{style="color: red"})
\item ID селекторы (\texttt{\#id})
\item Классы, атрибуты, псевдоклассы (\texttt{.class}, \texttt{[type]}, \texttt{:hover})
\item Элементы, псевдоэлементы (\texttt{div}, \texttt{::before})
\end{enumerate}

Формула: (a, b, c, d) где:
\begin{itemize}
\item a: количество \texttt{!important}
\item b: количество ID селекторов
\item c: количество классов, атрибутов, псевдоклассов
\item d: количество элементов, псевдоэлементов
\end{itemize}

\subsection{Контекст наложения (Stacking Context)}

Область, в которой элементы располагаются по оси Z:

\begin{itemize}
\item Создается свойствами: \texttt{position}, \texttt{opacity}, \texttt{transform}, \texttt{z-index}
\item Каждый контекст наложения изолирован
\item \texttt{z-index} работает только внутри одного контекста
\end{itemize}

\subsection{CSS-анимации}

\begin{lstlisting}[language=CSS]
/* Keyframes анимация */
@keyframes slidein {
  from { transform: translateX(-100%); }
  to { transform: translateX(0); }
}

.element {
  animation: slidein 3s ease-in-out infinite;
  /* Или отдельные свойства: */
  animation-name: slidein;
  animation-duration: 3s;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
  animation-delay: 1s;
  animation-direction: alternate;
  animation-fill-mode: both;
}

/* Transition */
.button {
  transition: all 0.3s ease;
}
.button:hover {
  transform: scale(1.1);
  background-color: blue;
}
\end{lstlisting}

\subsection{CSSOM (CSS Object Model)}

API для работы с CSS через JavaScript:

\begin{lstlisting}[language=JavaScript]
// Получение стилей
const style = window.getComputedStyle(element)
const color = style.getPropertyValue('color')

// Изменение стилей
element.style.color = 'red'
element.style.setProperty('color', 'blue', 'important')

// Работа с CSS правилами
const sheet = document.styleSheets[0]
sheet.insertRule('body { background: red; }', 0)
sheet.deleteRule(0)
\end{lstlisting}

\subsection{SCSS/SASS}

Препроцессоры CSS с дополнительными возможностями:

\begin{lstlisting}[language=SCSS]
// Переменные
$primary-color: #3498db;
$spacing: 20px;

// Вложенность
.nav {
  background: $primary-color;
  
  &__list {
    padding: $spacing;
    
    &-item {
      margin: 0 10px;
      
      &:hover {
        color: darken($primary-color, 20%);
      }
    }
  }
}

// Миксины
@mixin flex-center($direction: row) {
  display: flex;
  flex-direction: $direction;
  justify-content: center;
  align-items: center;
}

.container {
  @include flex-center(column);
}

// Наследование
%button-base {
  padding: 10px 20px;
  border: none;
  cursor: pointer;
}

.button-primary {
  @extend %button-base;
  background: $primary-color;
}

// Циклы
@for $i from 1 through 3 {
  .item-#{$i} {
    width: 100px * $i;
  }
}

// Условия
@if $theme == dark {
  body { background: #000; }
} @else {
  body { background: #fff; }
}
\end{lstlisting}

\section{Веб-технологии}

\subsection{AJAX (Asynchronous JavaScript and XML)}

Технология асинхронного обмена данными между браузером и сервером без перезагрузки страницы.

\begin{lstlisting}[language=JavaScript]
// XMLHttpRequest (старый способ)
const xhr = new XMLHttpRequest()
xhr.open('GET', '/api/data', true)
xhr.onreadystatechange = function() {
  if (xhr.readyState === 4 && xhr.status === 200) {
    const data = JSON.parse(xhr.responseText)
    console.log(data)
  }
}
xhr.send()

// Fetch API (современный способ)
fetch('/api/data')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error))
\end{lstlisting}

\subsection{WebSockets}

Протокол полнодуплексной связи поверх TCP:

\begin{lstlisting}[language=JavaScript]
const socket = new WebSocket('ws://example.com/socket')

socket.onopen = function() {
  socket.send('Hello Server!')
}

socket.onmessage = function(event) {
  console.log('Message:', event.data)
}

socket.onclose = function() {
  console.log('Connection closed')
}

socket.onerror = function(error) {
  console.error('Error:', error)
}
\end{lstlisting}

\subsection{SSE (Server-Sent Events)}

Односторонняя push-технология от сервера к клиенту:

\begin{lstlisting}[language=JavaScript]
const eventSource = new EventSource('/api/events')

eventSource.onmessage = function(event) {
  console.log('New event:', event.data)
}

eventSource.onerror = function(error) {
  console.error('Error:', error)
}

// На сервере (пример на Node.js)
response.writeHead(200, {
  'Content-Type': 'text/event-stream',
  'Cache-Control': 'no-cache',
  'Connection': 'keep-alive'
})

setInterval(() => {
  response.write(`data: ${JSON.stringify({time: Date.now()})}\n\n`)
}, 1000)
\end{lstlisting}

\subsection{Long Polling}

Техника, когда клиент держит соединение открытым до получения данных:

\begin{lstlisting}[language=JavaScript]
function longPoll() {
  fetch('/api/poll')
    .then(response => response.json())
    .then(data => {
      processData(data)
      longPoll()  // Следующий запрос
    })
    .catch(error => {
      setTimeout(longPoll, 5000)  // Повтор через 5с
    })
}
\end{lstlisting}

\subsection{Разница между технологиями}

\begin{tabular}{|p{3cm}|p{4cm}|p{4cm}|}
\hline
\textbf{Технология} & \textbf{Направление} & \textbf{Использование} \\
\hline
AJAX & Клиент → Сервер & Запрос данных по необходимости \\
Long Polling & Клиент ↔ Сервер & Реальные обновления с задержками \\
SSE & Сервер → Клиент & Push-уведомления, ленты \\
WebSockets & Двусторонняя & Чат, онлайн-игры, коллаборация \\
\hline
\end{tabular}

\section{MIME-типы}

Формат указания типа контента. Структура: \texttt{тип/подтип}

\subsection{Основные типы}

\begin{itemize}
\item \textbf{text} — текстовые данные
\begin{itemize}
\item \texttt{text/html} — HTML документ
\item \texttt{text/css} — CSS стили
\item \texttt{text/plain} — обычный текст
\end{itemize}

\item \textbf{application} — двоичные данные
\begin{itemize}
\item \texttt{application/json} — JSON данные
\item \texttt{application/javascript} — JavaScript код
\item \texttt{application/pdf} — PDF документ
\item \texttt{application/octet-stream} — произвольные двоичные данные
\end{itemize}

\item \textbf{image} — изображения
\begin{itemize}
\item \texttt{image/jpeg} — JPEG изображение
\item \texttt{image/png} — PNG изображение
\item \texttt{image/svg+xml} — SVG векторная графика
\end{itemize}

\item \textbf{video/audio} — мультимедиа
\begin{itemize}
\item \texttt{video/mp4} — MP4 видео
\item \texttt{audio/mpeg} — MP3 аудио
\end{itemize}

\item \textbf{multipart} — составные данные
\begin{itemize}
\item \texttt{multipart/form-data} — формы с файлами
\item \texttt{multipart/byteranges} — частичный контент
\end{itemize}
\end{itemize}

\section{Безопасность веб-приложений}

\subsection{XSS (Cross-Site Scripting)}

Атака, при которой злоумышленник внедряет вредоносный JavaScript код.

\subsubsection{Типы XSS}

\begin{itemize}
\item \textbf{Reflected (Отраженная)} — скрипт в URL параметрах:
\begin{lstlisting}
http://example.com/search?q=<script>alert('XSS')</script>
\end{lstlisting}

\item \textbf{Stored (Сохраненная)} — скрипт сохраняется на сервере (в БД, комментариях)

\item \textbf{DOM-based} — скрипт выполняется в DOM без отправки на сервер
\end{itemize}

\subsubsection{Защита от XSS}

\begin{itemize}
\item Экранирование специальных символов (\texttt{<}, \texttt{>}, \texttt{\&}, \texttt{"}, \texttt{'})
\item Использование \texttt{textContent} вместо \texttt{innerHTML}
\item Content Security Policy (CSP)
\item HTTP-only cookies для сессий
\end{itemize}

\subsection{CSRF (Cross-Site Request Forgery)}

Атака, при которой пользователь выполняет действия на сайте без своего ведома.

\subsubsection{Пример CSRF}

\begin{lstlisting}[language=HTML]
<!-- Злоумышленник размещает на своем сайте: -->
<img src="https://bank.com/transfer?to=hacker&amount=1000" width="0" height="0">
\end{lstlisting}

\subsubsection{Защита от CSRF}

\begin{itemize}
\item CSRF-токены в формах
\item Проверка заголовка Origin/Referer
\item SameSite cookies
\item Двойная отправка форм
\end{itemize}

\subsection{HTTPS}

HTTP поверх TLS/SSL для шифрования и аутентификации:

\begin{itemize}
\item \textbf{Шифрование} — защита данных от прослушивания
\item \textbf{Аутентификация} — подтверждение подлинности сервера
\item \textbf{Целостность} — защита от изменения данных
\end{itemize}

\section{CGI и FastCGI}

\subsection{CGI (Common Gateway Interface)}

Механизм вызова программ на стороне сервера:

\begin{itemize}
\item Каждый запрос обрабатывается отдельным процессом
\item Взаимодействие через stdin/stdout
\item Высокие накладные расходы на создание процессов
\end{itemize}

\subsection{FastCGI}

Развитие CGI с постоянными процессами:

\begin{itemize}
\item Процессы работают постоянно (пул соединений)
\item Взаимодействие через сокеты (Unix Domain или TCP/IP)
\item Лучшая производительность и масштабируемость
\end{itemize}

\subsection{FastCGI Record}

Формат данных для общения между веб-сервером и FastCGI приложением.

\subsubsection{Структура записи}

\begin{tabular}{|c|c|c|}
\hline
\textbf{Поле} & \textbf{Размер} & \textbf{Описание} \\
\hline
Version & 1 байт & Версия протокола (1) \\
Type & 1 байт & Тип записи \\
Request ID & 2 байта & Идентификатор запроса \\
Content Length & 2 байта & Длина данных \\
Padding Length & 1 байт & Длина заполнения \\
Reserved & 1 байт & Зарезервировано \\
Content Data & 0-N байт & Данные \\
Padding Data & 0-P байт & Заполнение \\
\hline
\end{tabular}

\subsubsection{Типы записей}

\begin{itemize}
\item 1: \texttt{BEGIN\_REQUEST} — начало запроса
\item 2: \texttt{ABORT\_REQUEST} — отмена запроса
\item 3: \texttt{END\_REQUEST} — завершение запроса
\item 4: \texttt{PARAMS} — параметры запроса
\item 5: \texttt{STDIN} — входные данные
\item 6: \texttt{STDOUT} — выходные данные
\item 7: \texttt{STDERR} — ошибки
\item 8: \texttt{DATA} — дополнительные данные
\item 9: \texttt{GET\_VALUES} — получение значений
\item 10: \texttt{GET\_VALUES\_RESULT} — результат получения
\end{itemize}

\subsubsection{Извлечение параметров в Java}

\begin{lstlisting}[language=Java]
// Пример чтения FastCGI параметров
public Map<String, String> parseParams(InputStream input) throws IOException {
    Map<String, String> params = new HashMap<>();
    
    while (true) {
        int nameLength = readLength(input);
        if (nameLength == 0) break;  // Конец параметров
        
        int valueLength = readLength(input);
        byte[] nameBytes = new byte[nameLength];
        byte[] valueBytes = new byte[valueLength];
        
        input.read(nameBytes);
        input.read(valueBytes);
        
        String name = new String(nameBytes, "UTF-8");
        String value = new String(valueBytes, "UTF-8");
        params.put(name, value);
    }
    
    return params;
}

private int readLength(InputStream input) throws IOException {
    int b = input.read();
    if ((b & 0x80) != 0) {
        // Длинное значение (4 байта)
        return ((b & 0x7F) << 24) | (input.read() << 16) | 
               (input.read() << 8) | input.read();
    } else {
        // Короткое значение (1 байт)
        return b;
    }
}
\end{lstlisting}

\section{Жизненный цикл HTTP-запроса}

\subsection{Полный процесс от ввода URL до отображения страницы}

\begin{enumerate}
\item \textbf{Ввод URL} в адресной строке браузера

\item \textbf{DNS lookup} — преобразование домена в IP-адрес:
\begin{itemize}
\item Проверка кэша браузера
\item Проверка кэша ОС
\item Запрос к DNS-серверу
\end{itemize}

\item \textbf{Установка TCP соединения}:
\begin{itemize}
\item TCP handshake (SYN, SYN-ACK, ACK)
\item Для HTTPS: TLS handshake
\end{itemize}

\item \textbf{Отправка HTTP запроса}:
\begin{lstlisting}
GET /page HTTP/1.1
Host: example.com
User-Agent: Mozilla/5.0
Accept: text/html
\end{lstlisting}

\item \textbf{Обработка на сервере}:
\begin{itemize}
\item Веб-сервер (nginx/apache) принимает запрос
\item Статический контент или передача приложению (PHP, Java)
\item Обработка бизнес-логики, работа с БД
\item Формирование ответа
\end{itemize}

\item \textbf{Получение ответа}:
\begin{lstlisting}
HTTP/1.1 200 OK
Content-Type: text/html
Content-Length: 1234

<!DOCTYPE html>...
\end{lstlisting}

\item \textbf{Парсинг HTML браузером}:
\begin{itemize}
\item Построение DOM дерева
\item Загрузка связанных ресурсов (CSS, JS, изображения)
\item Построение CSSOM дерева
\item Создание Render Tree
\item Layout (расчет позиций)
\item Paint (отрисовка)
\item Composite (композиция слоев)
\end{itemize}

\item \textbf{Выполнение JavaScript}:
\begin{itemize}
\item Парсинг и выполнение скриптов
\item Манипуляции с DOM
\item Обработка событий
\end{itemize}
\end{enumerate}

\section{HTML5 и современные веб-технологии}

\subsection{Semantic Elements (Семантические элементы)}

Элементы, которые несут смысловую нагрузку:

\begin{itemize}
\item \texttt{<header>} — заголовок страницы или раздела
\item \texttt{<footer>} — подвал страницы или раздела
\item \texttt{<nav>} — навигационные ссылки
\item \texttt{<article>} — независимая статья
\item \texttt{<section>} — тематическая группа контента
\item \texttt{<aside>} — дополнительный, связанный контент
\item \texttt{<main>} — основное содержимое страницы
\item \texttt{<figure>} и \texttt{<figcaption>} — иллюстрация с подписью
\item \texttt{<time>} — время или дата
\item \texttt{<mark>} — выделенный текст
\end{itemize}

\subsection{Meta-теги}

Метаданные для браузеров и поисковых систем:

\begin{lstlisting}[language=HTML]
<!-- Кодировка -->
<meta charset="UTF-8">

<!-- Адаптивность -->
<meta name="viewport" content="width=device-width, initial-scale=1">

<!-- Описание для SEO -->
<meta name="description" content="Описание страницы">
<meta name="keywords" content="ключевые, слова">

<!-- Open Graph для соцсетей -->
<meta property="og:title" content="Заголовок">
<meta property="og:description" content="Описание">
<meta property="og:image" content="/image.jpg">

<!-- Тема браузера -->
<meta name="theme-color" content="#ffffff">

<!-- Запрет индексации -->
<meta name="robots" content="noindex, nofollow">
\end{lstlisting}

\subsection{Media-запросы}

Адаптивный дизайн для разных устройств:

\begin{lstlisting}[language=CSS]
/* Мобильные устройства */
@media (max-width: 767px) {
  .container { padding: 10px; }
}

/* Планшеты */
@media (min-width: 768px) and (max-width: 1023px) {
  .container { padding: 20px; }
}

/* Десктоп */
@media (min-width: 1024px) {
  .container { padding: 30px; }
}

/* Ориентация устройства */
@media (orientation: portrait) {
  /* Вертикальная ориентация */
}

@media (orientation: landscape) {
  /* Горизонтальная ориентация */
}

/* Плотность пикселей */
@media (min-resolution: 2dppx) {
  /* Retina дисплеи */
}

/* Темная тема */
@media (prefers-color-scheme: dark) {
  body { background: #000; color: #fff; }
}

/* Снижение движения */
@media (prefers-reduced-motion: reduce) {
  * { animation: none; transition: none; }
}
\end{lstlisting}

\section{Заключение}

Это учебное пособие охватывает все основные аспекты программирования интернет-приложений. Каждая тема рассмотрена подробно с примерами и пояснениями. Для успешного освоения материала рекомендуется:

\begin{enumerate}
\item Изучать темы последовательно, начиная с основ HTTP
\item Практиковаться на реальных примерах
\item Создавать собственные проекты, применяя изученные технологии
\item Следить за обновлениями стандартов и технологий
\end{enumerate}

\end{document}
