import {Component} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {faHeart} from "@fortawesome/free-regular-svg-icons";
import {faFacebook} from "@fortawesome/free-brands-svg-icons";
import {faTelegram} from "@fortawesome/free-brands-svg-icons/faTelegram";
import {Product} from "../../common/product";
import {ProductService} from "../../services/product.service";
import {CartService} from "../../services/cart.service";

@Component({
  selector: 'app-product-details',
  standalone: true,
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
  imports: [RouterLink, CommonModule, FontAwesomeModule, NgOptimizedImage]
})
export class ProductDetailsComponent {

  product!: Product;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(
      () => {
        this.handleProductDetails();
      }
    );
  }

  handleProductDetails() {

    // get the "id" param string. convert string to a number using the "+" symbol
    const theProductId: number = +this.route.snapshot.paramMap.get('id')!;

    console.log(theProductId);

    this.productService.getProduct(theProductId).subscribe(
      data => {
        this.product = data;
      }
    );

  }

  protected readonly faHeart = faHeart;
  protected readonly faFacebook = faFacebook;
  protected readonly faTelegram = faTelegram;
}
