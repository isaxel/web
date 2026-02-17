package isaxel.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.util.Pair;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import isaxel.dto.CheckRequestDTO;
import isaxel.dto.ResultResponseDTO;
import isaxel.service.CheckService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class CheckController {
    private final CheckService checkService;

    @PostMapping("/add")
    public ResponseEntity<?> checkHit(@Valid @RequestBody CheckRequestDTO request) {
        return new ResponseEntity<>(checkService.check(request), HttpStatus.CREATED);
    }

    @GetMapping("/results")
    public ResponseEntity<?> getResults(@RequestParam int page, @RequestParam int pageSize) {
        Pair<Integer, List<ResultResponseDTO>> results = checkService.getResults(page, pageSize);
        return ResponseEntity.ok(Map.of("results", results.getSecond(),
                "totalPages", results.getFirst()));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteResult(@PathVariable Long id) {
        checkService.deleteResult(id);
        return ResponseEntity.ok().build();
    }
}
