package com.OneMoreSale.OneMoreSaleServer.Dao;

import org.springframework.web.multipart.MultipartFile;

public interface AWSS3Dao {
    String uploadFile(MultipartFile multipartFile);
    void deleteFile(String fileUrl);
}
