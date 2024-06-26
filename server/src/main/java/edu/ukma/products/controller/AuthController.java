package edu.ukma.products.controller;

import edu.ukma.products.JwtUtil;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/login")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    private static final String USERNAME = "user";
    private static final String PASSWORD = "password";

    private final Map<String, String> loggedInUsers;

    private final JwtUtil jwtUtil;

    public AuthController(Map<String, String> loggedInUsers, JwtUtil jwtUtil) {
        this.loggedInUsers = loggedInUsers;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping
    public ResponseEntity<?> login(@RequestBody AuthRequest authRequest) throws Exception {
        // Basic authentication simulation
        if (!USERNAME.equals(authRequest.getUsername()) || !PASSWORD.equals(authRequest.getPassword())) {
            throw new Exception("Incorrect username or password");
        }
        //String token = jwtUtil.generateToken(authRequest.getUsername());
        String token = "qwhyegrfoqhuebfojuqkewholi";

        loggedInUsers.put(authRequest.getUsername(), token);

        return ResponseEntity.ok(new AuthResponse(token));
    }

    @GetMapping("/checkLoggedIn")
    public ResponseEntity<?> checkLoggedIn(@RequestParam String username) {
        if (loggedInUsers.containsKey(username)) {
            return ResponseEntity.ok("User is logged in");
        } else {
            return ResponseEntity.ok("User is not logged in");
        }
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    static class AuthRequest {
        private String username;
        private String password;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    static class AuthResponse {
        private String token;
    }
}