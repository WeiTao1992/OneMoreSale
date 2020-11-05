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
            @RequestParam(value = "username") String userName,
            @RequestParam(value = "addresss") String address,
            @RequestParam(value = "phone") String phone
            ) {

        Account account = new Account();
        User user = new User();

        account.setUserNmae(userName);
        account.setAddress(address);
        account.setEmail(email);
        account.setPhone(phone);
        account.setPassword(password);
        account.setStatus(true);

        user.setAccount(account);
        user.setAddress(address);
        user.setPhone(phone);
        user.setUserName(userName);

        return user;
    }


}



