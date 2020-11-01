package com.OneMoreSale.OneMoreSaleServer.model;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "post_image")
public class PostImage implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @ManyToOne
    private Post post;

    private String postImage;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getPostImage() {
        return postImage;
    }

    public void setPostImage(String postImage) {
        this.postImage = postImage;
    }
}
