package isaxel;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

class Params {
    private float x;
    private float y;
    private float r;

    public Params(String query) throws IOException {
        if (query != null && !query.isEmpty()) {
            var params = splitQuery(query);
            x = Float.parseFloat(params.get("x"));
            y = Float.parseFloat(params.get("y"));
            r = Float.parseFloat(params.get("r"));
        }
    }
    public static Map<String, String> splitQuery(String query) {
        Map<String, String> params = new HashMap<>();
         {
            String[] pairs = query.split("&");
            for (String pair : pairs) {
                String[] keyValue = pair.split("=");
                if (keyValue.length == 2) {
                    params.put(keyValue[0], keyValue[1]);
                }
            }
        }
        return params;
    }

    public boolean calculate() {
        if (x < 0 && y < 0) return false;

        if (x < 0 && y > 0) {
            if ((x * x + y * y) > r * r / 4) {
                return false;
            }
        }

        if (x > 0 && y > 0) {
            if (y + x / 2 > r / 2) {
                return false;
            }
        }

        if (x > 0 && y < 0) {
            if (x > r || y < -(r / 2)) {
                return false;
            }
        }
        return true;
    }
}
