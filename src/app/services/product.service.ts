import {Injectable} from '@angular/core';
import {Product} from '../common/product';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SortingMethod} from "../components/shop-page-components/sorting-method.enum";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = environment.panShopApiUrl + '/products';


  constructor(private httpClient: HttpClient) {
  }

  getProduct(theProductId: number): Observable<Product> {

    // need to build URL based on product id
    const productUrl = `${this.baseUrl}/${theProductId}`;

    return this.httpClient.get<Product>(productUrl);

  }

  getProductListPaginate(
    thePage: number = 0,
    thePageSize: number = 8
  ): Observable<GetResponseProducts> {

    const searchUrl = `${this.baseUrl}/paginable-list?page=${thePage}&size=${thePageSize}`;

    console.log(`Getting products from - ${searchUrl}`);

    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }

  getProductListPaginateWithFilters(
    minPrice: number = 0,
    maxPrice: number = 100,
    categoryGender: number,
    categoryType: number,
    categoryFrame: number,
    selectedSortingMethod: SortingMethod,
    thePage: number = 0,
    thePageSize: number = 8
  ): Observable<GetResponseProducts>  {

    // http://localhost:8080/api/products/paginable-list/filters?minPrice=0&maxPrice=100&categoryIds=1,7,11&page=0&size=10

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

    const searchUrl = `${this.baseUrl}/paginable-list/filters?minPrice=
    ${minPrice}&maxPrice=${maxPrice}&categoryIds=${categoryGender},${categoryType},
    ${categoryFrame}&sorting-method=${sortingMethod}&sorting-order=${sortingOrder}
    &page=${thePage}&size=${thePageSize}`;

    console.log(`Getting products from - ${searchUrl}`);

    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }

  searchProductsPaginate(
    thePage: number,
    thePageSize: number,
    theKeyword: string): Observable<GetResponseProducts> {

    const searchUrl = `${this.baseUrl}/search?search-text=${theKeyword}`
      + `&page=${thePage}&size=${thePageSize}`;

    return this.httpClient.get<GetResponseProducts>(searchUrl);
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
