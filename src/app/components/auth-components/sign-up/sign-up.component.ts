import {AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren} from '@angular/core';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {faFacebook, faGithub, faGoogle} from '@fortawesome/free-brands-svg-icons';
import {Router, RouterLink} from '@angular/router';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {StorageService} from "../../../services/storage.service";
import {AuthService} from "../../../services/auth.service";
import {HttpErrorResponse} from "@angular/common/http";
import {NgIf} from "@angular/common";
import {UserDto} from "../../../common/dto/user.dto";
import {User} from "../../../common/user";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [FontAwesomeModule, RouterLink, FormsModule, ReactiveFormsModule, NgIf],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent implements AfterViewInit, OnInit {
  @ViewChildren('inputField') inputFields!: QueryList<ElementRef>;

  serverErrorMessage!: string;
  registerForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private storageService: StorageService,
    private authService: AuthService,
    private router: Router,
    private userService: UserService
  ) {
  }

  ngOnInit(): void {

    this.registerForm = this.formBuilder.group({
      firstName: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50)
      ]],
      lastName: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50)
      ]],
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        // Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&.])[A-Za-z\\d@$!%*?&.]{8,}$')
      ]]
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

  onSubmitRegister() {
    if (this.registerForm.valid) {
      this.authService.register(
        this.registerForm.getRawValue().firstName!,
        this.registerForm.getRawValue().lastName!,
        this.registerForm.getRawValue().email!,
        this.registerForm.getRawValue().password!)
        .subscribe({
          next: (data: any) => {

            this.storageService.saveTokens(data)

            this.setUserDetails();

            // Navigate to UserAccount component upon successful registration
            this.router.navigate(['/user-profile']);
          },
          error: (error: any) => {
            this.handleServerError(error);
          }
        });
    }
  }

  private setUserDetails() {
    this.userService.getUserByEmail(this.storageService.getUsername()).subscribe({
      next: (data: UserDto) => {

        let user = new User(
          data.id!,
          data.username!,
          data.firstName!,
          data.lastName!,
          data.email!,
          data.verified
        );

        this.storageService.setUser(user);

      },
      error: (err: any) => {
        console.error(err)
      }
    });
  }

  handleServerError(error: unknown) {
    // Display an error message
    // console.error('An error occurred:', error);

    // Reset form fields
    this.registerForm.reset();

    if (error instanceof HttpErrorResponse) {
      // Set the server error message
      if (error.status === 409) {
        this.serverErrorMessage = error.error.errorMessage;
        return;
      }

    }

    this.serverErrorMessage = "Server error.";
  }

  // getters for user
  get firstName() {
    return this.registerForm.get('firstName');
  }

  get lastName() {
    return this.registerForm.get('lastName');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  protected readonly faGoogle = faGoogle;
  protected readonly faGithub = faGithub;
  protected readonly faFacebook = faFacebook;
}
