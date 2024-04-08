import {Component, Input, OnInit} from '@angular/core';
import {Product} from "../../../common/product";
import {OrderItemResponse} from "../../../common/dto/order-item-response.dto";
import {faTrashCan} from "@fortawesome/free-regular-svg-icons";
import {CurrencyPipe} from "@angular/common";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";

@Component({
  selector: 'app-order-item',
  standalone: true,
  imports: [
    CurrencyPipe,
    FaIconComponent
  ],
  templateUrl: './order-item.component.html',
  styleUrl: './order-item.component.css'
})
export class OrderItemComponent implements OnInit {

  @Input() order!: OrderItemResponse;

  constructor() {
  }

  ngOnInit() {
  }

  protected readonly faTrash = faTrashCan;
  protected readonly Number = Number;
}
