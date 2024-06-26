package edu.ukma.products;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import java.util.HashMap;
import java.util.Map;

@Configuration
public class AppConfig {
    @Bean
    public Map<String, String> loggedInUsers() {
        return new HashMap<>();
    }
}