package com.OneMoreSale.OneMoreSaleServer.service;

import com.OneMoreSale.OneMoreSaleServer.Dao.AuthenticationDao;
import com.OneMoreSale.OneMoreSaleServer.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class AuthenticationService {

    @Autowired
    private AuthenticationDao authenticationDao;

    public void register(User user){
        authenticationDao.register(user);
    }

}