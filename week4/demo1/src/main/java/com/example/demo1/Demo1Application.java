package com.example.demo1;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.circuitbreaker.EnableCircuitBreaker;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@EnableFeignClients
@EnableCircuitBreaker
@RestController
public class Demo1Application {

    @Value("${app.active}")
    private String profileActive;

    @Autowired
    private Demo2Feign demo2Feign;

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

    @GetMapping("/call_demo2")
    public ResponseEntity<String> helloDemo2(){
        log.info("Hello demo service 1........ call service 2");

        String result = demo2Feign.hello();
        return ResponseEntity.ok("Hello demo service 1........ call service 2 is " + result);
    }

    @GetMapping("/profile")
    public ResponseEntity<String> profileActive(){
        log.info("Hello demo service 1........");
        log.info("Profile Active is {}", profileActive);
        return ResponseEntity.ok("Hello demo service 1..... Profile active: " + profileActive);
    }
}
