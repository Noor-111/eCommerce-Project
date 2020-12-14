import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  //To avoid calling on null when like product.imageUrl when product is not yet initialized
  // We could also use the safe navigation operator like {{product?.imageUrl}} in template 
  //file to avoid call on null
  product: Product = new Product();

  constructor(private productService: ProductService,
              private cartService: CartService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleProductDetails();
    });
  }
  handleProductDetails() {
    const theProductId:number = +this.route.snapshot.paramMap.get('id');

    this.productService.getProduct(theProductId).subscribe(
      data => {
        this.product = data;
      });
    
  }

  addToCart(theProduct:Product){
    console.log('Added to Cart:' + theProduct.name + ' ' + theProduct.unitPrice);

    const theCartItem: CartItem = new CartItem(theProduct);

    this.cartService.addToCart(theCartItem);
  }

}
