package com.OneMoreSale.OneMoreSaleServer.api;

import com.OneMoreSale.OneMoreSaleServer.HttpUtil;
import com.OneMoreSale.OneMoreSaleServer.model.Post;
import com.OneMoreSale.OneMoreSaleServer.model.User;
import com.OneMoreSale.OneMoreSaleServer.service.PostService;
import com.OneMoreSale.OneMoreSaleServer.service.UserInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@RestController
public class PostApi {
    @Autowired
    private PostService postService;

    @Autowired
    private UserInfoService userInfoService;
    @PostMapping("/post/createpost")
    public void savePost(@RequestBody @NonNull Post post, HttpServletRequest httpServletRequest,
                         HttpServletResponse httpServletResponse) throws IOException {
        
        //TODO: Illegal Input
        if (!HttpUtil.sessionInvalid(httpServletRequest)){ // already logged in
            int userId = (int)httpServletRequest.getSession().getAttribute("user_id");
            User user = userInfoService.getUserById(userId);
            post.setUser(user);
            int id =  postService.savePost(post);
            httpServletResponse.setHeader("postid", Integer.toString(id));
            httpServletResponse.getWriter().write("save successfully!");
            return;
        }
        httpServletResponse.getWriter().print("Please log in first");
    }

    @GetMapping("/user/getallposts")
    public List<Post> getAllPost(HttpServletRequest httpServletRequest,
                                 HttpServletResponse httpServletResponse) throws IOException{
        if (!HttpUtil.sessionInvalid(httpServletRequest)){ // already logged in
            int userId = (int)httpServletRequest.getSession().getAttribute("user_id");
            return postService.getAllPost(userId);
        }
        httpServletResponse.getWriter().print("Please log in first");
        return null;
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
