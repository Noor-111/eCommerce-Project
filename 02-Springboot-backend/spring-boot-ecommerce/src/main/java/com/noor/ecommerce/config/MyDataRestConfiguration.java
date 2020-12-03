package com.noor.ecommerce.config;

import com.noor.ecommerce.entity.Product;
import com.noor.ecommerce.entity.ProductCategory;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

@Configuration
public class MyDataRestConfiguration implements RepositoryRestConfigurer {

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
        HttpMethod[] unSupportedHttpMethods = {HttpMethod.POST, HttpMethod.PUT, HttpMethod.DELETE};

        // Disable Http methods for Product: POST, PUT, DELETE
        config.getExposureConfiguration()
                .forDomainType(Product.class)
                .withItemExposure((metdata, httpMethods) -> httpMethods.disable(unSupportedHttpMethods))
                .withCollectionExposure((metdata, httpMethods) -> httpMethods.disable(unSupportedHttpMethods));

        // Disable Http methods for ProductCategory: POST, PUT, DELETE
        config.getExposureConfiguration()
                .forDomainType(ProductCategory.class)
                .withItemExposure((metdata, httpMethods) -> httpMethods.disable(unSupportedHttpMethods))
                .withCollectionExposure((metdata, httpMethods) -> httpMethods.disable(unSupportedHttpMethods));
    }
}
