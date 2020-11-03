package com.OneMoreSale.OneMoreSaleServer.api;

import com.OneMoreSale.OneMoreSaleServer.model.Account;
import com.OneMoreSale.OneMoreSaleServer.model.User;
import com.OneMoreSale.OneMoreSaleServer.service.AuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Authentication {
    @Autowired
    private AuthenticationService authenticationService;

    @GetMapping("/register")
    public User register(
            @RequestParam(value = "email") String email,
            @RequestParam(value = "password") String password,
            @RequestParam(value = "firstname") String firstName,
            @RequestParam(value = "lastname") String lastName
            ) {

        Account account = new Account();
        User user = new User();

        account.setFirstName(firstName);
        account.setLastName(lastName);
        account.setEmail(email);
        account.setPassword(password);
        account.setStatus(true);

        user.setAccount(account);
        user.setAddress("San jose");
        user.setPhone("120");
        user.setUserName("Monkey");
        user.setZipCode("95116");

        authenticationService.register(user);

        return user;
    }


}



