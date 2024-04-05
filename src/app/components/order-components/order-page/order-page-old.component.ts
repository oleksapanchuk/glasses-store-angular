import {Component, OnInit, ViewChild} from '@angular/core';
import {RouteBannerComponent} from "../../route-banner/route-banner.component";
import {CartItemComponent} from "../../cart-components/cart-item/cart-item.component";
import {NgForOf, NgIf} from "@angular/common";
import {CartItem} from "../../../common/cart-item";
import {CartService} from "../../../services/cart.service";
import {Router, RouterLink} from "@angular/router";
import {ButtonComponent} from "../../utils/button/button.component";
import {PaginatorModule} from "primeng/paginator";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {StorageService} from "../../../services/storage.service";
import {InputComponent} from "../../utils/input/input.component";
import {environment} from "../../../../environments/environment";
import {PaymentInfo} from "../../../common/payment-info";
import {
  injectStripe,
  StripeCardComponent,
  StripeElementsDirective,
  StripePaymentElementComponent,
  StripeService
} from 'ngx-stripe';
import {StripeCardElementOptions, StripeElementsOptions,} from '@stripe/stripe-js';
import {OrderService} from "../../../services/order.service";
import {Order} from "../../../common/order";
import {OrderItem} from "../../../common/order-item";
import {Purchase} from "../../../common/purchase";
import {switchMap} from "rxjs";

// @Component({
//   selector: 'app-order-page',
//   standalone: true,
//   imports: [
//     RouteBannerComponent,
//     CartItemComponent,
//     NgForOf,
//     RouterLink,
//     ButtonComponent,
//     PaginatorModule,
//     ReactiveFormsModule,
//     InputComponent,
//     NgIf,
//     StripeCardComponent,
//     StripeElementsDirective,
//     StripePaymentElementComponent
//   ],
//   templateUrl: './order-page.component.html',
//   styleUrl: './order-page.component.css'
// })
export class OrderPageComponent implements OnInit {
  // @ViewChild(StripeCardComponent) card!: StripeCardComponent;

  // paymentForm!: FormGroup;

  // stripe = this.stripeService.stripe;
  // elementsOptions: StripeElementsOptions = {
  //   locale: 'en'
  // };

  cartItems!: CartItem[];
  totalPrice: number = 0;
  totalQuantity: number = 0;

  paymentInfo: PaymentInfo = new PaymentInfo();
  cardElement: any;
  displayError: any = "";

  isDisabled: boolean = false;


  constructor(
    private formBuilder: FormBuilder,
    private storageService: StorageService,
    private cartService: CartService,
    private orderService: OrderService,
    private stripeService: StripeService,
    private router: Router
  ) {

  }

  ngOnInit(): void {

    this.listCartDetails();
/*
    this.paymentForm = this.formBuilder.group({
      country: new FormControl('test_country', [
        Validators.required
      ]),
      state: new FormControl('test_state', [
        Validators.required
      ]),
      street: new FormControl('test_street', [
        Validators.required,
        Validators.minLength(2)
      ]),
      city: new FormControl('test_city', [
        Validators.required,
        Validators.minLength(2)
      ]),
      zipCode: new FormControl('test_zipCode', [
        Validators.required,
        Validators.minLength(2)
      ])
    });
*/
  }

  placeOrder() {
    console.log("Handling the submit button");

  }

  listCartDetails() {

    // get a handle to the cart items
    this.cartItems = this.cartService.cartItems;

    // subscribe to the cart totalPrice
    this.cartService.totalPrice.subscribe(
      data => this.totalPrice = data
    );

    // subscribe to the cart totalQuantity
    this.cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    );

    // compute cart total price and quantity
    this.cartService.computeCartTotals();

  }
/*
  resetCart() {

    // reset cart data
    this.cartService.cartItems = [];
    this.cartService.totalPrice.next(0);
    this.cartService.totalQuantity.next(0);
    this.cartService.persistCartItems();

    // reset form data
    this.paymentForm.reset();

    // navigate back to the product page
    this.router.navigateByUrl("/products");
  }

 */
}

/*
*
*
*
    if (this.paymentForm.invalid) {
      // touching all fields triggers the display of the error messages
      this.paymentForm.markAllAsTouched();
      return;
    }

    // set up order
    let order = new Order();
    order.totalPrice = this.totalPrice;
    order.totalQuantity = this.totalQuantity;

    // get cart items
    const cartItems = this.cartService.cartItems;

    // create orderItems from cartItems
    let orderItems: OrderItem[] = cartItems.map(tempCartItems => new OrderItem(tempCartItems));

    // set up purchase
    let purchase = new Purchase();

    // populate purchase - customer
    purchase.user = this.storageService.getUser();

    // populate purchase - shipping address
    purchase.shippingAddress = this.paymentForm.controls['shippingAddress'].value;

    // populate purchase - order and orderItems
    purchase.order = order;
    purchase.orderItems = orderItems;

    // compute payment info
    this.paymentInfo.amount = Math.round(this.totalPrice * 100);
    this.paymentInfo.currency = "USD";
    this.paymentInfo.receiptEmail = purchase.user?.email;

    console.log(`this.paymentInfo.amount: ${this.paymentInfo.amount}`);

    if (this.paymentForm.valid && this.displayError.textContent === "") {

      console.log("Init payment intent");

      this.isDisabled = true;

      this.orderService.createPaymentIntent(this.paymentInfo)
        .pipe(
          switchMap((pi) =>
            this.stripeService.confirmCardPayment(
              pi.client_secret!,
              {
                payment_method: {
                  card: this.cardElement,
                  billing_details: {
                    email: purchase.user?.email,
                    name: `${purchase.user?.firstName} ${purchase.user?.lastName}`,
                    address: {
                      line1: purchase.shippingAddress?.street,
                      city: purchase.shippingAddress?.city,
                      state: purchase.shippingAddress?.state,
                      postal_code: purchase.shippingAddress?.zipCode
                    }
                  }
                }
              })
          )
        )
        .subscribe((result) => {
          if (result.error) {
            // Show error to your customer (e.g., insufficient funds)
            alert(`There was an error: ${result.error.message}`);
            console.log(result.error.message);
          } else {
            // The payment has been processed!
            if (result.paymentIntent.status === 'succeeded') {
              // Show a success message to your customer
              console.log("succeeded");
            }

            // call REST API via the CheckoutService
            this.orderService.placeOrder(purchase).subscribe({
              next: (response: any) => {
                alert(`Your order has been recieved.\nOrder tracking number: ${response.orderTrackingNumber}`);
                // reset cart
                this.resetCart();
                this.isDisabled = false;
              },
              error: error => {
                alert(`There are an error: ${error.messages}`);
                this.isDisabled = false;
              }
            });

          }
        });
    } else {
      console.log(this.paymentForm);
    }
*/

/*
  this.orderService.createPaymentIntent(this.paymentInfo).subscribe(
    (paymentIntentResponse) => {
      this.stripe.confirmCardPayment(
        paymentIntentResponse.client_secret!,
        {
          payment_method: {
            card: this.cardElement,
            billing_details: {
              email: purchase.user?.email,
              name: `${purchase.user?.firstName} ${purchase.user?.lastName}`,
              address: {
                line1: purchase.shippingAddress?.street,
                city: purchase.shippingAddress?.city,
                state: purchase.shippingAddress?.state,
                postal_code: purchase.shippingAddress?.zipCode
              }
            }
          }
        },
        {handleActions: false}
      ).then((result: any) => {

        if (result.error) {
          // inform the customer there was an error
          alert(`There was an error: ${result.error.messages}`);
          this.isDisabled = false;
        }
        else {
          // call REST API via the CheckoutService
          this.orderService.placeOrder(purchase).subscribe({
            next: (response: any) => {
              alert(`Your order has been recieved.\nOrder tracking number: ${response.orderTrackingNumber}`);
              // reset cart
              this.resetCart();
              this.isDisabled = false;
            },
            error: error => {
              alert(`There are an error: ${error.messages}`);
              this.isDisabled = false;
            }
          });
        }
      });
    }
  );
  */
