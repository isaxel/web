package isaxel;

class Response {
    public static final String RESULT_JSON = """
            {
                "answer": %b,
                "executionTime": "%d",
                "serverTime": "%s"
            }
            """;
    public static final String HTTP_RESPONSE = """
        HTTP/1.1 200 OK
        Content-Type: application/json
        Content-Length: %d
        
        %s
        """;
    public static final String HTTP_ERROR = """
        HTTP/1.1 400 Bad Request
        Content-Type: application/json
        Content-Length: %d
        
        %s
        """;
    public static final String ERROR_JSON = """
        {
            "reason": "%s"
        }
        """;
}