import {AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren} from '@angular/core';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {faFacebook, faGithub, faGoogle} from '@fortawesome/free-brands-svg-icons';
import {Router, RouterLink} from '@angular/router';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {StorageService} from "../../../services/storage.service";
import {AuthService} from "../../../services/auth.service";
import {HttpErrorResponse} from "@angular/common/http";
import {NgIf} from "@angular/common";

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
    private router: Router
  ) {
  }

  ngOnInit(): void {

    this.registerForm = this.formBuilder.group({
      username: ['', [
        Validators.required,
        Validators.minLength(5),  // Username should be at least 3 characters long
        Validators.maxLength(20)  // Username should not exceed 20 characters
      ]],
      email: ['', [
        Validators.required,
        Validators.email  // This will validate the email format
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),  // Password should be at least 8 characters long
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
        this.registerForm.getRawValue().username!,
        this.registerForm.getRawValue().email!,
        this.registerForm.getRawValue().password!)
        .subscribe({
          next: (data: any) => {

            this.storageService.saveTokens(data)

            // Navigate to UserAccount component upon successful registration
            this.router.navigate(['/user-profile']);
          },
          error: (error: any) => {
            this.handleServerError(error);
          }
        });
    }
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
  get username() {
    return this.registerForm.get('username');
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
