package isaxel.servlets;

import com.google.gson.Gson;
import isaxel.data.CheckData;
import isaxel.utils.HitChecker;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@WebServlet(urlPatterns = "/doh")
public class DnsOverHttpServlet extends HttpServlet {
    private final Gson gson = new Gson();
    // Паттерн: x[число]y[число]r[число].w624.lab
    private final Pattern domainPattern = Pattern.compile("^x([-\\d.]+)y([-\\d.]+)r([-\\d.]+)\\.w624\\.lab$");

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");

        long startTime = System.nanoTime();
        String qname = req.getParameter("name");

        try {
            if (qname == null || qname.isEmpty()) {
                sendDnsResponse(resp, "FORMERR", "Missing query name");
                return;
            }

            Matcher matcher = domainPattern.matcher(qname.toLowerCase());
            if (!matcher.find()) {
                sendDnsResponse(resp, "NXDOMAIN", "Domain format mismatch. Use: x[X]y[Y]r[R].w624.lab");
                return;
            }

            double x = Double.parseDouble(matcher.group(1));
            double y = Double.parseDouble(matcher.group(2));
            double r = Double.parseDouble(matcher.group(3));

            String validationError = HitChecker.validate(x, y, r);
            if (validationError != null) {
                sendDnsResponse(resp, "REFUSED", validationError);
                return;
            }

            boolean isHit = HitChecker.checkHit(x, y, r);
            CheckData result = new CheckData(x, y, r, isHit, System.nanoTime() - startTime);

            // Сохраняем результат в сессию для синхронизации с основной таблицей
            HttpSession session = req.getSession();
            List<CheckData> results = (List<CheckData>) session.getAttribute("results");
            if (results == null) results = new ArrayList<>();
            results.add(result);
            session.setAttribute("results", results);

            sendDnsResponse(resp, "NOERROR", gson.toJson(result));

        } catch (NumberFormatException e) {
            sendDnsResponse(resp, "FORMERR", "Invalid coordinate format in domain");
        } catch (Exception e) {
            sendDnsResponse(resp, "SERVFAIL", "Internal error: " + e.getMessage());
        }
    }

    private void sendDnsResponse(HttpServletResponse resp, String status, String data) throws IOException {
        DnsMessage msg = new DnsMessage(status, data);
        resp.getWriter().write(gson.toJson(msg));
    }

    private static class DnsMessage {
        String status; // NOERROR, NXDOMAIN, SERVFAIL, REFUSED, FORMERR
        String type = "TXT";
        String txtData;

        DnsMessage(String status, String txtData) {
            this.status = status;
            this.txtData = txtData;
        }
    }
}