import {Routes} from '@angular/router';
import {HomePageComponent} from './components/home-page/home-page.component';
import {AboutComponent} from './components/about/about.component';
import {ShopPageComponent} from './components/shop-page/shop-page.component';
import {ContactPageComponent} from './components/contact-page/contact-page.component';
import {ErrorPageComponent} from './components/error-page/error-page.component';
import {SignInComponent} from './components/auth-components/sign-in/sign-in.component';
import {SignUpComponent} from './components/auth-components/sign-up/sign-up.component';
import {ForgotPasswordComponent} from './components/auth-components/forgot-password/forgot-password.component';
import {ProductDetailsComponent} from './components/product-details/product-details.component';
import {UserPageComponent} from "./components/user-page-components/user-page/user-page.component";
import {OrderPageComponent} from "./components/order-components/order-page/order-page.component";

export const routes: Routes = [

  {path: 'user-profile', component: UserPageComponent},
  {path: 'order', component: OrderPageComponent},
  {path: 'shop', component: ShopPageComponent},
  {path: 'shop/products/:id', component: ProductDetailsComponent},
  {path: 'shop/:keyword', component: ShopPageComponent},
  {path: 'sign-in', component: SignInComponent},
  {path: 'sign-up', component: SignUpComponent},
  {path: 'forgot-password', component: ForgotPasswordComponent},
  {path: 'contact', component: ContactPageComponent},
  {path: 'about', component: AboutComponent},
  {path: 'home', component: HomePageComponent},
  {path: 'error', component: ErrorPageComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', redirectTo: '/home', pathMatch: 'full'} // This is generic wildcard. It will match on anything that didn't match above routes.
];
