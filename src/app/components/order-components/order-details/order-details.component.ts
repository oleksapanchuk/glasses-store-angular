import {Component, OnInit} from '@angular/core';
import {OrderService} from "../../../services/order.service";
import {ActivatedRoute} from "@angular/router";
import {OrderDetailsResponse} from "../../../common/dto/order-details-response.dto";
import {RouteBannerComponent} from "../../utils/route-banner/route-banner.component";
import {CurrencyPipe, NgForOf} from "@angular/common";
import {OrderItemComponent} from "../order-item/order-item.component";

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [
    RouteBannerComponent,
    NgForOf,
    CurrencyPipe,
    OrderItemComponent
  ],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.css'
})
export class OrderDetailsComponent implements OnInit {

  order!: OrderDetailsResponse;

  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(
      () => {
        this.handleOrderDetails();
      }
    );
  }

  handleOrderDetails() {

    // get the "id" param string. convert string to a number using the "+" symbol
    const theOrderId: number = +this.route.snapshot.paramMap.get('id')!;

    this.orderService.getOrderDetailsById(theOrderId).subscribe(
      data => {
        this.order = data;
      }
    );

  }

  formatDateString(dateString: string): string {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false // 24-hour format
    };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  }
}
