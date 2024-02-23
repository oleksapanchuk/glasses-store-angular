import {Injectable} from '@angular/core';
import {Product} from '../common/product';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {ProductCategory} from "../common/product-category";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = environment.panShopApiUrl + '/products';
  private categoryUrl = environment.panShopApiUrl + '/product-category';

  constructor(private httpClient: HttpClient) {
  }

  getProductListPaginate(
    thePage: number = 0,
    thePageSize: number = 8,
    theCategoryId: number): Observable<GetResponseProducts> {

    // need to build URL based on category id, page and size
    // const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`
    //   + `&page=${thePage}&size=${thePageSize}`;

    const searchUrl = `${this.baseUrl}?page=${thePage}&size=${thePageSize}`;

    console.log(`Getting products from - ${searchUrl}`);

    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }

  getProductCategories(): Observable<ProductCategory[]> {

    return this.httpClient.get<GetResponseProductCategories>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategory)
    );
  }
}

interface GetResponseProducts {
  _embedded: {
    products: Product[];
  },
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}

interface GetResponseProductCategories {
  _embedded: {
    productCategory: ProductCategory[];
  }
}
