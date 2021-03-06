package com.OneMoreSale.OneMoreSaleServer.api;

import com.OneMoreSale.OneMoreSaleServer.HttpUtil;
import com.OneMoreSale.OneMoreSaleServer.model.Post;
import com.OneMoreSale.OneMoreSaleServer.model.SavePostResponse;
import com.OneMoreSale.OneMoreSaleServer.model.User;
import com.OneMoreSale.OneMoreSaleServer.service.PostService;
import com.OneMoreSale.OneMoreSaleServer.service.UserInfoService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
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

    private static Logger logger = LoggerFactory.getLogger(AuthenticationApi.class);

    @Autowired
    private UserInfoService userInfoService;
    @PostMapping("/post/createpost")
    public SavePostResponse savePost(@RequestBody @NonNull Post post, HttpServletRequest httpServletRequest,
                                     HttpServletResponse httpServletResponse) throws IOException {
        if (post == null) {
            httpServletResponse.sendError(HttpServletResponse.SC_BAD_REQUEST);
            return new SavePostResponse(-1, "post cannot be NULL");
        }
        //TODO: legal Input
        if (!HttpUtil.sessionInvalid(httpServletRequest)){ // already logged in

            int userId = (int)httpServletRequest.getSession().getAttribute("user_id");
            User user = userInfoService.getUserById(userId);
            post.setUser(user);
            int id =  postService.savePost(user, post);
            logger.info("[Post] post was created with Title = {} ", post.getPostTitle());

            return new SavePostResponse(id, "save successfully");
        }
        httpServletResponse.sendError(HttpServletResponse.SC_FORBIDDEN);
        return new SavePostResponse(-1, "Please log in first");
    }

    @GetMapping("/user/getallposts")
    public List<Post> getAllPost(HttpServletRequest httpServletRequest,
                                 HttpServletResponse httpServletResponse) throws IOException{
        if (!HttpUtil.sessionInvalid(httpServletRequest)){ // already logged in
            int userId = (int)httpServletRequest.getSession().getAttribute("user_id");
            logger.info("[getAllPost] all posts from user {} were fetched", userId);
            return postService.getAllPost(userId);
        }
        httpServletResponse.getWriter().print("Please log in first");
        return null;
    }

    @GetMapping("/post/getpostbyid")
    public Post getPostById(@RequestParam (value = "id") int postId){
        logger.info("[Post] post created");
        return postService.searchPostById(postId);
    }

//    @PostMapping("/post/editpost")
//    public void editPost{
//
//    }

    @DeleteMapping("/post/deletepost")
    public void deletePost(HttpServletRequest httpServletRequest,
                           HttpServletResponse httpServletResponse,
                           @RequestParam (value = "id") int postId) throws IOException {

        if (HttpUtil.sessionInvalid(httpServletRequest)){ // already logged in
            httpServletResponse.sendError(HttpServletResponse.SC_FORBIDDEN);
            return;
        }
        int userId = (int)httpServletRequest.getSession().getAttribute("user_id");
        User user = userInfoService.getUserById(userId);
        postService.deletePost(user, postId);
    }
}
