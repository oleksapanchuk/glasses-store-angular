import {Component, Input} from '@angular/core';
import {UserDto} from "../../../common/dto/user.dto";
import {MatDialog} from "@angular/material/dialog";
import {UserUpdateDialogComponent} from "../user-update-dialog/user-update-dialog.component";

@Component({
  selector: 'app-user-data',
  standalone: true,
  imports: [],
  templateUrl: './user-data.component.html',
  styleUrl: './user-data.component.css'
})
export class UserDataComponent {
  @Input("user-data") user!: UserDto;

  constructor(
    public dialog: MatDialog,
  ) {
  }

  onSubmit() {
    console.log("working");
    const dialogRef = this.dialog.open(UserUpdateDialogComponent, {
      width: '600px',
      data: {}
    });
  }
}
