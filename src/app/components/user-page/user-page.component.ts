import {Component} from '@angular/core';
import {StorageService} from "../../services/storage.service";
import {UserDto} from "../../common/dto/user.dto";
import {UserService} from "../../services/user.service";
import {RouteBannerComponent} from "../route-banner/route-banner.component";

@Component({
  selector: 'app-user-page',
  standalone: true,
  imports: [
    RouteBannerComponent
  ],
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.css'
})
export class UserPageComponent {

  user!: UserDto;

  constructor(
    private storageService: StorageService,
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

}
