package isaxel.data;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import java.io.IOException;
import java.util.List;


@WebServlet(urlPatterns = "/result")
public class ResultServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException, ServletException {
        HttpSession session = req.getSession();

        CheckData lastResult = (CheckData) session.getAttribute("lastResult");

        if (lastResult == null) {
            List<CheckData> results = (List<CheckData>) session.getAttribute("results");
            if (results != null && !results.isEmpty()) {
                lastResult = results.get(results.size() - 1);
            }
        }

        if (lastResult != null) {
            req.setAttribute("result", lastResult);
            getServletContext().getRequestDispatcher("/result.jsp").forward(req, resp);
        } else {
            resp.sendRedirect(req.getContextPath() + "/");
        }
    }
}