package com.OneMoreSale.OneMoreSaleServer.model;

import java.util.List;

public class SearchBody {
    private List<Post> postList;
    private int totalPosts;

    public SearchBody(List<Post> postList, int totalPosts) {
        this.postList = postList;
        this.totalPosts = totalPosts;
    }

    public List<Post> getPostList() {
        return postList;
    }

    public void setPostList(List<Post> postList) {
        this.postList = postList;
    }

    public int getTotalPosts() {
        return totalPosts;
    }

    public void setTotalPosts(int totalPosts) {
        this.totalPosts = totalPosts;
    }
}
