import { ApiService } from './api.service';
import { Product } from './../models/product';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private readonly api: ApiService) { }
   productUrl= environment.server_url +'/products/'

  getAllProducts(): Observable<Product[]>{
    return this.api.get(this.productUrl);
  }

}
