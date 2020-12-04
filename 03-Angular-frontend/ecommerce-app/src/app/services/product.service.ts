import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:8080/api/products';

  constructor(private httpClient: HttpClient) { }

  /**
   * returns an Observable of Product[]
   * map the JSON data from Spring Data REST to Product array
   */
  getProductList(): Observable<Product[]> {
    return this.httpClient.get<GetResponse>(this.baseUrl).pipe(
      map(response => response._embedded.products)
    );

  }

}

/**
 * This interface will help us unwrap the JSON data from 
 * Spring Data REST response _embedded entry
 */
interface GetResponse{
  _embedded: {
    products: Product[];
  }
}
