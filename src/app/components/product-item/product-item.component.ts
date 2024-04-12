import {Component, Input, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {faCartPlus, faPenToSquare} from '@fortawesome/free-solid-svg-icons';
import {RouterLink} from '@angular/router';
import {Product} from '../../common/product';
import {CartService} from '../../services/cart.service';
import {CartItem} from '../../common/cart-item';
import {faHeart} from "@fortawesome/free-regular-svg-icons";
import {StorageService} from "../../services/storage.service";

@Component({
  selector: 'app-product-item',
  standalone: true,
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.css',
  imports: [FontAwesomeModule, CommonModule, RouterLink]
})
export class ProductItemComponent implements OnInit {

  @Input() product!: Product;

  role!: string;

  constructor(
    public cartService: CartService,
    private storageService: StorageService,
  ) {

  }

  ngOnInit(): void {
    this.role = this.storageService.getRole();
  }

  addToCart() {
    const theCartItem = new CartItem(this.product!);
    this.cartService.addToCart(theCartItem);
  }

  protected readonly faCartPlus = faCartPlus;
  protected readonly faHeart = faHeart;
  protected readonly faPenToSquare = faPenToSquare;
}
