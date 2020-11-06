package com.OneMoreSale.OneMoreSaleServer.MonkeyLearn;

import com.OneMoreSale.OneMoreSaleServer.model.Keyword;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class MonkeyLearnResponse {

    @JsonProperty("extractions")
    public List<Keyword> keywords;
}
