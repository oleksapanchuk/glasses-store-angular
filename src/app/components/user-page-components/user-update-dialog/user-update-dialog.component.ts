import {AfterViewInit, Component, ElementRef, Inject, OnInit, QueryList, ViewChildren} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormField} from "@angular/material/form-field";
import {NgIf} from "@angular/common";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faEnvelope} from "@fortawesome/free-solid-svg-icons";
import {faCheck} from "@fortawesome/free-solid-svg-icons/faCheck";
import {faXmark} from "@fortawesome/free-solid-svg-icons/faXmark";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-user-update-dialog',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatFormField,
    ReactiveFormsModule,
    NgIf,
    FaIconComponent
  ],
  templateUrl: './user-update-dialog.component.html',
  styleUrl: './user-update-dialog.component.css'
})
export class UserUpdateDialogComponent implements AfterViewInit, OnInit {
  @ViewChildren('inputField') inputFields!: QueryList<ElementRef>;

  formGroup!: FormGroup;
  serverErrorMessage!: string;
  serverSuccessMessage!: string;

  constructor(
    public dialogRef: MatDialogRef<UserUpdateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {
  }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      firstName: ['', [
        Validators.required,
        Validators.maxLength(30)
      ]],
      lastName: ['', [
        Validators.required,
        Validators.maxLength(30)
      ]],
      phoneNumber: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(15)
      ]],
    });
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

  onClose(): void {
    this.dialogRef.close();
  }

  onClickVerifyAccount() {
    console.log("Verifying working")
  }

  onClickUpdateData() {
    this.onClose();

    console.log("Update working")
    if (this.formGroup.valid) {
      this.userService.updateUserData(
        this.formGroup.get('firstName')?.value,
        this.formGroup.get('lastName')?.value,
        this.formGroup.get('phoneNumber')?.value
      ).subscribe({
        next: (data: any) => {

          this.serverSuccessMessage = "Password updated successfully"

          this.formGroup.reset();

          this.onClose();
        },
        error: (error: any) => {

          console.log(error);

          if (error.status === 400) {
            this.serverErrorMessage = "Wrong old password";
            return;
          }
        }
      })
      return;
    }
  }

  get firstName() {
    return this.formGroup.get('firstName');
  }

  get lastName() {
    return this.formGroup.get('lastName');
  }

  get phoneNumber() {
    return this.formGroup.get('phoneNumber');
  }

  protected readonly faEnvelope = faEnvelope;
  protected readonly faCheck = faCheck;
  protected readonly faXmark = faXmark;
}
