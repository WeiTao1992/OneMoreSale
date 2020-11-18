package com.OneMoreSale.OneMoreSaleServer.service;

import com.OneMoreSale.OneMoreSaleServer.Dao.AWSS3DaoImpl;
import com.OneMoreSale.OneMoreSaleServer.Dao.AuthenticationDao;

import com.OneMoreSale.OneMoreSaleServer.model.Account;
import com.OneMoreSale.OneMoreSaleServer.model.Credential;

import com.OneMoreSale.OneMoreSaleServer.model.User;
import com.github.benmanes.caffeine.cache.Cache;
import com.github.benmanes.caffeine.cache.Caffeine;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.concurrent.TimeUnit;


@Service
public class AuthenticationService {

    @Autowired
    private AuthenticationDao authenticationDao;
    private static final Logger LOGGER = LoggerFactory.getLogger(AuthenticationService.class);

    private final int evictTime = 48;

    private Cache<Credential,Boolean> credentialCache = Caffeine.newBuilder()
            .expireAfterAccess(evictTime, TimeUnit.HOURS)
            .initialCapacity(10)
            .maximumSize(1000)
            .build();

    private Cache<String,Integer> idCache = Caffeine.newBuilder()   // <email, userId>
            .expireAfterAccess(evictTime, TimeUnit.HOURS)
            .initialCapacity(10)
            .maximumSize(1000)
            .build();

    public boolean register(User user){
        return authenticationDao.register(user);
    }

    public int getUserIdByEmail (String email) {
        if (idCache.asMap().containsKey(email)) {
            LOGGER.info("[idCache] user with email {} was hit in cache", email);
            return idCache.getIfPresent(email).intValue();
        }
        int id = authenticationDao.getUserIdByEmail(email);
        if (id != -1) { // user exists
            idCache.put(email, id);
        }
        return id;
    }

    public boolean validateCredential (Credential credential) {
        if (credentialCache.asMap().containsKey(credential)) {
            LOGGER.info("[validateCache] user with email {} was hit in cache", credential.getEmail());
            return true;
        }
        boolean isValid = authenticationDao.validateCredential(credential);
        if (isValid) {
            credentialCache.put(credential,true);
        }
        return isValid;
    }
    // public boolean validateEmail(String email){ return authenticationDao.validateEmail(email); }
    public void invalidateIdCache(String email) {
        if (idCache.asMap().containsKey(email)) {
            idCache.invalidate(email);
        }
    }
}