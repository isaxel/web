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
        var fcgiInterface = new FCGIInterface();
        while (fcgiInterface.FCGIaccept() >= 0) {
            long startTime = System.nanoTime();
            try {
                var queryParams = System.getProperties().getProperty("QUERY_STRING");
                var params = new Params(queryParams);

                if (params.getR() <= 0) {
                    throw new IllegalArgumentException("Значение R должно быть положительным");
                }

                if (params.getX() < -5 || params.getX() > 3) {
                    throw new IllegalArgumentException("Значение X должно быть в диапазоне [-5, 3]");
                }

                boolean result = params.calculate();
                var json = String.format(Response.RESULT_JSON,
                        result,
                        System.nanoTime() - startTime,
                        LocalDateTime.now().format(formatter));
                var responseBody = json.trim(); // лишние пробелы
                var response = String.format(HTTP_RESPONSE, responseBody.getBytes(StandardCharsets.UTF_8).length, responseBody);
                try {
                    FCGIInterface.request.outStream.write(response.getBytes(StandardCharsets.UTF_8));
                    FCGIInterface.request.outStream.flush();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            } catch (Exception ex) {
                var json = String.format(ERROR_JSON, ex.getMessage());
                var responseBody = json.trim(); // лишние пробелы
                var response = String.format(HTTP_ERROR, responseBody.getBytes(StandardCharsets.UTF_8).length, responseBody);
                FCGIInterface.request.outStream.write(response.getBytes(StandardCharsets.UTF_8));
                FCGIInterface.request.outStream.flush();
            }
        }
    }
}