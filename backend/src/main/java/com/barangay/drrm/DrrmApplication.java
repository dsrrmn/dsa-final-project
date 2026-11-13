package com.barangay.drrm;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;

@SpringBootApplication
public class DrrmApplication {

    public static void main(String[] args) {
        loadEnvFile();
        SpringApplication.run(DrrmApplication.class, args);
    }

    /**
     * Automatically loads .env file into System properties if present.
     */
    private static void loadEnvFile() {
        Path[] possiblePaths = {
            Path.of(".env"),
            Path.of("../.env")
        };

        for (Path path : possiblePaths) {
            if (Files.isRegularFile(path)) {
                try {
                    List<String> lines = Files.readAllLines(path);
                    for (String line : lines) {
                        String trimmed = line.trim();
                        if (trimmed.isEmpty() || trimmed.startsWith("#")) {
                            continue;
                        }
                        int eqIndex = trimmed.indexOf('=');
                        if (eqIndex > 0) {
                            String key = trimmed.substring(0, eqIndex).trim();
                            String value = trimmed.substring(eqIndex + 1).trim();
                            // Do not overwrite existing system properties or environment variables
                            if (System.getProperty(key) == null && System.getenv(key) == null) {
                                System.setProperty(key, value);
                            }
                        }
                    }
                    break;
                } catch (IOException ignored) {
                }
            }
        }
    }
}
