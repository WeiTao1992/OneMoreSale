package com.OneMoreSale.OneMoreSaleServer.model;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "account")
public class Account implements Serializable {

    private static final long serialVersionUID = 7419409544342596930L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int emailId;

    @OneToOne(mappedBy = "account")
    @JsonIgnoreProperties({"account"})
    private User user;

    @Column(unique=true)
    private String email;

    private String firstName;
    private String lastName;
    private String password;
    private boolean status = true;

    public int getEmailId() {
        return emailId;
    }

    public void setEmailId(int emailId) {
        this.emailId = emailId;
    }

    public User getUser() { return user; }

    public void setUser(User user) {
        this.user = user;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public boolean isStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
