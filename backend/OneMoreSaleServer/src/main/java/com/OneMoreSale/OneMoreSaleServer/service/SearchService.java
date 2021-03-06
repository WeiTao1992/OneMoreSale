package com.OneMoreSale.OneMoreSaleServer.service;

import com.OneMoreSale.OneMoreSaleServer.Dao.SearchDao;
import com.OneMoreSale.OneMoreSaleServer.model.Post;
import com.OneMoreSale.OneMoreSaleServer.model.SearchBody;
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

    public SearchBody searchPost(String keyword, double minPrice,
                                 double maxPrice, String category, int maxPerPage, int pageNumber,
                                 boolean sortByPrice, boolean sortByDate){
        return searchDao.searchPost(keyword, minPrice,maxPrice,category,maxPerPage, pageNumber, sortByPrice,sortByDate);
    }

    public List<Post> homePage(){
        return searchDao.homepage();
    }




}
