package isaxel.exceptions.custom;

public class CheckPointNotExists extends CustomException {
    public CheckPointNotExists() {
        super("Объект не найден");
    }
}
