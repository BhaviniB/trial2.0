import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Resolve } from '@angular/router';
import { Product } from 'src/app/core/models/product';
import { CartService } from 'src/app/core/services/cart.service';
import { Cart } from 'src/app/core/models/cart';

@Injectable({
  providedIn: 'root'
})
export class CartResolver implements Resolve<Cart[]> {
  constructor(private readonly cartService: CartService) { }
  resolve(): Observable<Cart[]>{
      return this.cartService.allCartItems()
  }


}
