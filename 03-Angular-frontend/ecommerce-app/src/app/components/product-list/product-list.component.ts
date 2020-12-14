import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[];
  currentCategoryId: number = 1;
  previousCategoryId: number = 1;
  searchMode: boolean = false;

  // new properties for pagination
  thePageNumber: number = 1;
  thePageSize: number = 12;
  theTotalElements: number = 0;
  previousKeyword: string = null;

  constructor(private productService: ProductService,
              private route: ActivatedRoute) { } // The route that loaded the component

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => { // subscribe to route params to be able to use them
      this.listProducts();
    });
    
  }

  listProducts(){
    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if(this.searchMode){
      this.handleSearchProducts();
    } else {
      this.handleListProducts();
    }
    

  } 

  handleSearchProducts(){

    const theKeyword: string = this.route.snapshot.paramMap.get('keyword');

    // if search done with new keyword, reset pageNumber to 1
    if(this.previousKeyword != theKeyword){
      this.thePageNumber = 1;
    }

    this.previousKeyword = theKeyword;

    this.productService.searchProductListPaginate(this.thePageNumber-1,
                                                  this.thePageSize,
                                                  theKeyword)
                                                  .subscribe(this.processResult()); 

  }

  handleListProducts(){
    const hasCategotyId: boolean = this.route.snapshot.paramMap.has('id');
    
    if(hasCategotyId){
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id');
    } else {
      // if category id not available , set default to id: 1
      this.currentCategoryId = 1;
    }

    // Check if we have a different category than previous
    // Note: Angular will reuse a component if it is currently being viewed
    //

    // if we have a different category id than previous
    // then set thePageNumber back to 1
    if (this.previousCategoryId != this.currentCategoryId) {
      this.thePageNumber = 1;
    }

    this.previousCategoryId = this.currentCategoryId;

    console.log(`currentCategoryId=${this.currentCategoryId}, thePageNumber=${this.thePageNumber}`);

    // get the products for the given category id
    // Note: Angular:1-based-page-indexing vs Spring:0-based-page-indexing
    this.productService.getProductListPaginate(this.thePageNumber - 1, 
                                              this.thePageSize,
                                              this.currentCategoryId)
                                              .subscribe(this.processResult());

  }
  
  processResult() {
    return data => {
      this.products = data._embedded.products;
      this.thePageNumber = data.page.number + 1; //0-based -> 1-based indexing 
      this.thePageSize = data.page.size;
      this.theTotalElements = data.page.totalElements;
    };
  }

  addToCart(theProduct:Product){
    console.log('Added to Cart:' + theProduct.name + ' ' + theProduct.unitPrice);
  }

}
