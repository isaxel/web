package isaxel.exceptions.custom;

public class UserAlreadyExists extends CustomException {

    public UserAlreadyExists() {
        super("Пользователь уже существует.");
    }
}
