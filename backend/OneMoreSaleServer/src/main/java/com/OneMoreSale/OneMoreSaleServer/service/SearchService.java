package com.OneMoreSale.OneMoreSaleServer.service;

import com.OneMoreSale.OneMoreSaleServer.Dao.SearchDao;
import com.OneMoreSale.OneMoreSaleServer.model.Post;
import org.jboss.logging.annotations.Pos;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class SearchService {


    private static final Logger logger = LoggerFactory.getLogger(SearchService.class);

    @Autowired
    private SearchDao searchDao;

    public List<Post> searchPost(String keyword, double minPrice,
                                 double maxPrice, String category, int maxPerPage, int pageNumber){
        return searchDao.searchPost(keyword, minPrice,maxPrice,category,maxPerPage, pageNumber);
    }

    public List<Post> searchDemo(String keyword){
        return searchDao.searchDemo(keyword);
    }

    public List<Post> homePage(){
        return searchDao.homepage();
    }




}
