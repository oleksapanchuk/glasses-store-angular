import {Component, OnInit} from '@angular/core';
import {RouteBannerComponent} from "../../utils/route-banner/route-banner.component";
import {RouterLink} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {AdminService} from "../../../services/admin.service";
import {OrderDto} from "../../../common/dto/OrderDto";
import {CurrencyPipe, NgForOf, NgIf} from "@angular/common";
import {OrderItemComponent} from "../../order-components/order-item/order-item.component";
import {faPenToSquare} from "@fortawesome/free-solid-svg-icons";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {MatDialog} from "@angular/material/dialog";
import {UpdateOrderStatusDialogComponent} from "../update-order-status-dialog/update-order-status-dialog.component";

@Component({
  selector: 'app-order-management',
  standalone: true,
  imports: [
    RouteBannerComponent,
    RouterLink,
    FormsModule,
    NgForOf,
    NgIf,
    OrderItemComponent,
    CurrencyPipe,
    FaIconComponent
  ],
  templateUrl: './order-management.component.html',
  styleUrl: './order-management.component.css'
})
export class OrderManagementComponent implements OnInit {

  trackingNumber!: string;

  orders!: OrderDto[];

  constructor(
    private adminService: AdminService,
    private dialog: MatDialog
  ) {
  }

  ngOnInit() {
  }

  findOrders(trackingNumber: string) {
    this.orders = [];

    if (trackingNumber === '') return;

    this.adminService.findOrders(trackingNumber).subscribe(
      data => this.orders = data.content
    );
  }

  openDialog(id: string, trackingNumber: string) {
    let chosenResult = "";
    const dialogRef = this.dialog.open(UpdateOrderStatusDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.adminService.updateOrderStatus(id, result).subscribe(() => {
        // Call findOrders again after updateOrderStatus has completed
        this.findOrders(trackingNumber);
      });
    });

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

  protected readonly faPenToSquare = faPenToSquare;
}
