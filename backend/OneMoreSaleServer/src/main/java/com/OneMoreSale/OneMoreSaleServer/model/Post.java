package com.OneMoreSale.OneMoreSaleServer.model;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;


import javax.persistence.*;
import java.io.Serializable;
import java.sql.Timestamp;
import java.util.List;

@Entity
@Table(name = "post")
public class Post implements Serializable {
    private static final long serialVersionUID = 2022381782543163172L;
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int postId;

    @ManyToOne
    @JsonIgnore
    private User user;

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL)
    @LazyCollection(LazyCollectionOption.FALSE)
    private List<DeliveryType> deliveryType;

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL)
    @LazyCollection(LazyCollectionOption.FALSE)
    private List<TransactionMethod> transactionMethod;

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL)
    @LazyCollection(LazyCollectionOption.FALSE)
    private List<Keyword> keyword;

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL)
    @LazyCollection(LazyCollectionOption.FALSE)
    private List<PostImage> postImage;

    private Timestamp postDate;
    private String postTitle;
    private String postCategory;
    private String postCondition;
    @Column(length = 600)
    private String postDescription;
    private String postOwner;
    private String postStatus;
    private double postPrice;
    private String postEmail;
    private String postPhone;
    private String postZipcode;
    private String postAddress;


    public int getPostId() {
        return postId;
    }

    public void setPostId(int postId) {
        this.postId = postId;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public List<DeliveryType> getDeliveryType() {
        return deliveryType;
    }

    public void setDeliveryType(List<DeliveryType> deliveryType) {
        this.deliveryType = deliveryType;
    }

    public List<TransactionMethod> getTransactionMethod() {
        return transactionMethod;
    }

    public void setTransactionMethod(List<TransactionMethod> transactionMethod) {
        this.transactionMethod = transactionMethod;
    }

    public List<Keyword> getKeyword() {
        return keyword;
    }

    public void setKeyword(List<Keyword> keyword) {
        this.keyword = keyword;
    }

    public List<PostImage> getPostImage() {
        return postImage;
    }

    public void setPostImage(List<PostImage> postImage) {
        this.postImage = postImage;
    }

    public Timestamp getPostDate() {
        return postDate;
    }

    public void setPostDate(Timestamp postDate) {
        this.postDate = postDate;
    }

    public String getPostTitle() {
        return postTitle;
    }

    public void setPostTitle(String postTitle) {
        this.postTitle = postTitle;
    }

    public String getPostCategory() {
        return postCategory;
    }

    public void setPostCategory(String postCategory) {
        this.postCategory = postCategory;
    }

    public String getPostCondition() {
        return postCondition;
    }

    public void setPostCondition(String postCondition) {
        this.postCondition = postCondition;
    }

    public String getPostDescription() {
        return postDescription;
    }

    public void setPostDescription(String postDescription) {
        this.postDescription = postDescription;
    }

    public String getPostOwner() {
        return postOwner;
    }

    public void setPostOwner(String postOwner) {
        this.postOwner = postOwner;
    }

    public String getPostStatus() {
        return postStatus;
    }

    public void setPostStatus(String postStatus) {
        this.postStatus = postStatus;
    }

    public double getPostPrice() {
        return postPrice;
    }

    public void setPostPrice(double postPrice) {
        this.postPrice = postPrice;
    }

    public String getPostEmail() {
        return postEmail;
    }

    public void setPostEmail(String postEmail) {
        this.postEmail = postEmail;
    }

    public String getPostPhone() {
        return postPhone;
    }

    public void setPostPhone(String postPhone) {
        this.postPhone = postPhone;
    }

    public String getPostZipcode() {
        return postZipcode;
    }

    public void setPostZipcode(String postZipcode) {
        this.postZipcode = postZipcode;
    }

    public String getPostAddress() {
        return postAddress;
    }

    public void setPostAddress(String postAddress) {
        this.postAddress = postAddress;
    }
}
