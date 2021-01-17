package com.example.demo1;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

@FeignClient(
        name = "demo2-service",
        url = "http://demo-ingress.default.192.53.168.118.xip.io",
        fallbackFactory = Demo2Fallback.class
)
public interface Demo2Feign {

    @GetMapping("/demo2")
    String hello();
}
