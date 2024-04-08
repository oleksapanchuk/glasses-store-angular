import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {PaymentIntent} from "@stripe/stripe-js";
import {PaymentInfo} from "../common/payment-info";
import {Purchase} from "../common/purchase";

const AUTH_API = environment.panShopApiUrl + '/order';
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


  placeOrder(purchase: Purchase): Observable<any> {

    return this.http.post<Purchase>(AUTH_API + '/place-order',
      {
        shippingAddress: purchase.shippingAddress,
        order: purchase.order,
        orderItems: purchase.orderItems
      }, httpOptions);
  }

  createPaymentIntent(paymentInfo: PaymentInfo): Observable<PaymentIntent> {

    console.log("AMOUNT = " + paymentInfo.amount);

    return this.http.post<PaymentIntent>(AUTH_API + '/create-payment-intent',
      {
        amount: paymentInfo.amount,
        currency: paymentInfo.currency,
        receiptEmail: paymentInfo.receiptEmail
      }, httpOptions);
  }
}
