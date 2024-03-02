import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {faCartPlus} from '@fortawesome/free-solid-svg-icons';
import {RouterLink} from '@angular/router';
import {Product} from '../../common/product';
import {RatingStarsComponent} from "../rating-stars/rating-stars.component";
import {CartService} from '../../services/cart.service';
import {CartItem} from '../../common/cart-item';
import {faHeart} from "@fortawesome/free-regular-svg-icons";

@Component({
  selector: 'app-product-item',
  standalone: true,
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.css',
  imports: [FontAwesomeModule, CommonModule, RouterLink, RatingStarsComponent]
})
export class ProductItemComponent {

  @Input() product!: Product;

  constructor(
    public cartService: CartService
  ) {

  }

  ngOnInit(): void {

  }

  addToCart() {

    console.log(`Adding to cart: ${this.product.name}, unitPrice=${this.product.price}`);

    const theCartItem = new CartItem(this.product!);
    this.cartService.addToCart(theCartItem);

  }

  protected readonly faCartPlus = faCartPlus;

  protected readonly faHeart = faHeart;
}
