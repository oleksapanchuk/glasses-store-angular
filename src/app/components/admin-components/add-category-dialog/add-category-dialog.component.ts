import {Component, Inject} from '@angular/core';
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {NgForOf} from "@angular/common";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ProductCategory} from "../../../common/product-category";
import {Product} from "../../../common/product";

@Component({
  selector: 'app-add-category-dialog',
  standalone: true,
  imports: [
    FaIconComponent,
    NgForOf
  ],
  templateUrl: './add-category-dialog.component.html',
  styleUrl: './add-category-dialog.component.css'
})
export class AddCategoryDialogComponent {

  categories!: ProductCategory[];

  constructor(
    public dialogRef: MatDialogRef<AddCategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.categories = data.categories;
  }

  closeDialog(id: number): void {
    this.dialogRef.close(id);
  }

  protected readonly faTimes = faTimes;
}
