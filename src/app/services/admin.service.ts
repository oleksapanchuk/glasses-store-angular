import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {OrderDto} from "../common/dto/OrderDto";
import {Product} from "../common/product";

const ADMIN_API = environment.panShopApiUrl + '/admin';
const PRODUCT_API = environment.panShopApiUrl + '/products';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(
    private http: HttpClient,
  ) {
  }

  createProduct(product: Product): Observable<any> {

    return this.http.post<any>(
      `${PRODUCT_API}/create`, {
        sku: product.sku,
        name: product.name,
        description: product.description,
        price: product.price,
        unitsInStock: product.unitsInStock,
        imageUrl: product.imageUrl,
        active: product.active,
        categoryIds: product.categoryIds,
      }
    );
  }

  updateProduct(product: Product): Observable<any> {

    return this.http.put<any>(
      `${PRODUCT_API}/update`, {
        id: product.id,
        sku: product.sku,
        name: product.name,
        description: product.description,
        price: product.price,
        unitsInStock: product.unitsInStock,
        imageUrl: product.imageUrl,
        active: product.active,
        categoryIds: product.categoryIds,
      }
    );
  }

  findOrders(theTrackingNumber: string): Observable<GetResponseOrders> {

    return this.http.get<GetResponseOrders>(
      `${ADMIN_API}/fetch-orders-by-tracking-number/${theTrackingNumber}`
    );
  }

  updateOrderStatus(theId: string, theOrderStatus: string): Observable<any> {
    return this.http.patch<any>(
      `${ADMIN_API}/update-order-status`,
      {
        orderId: theId,
        orderStatus: theOrderStatus
      }
    );
  }

}

interface GetResponseOrders {
  content: OrderDto[],
  size: number,
  totalElements: number,
  totalPages: number,
  number: number
}
