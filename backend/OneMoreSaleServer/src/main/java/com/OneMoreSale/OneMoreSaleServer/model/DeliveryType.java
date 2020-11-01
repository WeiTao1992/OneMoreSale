package com.OneMoreSale.OneMoreSaleServer.model;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "delivery_type")
public class DeliveryType implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @ManyToOne
    private Post post;

    private String deliveryType;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getDeliveryType() {
        return deliveryType;
    }

    public void setDeliveryType(String deliveryType) {
        this.deliveryType = deliveryType;
    }
}
