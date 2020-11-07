package com.OneMoreSale.OneMoreSaleServer.model;

import java.io.Serializable;


public class ResponseWrapper implements Serializable {
    private static final long serialVersionUID = 7010789894147658244L;
    private String message;

    public ResponseWrapper(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
