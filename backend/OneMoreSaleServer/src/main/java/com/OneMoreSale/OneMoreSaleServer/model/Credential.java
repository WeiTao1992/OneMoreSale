package com.OneMoreSale.OneMoreSaleServer.model;

import java.io.Serializable;

public class Credential implements Serializable {

    private static final long serialVersionUID = 866012328514887954L;
    private String email;
    private String password;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
