package com.OneMoreSale.OneMoreSaleServer.service;

import com.OneMoreSale.OneMoreSaleServer.Dao.UserInfoDao;
import com.OneMoreSale.OneMoreSaleServer.model.Account;
import com.OneMoreSale.OneMoreSaleServer.model.User;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.ResponseEntity;

import org.springframework.stereotype.Service;

@Service
public class UserInfoService {

    @Autowired
    private UserInfoDao userInfoDao;

    public User getUserById(int userId) {
        return userInfoDao.getUser(userId);
    }

    public void updateAddress(String email, String phone, String address) {
        userInfoDao.updateAddress(email,phone,address);
    }
    public void updatePassword(String email, String username, String password) {
        userInfoDao.updatePassword(email, username, password);
    }
    public boolean validateUserId(int userId){
        return userInfoDao.validateUserId(userId);
    }
}
