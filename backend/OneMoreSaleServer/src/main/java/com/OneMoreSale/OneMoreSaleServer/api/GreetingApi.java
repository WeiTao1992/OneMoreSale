package com.OneMoreSale.OneMoreSaleServer.api;

import com.OneMoreSale.OneMoreSaleServer.HttpUtil;

import com.OneMoreSale.OneMoreSaleServer.Dao.PostDao;
import com.OneMoreSale.OneMoreSaleServer.MonkeyLearn.APIUtils;
import com.OneMoreSale.OneMoreSaleServer.model.*;
import com.OneMoreSale.OneMoreSaleServer.service.GreetingService;
import com.OneMoreSale.OneMoreSaleServer.service.PostService;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;

enum Status {
    SUCCESS,
    FAILED
};

@RestController
public class GreetingApi {
    @Autowired
    private GreetingService greetingService;

    @Autowired
    private SessionFactory sessionFactory;

    @Autowired
    private PostDao postDao;

    @Autowired
    private PostService postService;

    private static final String template = "Hello, %s!";
    private final AtomicLong counter = new AtomicLong();

    @GetMapping("/greeting")
    public Greetings greeting(@RequestParam(value = "name", defaultValue = "World") String name) {
        Greetings greetings = new Greetings();
        greetings.setContent(name);
        greetings.setId(counter.incrementAndGet());
        greetingService.getGreetings(greetings);
        return greetings;
    }

    @GetMapping("/greetingEnum")
    public Status greeting() {
        return Status.SUCCESS;
    }


    @GetMapping("/greetinguser")
    public String greetingByUser(HttpServletRequest request) {

        if (HttpUtil.sessionInvalid(request)) {
            return "invalid session";
        }

        Integer userId = (Integer) request.getSession().getAttribute("user_id");
        return "hello from " + userId;
    }

    // This request only use for testing user and account entity. Check if this value can be saved into Database

    @PostMapping("/post/createtest")
    public void savePost(@RequestBody Post post,
                         @RequestParam (value = "id") int userId){
        try(Session session = sessionFactory.openSession()){
            User user = session.get(User.class, userId);
            post.setUser(user);
        }catch (Exception e){
            e.printStackTrace();
        }
        postService.savePost(post);
    }

    @GetMapping("/delete")
    public void delete(@RequestParam(value = "id") int postId){
        Session session = null;
        try{
            session = sessionFactory.openSession();
            Post post = session.get(Post.class, postId);
            User user = post.getUser();
            List<Post> postList = user.getPostList();
            postList.remove(post);
            session.beginTransaction();
            session.delete(post);
            session.getTransaction().commit();
        }catch (Exception e){
            e.printStackTrace();
            session.getTransaction().rollback();
        }finally {
            if (session != null){
                session.close();
            }
        }
    }

    @GetMapping("/getAll")
    public List<Post> getAll(@RequestParam(value = "id") int userId){
        try(Session session = sessionFactory.openSession()){
            User user = session.get(User.class, userId);
            return user.getPostList();
        }catch(Exception e){
            e.printStackTrace();
        }
        return new ArrayList<>();
    }

    @PostMapping("/postitem")
    public Post savePost(@RequestBody Post post){
        postDao.savePost(post);
        return post;
    }




//    @GetMapping("/test")
//    public List<Keyword> fortest(){
//        RestTemplate restTemplate = new RestTemplate();
//        HttpHeaders headers = new HttpHeaders();
//        headers.setContentType(MediaType.APPLICATION_JSON);
//        headers.set("Authorization", "Token " + "5a0e79decec05ff4bffe8509abca9449ccbf99d2");
//        JSONObject haha = new JSONObject();
//        ObjectMapper mapper = new ObjectMapper();
//        Body body = new Body(Arrays.asList("Elon Musk has shared a photo of the spacesuit designed by SpaceX. This is the second image shared of the new design and " +
//                "the first to feature the spacesuit’s full-body look."));
//        String jsonBody;
//        try {
//            jsonBody = mapper.writeValueAsString(body);
//        } catch (JsonProcessingException e) {
//            return new ArrayList<>();
//        }
////        try{
////            haha.put("data", jsonBody);
////        }catch(JSONException E){
////            System.out.println("GG simida");
////        }
//
//        HttpEntity<String> request = new HttpEntity<String>(jsonBody, headers);
//        MonkeyLearnResponse[] result = restTemplate.postForObject(APIUtils.url, request, MonkeyLearnResponse[].class);
//
//
//        return result[0].keywords;
//
//    }

    @GetMapping("/testagain")
    public List<Keyword> hahah(){
        String str = "Elon Musk has shared a photo of the spacesuit designed by SpaceX. This is the second image shared of the new design and " +
                "the first to feature the spacesuit’s full-body look.";
        APIUtils apiUtils = new APIUtils();
        return apiUtils.getAllKeywords(str);
    }

}
