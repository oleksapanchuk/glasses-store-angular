import {Component} from '@angular/core';
import {CartItemComponent} from '../cart-item/cart-item.component';
import {CartService} from '../../../services/cart.service';

import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {CartItem} from '../../../common/cart-item';
import {CommonModule} from '@angular/common';
import {faXmark} from "@fortawesome/free-solid-svg-icons/faXmark";
import {Router, RouterLink} from "@angular/router";
import {StorageService} from "../../../services/storage.service";


@Component({
  selector: 'app-cart-dialog',
  standalone: true,
  templateUrl: './cart-dialog.component.html',
  styleUrl: './cart-dialog.component.css',
  imports: [FontAwesomeModule, MatDialogModule, MatButtonModule, CartItemComponent, CommonModule, RouterLink]
})
export class CartDialogComponent {

  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  totalQuantity: number = 0;

  constructor(
    private cartService: CartService,
    private storageService: StorageService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.listCartDetails();
  }

  onOrderClick() {
    if (this.storageService.isLoggedIn()) {
      this.router.navigate(['/order']);
    } else {
      this.router.navigate(['/sign-in']);
    }
  }

  listCartDetails() {

    // get a handle to the cart items
    this.cartItems = this.cartService.cartItems;

    // subscribe to the cart totalPrice
    this.cartService.totalPrice.subscribe(
      data => this.totalPrice = data
    );

    // subscribe to the cart totalQuantity
    this.cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    );

    // compute cart total price and quantity
    this.cartService.computeCartTotals();

  }

  protected readonly faXmark = faXmark;
}
