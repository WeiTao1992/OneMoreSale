package com.OneMoreSale.OneMoreSaleServer.service;

import com.OneMoreSale.OneMoreSaleServer.Dao.PostDao;
import com.OneMoreSale.OneMoreSaleServer.MonkeyLearn.APIUtils;
import com.OneMoreSale.OneMoreSaleServer.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class PostService {
    @Autowired
    private PostDao postDao;

    public void savePost(Post post){
        String description = post.getPostDescription();
        description += ", " + post.getPostTitle() + ", " + post.getPostCategory();
        List<Keyword> keywordsList = getKeyword(description);
        if (keywordsList != null){
            for (Keyword keyword : keywordsList){
                keyword.setPost(post);
            }
            post.setKeyword(keywordsList);
        }

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
        postDao.savePost(post);
    }

    public void deletePost(int postId){
        postDao.deletePost(postId);
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

    private List<Keyword> getKeyword(String description){
        APIUtils apiUtils = new APIUtils();
        return apiUtils.getAllKeywords(description);
    }


}
