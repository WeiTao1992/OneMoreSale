package com.OneMoreSale.OneMoreSaleServer;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.orm.hibernate5.LocalSessionFactoryBean;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import javax.sql.DataSource;
import java.util.Properties;

@Configuration
@EnableWebMvc
public class ApplicationConfig {
    private static final Logger log = LoggerFactory.getLogger(OneMoreSaleServerApplication.class);
    public final String dataSourceUrl = "jdbc:mysql://laiproject-instance.cu1ldqvc3ste.us-west-1.rds.amazonaws.com:3306/laiproject";

    @Bean(name = "sessionFactory")
    public LocalSessionFactoryBean sessionFactory() {
        LocalSessionFactoryBean sessionFactory = new LocalSessionFactoryBean();
        sessionFactory.setDataSource(dataSource());
        //This is a way for setting only one class to sessionFactory
//        sessionFactory.setAnnotatedClasses(new Class[]{Greetings.class});

        // This is one way to scan entire package
        sessionFactory.setPackagesToScan("com.OneMoreSale.OneMoreSaleServer.model");
        sessionFactory.setHibernateProperties(hibernateProperties());
        return sessionFactory;
    }

    @Bean(name = "dataSource")
    public DataSource dataSource() {
        DriverManagerDataSource dataSource = new DriverManagerDataSource();
        dataSource.setDriverClassName("com.mysql.cj.jdbc.Driver");

        dataSource.setUrl(dataSourceUrl);
        dataSource.setUsername("admin");
        dataSource.setPassword("Stw%y!xU");

        return dataSource;
    }


    private final Properties hibernateProperties() {
        Properties hibernateProperties = new Properties();
        hibernateProperties.setProperty("hibernate.hbm2ddl.auto", "update");
        hibernateProperties.setProperty("hibernate.dialect", "org.hibernate.dialect.MySQL5Dialect");
        return hibernateProperties;
    }
}
