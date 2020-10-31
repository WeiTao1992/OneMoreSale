package com.OneMoreSale.OneMoreSaleServer.model;


import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "greeting")
public class Greetings implements Serializable{

    private static final long serialVersionUID = 8734140534986494039L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column
    private String content;


    public long getId() {
        return id;
    }

    public String getContent() {
        return content;
    }

    public void setId(long id) {
        this.id = id;
    }

    public void setContent(String content) {
        this.content = content;
    }
}