import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {RouteBannerComponent} from '../utils/route-banner/route-banner.component';
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
import {SortingMethod} from "../shop-page-components/sorting-method.enum";
import {GenderFilter} from "../shop-page-components/gender-filter.enum";
import {TypeFilter} from "../shop-page-components/type-filter.enum";
import {FrameFilter} from "../shop-page-components/frame-filter.enum";
import {catchError, throwError} from "rxjs";

@Component({
  selector: 'app-shop-page',
  standalone: true,
  templateUrl: './shop-page.component.html',
  styleUrl: './shop-page.component.css',
  imports: [RouterLink, FontAwesomeModule, RouteBannerComponent, SpecialDealItemComponent, ProductListComponent, SliderModule, FormsModule, SliderComponent, RatingStarsComponent, NgbDropdown, NgbDropdownMenu, NgbDropdownItem, NgbDropdownToggle, NgForOf, NgIf, PaginatorModule, ProductItemComponent, NgSwitch, NgSwitchCase]
})
export class ShopPageComponent implements OnInit {
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

  previousKeyword: string = "";
  searchMode: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    })
  }

  listProducts() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    if (this.searchMode) {
      this.handelSearchProducts();
      return;
    }

    this.handelListProducts();
  }

  private handelSearchProducts() {

    const theKeyword: string = this.route.snapshot.paramMap.get('keyword')!;

    // if we have a different keyword then previous
    // then set thePageNumber to 1
    if (this.previousKeyword != theKeyword) {
      this.thePageNumber = 0;
      this.thePageSize = 12;
    }

    this.previousKeyword = theKeyword;

    console.log(`keyword=${theKeyword}, thePageNumber=${this.thePageNumber}`);

    // now search for the products using keyword
    this.productService.searchProducts(
      this.thePageNumber,
      this.thePageSize,
      theKeyword)
      .subscribe(this.processResult());
  }

  private handelListProducts() {

    this.productService.getProductListWithFilters(
      this.rangeValues[0],
      this.rangeValues[1],
      this.genderFilter,
      this.typeFilter,
      this.frameFilter,
      this.selectedSortingMethod,
      this.thePageNumber,
      this.thePageSize)
      .pipe(
        catchError((error) => {
          console.log(error)
          return throwError(() => error);
        })
      ).subscribe(this.processResult());
  }

  toggleRefresh() {
    this.productService.getProductListWithFilters(
      this.rangeValues[0],
      this.rangeValues[1],
      this.genderFilter,
      this.typeFilter,
      this.frameFilter,
      this.selectedSortingMethod,
      0,
      12)
      .pipe(
        catchError((error) => {
          console.log(error)
          return throwError(() => error);
        })
      ).subscribe(this.processResult());
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

  handleInputChange(event: any, isMin: boolean) {
    let newValue = parseFloat(event.target.value);

    // Check if the input value is empty or NaN
    if (isNaN(newValue) || event.target.value.trim() === '') {
      // Set default value (0 for min, 100 for max)
      newValue = isMin ? 0 : 100;
    }

    if (isMin) {
      this.rangeValues[0] = newValue;
    } else {
      this.rangeValues[1] = newValue;
    }

    this.toggleRefresh();
  }

  toggleSort(option: SortingMethod) {

    if (option === this.selectedSortingMethod) return;

    this.selectedSortingMethod = option;

    this.toggleRefresh();
    this.toggleModal();
  }

  toggleModal() {
    this.showModal = !this.showModal;
  }

  fetchProducts() {
    this.toggleRefresh();
  }

  toggleGenderCategory(option: GenderFilter) {
    this.genderFilter = option;
    this.toggleRefresh();
  }

  toggleTypeCategory(option: TypeFilter) {
    this.typeFilter = option;
    this.toggleRefresh();
  }

  toggleFrameMaterialCategory(option: FrameFilter) {
    this.frameFilter = option;
    this.toggleRefresh();
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
