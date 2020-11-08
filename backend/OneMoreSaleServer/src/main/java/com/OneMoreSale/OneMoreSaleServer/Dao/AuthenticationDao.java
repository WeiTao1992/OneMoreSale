package com.OneMoreSale.OneMoreSaleServer.Dao;



import com.OneMoreSale.OneMoreSaleServer.model.Account;
import com.OneMoreSale.OneMoreSaleServer.model.Credential;
import com.OneMoreSale.OneMoreSaleServer.model.Greetings;
import com.OneMoreSale.OneMoreSaleServer.model.User;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;

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

    // -1 denotes no user found
    public int getUserIdByEmail(String email) {
        Account account = null;
        try (Session session = sessionFactory.openSession()) {

            Criteria criteria = session.createCriteria(Account.class);
            account = (Account) criteria.add(Restrictions.eq("email", email)).uniqueResult();
        } catch (Exception e) {
            e.printStackTrace();
        }
        if (account != null) {
            return account.getUser().getUserId();
        }
        return -1;
    }

    public boolean validateCredential(Credential credential) {
        Account account = null;
        try (Session session = sessionFactory.openSession()) {

            Criteria criteria = session.createCriteria(Account.class);
            account = (Account) criteria.add(Restrictions.eq("email", credential.getEmail())).uniqueResult();
        } catch (Exception e) {
            e.printStackTrace();
        }
        if (account != null) {
            return account.getPassword().equals(credential.getPassword());
        }
        return false;

    }

}

