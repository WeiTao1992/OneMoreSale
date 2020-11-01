package com.OneMoreSale.OneMoreSaleServer.model;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "keyword")
public class Keyword implements Serializable {

    private static final long serialVersionUID = 7461252604378704848L;
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @ManyToOne
    private Post post;

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
