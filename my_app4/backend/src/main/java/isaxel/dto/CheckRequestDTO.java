package isaxel.dto;

import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record CheckRequestDTO(
        @NotNull(message = "X не может быть null.")
        @DecimalMin(value = "-3.0", message = "X должен быть не меньше -3")
        @DecimalMax(value = "5.0", message = "X должен быть не больше 5")
        Double x,
        @NotNull(message = "Y не может быть null.")
        @DecimalMin(value = "-3.0", message = "Y должен быть не меньше -3")
        @DecimalMax(value = "3.0", message = "Y должен быть не больше 3")
        Double y,

        @NotNull(message = "R не может быть null.")
        @DecimalMin(value = "0.0", inclusive = false, message = "R должен быть положительным")
        @DecimalMax(value = "5.0", message = "R должен быть не больше 5")
        Double r,

        @NotNull(message = "ClientTimestamp не может быть null.")
        Long clientTimestamp,

        @NotBlank(message = "ClientTimezone не может быть пустым или null.")
        String clientTimezone) {
}