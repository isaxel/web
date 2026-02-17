package isaxel.controller;


import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import isaxel.dto.AuthorizeRequestDTO;
import isaxel.dto.RegisterRequestDTO;
import isaxel.service.AuthorizeService;

import java.util.Map;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class AuthorizeController {
    private final AuthorizeService authorizeService;

    @PostMapping("/auth/register")
    public ResponseEntity<?> register(@RequestBody @Valid RegisterRequestDTO request) {
        authorizeService.register(request.user(), request.password());
        return ResponseEntity.status(HttpStatus.CREATED).build(); // 201 Created - successful resource creation
    }

    @PostMapping("/auth/login")
    public ResponseEntity<?> login(@RequestBody @Valid AuthorizeRequestDTO request) {
        String token = authorizeService.login(request.user(), request.password());
        return ResponseEntity.ok().body(Map.of("token", token));
    }

    @GetMapping("/auth/check")
    public ResponseEntity<?> checkAuth() {
        return ResponseEntity.ok().build();
    }
}
