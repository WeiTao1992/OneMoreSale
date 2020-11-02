package com.OneMoreSale.OneMoreSaleServer.service;


import com.OneMoreSale.OneMoreSaleServer.Dao.GreatingDao;
import com.OneMoreSale.OneMoreSaleServer.model.Greetings;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GreetingService {

    @Autowired
    private GreatingDao greatingDao;

    public void getGreetings(Greetings greetings){
        greatingDao.addgreatings(greetings);
    }

}
