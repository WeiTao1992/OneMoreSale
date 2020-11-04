package com.OneMoreSale.OneMoreSaleServer.api;

import com.OneMoreSale.OneMoreSaleServer.Dao.GreatingDao;
import com.OneMoreSale.OneMoreSaleServer.model.*;
import com.OneMoreSale.OneMoreSaleServer.service.GreetingService;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;

@RestController
public class GreetingApi {
    @Autowired
    private GreetingService greetingService;

    @Autowired
    private SessionFactory sessionFactory;

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

    // This request only use for testing user and account entity. Check if this value can be saved into Database
    @GetMapping("/check")
    public void check(){

        Session session = null;
        try {
            session = sessionFactory.openSession();
            session.beginTransaction();
            User user = new User();
            Account account = new Account();
            account.setFirstName("da");
            account.setLastName("wang");
            account.setEmail("google@gmail.com");
            account.setPassword("12342");
            account.setStatus(true);

            user.setAccount(account);
            user.setAddress("San jose");
            user.setPhone("120");
            user.setUserName("Monkey");
            user.setZipCode("95116");

            session.save(user);
            session.getTransaction().commit();
        } catch (Exception e) {
            e.printStackTrace();
            session.getTransaction().rollback();
        } finally {
            if (session != null) {
                session.close();
            }
        }

    }
    // use for testing.
    @GetMapping("/saveposts")
    public void save(){
        Session session = null;
        try{
            session = sessionFactory.openSession();
            User user = session.get(User.class, 1);
            List<Post> postList = user.getPostList();
            Post post1 = new Post();

            DeliveryType deliveryType = new DeliveryType();
            deliveryType.setDeliveryType("pick up");
            post1.setDeliveryType(Arrays.asList(deliveryType));

            TransactionMethod transactionMethod = new TransactionMethod();
            transactionMethod.setTransactionMethod("cash");
            post1.setTransactionMethod(Arrays.asList(transactionMethod));

            Keyword keyword1 = new Keyword();
            Keyword keyword2 = new Keyword();
            keyword1.setPostKeyword("iphone");
            keyword2.setPostKeyword("blue");
            post1.setKeyword(Arrays.asList(keyword1, keyword2));

            PostImage postImage = new PostImage();
            postImage.setPostImage("usl//............");
            post1.setPostImage(Arrays.asList(postImage));

            post1.setPostCategory("mobile");
            post1.setPostDescription("sell moible in low price");
            post1.setPostPrice(123.5);
            post1.setPostOwner("jack ma");
            post1.setUser(user);

            session.beginTransaction();
            session.save(post1);
            session.getTransaction().commit();

        }catch(Exception e){
            e.printStackTrace();
            session.getTransaction().commit();
        }finally {
            if(session != null){
                session.close();
            }
        }
    }
}
