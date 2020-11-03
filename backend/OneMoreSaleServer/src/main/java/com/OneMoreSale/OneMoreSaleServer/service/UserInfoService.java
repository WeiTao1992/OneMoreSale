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
    public ResponseEntity<?> updateAddress(String email, String phone, String address) {
        return userInfoDao.updateAddress(email,phone,address);
    }
    public ResponseEntity<?> updatePassword(String email, String username, String password) {
        return userInfoDao.updatePassword(email, username, password);
    }
}
