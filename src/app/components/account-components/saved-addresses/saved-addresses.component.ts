import { Component } from '@angular/core';
import {RouteBannerComponent} from "../../utils/route-banner/route-banner.component";

@Component({
  selector: 'app-saved-addresses',
  standalone: true,
  imports: [
    RouteBannerComponent
  ],
  templateUrl: './saved-addresses.component.html',
  styleUrl: './saved-addresses.component.css'
})
export class SavedAddressesComponent {

}
