package com.OneMoreSale.OneMoreSaleServer.model;

public class SavePostResponse {
    private int postId;
    private String response;

    public SavePostResponse(int postId, String response) {
        this.postId = postId;
        this.response = response;
    }

    public int getPostId() {
        return postId;
    }

    public void setPostId(int postId) {
        this.postId = postId;
    }

    public String getResponse() {
        return response;
    }

    public void setResponse(String response) {
        this.response = response;
    }
}
