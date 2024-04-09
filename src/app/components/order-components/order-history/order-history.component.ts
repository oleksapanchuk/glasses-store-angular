import {Component, OnInit} from '@angular/core';
import {RouteBannerComponent} from "../../utils/route-banner/route-banner.component";
import {OrderDto} from "../../../common/dto/OrderDto";
import {OrderService} from "../../../services/order.service";
import {CurrencyPipe, NgForOf} from "@angular/common";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faCircleChevronRight} from "@fortawesome/free-solid-svg-icons";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-order-history',
  standalone: true,
  imports: [
    RouteBannerComponent,
    NgForOf,
    CurrencyPipe,
    FaIconComponent,
    RouterLink
  ],
  templateUrl: './order-history.component.html',
  styleUrl: './order-history.component.css'
})
export class OrderHistoryComponent implements OnInit {

  orderItems: OrderDto[] = [];

  constructor(
    private orderService: OrderService,
  ) {
  }

  ngOnInit() {

    this.orderService.getOrderList().subscribe(
      data => this.orderItems = data.content
    )

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

  protected readonly faCircleChevronRight = faCircleChevronRight;
}
