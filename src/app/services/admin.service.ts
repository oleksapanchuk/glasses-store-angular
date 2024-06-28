import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {OrderDto} from "../common/dto/OrderDto";
import {Product} from "../common/product";

const ADMIN_API = environment.panShopApiUrl + '/admin';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(
    private http: HttpClient,
  ) {
  }

  createProduct(product: Product): Observable<GetResponseDto> {

    return this.http.post<GetResponseDto>(
      `${ADMIN_API}/products/create`, {
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

  updateProduct(product: Product): Observable<GetResponseDto> {

    return this.http.put<GetResponseDto>(
      `${ADMIN_API}/products/update`, {
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

interface GetResponseDto {
  statusCode: string,
  statusMessage: string
}

interface GetResponseOrders {
  content: OrderDto[],
  size: number,
  totalElements: number,
  totalPages: number,
  number: number
}
