package com.OneMoreSale.OneMoreSaleServer.api;

import com.OneMoreSale.OneMoreSaleServer.Dao.GreatingDao;
import com.OneMoreSale.OneMoreSaleServer.model.Greetings;
import com.OneMoreSale.OneMoreSaleServer.service.GreetingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.concurrent.atomic.AtomicLong;

@RestController
public class GreetingApi {
    @Autowired
    private GreetingService greetingService;


    private static final String template = "Hello, %s!";
    private final AtomicLong counter = new AtomicLong();

    @GetMapping("/greeting")
    public Greetings greeting(@RequestParam(value = "name", defaultValue = "World") String name) {
        Greetings greetings = new Greetings();
        greetings.setContent(name);
        greetings.setId(counter.incrementAndGet());
        greetingService.getGreetings(greetings);

        return greetings;
    }
}
