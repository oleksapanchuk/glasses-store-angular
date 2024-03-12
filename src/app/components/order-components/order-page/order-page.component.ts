import {Component} from '@angular/core';
import {RouteBannerComponent} from "../../route-banner/route-banner.component";
import {CartItemComponent} from "../../cart-components/cart-item/cart-item.component";
import {NgForOf} from "@angular/common";
import {CartItem} from "../../../common/cart-item";
import {CartService} from "../../../services/cart.service";

@Component({
  selector: 'app-order-page',
  standalone: true,
  imports: [
    RouteBannerComponent,
    CartItemComponent,
    NgForOf
  ],
  templateUrl: './order-page.component.html',
  styleUrl: './order-page.component.css'
})
export class OrderPageComponent {

  cartItems!: CartItem[];
  totalPrice: number = 0;
  totalQuantity: number = 0;

  constructor(private cartService: CartService) {
  }

  ngOnInit(): void {
    this.listCartDetails();
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
}
