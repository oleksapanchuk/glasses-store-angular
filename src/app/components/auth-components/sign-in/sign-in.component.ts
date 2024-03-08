import {AfterViewInit, Component, ElementRef, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {faFacebook, faGithub, faGoogle} from '@fortawesome/free-brands-svg-icons';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../../../services/auth.service";
import {StorageService} from "../../../services/storage.service";
import {TokensDto} from "../../../common/dto/tokens.dto";

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [RouterLink, FontAwesomeModule, ReactiveFormsModule, RouterLinkActive],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent implements AfterViewInit {
  @ViewChildren('inputField') inputFields!: QueryList<ElementRef>;


  loginForm = this.formBuilder.group({
    username: ['', [Validators.required]],
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
          inputField.nativeElement.classList.add('has-val');
        } else {
          inputField.nativeElement.classList.remove('has-val');
        }
      });
    });

  }

  onSubmitLogin() {
    if (this.loginForm.valid) {
      this.authService.login(
        this.loginForm.getRawValue().username!,
        this.loginForm.getRawValue().password!)
        .subscribe({
          next: (data: any) => {

            this.storageService.saveTokens(data)
            // localStorage.setItem('accessToken', data.accessToken);
            // localStorage.setItem('refreshToken', data.refreshToken);

            // Navigate to UserAccount component upon successful login
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
