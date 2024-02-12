import { Component } from '@angular/core';
import { ProductItemComponent } from "../product-item/product-item.component";

@Component({
    selector: 'app-product-list',
    standalone: true,
    templateUrl: './product-list.component.html',
    styleUrl: './product-list.component.css',
    imports: [ProductItemComponent]
})
export class ProductListComponent {

}
