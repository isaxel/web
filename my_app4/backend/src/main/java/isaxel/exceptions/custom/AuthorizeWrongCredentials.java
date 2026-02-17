package isaxel.exceptions.custom;

public class AuthorizeWrongCredentials extends CustomException {

    public AuthorizeWrongCredentials() {
        super("Неверный логин или пароль.");
    }
}
