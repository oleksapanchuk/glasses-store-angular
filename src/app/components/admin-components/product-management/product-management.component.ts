import {Component, OnInit} from '@angular/core';
import {RouteBannerComponent} from "../../utils/route-banner/route-banner.component";
import {FormsModule} from "@angular/forms";
import {RouterLink} from "@angular/router";
import {Product} from "../../../common/product";
import {NgForOf, NgIf} from "@angular/common";
import {AdminService} from "../../../services/admin.service";
import {ProductService} from "../../../services/product.service";

@Component({
  selector: 'app-product-management',
  standalone: true,
  imports: [
    RouteBannerComponent,
    FormsModule,
    RouterLink,
    NgIf,
    NgForOf
  ],
  templateUrl: './product-management.component.html',
  styleUrl: './product-management.component.css'
})
export class ProductManagementComponent implements OnInit {

  inputValue!: string;
  products: Product[] = [];

  constructor(
    private productService: ProductService,
    private adminService: AdminService,
  ) {
  }

  ngOnInit() {
  }


  findProductById(inputValue: string) {
    this.products = [];
    if (inputValue === "") return;

    this.productService.getProduct(Number(inputValue)).subscribe(data => {
      this.products.push(data);
    });

    console.log(inputValue)
  }


  findProductByName(inputValue: string) {
    this.products = [];
    if (inputValue === "") return;

    this.productService.searchProducts(0, 8, inputValue).subscribe(data => {
      this.products = data.content;
    });

    console.log(inputValue)
  }
}
