package isaxel.utils;

public class HitChecker {
    public static boolean checkHit(double x, double y, double r) {
        if (x <= 0 && y >= 0) return y <= x + r / 2.0;
        if (x <= 0 && y <= 0) return (x * x + y * y) <= (r * r) / 4.0;
        if (x >= 0 && y <= 0) return x <= r && y >= -r / 2.0;
        return false;
    }

    public static String validate(double x, double y, double r) {
        if (x < -5 || x > 3) return "X должен быть в диапазоне [-5, 3]";
        if (y < -5 || y > 3) return "Y должен быть в диапазоне [-5, 3]";
        if (r < 1 || r > 5) return "R должен быть в диапазоне [1, 5]";
        return null;
    }
}