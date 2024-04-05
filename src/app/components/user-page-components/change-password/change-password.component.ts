import {AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent implements AfterViewInit, OnInit {
  @ViewChildren('inputField') inputFields!: QueryList<ElementRef>;

  formChangePassForm!: FormGroup;
  serverErrorMessage!: string;
  serverSuccessMessage!: string;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {
  }

  ngOnInit(): void {

    this.formChangePassForm = this.formBuilder.group({
      oldPassword: new FormControl('', [
        Validators.required
      ]),
      newPasswordFirst: new FormControl('', [
        Validators.required,
        // Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&.])[A-Za-z\\d@$!%*?&.]{8,}$')
      ]),
      newPasswordSecond: new FormControl('', [
        Validators.required,
        // Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&.])[A-Za-z\\d@$!%*?&.]{8,}$')
      ]),
    });

  }

  ngAfterViewInit(): void {
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

  onClickUpdatePassword() {
    const newPassword = this.formChangePassForm.get('newPasswordFirst')?.value;
    const confirmPassword = this.formChangePassForm.get('newPasswordSecond')?.value;

    if (newPassword !== confirmPassword) {
      this.formChangePassForm.get('newPasswordSecond')?.setErrors({matching: true});
    }

    if (this.formChangePassForm.valid) {
      this.userService.updatePassword(
        this.formChangePassForm.get('oldPassword')?.value,
        this.formChangePassForm.get('newPasswordFirst')?.value
      ).subscribe({
        next: (data: any) => {

          this.serverSuccessMessage = "Password updated successfully"

          this.formChangePassForm.reset();
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
    console.log("form is not valid !!!")
  }

  get oldPassword() {
    return this.formChangePassForm.get('oldPassword');
  }

  get newPasswordFirst() {
    return this.formChangePassForm.get('newPasswordFirst');
  }

  get newPasswordSecond() {
    return this.formChangePassForm.get('newPasswordSecond');
  }
}
