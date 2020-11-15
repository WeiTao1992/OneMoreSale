package com.OneMoreSale.OneMoreSaleServer.api;

import com.OneMoreSale.OneMoreSaleServer.service.AWSS3Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;


@RestController
@RequestMapping(value = "/s3")
public class AWSS3Api {
    @Autowired
    private AWSS3Service service;

    @PostMapping(value= "/upload")
    public String uploadFile(@RequestPart(value= "file") final MultipartFile multipartFile) {
        return service.uploadFile(multipartFile);
    }

    @PostMapping(value = "/delete")
    public void deleteFile(@RequestPart(value = "url") String fileUrl) {
        service.deleteFile(fileUrl);
    }


}
