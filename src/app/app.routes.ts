import {Routes} from '@angular/router';
import {HomePageComponent} from './components/home-page/home-page.component';
import {AboutComponent} from './components/about/about.component';
import {ShopPageComponent} from './components/shop-page/shop-page.component';
import {ContactPageComponent} from './components/contact-page/contact-page.component';
import {ErrorPageComponent} from './components/utils/error-page/error-page.component';
import {SignInComponent} from './components/auth-components/sign-in/sign-in.component';
import {SignUpComponent} from './components/auth-components/sign-up/sign-up.component';
import {ForgotPasswordComponent} from './components/auth-components/forgot-password/forgot-password.component';
import {ProductDetailsComponent} from './components/product-details/product-details.component';
import {UserPageComponent} from "./components/user-page-components/user-page/user-page.component";
import {OrderPageComponent} from "./components/order-components/order-page/order-page.component";
import {OrderHistoryComponent} from "./components/order-components/order-history/order-history.component";
import {OrderDetailsComponent} from "./components/order-components/order-details/order-details.component";
import {SavedAddressesComponent} from "./components/account-components/saved-addresses/saved-addresses.component";
import {
  ProductManagementComponent
} from "./components/admin-components/product-management/product-management.component";
import {AuthGuard} from "./config/auth.gard";
import {OrderManagementComponent} from "./components/admin-components/order-management/order-management.component";
import {ProductWorkshopComponent} from "./components/admin-components/product-workshop/product-workshop.component";

export const routes: Routes = [

  {path: 'admin/product-management', component: ProductManagementComponent, canActivate: [AuthGuard]},
  {path: 'admin/product-workshop', component: ProductWorkshopComponent, canActivate: [AuthGuard]},
  {path: 'admin/order-management', component: OrderManagementComponent, canActivate: [AuthGuard]},

  {path: 'account', component: UserPageComponent},
  {path: 'account/order-history', component: OrderHistoryComponent},
  {path: 'account/order-history/order/:id', component: OrderDetailsComponent},
  {path: 'account/saved-addresses', component: SavedAddressesComponent},

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
