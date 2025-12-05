package isaxel;

import java.util.HashMap;
import java.util.Map;
import java.util.Base64;
import java.security.*;
import java.security.spec.*;
import java.math.BigInteger;
import java.net.URLDecoder;

class Params {
    private float x;
    private float y;
    private float r;
    private String xStr;
    private String yStr;
    private String rStr;
    private String signature;
    private String timestamp;
    private String publicKeyJson;

    public Params(String query) throws Exception {
        System.out.println("======= НОВЫЙ ЗАПРОС =======");
        System.out.println("Полный запрос: " + query);

        if (query != null && !query.isEmpty()) {
            var params = splitQuery(query);

            // Извлекаем параметры
            xStr = params.get("x");
            yStr = params.get("y");
            rStr = params.get("r");
            signature = params.get("signature");
            timestamp = params.get("timestamp");
            publicKeyJson = params.get("publicKey");

            System.out.println("x=" + xStr + ", y=" + yStr + ", r=" + rStr);
            System.out.println("signature присутствует: " + (signature != null));
            System.out.println("timestamp: " + timestamp);
            System.out.println("publicKey присутствует: " + (publicKeyJson != null));

            if (publicKeyJson != null) {
                System.out.println("publicKey (первые 100 символов): " +
                        (publicKeyJson.length() > 100 ? publicKeyJson.substring(0, 100) + "..." : publicKeyJson));
            }

            // Конвертируем в числа
            x = Float.parseFloat(xStr);
            y = Float.parseFloat(yStr);
            r = Float.parseFloat(rStr);
        }
    }

    public static Map<String, String> splitQuery(String query) throws Exception {
        Map<String, String> params = new HashMap<>();
        if (query == null || query.isEmpty()) {
            return params;
        }

        String[] pairs = query.split("&");
        for (String pair : pairs) {
            int idx = pair.indexOf("=");
            if (idx > 0) {
                String key = pair.substring(0, idx);
                String value = pair.substring(idx + 1);

                // Декодируем URL-кодирование
                value = URLDecoder.decode(value, "UTF-8");
                params.put(key, value);
            }
        }
        return params;
    }

    public boolean hasSignature() {
        boolean hasSig = signature != null && publicKeyJson != null && timestamp != null;
        System.out.println("hasSignature() = " + hasSig);
        return hasSig;
    }

    public boolean verifySignature() {
        if (!hasSignature()) {
            System.out.println("Отсутствует подпись или публичный ключ");
            return false;
        }

        try {
            // Создаем данные для проверки в том же формате, что и на клиенте
            String dataToVerify = String.format("{\"x\":\"%s\",\"y\":\"%s\",\"r\":\"%s\",\"timestamp\":\"%s\"}",
                    xStr, yStr, rStr, timestamp);

            System.out.println("Данные для проверки подписи: " + dataToVerify);
            System.out.println("Подпись (первые 50 символов): " +
                    (signature.length() > 50 ? signature.substring(0, 50) + "..." : signature));

            // Конвертируем подпись из hex в байты
            byte[] signatureBytes = hexStringToByteArray(signature);
            System.out.println("Длина подписи в байтах: " + signatureBytes.length);

            // Парсим публичный ключ из JSON
            System.out.println("Парсим publicKeyJson: " + publicKeyJson.substring(0, Math.min(100, publicKeyJson.length())));

            // Парсинг JSON без библиотек
            String json = publicKeyJson;

            // Извлекаем x и y из JSON
            int xStart = json.indexOf("\"x\":\"") + 5;
            int xEnd = json.indexOf("\"", xStart);
            String xB64 = json.substring(xStart, xEnd);

            int yStart = json.indexOf("\"y\":\"") + 5;
            int yEnd = json.indexOf("\"", yStart);
            String yB64 = json.substring(yStart, yEnd);

            System.out.println("x (base64url): " + xB64);
            System.out.println("y (base64url): " + yB64);

            // Конвертируем из base64url в обычный base64
            xB64 = xB64.replace('-', '+').replace('_', '/');
            yB64 = yB64.replace('-', '+').replace('_', '/');

            // Добавляем padding если нужно
            while (xB64.length() % 4 != 0) xB64 += "=";
            while (yB64.length() % 4 != 0) yB64 += "=";

            byte[] xBytes = Base64.getDecoder().decode(xB64);
            byte[] yBytes = Base64.getDecoder().decode(yB64);

            BigInteger xBigInt = new BigInteger(1, xBytes);
            BigInteger yBigInt = new BigInteger(1, yBytes);

            System.out.println("x (BigInteger): " + xBigInt.toString(16));
            System.out.println("y (BigInteger): " + yBigInt.toString(16));

            // Создаем точку на эллиптической кривой
            ECPoint ecPoint = new ECPoint(xBigInt, yBigInt);

            // Параметры кривой P-256
            BigInteger p = new BigInteger("FFFFFFFF00000001000000000000000000000000FFFFFFFFFFFFFFFFFFFFFFFF", 16);
            BigInteger a = new BigInteger("FFFFFFFF00000001000000000000000000000000FFFFFFFFFFFFFFFFFFFFFFFC", 16);
            BigInteger b = new BigInteger("5AC635D8AA3A93E7B3EBBD55769886BC651D06B0CC53B0F63BCE3C3E27D2604B", 16);
            BigInteger n = new BigInteger("FFFFFFFF00000000FFFFFFFFFFFFFFFFBCE6FAADA7179E84F3B9CAC2FC632551", 16);
            BigInteger gx = new BigInteger("6B17D1F2E12C4247F8BCE6E563A440F277037D812DEB33A0F4A13945D898C296", 16);
            BigInteger gy = new BigInteger("4FE342E2FE1A7F9B8EE7EB4A7C0F9E162BCE33576B315ECECBB6406837BF51F5", 16);

            // Создаем спецификацию эллиптической кривой
            ECFieldFp field = new ECFieldFp(p);
            EllipticCurve curve = new EllipticCurve(field, a, b);
            ECPoint g = new ECPoint(gx, gy);
            ECParameterSpec ecSpec = new ECParameterSpec(curve, g, n, 1);

            // Создаем публичный ключ
            ECPublicKeySpec pubKeySpec = new ECPublicKeySpec(ecPoint, ecSpec);
            KeyFactory keyFactory = KeyFactory.getInstance("EC");
            PublicKey publicKey = keyFactory.generatePublic(pubKeySpec);

            System.out.println("Публичный ключ создан: " + publicKey.getAlgorithm());

            // Проверяем подпись
            Signature sig = Signature.getInstance("SHA256withECDSA");
            sig.initVerify(publicKey);
            sig.update(dataToVerify.getBytes("UTF-8"));

            boolean isValid = sig.verify(signatureBytes);
            System.out.println("Подпись " + (isValid ? "ВАЛИДНА" : "НЕВАЛИДНА"));
            return isValid;

        } catch (Exception e) {
            System.err.println("Ошибка проверки подписи: " + e.getMessage());
            e.printStackTrace();
            return false;
        }
    }

    private byte[] hexStringToByteArray(String s) {
        if (s == null || s.length() % 2 != 0) {
            throw new IllegalArgumentException("Некорректная hex строка: " + s);
        }

        int len = s.length();
        byte[] data = new byte[len / 2];
        for (int i = 0; i < len; i += 2) {
            data[i / 2] = (byte) ((Character.digit(s.charAt(i), 16) << 4)
                    + Character.digit(s.charAt(i+1), 16));
        }
        return data;
    }

    public boolean calculate() {
        System.out.println("Вычисление попадания для x=" + x + ", y=" + y + ", r=" + r);

        if (x < 0 && y < 0) {
            System.out.println("Результат: false (четверть III)");
            return false;
        }

        if (x < 0 && y > 0) {
            boolean result = !((x * x + y * y) > r * r / 4);
            System.out.println("Результат: " + result + " (четверть II)");
            return result;
        }

        if (x > 0 && y > 0) {
            boolean result = !(y + x / 2 > r / 2);
            System.out.println("Результат: " + result + " (четверть I)");
            return result;
        }

        if (x > 0 && y < 0) {
            boolean result = !(x > r || y < -(r / 2));
            System.out.println("Результат: " + result + " (четверть IV)");
            return result;
        }

        System.out.println("Результат: true (границы осей)");
        return true;
    }

    public float getX() { return x; }
    public float getY() { return y; }
    public float getR() { return r; }
}