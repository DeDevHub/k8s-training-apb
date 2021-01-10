package com.example.demo1;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class Demo1Application {

    private static final Logger log = LoggerFactory.getLogger(Demo1Application.class.getName());

    public static void main(String[] args) {
        SpringApplication.run(Demo1Application.class, args);
    }

    @GetMapping("/demo1")
    public ResponseEntity<String> hello(@RequestParam(name = "value") String value){
        log.info("Hello demo service 1........");
        log.info("value = " + value);
        return ResponseEntity.ok("Hello demo service 1........" + value);
    }

}
