package com.OneMoreSale.OneMoreSaleServer.api;

import com.OneMoreSale.OneMoreSaleServer.model.Account;
import com.OneMoreSale.OneMoreSaleServer.model.User;
import com.OneMoreSale.OneMoreSaleServer.service.AuthenticationService;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;

@RestController
public class Authentication {
    @Autowired
    private AuthenticationService authenticationService;


    @GetMapping("/register")
    public ResponseEntity<?> register(
            @RequestParam(value = "email") String email,
            @RequestParam(value = "password") String password,
            @RequestParam(value = "username") String userName,
            @RequestParam(value = "address") String address,
            @RequestParam(value = "phone") String phone,
            @RequestParam(value = "zipcode") String zipcode
    ) {


        Account account = new Account();
        User user = new User();

        account.setEmail(email);
        account.setPassword(password);
        account.setStatus(true);

        user.setAccount(account);
        user.setAddress(address);
        user.setPhone(phone);
        user.setUserName(userName);
        user.setZipCode(zipcode);

        if (authenticationService.register(user) == false) {
            return new ResponseEntity<>(HttpStatus.IM_USED);
        } else {
            return new ResponseEntity<>(HttpStatus.OK);
        }
    }
}





