package isaxel.servlets;

import com.google.gson.Gson;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Set;
import java.util.HashSet;

import isaxel.data.CheckData;

@WebServlet(urlPatterns = "")
public class ControllerServlet extends HttpServlet {
    private Gson gson = new Gson();
    private static final Set<Double> ALLOWED_R = new HashSet<>();

    static {
        ALLOWED_R.add(1.0);
        ALLOWED_R.add(2.0);
        ALLOWED_R.add(3.0);
        ALLOWED_R.add(4.0);
        ALLOWED_R.add(5.0);
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException, ServletException {
        String xStr = req.getParameter("x");
        String yStr = req.getParameter("y");
        String rStr = req.getParameter("r");

        HttpSession session = req.getSession();

        if (xStr != null) session.setAttribute("lastX", xStr);
        if (yStr != null) session.setAttribute("lastY", yStr);
        if (rStr != null) session.setAttribute("lastR", rStr);

        if (xStr != null || yStr != null || rStr != null) {
            session.setAttribute("pendingX", xStr);
            session.setAttribute("pendingY", yStr);
            session.setAttribute("pendingR", rStr);

            String error = validateParameters(xStr, yStr, rStr);
            if (error != null) {
                session.removeAttribute("pendingX");
                session.removeAttribute("pendingY");
                session.removeAttribute("pendingR");

                req.setAttribute("error", error);
                getServletContext().getRequestDispatcher("/error.jsp").forward(req, resp);
                return;
            }

            getServletContext().getRequestDispatcher("/checkServlet").forward(req, resp);
        } else {
            showMainPage(req, resp);
        }
    }

    private String validateParameters(String xStr, String yStr, String rStr) {
        if (xStr == null || xStr.trim().isEmpty() ||
                yStr == null || yStr.trim().isEmpty() ||
                rStr == null || rStr.trim().isEmpty()) {
            return "Параметры X, Y и R обязательны для заполнения";
        }

        try {
            double x = Double.parseDouble(xStr.replace(",", "."));
            double y = Double.parseDouble(yStr.replace(",", "."));
            double r = Double.parseDouble(rStr.replace(",", "."));

            if (x < -5 || x > 3) {
                return "Координата X должна быть в диапазоне от -5 до 3";
            }

            if (y < -5 || y > 3) {
                return "Координата Y должна быть в диапазоне от -5 до 3";
            }

            if (!ALLOWED_R.contains(r)) {
                return "Радиус R должен быть одним из значений: 1, 2, 3, 4, 5";
            }

            return null;
        } catch (NumberFormatException e) {
            return "Параметры X, Y и R должны быть числами";
        }
    }

    private void showMainPage(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        HttpSession session = req.getSession();
        List<CheckData> results = (List<CheckData>) session.getAttribute("results");
        if (results == null) {
            results = new ArrayList<>();
        }

        String lastX = (String) session.getAttribute("lastX");
        String lastY = (String) session.getAttribute("lastY");
        String lastR = (String) session.getAttribute("lastR");

        String history = gson.toJson(results);
        req.setAttribute("historyJson", history);

        List<CheckData> reversedList = new ArrayList<>(results);
        Collections.reverse(reversedList);
        req.setAttribute("resultsReversed", reversedList);

        req.setAttribute("lastX", lastX);
        req.setAttribute("lastY", lastY);
        req.setAttribute("lastR", lastR);

        getServletContext().getRequestDispatcher("/index.jsp").forward(req, resp);
    }
}