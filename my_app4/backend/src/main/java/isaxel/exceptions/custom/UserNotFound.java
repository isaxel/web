package isaxel.exceptions.custom;

public class UserNotFound extends RuntimeException {
    public UserNotFound() {
        super("Пользователь не найден");
    }
}
