package com.OneMoreSale.OneMoreSaleServer.Dao;


import com.OneMoreSale.OneMoreSaleServer.model.Account;
import com.OneMoreSale.OneMoreSaleServer.model.Greetings;
import com.OneMoreSale.OneMoreSaleServer.model.User;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class AuthenticationDao {
    @Autowired
    private SessionFactory sessionFactory;

//    public boolean validateEmail(String email){
//        Session session = null;
//
//        try {
//            session = sessionFactory.openSession();
//            session.beginTransaction();
//            session.get(Account.class, email);
//
//            session.getTransaction().commit();
//        } catch (Exception e) {
//            e.printStackTrace();
//            session.getTransaction().rollback();
//        } finally {
//            if (session != null) {
//                session.close();
//            }
//        }
//        return true;
//    }



    public boolean register(User user){
        Session session = null;
        boolean validEmail = true;

        try {
            session = sessionFactory.openSession();
            session.beginTransaction();
            session.save(user);
            session.getTransaction().commit();
        } catch (Exception e) {
            validEmail = false;
            e.printStackTrace();
            session.getTransaction().rollback();
        } finally {
            if (session != null) {
                session.close();
            }
        }
        return validEmail;
    }

}

