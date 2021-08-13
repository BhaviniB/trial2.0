import { Product } from './product';
export class Cart{
    product: Product
    quantity: number
    id: number

constructor(product, quan, id){
    this.product=product;
    this.quantity=quan;
    this.id=id;
}
}