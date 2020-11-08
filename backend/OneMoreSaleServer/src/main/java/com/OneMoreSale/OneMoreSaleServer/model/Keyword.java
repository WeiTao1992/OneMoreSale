package com.OneMoreSale.OneMoreSaleServer.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "keyword")
@JsonIgnoreProperties(ignoreUnknown = true)
public class Keyword implements Serializable {

    private static final long serialVersionUID = 7461252604378704848L;
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @ManyToOne
    @JsonIgnore
    private Post post;

    @JsonProperty("parsed_value")
    private String postKeyword;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }


    public Post getPost() {
        return post;
    }

    public void setPost(Post post) {
        this.post = post;
    }


    public String getPostKeyword() {
        return postKeyword;
    }

    public void setPostKeyword(String postKeyword) {
        this.postKeyword = postKeyword;
    }
}
