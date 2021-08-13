import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Cart } from '../models/cart';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private readonly api: ApiService) { }
   cartUrl= environment.server_url +'/cart/'

  allCartItems(): Observable<Cart[]>{
    return this.api.get(this.cartUrl);
  }
  addToCart(cartItem: Cart): Observable<Cart[]>{
    return this.api.post(this.cartUrl, cartItem);
  }

  updateCartItem(cartItem: Cart): Observable<Cart>{
    return this.api.put(this.cartUrl + '/' + cartItem.id, cartItem);
  }


  deleteCartItem(itemId: number): Observable<Cart>{
    return this.api.delete(this.cartUrl + '/' + itemId);
  }

}
