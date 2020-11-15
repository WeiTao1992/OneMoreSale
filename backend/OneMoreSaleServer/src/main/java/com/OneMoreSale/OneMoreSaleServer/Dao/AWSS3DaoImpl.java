package com.OneMoreSale.OneMoreSaleServer.Dao;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.PutObjectRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.time.LocalDateTime;

@Repository
public class AWSS3DaoImpl implements AWSS3Dao{
    private static final Logger LOGGER = LoggerFactory.getLogger(AWSS3DaoImpl.class);

    @Autowired
    private AmazonS3 amazonS3;
    @Value("${aws.s3.bucket}")
    private String bucketName;
    @Value("${aws.s3.endpointUrl}")
    private String endpointUrl;

    @Override
    // @Async annotation ensures that the method is executed in a different background thread
    // but not consume the main thread.
    @Async

    public String uploadFile(final MultipartFile multipartFile) {
        LOGGER.info("File upload in progress.");
        String fileUrl = "";
        try {
            final File file = convertMultiPartFileToFile(multipartFile);
            fileUrl = uploadFileToS3Bucket(bucketName, file);
            LOGGER.info("File upload is completed.");
            file.delete();  // To remove the file locally created in the project folder.
        } catch (final AmazonServiceException ex) {
            LOGGER.info("File upload is failed.");
            LOGGER.error("Error= {} while uploading file.", ex.getMessage());
        }
        return fileUrl;
    }
    // convert multiPartFile to File
    private File convertMultiPartFileToFile(final MultipartFile multipartFile) {
        final File file = new File(multipartFile.getOriginalFilename());
        try (final FileOutputStream outputStream = new FileOutputStream(file)) {
            outputStream.write(multipartFile.getBytes());
        } catch (final IOException ex) {
            LOGGER.error("Error converting the multi-part file to file = ", ex.getMessage());
        }
        return file;
    }


    private String uploadFileToS3Bucket(final String bucketName, final File file) {
        final String uniqueFileName = LocalDateTime.now() + "_" + file.getName();//add local time to the fileName to make it unique
        String fileUrl = endpointUrl + "/" + uniqueFileName;
        LOGGER.info("Uploading file with name = " + uniqueFileName);
        LOGGER.info("File url = " + fileUrl);
        final PutObjectRequest putObjectRequest = new PutObjectRequest(bucketName, uniqueFileName, file);
        amazonS3.putObject(putObjectRequest.withCannedAcl(CannedAccessControlList.PublicRead));//allow public read of the image
        return fileUrl;
    }
    @Override
    @Async
    public void deleteFile(String fileUrl) {
        String fileName = fileUrl.substring(fileUrl.lastIndexOf("/") + 1);
        amazonS3.deleteObject(new DeleteObjectRequest(bucketName, fileName));
        LOGGER.info(fileName + " deleted");
    }

}
