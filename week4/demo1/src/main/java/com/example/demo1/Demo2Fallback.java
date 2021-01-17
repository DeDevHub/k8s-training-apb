package com.example.demo1;

import feign.FeignException;
import feign.hystrix.FallbackFactory;
import org.springframework.stereotype.Component;

@Component
public class Demo2Fallback implements FallbackFactory<Demo2Feign> {

    @Override
    public Demo2Feign create(Throwable throwable) {
        return new Demo2Feign() {

            @Override
            public String hello() {
                if (throwable instanceof FeignException && ((FeignException) throwable).status() == 404) {
                    // Treat the HTTP 404 status
                    return "Treat the HTTP 404 status";
                }

                return "FallbackFactory Error";
            }

            @Override
            public String key() {
                if (throwable instanceof FeignException && ((FeignException) throwable).status() == 404) {
                    // Treat the HTTP 404 status
                    return "Key ==> Treat the HTTP 404 status";
                }

                return "Key ==> FallbackFactory Error";
            }
        };
    }
}
