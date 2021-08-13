import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartResolver } from '../home/resolvers/cart.resolver';
import { CartComponent } from './cart/cart.component';

const routes: Routes = [
  {path: '', component: CartComponent, resolve: {cartList: CartResolver}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartRoutingModule { }
