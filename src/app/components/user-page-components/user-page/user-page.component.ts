import {Component} from '@angular/core';
import {StorageService} from "../../../services/storage.service";
import {UserDto} from "../../../common/dto/user.dto";
import {UserService} from "../../../services/user.service";
import {RouteBannerComponent} from "../../utils/route-banner/route-banner.component";
import {NgIf} from "@angular/common";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {AuthService} from "../../../services/auth.service";
import {UserDataComponent} from "../user-data/user-data.component";
import {ChangePasswordComponent} from "../change-password/change-password.component";

@Component({
  selector: 'app-user-page',
  standalone: true,
    imports: [
        RouteBannerComponent,
        NgIf,
        RouterLink,
        UserDataComponent,
        ChangePasswordComponent,
        RouterLinkActive
    ],
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.css'
})
export class UserPageComponent {

  user!: UserDto;

  constructor(
    private storageService: StorageService,
    private authService: AuthService,
    private userService: UserService
  ) {
  }

  ngOnInit(): void {
    const userId = this.storageService.getId();

    this.userService.getUser(userId).subscribe(
      data => {
        this.user = data;
      }
    );
  }

  signOut() {
    this.authService.signOut();
  }

}
