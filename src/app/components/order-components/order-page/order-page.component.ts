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
      ]),
      zipCode: new FormControl('', [
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
}
