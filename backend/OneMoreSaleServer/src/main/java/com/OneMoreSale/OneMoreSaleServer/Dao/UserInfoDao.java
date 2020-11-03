package com.OneMoreSale.OneMoreSaleServer.Dao;

import com.OneMoreSale.OneMoreSaleServer.model.Account;
import com.OneMoreSale.OneMoreSaleServer.model.User;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;

@Repository
public class UserInfoDao {

    @Autowired
    private SessionFactory sessionFactory;

    public User getUser(int userId) {
        User user = null;
        try (Session session = sessionFactory.openSession()) {

            Criteria criteria = session.createCriteria(User.class);
            user = (User) criteria.add(Restrictions.eq("userId", userId)).uniqueResult();
        } catch (Exception e) {
            e.printStackTrace();
        }
        if (user != null)
            return user;
        return null;
    }
    public ResponseEntity<?> updateAddress(String email, String phone, String address) {
        Account account = null;
        try (Session session = sessionFactory.openSession()) {
            Criteria criteria = session.createCriteria(Account.class);
            account = (Account) criteria.add(Restrictions.eq("email", email)).uniqueResult();
            User user = account.getUser();
            user.setPhone(phone);
            user.setAddress(address);
            account.setUser(user);
            session.beginTransaction();
            session.update(account);
            session.getTransaction().commit();
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

    public ResponseEntity<?> updatePassword(String email, String username, String password) {
        Account account = null;
        try (Session session = sessionFactory.openSession()) {
            Criteria criteria = session.createCriteria(Account.class);
            account = (Account) criteria.add(Restrictions.eq("email", email)).uniqueResult();
            account.setPassword(password);
            User user = account.getUser();
            user.setUserName(username);
            account.setUser(user);
            session.beginTransaction();
            session.update(account);
            session.getTransaction().commit();
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
