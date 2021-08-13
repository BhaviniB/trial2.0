import { CartService } from './../../../core/services/cart.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/core/models/product';
import { Cart } from 'src/app/core/models/cart';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private cartService: CartService) { }
  list: Product[];
  cartItems: Cart[];
  ngOnInit(): void {
    this.route.data.subscribe(data=> 
      {
        this.list =data.productList
      console.log(this.list)
      })
      this.cartService.allCartItems().subscribe((items) => {
        this.cartItems = items;
      });
  }
  toCartScreen(id){
    if(this.cartItems.length===0){
      this.addToCart(id);
    this.router.navigateByUrl('/cart');

    }
    else{
    let fetchedItem = this.cartItems.find(item=>item.product.id==id);
    if(fetchedItem!==null && fetchedItem!==undefined){
      debugger;
      fetchedItem.quantity = Number(fetchedItem.quantity) + Number('1')
      this.updateCart(fetchedItem);
    }
    else{
      this.addToCart(id)
    }
    this.router.navigateByUrl('/cart');
    }
  }

  // addToCart(id){
  //   let product = this.list.find(p=>p.id==id)
  //     this.cartService.addToCart(new Cart(  product,
  //        1, product.id)).subscribe(() => {
  //     });
  // }
  addToCart(id): void {
    let product= this.list.find((item) => {
      return (
        item.id === id
      );
    });
    this.cartService
      .addToCart(new Cart(  product,
        1, product.id)).subscribe(
        (data) => {},
        (error) => {
          console.log('Error while adding item to Cart', error);
        }
      );
  }
  updateCart(cartItem){
    this.cartService.updateCartItem(cartItem).subscribe(data=>{})
  }

}
