import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import { map } from 'rxjs/operators';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  

  private baseUrl = 'http://localhost:8080/api/products';

  private categoryUrl = 'http://localhost:8080/api/product-category';

  constructor(private httpClient: HttpClient) { }

  /**
   * returns an Observable of Product[]
   * map the JSON data from Spring Data REST to Product array
   */
  getProductList(categoryId: number): Observable<Product[]> {
    const url = `${this.baseUrl}/search/findByCategoryId/?id=${categoryId}`;
    
    return this.getProducts(url);

  }

  getProductListPaginate(thePage: number, 
                         thePageSize: number, 
                         theCategoryId: number): Observable<GetResponseProduct> {

    // need to build URL based on category id, page and size 
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`
                      + `&page=${thePage}&size=${thePageSize}`;

    return this.httpClient.get<GetResponseProduct>(searchUrl);
}

  getProduct(theProductId: number): Observable<Product> {
    
    const getProductUrl =`${this.baseUrl}/${theProductId}`;
    return this.httpClient.get<Product>(getProductUrl);
    
  }

  searchProducts(theKeyword: string): Observable<Product[]>{

    const searchByKeywordUrl = `${this.baseUrl}/search/findByNameContaining/?name=${theKeyword}`;
    
    return this.getProducts(searchByKeywordUrl);

  }

  private getProducts(url:string): Observable<Product[]>{
    return this.httpClient.get<GetResponseProduct>(url).pipe(
      map(response => response._embedded.products)
    );
  }

  /**
   * returns an Observable of ProductCategory[]
   * map the JSON data from Spring Data REST to ProductCategory array
   */
  getProductCategories():Observable<ProductCategory[]> {

    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategory)
    );

  }

  

}

/**
 * This interface will help us unwrap the JSON data from 
 * Spring Data REST response _embedded entry
 */
interface GetResponseProduct{
  _embedded: {
    products: Product[];
  },
  page: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  }
}

interface GetResponseProductCategory{
  _embedded: {
    productCategory: ProductCategory[];
  }
}
