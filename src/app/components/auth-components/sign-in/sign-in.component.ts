import {AfterViewInit, Component, ElementRef, ErrorHandler, OnInit, QueryList, ViewChildren} from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {faFacebook, faGithub, faGoogle} from '@fortawesome/free-brands-svg-icons';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../../../services/auth.service";
import {StorageService} from "../../../services/storage.service";
import {InputFieldValidator} from "../../../validators/input-field-validator";
import {NgIf} from "@angular/common";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [RouterLink, FontAwesomeModule, ReactiveFormsModule, RouterLinkActive, NgIf],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent implements AfterViewInit, OnInit {
  @ViewChildren('inputField') inputFields!: QueryList<ElementRef>;

  serverErrorMessage!: string;
  loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private storageService: StorageService,
    private authService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit(): void {

    this.loginForm = this.formBuilder.group({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        InputFieldValidator.notOnlyWhitespace
      ]),
      password: new FormControl('', [
        Validators.required,
        // Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&.])[A-Za-z\\d@$!%*?&.]{8,}$')
      ]),
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

  onSubmitLogin() {
    if (this.loginForm.valid) {
      this.authService.login(
        this.loginForm.getRawValue().username!,
        this.loginForm.getRawValue().password!
      ).subscribe({
        next: (data: any) => {

          this.storageService.saveTokens(data)

          // Navigate to UserAccount component upon successful login
          this.router.navigate(['/user-profile']);
        },
        error: (err: any) => {
          this.handleServerError(err);
        }
      });
    }
  }

  handleServerError(error: unknown) {
    // Display an error message
    // console.error('An error occurred:', error);

    // Reset form fields
    this.loginForm.reset();

    if (error instanceof HttpErrorResponse) {
      // Set the server error message
      if (error.status === 401) {
        this.serverErrorMessage = "The login or password is incorrect. Try again.";
      }

    }

    this.serverErrorMessage = "Server error.";
  }

  // getters for user
  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  protected readonly faGoogle = faGoogle;
  protected readonly faGithub = faGithub;
  protected readonly faFacebook = faFacebook;
}
