import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {RouteBannerComponent} from "../../utils/route-banner/route-banner.component";



@Component({
  selector: 'app-forgot-password',
  standalone: true,
    imports: [CommonModule, RouteBannerComponent],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {


}
