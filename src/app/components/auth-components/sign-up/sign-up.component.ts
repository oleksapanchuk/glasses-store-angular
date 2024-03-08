import {AfterViewInit, Component, ElementRef, QueryList, ViewChildren} from '@angular/core';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {faFacebook, faGithub, faGoogle} from '@fortawesome/free-brands-svg-icons';
import {Router, RouterLink} from '@angular/router';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {StorageService} from "../../../services/storage.service";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [FontAwesomeModule, RouterLink, FormsModule, ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent implements AfterViewInit {
  @ViewChildren('inputField') inputFields!: QueryList<ElementRef>;

  registerForm = this.formBuilder.group({
    username: ['', [Validators.required]],
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  constructor(
    private formBuilder: FormBuilder,
    private storageService: StorageService,
    private authService: AuthService,
    private router: Router
  ) {
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
        this.registerForm.getRawValue().password!,
        this.registerForm.getRawValue().email!)
        .subscribe({
          next: (data: any) => {

            this.storageService.saveTokens(data)

            // Navigate to UserAccount component upon successful registration
            this.router.navigate(['/user-profile']);
          },
          error: (err: any) => {
            // Display an error message
            console.error('An error occurred:', err);
          }
        });
    }
  }

  protected readonly faGoogle = faGoogle;
  protected readonly faGithub = faGithub;
  protected readonly faFacebook = faFacebook;
}
