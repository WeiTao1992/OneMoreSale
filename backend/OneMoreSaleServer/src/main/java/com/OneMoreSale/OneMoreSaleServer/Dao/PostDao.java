package com.OneMoreSale.OneMoreSaleServer.Dao;


import com.OneMoreSale.OneMoreSaleServer.model.Post;
import com.OneMoreSale.OneMoreSaleServer.model.User;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class PostDao {
    @Autowired
    private SessionFactory sessionFactory;

    public void savePost(Post post){
        Session session= null;
        try{
            session = sessionFactory.openSession();
            session.beginTransaction();
            session.save(post);
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

    public void deletePost(int postId){
        Session session = null;
        try{
            session = sessionFactory.openSession();
            Post post = session.get(Post.class, postId);
            User user = post.getUser();
            if (user != null){
                List<Post> postList = user.getPostList();
                postList.remove(post);
            }
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

    public void editPost(Post post){
        Session session = null;
        try{
            session = sessionFactory.openSession();
            session.beginTransaction();
            session.saveOrUpdate(post);
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

    public List<Post> getAllPost(int userId){
        try(Session session = sessionFactory.openSession()){
            User user = session.get(User.class, userId);
            return user.getPostList();
        }catch(Exception e){
            e.printStackTrace();
        }
        return new ArrayList<>();
    }

    public Post searchPostById(int postId){
        try(Session session = sessionFactory.openSession()){
            return session.get(Post.class, postId);
        }catch(Exception e){
            e.printStackTrace();
        }
        return null;
    }

}
