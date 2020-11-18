package com.OneMoreSale.OneMoreSaleServer.service;

import com.OneMoreSale.OneMoreSaleServer.Dao.UserInfoDao;
import com.OneMoreSale.OneMoreSaleServer.api.AuthenticationApi;
import com.OneMoreSale.OneMoreSaleServer.model.Account;
import com.OneMoreSale.OneMoreSaleServer.model.Post;
import com.OneMoreSale.OneMoreSaleServer.model.User;
import com.github.benmanes.caffeine.cache.Cache;
import com.github.benmanes.caffeine.cache.Caffeine;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.ResponseEntity;

import org.springframework.stereotype.Service;

import java.util.concurrent.TimeUnit;

@Service
public class UserInfoService {

    @Autowired
    private UserInfoDao userInfoDao;
    private AuthenticationService authenticationService;

    private static Logger logger = LoggerFactory.getLogger(UserInfoService.class);
    private final int evictTime = 48;

    private Cache<Integer,User> userCache = Caffeine.newBuilder()   // <email, userId>
            .expireAfterAccess(evictTime, TimeUnit.HOURS)
            .initialCapacity(10)
            .maximumSize(1000)
            .build();

    public User getUserById(int userId) {
        if (userCache.asMap().containsKey(userId)) {
            logger.info("[userCache] cache hit !!! for user {}", userId);
            return userCache.getIfPresent(userId);
        }

        User user = userInfoDao.getUser(userId);
        if (user != null) { // cache
            userCache.put(userId, user);
        }
        return user;
    }

    public void updateAddress(String email, String phone, String address) {
        userInfoDao.updateAddress(email,phone,address);
    }
    public void updatePassword(String email, String username, String password) {
        authenticationService.invalidateIdCache(email); // clear cache
        userInfoDao.updatePassword(email, username, password);
    }
    public boolean validateUserId(int userId){
        return userInfoDao.validateUserId(userId);
    }

    public void addPostToUserCache(User user, Post post) {
        int uid = user.getUserId();
        if (userCache.asMap().containsKey(uid)) { // save post时，同步到缓存
            logger.info("[userCache] new post added to cache for user {}", uid);
            userCache.getIfPresent(uid).getPostList().add(post);
        }
    }

    public void removePostFromUserCache(User user, Post post) {
        int uid = user.getUserId();
        if (userCache.asMap().containsKey(uid)) { // save post时，同步到缓存
            logger.info("[userCache] post removed from cache for user {}", uid);
            userCache.getIfPresent(uid).getPostList().remove(post);
        }
    }
}
