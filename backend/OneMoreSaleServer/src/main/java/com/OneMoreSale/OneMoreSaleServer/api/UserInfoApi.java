package com.OneMoreSale.OneMoreSaleServer.api;

import com.OneMoreSale.OneMoreSaleServer.model.Account;
import com.OneMoreSale.OneMoreSaleServer.model.User;
import com.OneMoreSale.OneMoreSaleServer.service.UserInfoService;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/userinfo")
public class UserInfoApi {

    @Autowired
    private UserInfoService userInfoService;

    @Autowired
    private SessionFactory sessionFactory;


    @RequestMapping(value = "/getUserInfo/{userId}", method = RequestMethod.GET)
    @ResponseBody
    public User getUser(@PathVariable(value="userId")int userId){
        return userInfoService.getUserById(userId);
    }

    @RequestMapping(value = "/UpdatePassword", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<?> updatePassword(@RequestParam(name = "email") String email, @RequestParam(name = "username") String username,

    @RequestParam(name = "password") String password){
        return userInfoService.updatePassword(email, username, password);

    }

    @RequestMapping(value = "/UpdateAddress", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<?> updateAddress(@RequestParam(name = "email") String email, @RequestParam(name = "phone") String phone,
                                            @RequestParam(name = "address") String address){

        return userInfoService.updateAddress(email, phone, address);
    }
}
