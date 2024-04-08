import {Injectable} from '@angular/core';
import {Product} from '../common/product';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SortingMethod} from "../components/shop-page-components/sorting-method.enum";

const PRODUCTS_API = environment.panShopApiUrl + '/products';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) {
  }

  getProduct(theProductId: number): Observable<Product> {

    return this.httpClient.get<Product>(
      `${PRODUCTS_API}/fetch/${theProductId}`
    );
  }

  searchProducts(
    thePage: number,
    thePageSize: number,
    theKeyword: string): Observable<GetResponseProducts> {

    return this.httpClient.get<GetResponseProducts>(
      `${PRODUCTS_API}/search-products?search-text=${theKeyword}&page=${thePage}&size=${thePageSize}`
    );
  }

  getProductList(
    thePage: number = 0,
    thePageSize: number = 8): Observable<GetResponseProducts> {

    return this.httpClient.get<GetResponseProducts>(
      `${PRODUCTS_API}/fetch-products?page=${thePage}&size=${thePageSize}`
    );
  }

  getProductListWithFilters(
    minPrice: number = 0,
    maxPrice: number = 100,
    categoryGender: number,
    categoryType: number,
    categoryFrame: number,
    selectedSortingMethod: SortingMethod,
    thePage: number = 0,
    thePageSize: number = 8): Observable<GetResponseProducts> {

    // http://localhost:8080/api/products/fetch-products-with-filters?minPrice=0&maxPrice=100&categoryIds=1,7,11&page=0&size=10

    let sortingMethod: SortingField = SortingField.CREATED_DATE;
    let sortingOrder: SortingOrder = SortingOrder.ASC;
    if (selectedSortingMethod === SortingMethod.NEWEST_FIRST) {
      sortingMethod = SortingField.CREATED_DATE;
      sortingOrder = SortingOrder.DESC;
    } else if (selectedSortingMethod === SortingMethod.FROM_CHEAP_TO_EXPENSIVE) {
      sortingMethod = SortingField.PRICE;
      sortingOrder = SortingOrder.ASC;
    } else if (selectedSortingMethod === SortingMethod.FROM_EXPENSIVE_TO_CHEAP) {
      sortingMethod = SortingField.PRICE;
      sortingOrder = SortingOrder.DESC;
    } else if (selectedSortingMethod === SortingMethod.HIGHEST_RATING_FIRST) {
      sortingMethod = SortingField.RATING;
      sortingOrder = SortingOrder.DESC;
    }

    return this.httpClient.get<GetResponseProducts>(
      `${PRODUCTS_API}/fetch-products-with-filters?minPrice=${minPrice}
      &maxPrice=${maxPrice}&categoryIds=${categoryGender},${categoryType},
      ${categoryFrame}&sorting-method=${sortingMethod}&sorting-order=${sortingOrder}
      &page=${thePage}&size=${thePageSize}`
    );
  }
}

enum SortingField {
  CREATED_DATE = "product_date_created",
  PRICE = "product_price",
  RATING = "product_rating"
}

enum SortingOrder {
  ASC = "asc",
  DESC = "desc"
}

interface GetResponseProducts {
  content: Product[],
  size: number,
  totalElements: number,
  totalPages: number,
  number: number
}
