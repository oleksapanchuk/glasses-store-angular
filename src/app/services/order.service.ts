import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {PaymentIntent} from "@stripe/stripe-js";
import {PaymentInfo} from "../common/payment-info";
import {Purchase} from "../common/purchase";
import {OrderDto} from "../common/dto/OrderDto";
import {OrderDetailsResponse} from "../common/dto/order-details-response.dto";

const ORDER_API = environment.panShopApiUrl + '/orders';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private http: HttpClient
  ) {
  }

  getOrderDetailsById(theOrderId: number): Observable<OrderDetailsResponse> {

    return this.http.get<OrderDetailsResponse>(
      `${ORDER_API}/fetch-order-details/${theOrderId}`
    );
  }

  getOrderList(
    thePage: number = 0,
    thePageSize: number = 8): Observable<GetResponseOrders> {

    return this.http.get<GetResponseOrders>(
      `${ORDER_API}/fetch-by-email?page=${thePage}&size=${thePageSize}`
    );
  }

  placeOrder(purchase: Purchase): Observable<any> {

    return this.http.post<Purchase>(
      `${ORDER_API}/place-order`,
      {
        userId: purchase.user.id,
        address: purchase.shippingAddress,
        orderItems: purchase.orderItems
      }, httpOptions);
  }

  createPaymentIntent(paymentInfo: PaymentInfo): Observable<PaymentIntent> {

    console.log("AMOUNT = " + paymentInfo.amount);

    return this.http.post<PaymentIntent>(ORDER_API + '/create-payment-intent',
      {
        amount: paymentInfo.amount,
        currency: paymentInfo.currency,
        receiptEmail: paymentInfo.receiptEmail
      }, httpOptions);
  }
}

interface GetResponseOrders {
  content: OrderDto[],
  size: number,
  totalElements: number,
  totalPages: number,
  number: number
}

// interface GetResponseOrderDetails {
//   orderTrackingNumber: string,
//   totalPrice: number,
//   status: string,
//   dateCreated: string,
//   shippingAddress: string,
//   orderItems: OrderItem[]
// }
