package com.OneMoreSale.OneMoreSaleServer.service;

import com.OneMoreSale.OneMoreSaleServer.Dao.AWSS3DaoImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class AWSS3Service {
    @Autowired
    private AWSS3DaoImpl awsS3DaoImpl;

    public String uploadFile(final MultipartFile multipartFile) {
        return awsS3DaoImpl.uploadFile(multipartFile);
    }

    public void deleteFile(String fileUrl) {
        awsS3DaoImpl.deleteFile(fileUrl);
    }
}
