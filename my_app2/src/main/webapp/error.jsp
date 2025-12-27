<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ page isErrorPage="true" %>
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/error-style.css">
</head>
<body>
<header class="header">

</header>
<main class="container">
    <section class="error">
        <h2>Ошибка</h2>
        <div class="error-message">
            <%= request.getAttribute("error") %>
        </div>
        <a href="${pageContext.request.contextPath}/" class="back-button">Вернуться назад</a>
    </section>
</main>
</body>
</html>