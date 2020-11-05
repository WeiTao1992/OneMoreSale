package com.OneMoreSale.OneMoreSaleServer.api;

import com.OneMoreSale.OneMoreSaleServer.model.Post;
import com.OneMoreSale.OneMoreSaleServer.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
public class PostApi {
    @Autowired
    private PostService postService;

    @PostMapping("/post/createpost")
    public void savePost(@RequestBody Post post,
                         @RequestParam (value = "id") int userId){

        postService.savePost(post);
    }

    @GetMapping("/user/getallposts")
    public List<Post> getAllPost(@RequestParam (value = "id") int userId){
        return postService.getAllPost(userId);
    }

    @GetMapping("/post/getpostbyid")
    public Post getPostById(@RequestParam (value = "id") int postId){
        return postService.searchPostById(postId);
    }

//    @PostMapping("/post/editpost")
//    public void editPost{
//
//    }

    @DeleteMapping("/post/deletepost")
    public void deletePost(@RequestParam (value = "id") int postId){
        postService.deletePost(postId);
    }


}
