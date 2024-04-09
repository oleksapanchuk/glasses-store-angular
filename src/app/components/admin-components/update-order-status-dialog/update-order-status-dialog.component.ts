import {Component} from '@angular/core';
import {NgForOf} from "@angular/common";
import {MatDialogRef} from "@angular/material/dialog";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-update-order-status-dialog',
  standalone: true,
  imports: [
    NgForOf,
    FaIconComponent
  ],
  templateUrl: './update-order-status-dialog.component.html',
  styleUrl: './update-order-status-dialog.component.css'
})
export class UpdateOrderStatusDialogComponent {
  statuses = ['ACCEPTED', 'SHIPPED', 'DELIVERED', 'CANCELED'];

  constructor(
    public dialogRef: MatDialogRef<UpdateOrderStatusDialogComponent>
  ) {
  }

  closeDialog(status: string): void {
    this.dialogRef.close(status);
  }

  protected readonly faTimes = faTimes;
}
