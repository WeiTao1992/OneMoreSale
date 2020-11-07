package com.OneMoreSale.OneMoreSaleServer.service;

import com.OneMoreSale.OneMoreSaleServer.Dao.AuthenticationDao;

import com.OneMoreSale.OneMoreSaleServer.model.Credential;

import com.OneMoreSale.OneMoreSaleServer.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class AuthenticationService {

    @Autowired
    private AuthenticationDao authenticationDao;


    public boolean register(User user){
        return authenticationDao.register(user);
    }

    public int getUserIdByEmail (String email) {
        return authenticationDao.getUserIdByEmail(email);
    }

    public boolean validateCredential (Credential credential) {
        return authenticationDao.validateCredential(credential);
    }
    // public boolean validateEmail(String email){ return authenticationDao.validateEmail(email); }

}