import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserDto} from "../common/dto/user.dto";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private USERS_API = environment.panShopApiUrl + '/users';


  constructor(private httpClient: HttpClient) {
  }

  getUser(theUserId: string): Observable<UserDto> {
    return this.httpClient.get<UserDto>(
      this.USERS_API + `/${theUserId}`
    );
  }

  updatePassword(theOldPassword: string, theNewPassword: string) {

    console.log("service invoke")

    return this.httpClient.put(
      this.USERS_API + `/update-password`,
      {
        oldPassword: theOldPassword,
        newPassword: theNewPassword
      }
    );
  }


}
