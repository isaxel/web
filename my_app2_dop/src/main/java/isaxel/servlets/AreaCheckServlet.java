package isaxel.servlets;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import isaxel.data.CheckData;
import isaxel.utils.HitChecker;

@WebServlet(urlPatterns = "/checkServlet")
public class AreaCheckServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException, ServletException {
        HttpSession session = req.getSession();

        String xStr = (String) session.getAttribute("pendingX");
        String yStr = (String) session.getAttribute("pendingY");
        String rStr = (String) session.getAttribute("pendingR");

        session.removeAttribute("pendingX");
        session.removeAttribute("pendingY");
        session.removeAttribute("pendingR");

        try {
            long startTime = System.nanoTime();
            double x = Double.parseDouble(xStr.replace(",", "."));
            double y = Double.parseDouble(yStr.replace(",", "."));
            double r = Double.parseDouble(rStr.replace(",", "."));

            boolean isHit = HitChecker.checkHit(x, y, r);

            long executionTime = System.nanoTime() - startTime;
            CheckData result = new CheckData(x, y, r, isHit, executionTime);

            List<CheckData> results = (List<CheckData>) session.getAttribute("results");
            if (results == null) {
                results = new ArrayList<>();
            }
            results.add(result);
            session.setAttribute("results", results);
            session.setAttribute("lastResult", result);

            resp.sendRedirect(req.getContextPath() + "/result");

        } catch (Exception e) {
            req.setAttribute("error", "Ошибка: " + e.getMessage());
            getServletContext().getRequestDispatcher("/error.jsp").forward(req, resp);
        }
    }
}