import { ProductListComponent } from './components/product-list/product-list.component';
import { HomeComponent } from './components/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsResolver } from './resolvers/products.resolver';


const routes: Routes = [
  {path: '', component: HomeComponent, children: [
    {path: '', component: ProductListComponent, resolve: { productList: ProductsResolver }},
  ]},
  {
    path: 'cart',
    loadChildren: () => import('../cart/cart.module').then(m => m.CartModule)
  },
  {path: '/', redirectTo: '', pathMatch: 'full'}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
