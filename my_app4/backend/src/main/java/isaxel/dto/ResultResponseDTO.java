package isaxel.dto;

import lombok.Getter;
import lombok.Setter;
import isaxel.entity.CheckPoint;

@Getter
@Setter
public class ResultResponseDTO {
    private Long id;
    private String x;
    private String y;
    private String r;
    private boolean hit;
    private String formattedTimestamp;
    private String formattedExecutionTime;

    public ResultResponseDTO(CheckPoint checkPoint) {
        this.id = checkPoint.getId();
        this.x = checkPoint.getFormattedX();
        this.y = checkPoint.getFormattedY();
        this.r = checkPoint.getFormattedR();
        this.hit = checkPoint.isHit();
        this.formattedTimestamp = checkPoint.getFormattedTimestamp();
        this.formattedExecutionTime = checkPoint.getFormattedExecutionTime();
    }
}