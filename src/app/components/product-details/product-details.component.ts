import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {faHeart} from "@fortawesome/free-regular-svg-icons";
import {faFacebook} from "@fortawesome/free-brands-svg-icons";
import {faTelegram} from "@fortawesome/free-brands-svg-icons/faTelegram";
import {Product} from "../../common/product";
import {ProductService} from "../../services/product.service";
import {CartService} from "../../services/cart.service";
import {ProductCategoryService} from "../../services/product-category.service";
import {ProductCategory} from "../../common/product-category";
import {StorageService} from "../../services/storage.service";
import {CartItem} from "../../common/cart-item";

@Component({
  selector: 'app-product-details',
  standalone: true,
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
  imports: [RouterLink, CommonModule, FontAwesomeModule, NgOptimizedImage]
})
export class ProductDetailsComponent implements OnInit {

  product!: Product;
  allCategories: ProductCategory[] | undefined = [];
  productCategories: ProductCategory[] = [];

  role!: string;

  constructor(
    private productService: ProductService,
    private categoryService: ProductCategoryService,
    private storageService: StorageService,
    private cartService: CartService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {

    this.role = this.storageService.getRole();

    this.loadCategoriesAndHandleProductDetails();

    this.categoryService.getProductCategories().subscribe(
      data => {
        this.allCategories = data
      }
    );

  }

  addProductToCart() {
    this.cartService.addToCart(new CartItem(this.product!));
  }

  async loadCategoriesAndHandleProductDetails() {
    try {
      this.allCategories = await this.categoryService.getProductCategories().toPromise();
      this.route.paramMap.subscribe(
        () => {
          this.handleProductDetails();
        }
      );
    } catch (error) {
      console.error('Error:', error);
    }
  }

  handleProductDetails() {
    const theProductId: number = +this.route.snapshot.paramMap.get('id')!;
    this.productService.getProduct(theProductId).subscribe(
      data => {
        this.product = data;
        this.loadProductCategories(this.product.categoryIds);
      }
    );
  }

  private loadProductCategories(ids: number[]) {
    for (let i = 0; i < this.allCategories!.length; i++) {
      if (ids.includes(this.allCategories![i].id)) {
        this.productCategories.push(this.allCategories![i]);
      }
    }
  }

  protected readonly faHeart = faHeart;
  protected readonly faFacebook = faFacebook;
  protected readonly faTelegram = faTelegram;
}
