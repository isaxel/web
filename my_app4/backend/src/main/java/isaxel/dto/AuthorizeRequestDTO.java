package isaxel.dto;

import jakarta.validation.constraints.NotBlank;

public record AuthorizeRequestDTO(@NotBlank(message = "User не может быть пустым.")
                                 String user,
                                 @NotBlank(message = "Пароль не может быть пустым.")
                                 String password) {
}
