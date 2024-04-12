import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { CartItem } from '../../../common/cart-item';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.css',
  imports: [CommonModule, FontAwesomeModule]
})
export class CartItemComponent {

  faTrash = faTrashCan;

  @Input() cartItem: CartItem | undefined;

  constructor(
    private cartService: CartService
  ) { }

  incrementQuantity() {
    this.cartService.addToCart(this.cartItem!);
  }

  decrementQuantity() {
    this.cartService.decrementQuantity(this.cartItem!);
  }

  remove() {
    this.cartService.remove(this.cartItem!);
  }
}
