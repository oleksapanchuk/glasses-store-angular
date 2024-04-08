import { Component } from '@angular/core';
import { ProductItemComponent } from "../product-item/product-item.component";
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../common/product';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

interface PageEvent {
    first: number;
    rows: number;
    page: number;
    pageCount: number;
}

@Component({
    selector: 'app-product-list',
    standalone: true,
    templateUrl: './product-list.component.html',
    styleUrl: './product-list.component.css',
    imports: [ProductItemComponent, PaginatorModule, CommonModule, HttpClientModule]
})
export class ProductListComponent {

    // new properties for pagination
    first: number | undefined = 0;
    rows: number | undefined = 12;

    thePageNumber: number = 0;
    thePageSize: number = 12;
    theTotalElements: number = 0;

    products: Product[] = [];
    currentCategoryId: number = 1;
    previousCategoryId: number = 1;
    currentCategoryName: string = "";
    previousKeyword: string = "";
    searchMode: boolean = false;



    constructor(
        private productService: ProductService,
        private route: ActivatedRoute
    ) {

    }

    ngOnInit(): void {
        this.route.paramMap.subscribe(() => {
            this.listProducts();
        })
    }

    listProducts() {

        // this.searchMode = this.route.snapshot.paramMap.has('keyword');

        this.handelListProducts();

    }



    handelListProducts() {

        // check if "id" param is avalible
        const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

        if (hasCategoryId) {
            // get the "id" param string. convert string to a number using the "+" symbol
            // "!" symbol in the end is the non-null assertion operator. Tells compiler that the object is not null.
            this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;

            // get the "name" param string
            this.currentCategoryName = this.route.snapshot.paramMap.get('name')!;
        }
        else {
            // no category id avalibe ... default to category id 1
            this.currentCategoryId = 1;
            this.currentCategoryName = 'Books';
        }

        //
        // Check if we have a defferent category then previous
        // Note: Angular will reuse a component if it is currently being viewd
        //

        // if we have a different category id then previous
        // then set thePageNumber back to 1
        if (this.previousCategoryId != this.currentCategoryId) {
            this.thePageNumber = 1;
        }

        this.previousCategoryId = this.currentCategoryId;

        console.log(`currentCategoryId=${this.currentCategoryId}, thePageNumber=${this.thePageNumber}`);

        this.productService.getProductList(
            this.thePageNumber,
            this.thePageSize)
            .subscribe(this.processResult());
    }

    processResult() {
        return (data: any) => {
            this.products = data.content;
            this.thePageNumber = data.number;
            this.thePageSize = data.size;
            this.theTotalElements = data.totalElements;

        }
    }

    onPageChange(event: PaginatorState) {
        this.first = event.first;
        this.rows = event.rows;

        this.thePageNumber = this.first! / this.thePageSize;

        this.listProducts();
    }

}
