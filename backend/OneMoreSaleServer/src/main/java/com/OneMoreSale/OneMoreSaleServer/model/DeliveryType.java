package com.OneMoreSale.OneMoreSaleServer.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "delivery_type")
public class DeliveryType implements Serializable {


    private static final long serialVersionUID = 6291084930954657897L;


    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @ManyToOne
    @JsonIgnore
    private Post post;

    private String deliveryType;

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


    public String getDeliveryType() {
        return deliveryType;
    }

    public void setDeliveryType(String deliveryType) {
        this.deliveryType = deliveryType;
    }
}
