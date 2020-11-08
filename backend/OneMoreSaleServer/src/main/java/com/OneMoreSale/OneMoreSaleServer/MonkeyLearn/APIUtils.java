package com.OneMoreSale.OneMoreSaleServer.MonkeyLearn;

import com.OneMoreSale.OneMoreSaleServer.model.Keyword;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class APIUtils {
    private static final String url = "https://api.monkeylearn.com/v3/extractors/ex_YCya9nrn/extract/";
    private static final String Authorization = "5a0e79decec05ff4bffe8509abca9449ccbf99d2";

    public List<Keyword> getAllKeywords(String description){
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        ObjectMapper mapper = new ObjectMapper();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", "Token " + Authorization);
        Body body = new Body(Arrays.asList(description));
        String jsonBody;
        try {
            jsonBody = mapper.writeValueAsString(body);
        } catch (JsonProcessingException e) {
            return new ArrayList<>();
        }
        HttpEntity<String> request = new HttpEntity<String>(jsonBody, headers);
        MonkeyLearnResponse[] result = restTemplate.postForObject(APIUtils.url, request, MonkeyLearnResponse[].class);


        return result == null? new ArrayList<>() : result[0].keywords;
    }

}
