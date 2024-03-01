import {Component} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {RouteBannerComponent} from '../route-banner/route-banner.component';
import {ProductListComponent} from '../product-list/product-list.component';
import {SpecialDealItemComponent} from '../shop-page-components/special-deal-item/special-deal-item.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {faCaretDown, faMinus, faPlus, faSearch, faTimes} from '@fortawesome/free-solid-svg-icons';
import {SliderModule} from 'primeng/slider';
import {FormsModule} from '@angular/forms';
import {SliderComponent} from "../home-page-components/slider/slider.component";
import {RatingStarsComponent} from "../rating-stars/rating-stars.component";
import {NgbDropdown, NgbDropdownItem, NgbDropdownMenu, NgbDropdownToggle} from "@ng-bootstrap/ng-bootstrap";
import {NgForOf, NgIf, NgSwitch, NgSwitchCase} from "@angular/common";
import {PaginatorModule, PaginatorState} from "primeng/paginator";
import {ProductItemComponent} from "../product-item/product-item.component";
import {Product} from "../../common/product";
import {ProductService} from "../../services/product.service";
import {ProductCategory} from "../../common/product-category";
import {ProductCategoryService} from "../../services/product-category.service";
import {SortingMethod} from "../shop-page-components/sorting-method.enum";
import {GenderFilter} from "../shop-page-components/gender-filter.enum";
import {TypeFilter} from "../shop-page-components/type-filter.enum";
import {FrameFilter} from "../shop-page-components/frame-filter.enum";

@Component({
  selector: 'app-shop-page',
  standalone: true,
  templateUrl: './shop-page.component.html',
  styleUrl: './shop-page.component.css',
  imports: [RouterLink, FontAwesomeModule, RouteBannerComponent, SpecialDealItemComponent, ProductListComponent, SliderModule, FormsModule, SliderComponent, RatingStarsComponent, NgbDropdown, NgbDropdownMenu, NgbDropdownItem, NgbDropdownToggle, NgForOf, NgIf, PaginatorModule, ProductItemComponent, NgSwitch, NgSwitchCase]
})
export class ShopPageComponent {

  // for modal window (choosing sorting method)
  showModal: boolean = false;

  selectedSortingMethod: SortingMethod = SortingMethod.NEWEST_FIRST;
  genderFilter: GenderFilter = GenderFilter.ALL;
  typeFilter: TypeFilter = TypeFilter.ALL;
  frameFilter: FrameFilter = FrameFilter.ALL;
  rangeValues: number[] = [0, 100];

  // new properties for pagination
  first: number | undefined = 0;
  rows: number | undefined = 12;

  thePageNumber: number = 0;
  thePageSize: number = 12;
  theTotalElements: number = 0;

  products: Product[] = [];
  productCategories: ProductCategory[] = [];

  currentCategoryId: number = 1;
  previousCategoryId: number = 1;
  currentCategoryName: string = "";
  previousKeyword: string = "";
  searchMode: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private productCategoryService: ProductCategoryService
  ) {
  }

  ngOnInit(): void {

    this.listProductCategories();

    this.route.paramMap.subscribe(() => {
      this.listProducts();
    })

  }

  listProductCategories() {
    this.productCategoryService.getProductCategories().subscribe(
      data => {
        console.log('Product Categories = ' + JSON.stringify(data));
        this.productCategories = data;

      }
    );
  }

  listProducts() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if (this.searchMode) {
      this.handelSearchProducts();
    } else {
      this.handelListProducts();
    }
  }

  private handelSearchProducts() {

    const theKeyword: string = this.route.snapshot.paramMap.get('keyword')!;

    // if we have a different keyword then previous
    // then set thePageNumber to 1
    if (this.previousKeyword != theKeyword) {
      this.thePageNumber = 1;
    }

    this.previousKeyword = theKeyword;

    console.log(`keyword=${theKeyword}, thePageNumber=${this.thePageNumber}`);

    // now search for the products using keyword
    this.productService.searchProductsPaginate(
      this.thePageNumber,
      this.thePageSize,
      theKeyword)
      .subscribe(this.processResult());
  }

  private handelListProducts() {

    // check if "id" param is avalible
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      // get the "id" param string. convert string to a number using the "+" symbol
      // "!" symbol in the end is the non-null assertion operator. Tells compiler that the object is not null.
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;

      // get the "name" param string
      this.currentCategoryName = this.route.snapshot.paramMap.get('name')!;
    } else {
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

    // now get the products for the given category id
    // this.productService.getProductListPaginate(
    //     this.thePageNumber - 1,
    //     this.thePageSize,
    //     this.currentCategoryId)
    //     .subscribe(this.processResult());
    this.productService.getProductListPaginate(
      this.thePageNumber,
      this.thePageSize,
      this.currentCategoryId)
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

  toggleSort(option: SortingMethod) {

    if (option === this.selectedSortingMethod) return;

    this.selectedSortingMethod = option;

    this.toggleModal();
  }

  toggleModal() {
    this.showModal = !this.showModal;
  }

  toggleGenderCategory(option: GenderFilter) {
    this.genderFilter = option;
  }

  toggleTypeCategory(option: TypeFilter) {
    this.typeFilter = option;
  }

  toggleFrameMaterialCategory(option: FrameFilter) {
    this.frameFilter = option;
  }

  protected readonly faSearch = faSearch;
  protected readonly faCaretDown = faCaretDown;
  protected readonly faTimes = faTimes;
  protected readonly faMinus = faMinus;
  protected readonly faPlus = faPlus;
  protected readonly SortingMethod = SortingMethod;
  protected readonly GenderFilter = GenderFilter;
  protected readonly TypeFilter = TypeFilter;
  protected readonly FrameFilter = FrameFilter;
}
