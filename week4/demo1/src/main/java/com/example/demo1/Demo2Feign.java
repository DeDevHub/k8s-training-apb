package com.example.demo1;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

@FeignClient(
        name = "demo2-service",
        url = "${feign.demo2.url}",
        fallbackFactory = Demo2Fallback.class
)
public interface Demo2Feign {

    @GetMapping("/demo2")
    String hello();

    @GetMapping("/key")
    String key();
}
