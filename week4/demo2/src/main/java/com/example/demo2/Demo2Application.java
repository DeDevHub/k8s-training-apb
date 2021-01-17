package com.example.demo2;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class Demo2Application {

    @Value("${app.active}")
    private String profileActive;

    @Value("${key.signature}")
    private String keySignature;

    private static final Logger log = LoggerFactory.getLogger(Demo2Application.class.getName());

    public static void main(String[] args) {
        SpringApplication.run(Demo2Application.class, args);
    }

    @GetMapping("/demo2")
    public ResponseEntity<String> hello(){
        log.info("Hello demo service 2........ " + profileActive);
        return ResponseEntity.ok("Hello demo service 2........ " + profileActive);
    }

    @GetMapping("/key")
    public ResponseEntity<String> key(){
        log.info("Hello demo service 2........ KEY = " + keySignature);
        return ResponseEntity.ok("Hello demo service 2........ KEY = " + keySignature);
    }
}
