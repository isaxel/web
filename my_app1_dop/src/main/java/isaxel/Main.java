package isaxel;

import com.fastcgi.FCGIInterface;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import static isaxel.Response.*;

public class Main {
    static DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    public static void main(String[] args) throws IOException {
        System.out.println("Сервер запущен. Ожидание запросов...");

        var fcgiInterface = new FCGIInterface();
        while (fcgiInterface.FCGIaccept() >= 0) {
            long startTime = System.nanoTime();
            try {
                var queryParams = System.getProperties().getProperty("QUERY_STRING");

                if (queryParams == null || queryParams.isEmpty()) {
                    throw new IllegalArgumentException("Пустой запрос");
                }

                var params = new Params(queryParams);

                // Проверяем подпись, если она есть
                if (params.hasSignature()) {
                    System.out.println("Запрос имеет подпись, проверяем...");
                    if (!params.verifySignature()) {
                        throw new IllegalArgumentException("Ошибка проверки цифровой подписи");
                    }
                    System.out.println("✓ Подпись успешно проверена");
                } else {
                    System.out.println("Запрос без подписи - пропускаем проверку");
                }

                // Валидация параметров
                if (params.getR() <= 0) {
                    throw new IllegalArgumentException("Значение R должно быть положительным");
                }

                if (params.getX() < -5 || params.getX() > 3) {
                    throw new IllegalArgumentException("Значение X должно быть в диапазоне [-5, 3]");
                }

                boolean result = params.calculate();

                var json = String.format(RESULT_JSON,
                        result,
                        System.nanoTime() - startTime,
                        LocalDateTime.now().format(formatter));

                var responseBody = json.trim();
                var response = String.format(HTTP_RESPONSE,
                        responseBody.getBytes(StandardCharsets.UTF_8).length,
                        responseBody);

                System.out.println("Отправляем ответ: " + responseBody);
                System.out.println("==============================\n");

                FCGIInterface.request.outStream.write(response.getBytes(StandardCharsets.UTF_8));
                FCGIInterface.request.outStream.flush();

            } catch (Exception ex) {
                System.err.println("✗ Ошибка обработки запроса: " + ex.getMessage());

                var json = String.format(ERROR_JSON, ex.getMessage());
                var responseBody = json.trim();
                var response = String.format(HTTP_ERROR,
                        responseBody.getBytes(StandardCharsets.UTF_8).length,
                        responseBody);

                FCGIInterface.request.outStream.write(response.getBytes(StandardCharsets.UTF_8));
                FCGIInterface.request.outStream.flush();

                System.out.println("==============================\n");
            }
        }
    }
}