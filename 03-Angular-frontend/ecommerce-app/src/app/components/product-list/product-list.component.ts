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
  currentCategoryId: number;

  constructor(private productService: ProductService,
              private route: ActivatedRoute) { } // The route that loaded the component

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => { // subscribe to route params to be able to use them
      this.listProducts();
    });
    
  }

  listProducts(){
    const hasCategotyId: boolean = this.route.snapshot.paramMap.has('id');
    
    if(hasCategotyId){
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id');
    } else {
      // if category id not available , set default to id: 1
      this.currentCategoryId = 1;
    }
    
    this.productService.getProductList(this.currentCategoryId).subscribe(
      data => {
        this.products = data;
      }
    )

  } 

}
