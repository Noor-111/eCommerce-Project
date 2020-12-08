package com.noor.ecommerce.config;

import com.noor.ecommerce.entity.Product;
import com.noor.ecommerce.entity.ProductCategory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import javax.persistence.EntityManager;
import java.util.stream.Collectors;

@Configuration
public class MyDataRestConfiguration implements RepositoryRestConfigurer {

    private EntityManager entityManager;

    @Autowired
    public MyDataRestConfiguration(EntityManager theEntityManager){
        this.entityManager = theEntityManager;
    }

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

        // Expose Entity IDs
        exposeEntityIds(config);
    }

    /**
     * Sprint Data REST By default does not expose Entity IDs.
     * Add configuration to expose IDs for all the Entities.
     */
    public void exposeEntityIds(RepositoryRestConfiguration config){

        config.exposeIdsFor(entityManager.getMetamodel()
                .getEntities().stream()
                .map(e -> e.getJavaType())
                .collect(Collectors.toList())
                .toArray(new Class[0]));
    }
}
