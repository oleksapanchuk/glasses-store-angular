import {AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren} from '@angular/core';
import {RouteBannerComponent} from "../../route-banner/route-banner.component";
import {CartItemComponent} from "../../cart-components/cart-item/cart-item.component";
import {CurrencyPipe, NgForOf, NgIf} from "@angular/common";
import {CartService} from "../../../services/cart.service";
import {Router, RouterLink} from "@angular/router";
import {ButtonComponent} from "../../utils/button/button.component";
import {PaginatorModule} from "primeng/paginator";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {StorageService} from "../../../services/storage.service";
import {InputComponent} from "../../utils/input/input.component";
import {OrderService} from "../../../services/order.service";

import {StripeCardComponent, StripeService} from 'ngx-stripe';

import {StripeCardElement, StripeCardElementOptions, StripeElements, StripeElementsOptions} from "@stripe/stripe-js";
import {CartItem} from "../../../common/cart-item";
import {Order} from "../../../common/order";
import {OrderItem} from "../../../common/order-item";
import {Purchase} from "../../../common/purchase";
import {PaymentInfo} from "../../../common/payment-info";
import {Address} from "../../../common/address";

@Component({
  selector: 'app-order-page',
  standalone: true,
  imports: [
    RouteBannerComponent,
    CartItemComponent,
    NgForOf,
    RouterLink,
    ButtonComponent,
    PaginatorModule,
    ReactiveFormsModule,
    InputComponent,
    NgIf,
    StripeCardComponent,
    CurrencyPipe
  ],
  templateUrl: './order-page.component.html',
  styleUrl: './order-page.component.css'
})
export class OrderPageComponent implements OnInit, AfterViewInit {
  @ViewChildren('inputField') inputFields!: QueryList<ElementRef>;

  /* stripe elements */
  elements!: StripeElements;
  card!: StripeCardElement;
  cardOptions: StripeCardElementOptions = {
    iconStyle: 'solid',
    style: {
      base: {
        iconColor: '#313233',
        color: '#292b2c',
        fontWeight: '500',
        fontFamily: 'Raleway, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: '#63666b'
        }
      }
    }
  };
  elementsOptions: StripeElementsOptions = {locale: 'en'};

  paymentForm!: FormGroup;
  serverErrorMessage!: string;

  full_name!: string;
  email!: string;

  paymentInfo: PaymentInfo = new PaymentInfo();
  cartItems!: CartItem[];
  totalPrice: number = 0;
  totalQuantity: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private stripeService: StripeService,
    private storageService: StorageService,
    private cartService: CartService,
    private orderService: OrderService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.paymentForm = this.formBuilder.group({
      country: new FormControl('', [
        Validators.required
      ]),
      state: new FormControl('', [
        Validators.required
      ]),
      street: new FormControl('', [
        Validators.required,
        Validators.minLength(2)
      ]),
      city: new FormControl('', [
        Validators.required,
        Validators.minLength(2)
      ])
    });

    this.stripeService.elements(this.elementsOptions)
      .subscribe(elements => {
        this.elements = elements;
        // Only mount the element the first time
        if (!this.card) {
          this.card = this.elements.create('card', this.cardOptions);
          this.card.mount('#card-element');
        }
      });

    this.listCartDetails();

    this.initUser();

  }

  ngAfterViewInit() {

    this.inputFields.forEach(inputField => {
      inputField.nativeElement.addEventListener('blur', () => {
        if (inputField.nativeElement.value != "") {
          inputField.nativeElement.classList.add('auth__has-value');
        } else {
          inputField.nativeElement.classList.remove('auth__has-value');
        }
      });
    });

  }

  createToken() {
    const name = this.paymentForm.get('city')!.value;
    this.stripeService
      .createToken(this.card, {name})
      .subscribe((result) => {
        if (result.token) {
          // Use the token
          console.log(result.token.id);
        } else if (result.error) {
          // Error creating the token
          console.log(result.error.message);
        }
      });
  }

  placeOrder() {
    if (this.paymentForm.invalid) {
      // touching all fields triggers the display of the error messages
      this.paymentForm.markAllAsTouched();
      return;
    }

    let currentUser = this.storageService.getUser();

    // set up order
    let order = new Order();
    order.userId = currentUser.id!;
    order.totalPrice = this.totalPrice;
    order.totalQuantity = this.totalQuantity;

    // get cart items
    const cartItems = this.cartService.cartItems;

    // create orderItems from cartItems
    let orderItems: OrderItem[] = cartItems.map(tempCartItems => new OrderItem(tempCartItems));

    // set up purchase
    let purchase = new Purchase();

    // populate purchase - customer
    purchase.user = currentUser;

    // populate purchase - shipping address
    purchase.shippingAddress = this.readAddress();

    // populate purchase - order and orderItems
    purchase.order = order;
    purchase.orderItems = orderItems;

    // compute payment info
    this.paymentInfo.amount = Math.round(this.totalPrice * 100);
    this.paymentInfo.currency = "USD";
    this.paymentInfo.receiptEmail = purchase.user?.email;

    console.log(`this.paymentInfo.amount: ${this.paymentInfo.amount}`);

    // if valid form then
    // - create payment
    // - confirm card payment
    // - place order
    if (this.paymentForm.valid && this.serverErrorMessage === "") {
      console.log("Init payment intent");

      this.orderService.createPaymentIntent(this.paymentInfo).subscribe(
        (paymentIntentResponse) => {
          this.stripeService.confirmCardPayment(
            paymentIntentResponse.client_secret!,
            {
              payment_method: {
                card: this.card,
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
          ).toPromise().then((result: any) => {

            if (result.error) {
              // inform the customer there was an error
              alert(`There was an error: ${result.error.messages}`);
            } else {

              this.orderService.placeOrder(purchase).subscribe({
                next: (response: any) => {
                  alert(`Your order has been recieved.\nOrder tracking number: ${response.orderTrackingNumber}`);

                  // reset cart
                  this.resetCart();

                },
                error: error => {
                  alert(`There are an error: ${error.messages}`);
                }
              });

            }

          });
        }
      );

    } else {
      this.paymentForm.markAllAsTouched();
      return;
    }
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

  get country() {
    return this.paymentForm.get('country');
  }

  get state() {
    return this.paymentForm.get('state');
  }

  get street() {
    return this.paymentForm.get('street');
  }

  get city() {
    return this.paymentForm.get('city');
  }

  get zipCode() {
    return this.paymentForm.get('zipCode');
  }

  private resetCart() {

    // reset cart data
    this.cartService.cartItems = [];
    this.cartService.totalPrice.next(0);
    this.cartService.totalQuantity.next(0);
    this.cartService.persistCartItems();

    // reset form data
    this.paymentForm.reset();

    // navigate back to the product page
    this.router.navigateByUrl("/shop");
  }

  private initUser() {
    let user = this.storageService.getUser();
    this.full_name = user.firstName + " " + user.lastName;
    this.email = user.email;
  }

  private readAddress(): Address {
    const street = this.paymentForm.get('street')!.value;
    const city = this.paymentForm.get('city')!.value;
    const state = this.paymentForm.get('state')!.value;
    const country = this.paymentForm.get('country')!.value;
    // const zipCode = this.paymentForm.get('zipCode')!.value;
    const zipCode = "31000";

    return new Address(street, city, state, country, zipCode);
  }
}
