package com.OneMoreSale.OneMoreSaleServer.Dao;

import com.OneMoreSale.OneMoreSaleServer.model.Greetings;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class GreatingDao {
    @Autowired
    private SessionFactory sessionFactory;

    public void addgreatings(Greetings greetings){
        Session session = null;
        try {
            session = sessionFactory.openSession();
            session.beginTransaction();
            session.save(greetings);
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

}
