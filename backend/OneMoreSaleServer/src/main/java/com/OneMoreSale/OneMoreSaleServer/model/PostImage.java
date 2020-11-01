package com.OneMoreSale.OneMoreSaleServer.model;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "post_image")
public class PostImage implements Serializable {

    private static final long serialVersionUID = 7851737009378303347L;
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

    public Post getPost() {
        return post;
    }

    public void setPost(Post post) {
        this.post = post;
    }

    public String getPostImage() {
        return postImage;
    }

    public void setPostImage(String postImage) {
        this.postImage = postImage;
    }
}
