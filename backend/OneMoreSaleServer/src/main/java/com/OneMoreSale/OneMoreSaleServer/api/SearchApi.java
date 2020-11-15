package com.OneMoreSale.OneMoreSaleServer.api;

import com.OneMoreSale.OneMoreSaleServer.model.Post;
import com.OneMoreSale.OneMoreSaleServer.service.SearchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class SearchApi {
    /**
     *  Quesions remain:
     *      1. 如何解决一次请求只传前10条post (1页)，而点了第二页刚好能拿到后10条post的问题
     *      2. Hibernate Search or Elasticsearch
     *      3. filter怎么做
     *      4. 相关度排序
     * */

    // TODO: search by keywords, by min max price, by category, by pageNumber, by maxPerPage

    @Autowired
    private SearchService searchService;


    @GetMapping("/index/search")
    public List<Post> searchPost(@RequestParam(value = "keyword", defaultValue = "") String keyword,

                                 @RequestParam(value = "minPrice", defaultValue = "0") double minPrice,
                                 @RequestParam(value = "maxPrice", defaultValue = "10000000000") double maxPrice,
                                 @RequestParam(value = "category", defaultValue = "") String category,
                                 @RequestParam(value = "maxPerPage", defaultValue = "10") int maxPerPage,
                                 @RequestParam(value = "pageNumber", defaultValue = "1") int pageNumber){
        return searchService .searchPost(keyword, minPrice, maxPrice, category, maxPerPage, pageNumber);
    }



    @GetMapping("/index")
    public List<Post> homePage(){
        return searchService.homePage();
    }


}
