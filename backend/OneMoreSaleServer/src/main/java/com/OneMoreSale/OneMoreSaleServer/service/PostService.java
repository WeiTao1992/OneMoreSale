package com.OneMoreSale.OneMoreSaleServer.service;

import com.OneMoreSale.OneMoreSaleServer.Dao.PostDao;
import com.OneMoreSale.OneMoreSaleServer.model.*;
import com.github.benmanes.caffeine.cache.Cache;
import com.github.benmanes.caffeine.cache.Caffeine;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.TimeUnit;

@Service
public class PostService {

    @Autowired
    private PostDao postDao;

    @Autowired
    private UserInfoService userInfoService;


    public int savePost(User user, Post post){


        if (post.getTransactionMethod() != null){
            for (TransactionMethod transactionMethod : post.getTransactionMethod()){
                transactionMethod.setPost(post);
            }
        }

        if (post.getDeliveryType() != null){
            for (DeliveryType deliveryType : post.getDeliveryType()){
                deliveryType.setPost(post);
            }
        }

        if (post.getPostImage() != null){
            for (PostImage postImage : post.getPostImage()){
                postImage.setPost(post);
            }
        }
        int id = postDao.savePost(post);
        userInfoService.addPostToUserCache(user, post);
        return id;
    }

    public void deletePost(User user, int postId){
        Post post = postDao.deletePost(postId);
        if (post != null) { // update cache
            userInfoService.removePostFromUserCache(user, post);
        }
    }

    public void editPost(Post post){
        postDao.editPost(post);
    }

    public List<Post> getAllPost(int userId){
        return postDao.getAllPost(userId);
    }

    public Post searchPostById(int postId){
        return postDao.searchPostById(postId);
    }




}
