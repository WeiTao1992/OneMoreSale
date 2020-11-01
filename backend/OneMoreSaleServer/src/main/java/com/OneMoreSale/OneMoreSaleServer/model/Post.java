package com.OneMoreSale.OneMoreSaleServer.model;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Entity
@Table(name = "post")
public class Post implements Serializable {

    private static final long serialVersionUID = -4863991432596305404L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int postId;
    private int postUserId;
    private Date postDate;
    private String postTitle;
    private String postCategory;
    private String postCondition;
    private String postDescription;
    private String postOwner;
    private String postStatus;
    private int postPrice;
    private String postEmail;
    private String postPhone;
    private String postZipcode;
    private String postAddress;

    @ManyToOne
    private User user;
}