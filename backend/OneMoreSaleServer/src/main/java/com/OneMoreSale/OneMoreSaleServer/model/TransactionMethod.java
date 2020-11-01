package com.OneMoreSale.OneMoreSaleServer.model;



import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "transaction_method")
public class TransactionMethod implements Serializable {

    private static final long serialVersionUID = -9204141466696256504L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @ManyToOne
    private Post post;

    private String transactionMethod;

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

    public String getTransactionMethod() {
        return transactionMethod;
    }

    public void setTransactionMethod(String transactionMethod) {
        this.transactionMethod = transactionMethod;
    }
}
