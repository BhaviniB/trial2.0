import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Cart } from 'src/app/core/models/cart';
import { CartService } from 'src/app/core/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private readonly router: Router, private readonly route: ActivatedRoute, private readonly cartService: CartService,
   ) { }
   cartArray: Cart[];
   totalPrice: number =0;
   cartServiceSubscription: Subscription;

  ngOnInit(): void {
    this.route.data.subscribe(data=>{
      this.cartArray = data.cartList
      sessionStorage.setItem('itemsInCart', this.cartArray.length.toString());

    })
    this.calculateTotalPrice()
  }

  calculateTotalPrice(){
    this.cartService.allCartItems().
    subscribe(items =>{
    debugger

      console.log('items',items)
       items.forEach(item => {
         debugger
      this.totalPrice += Number(item.quantity * item.product.mrp);
    }
    )
  });
  }

  updateItemQuantity(e, product){
    let cartItem= this.cartArray.find((item) => {
      return (
        item.product.id === product.id
      );
    });
    cartItem.quantity = Number(e.target.value);
    this.cartService.updateCartItem(cartItem).subscribe(data => {
      console.log('data...',this.cartArray)
      this.totalPrice=0;
      this.calculateTotalPrice();
    }, error => {
      console.log('Error while updating the item\'s quantity in cart', error);
    });

  }

  deleteItem(id){
    let cartItemToBeRemoved= this.cartArray.find((item) => {
      return (
        item.id === id
      );
    });
    this.cartService.deleteCartItem(id).subscribe(val => {
      this.cartService.allCartItems().subscribe(data => {
        this.cartArray = data;
        sessionStorage.setItem('itemsInCart', this.cartArray.length.toString());
      });
      this.totalPrice -= (Number(cartItemToBeRemoved.quantity) * Number(cartItemToBeRemoved.product.mrp));
    }, error => {
      console.log('Error deleting item from cart', error);
    });

  }

}
