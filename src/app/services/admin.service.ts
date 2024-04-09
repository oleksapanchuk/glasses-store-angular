import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {OrderDto} from "../common/dto/OrderDto";

const ADMIN_API = environment.panShopApiUrl + '/admin';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(
    private http: HttpClient,
  ) {
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
