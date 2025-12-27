<%@ page contentType="text/html; charset=UTF-8" language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Лабораторная работа</title>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/index-style.css">
</head>
<body>
    <header class="header">
        <h1>Лабораторная работа №2</h1>
        <p>Исаева Александра-Ирина Антоновна</p>
        <p>Вариант 624</p>
        <p>Группа: P3209</p>
    </header>
    <main>
        <div class="form-container">
            <h2>Параметры</h2>
            <form id="check-form" method="GET" action="${pageContext.request.contextPath}">
                <div class="form-group">
                    <label for="x-select">Координата X</label>
                    <select class="form-control" id="x-select" name="x">
                        <option value="" disabled selected>Выберите значение</option>
                        <option value="-5" <c:if test="${lastX == '-5'}">selected</c:if>>-5</option>
                        <option value="-4" <c:if test="${lastX == '-4'}">selected</c:if>>-4</option>
                        <option value="-3" <c:if test="${lastX == '-3'}">selected</c:if>>-3</option>
                        <option value="-2" <c:if test="${lastX == '-2'}">selected</c:if>>-2</option>
                        <option value="-1" <c:if test="${lastX == '-1'}">selected</c:if>>-1</option>
                        <option value="0" <c:if test="${lastX == '0'}">selected</c:if>>0</option>
                        <option value="1" <c:if test="${lastX == '1'}">selected</c:if>>1</option>
                        <option value="2" <c:if test="${lastX == '2'}">selected</c:if>>2</option>
                        <option value="3" <c:if test="${lastX == '3'}">selected</c:if>>3</option>
                    </select>
                    <span class="error-message" id="x-error"></span>
                </div>

                <div class="form-group">
                    <label for="y-input">Координата Y (от -5 до 3)</label>
                    <input type="text" id="y-input" name="y" placeholder="Введите Y"
                           value="<c:out value='${lastY}'/>">
                    <span class="error-message" id="y-error"></span>
                </div>

                <div class="form-group">
                    <label>Радиус R</label>
                    <div class="radio-group" id="r-radio">
                        <label class="radio-label">
                            <input type="radio" name="r" value="1" <c:if test="${lastR == '1'}">checked</c:if>> 1
                        </label>
                        <label class="radio-label">
                            <input type="radio" name="r" value="2" <c:if test="${lastR == '2'}">checked</c:if>> 2
                        </label>
                        <label class="radio-label">
                            <input type="radio" name="r" value="3" <c:if test="${lastR == '3'}">checked</c:if>> 3
                        </label>
                        <label class="radio-label">
                            <input type="radio" name="r" value="4" <c:if test="${lastR == '4'}">checked</c:if>> 4
                        </label>
                        <label class="radio-label">
                            <input type="radio" name="r" value="5" <c:if test="${lastR == '5'}">checked</c:if>> 5
                        </label>
                    </div>
                    <span class="error-message" id="r-error"></span>
                </div>
                <button type="submit" id="submit-button">Проверить</button>
            </form>
        </div>
        <div class="graph-container">
            <h2>График</h2>
            <div class="graph-wrapper">
                <svg id="graph-svg" width="500" height="500" xmlns="http://www.w3.org/2000/svg">
                    <g id="shapes" fill="#2e7d32" fill-opacity="0.7">
                        <rect id="graph-rect" height="0" width="0"></rect>
                        <polygon id="graph-polygon" points="0,0 0,0 0,0"></polygon>
                        <path id="graph-path" d=""></path>
                    </g>
                    <g id="labels" fill="black" font-size="14">
                        <text x="480" y="240">X</text>
                        <text x="260" y="20">Y</text>

                        <text id="label-x-r" x="445" y="240"></text>
                        <text id="label-x-r-half" x="345" y="240"></text>
                        <text id="label-x-neg-r-half" x="140" y="240"></text>
                        <text id="label-x-neg-r" x="40" y="240"></text>

                        <text id="label-y-r" x="260" y="55"></text>
                        <text id="label-y-r-half" x="260" y="155"></text>
                        <text id="label-y-neg-r-half" x="260" y="355"></text>
                        <text id="label-y-neg-r" x="260" y="455"></text>
                    </g>
                    <g id="axes" stroke="black">
                        <line x1="250" y1="500" x2="250" y2="0"></line>
                        <polygon points="250,0 245,15 255,15" fill="black"></polygon>
                        <line x1="0" y1="250" x2="500" y2="250"></line>
                        <polygon points="500,250 485,245 485,255" fill="black"></polygon>
                    </g>
                    <g id="history-points">

                    </g>

                </svg>
            </div>
        </div>
        <div class="results-container">
            <h2>История проверок</h2>
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>X</th>
                            <th>Y</th>
                            <th>R</th>
                            <th>Результат</th>
                            <th>Время проверки</th>
                            <th>Время выполнения (с)</th>
                        </tr>
                    </thead>
                    <tbody>
                    <c:forEach var="res" items="${requestScope.resultsReversed}">
                        <tr>
                            <td>${res.x}</td>
                            <td>${res.y}</td>
                            <td>${res.r}</td>
                            <td>${res.hit ? "Попадание" : "Промах"}</td>
                            <td>${res.currentTime}</td>
                            <td>${res.executionTime}</td>
                        </tr>
                    </c:forEach>
                    </tbody>
                </table>
            </div>
        </div>
    </main>
    <script>
        window.historyPoints = ${not empty historyJson ? historyJson : '[]'};
        window.contextPath= '${pageContext.request.contextPath}';
        window.lastR = '${lastR}';
    </script>
    <script type="module" src="${pageContext.request.contextPath}/js/graph-handler.js"></script>
</body>
</html>