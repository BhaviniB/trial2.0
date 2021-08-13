import { ProductService } from 'src/app/core/services/product.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Resolve } from '@angular/router';
import { Product } from 'src/app/core/models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsResolver implements Resolve<Product[]> {
  constructor(private readonly productService: ProductService) { }
  resolve(): Observable<Product[]>{
      return this.productService.getAllProducts()
  }


}
