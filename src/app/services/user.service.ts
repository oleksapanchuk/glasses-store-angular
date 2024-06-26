import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
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
      `${this.USERS_API}/${theUserId}`
    );
  }

  getUserByEmail(theEmail: string): Observable<UserDto> {
    return this.httpClient.get<UserDto>(
      `${this.USERS_API}/by-email/${theEmail}`
    );
  }

  updateUserData(theFirstName: string, theLastName: string, thePhoneNumber: string) {
    return this.httpClient.patch(
      `${this.USERS_API}/update`,
      {
        firstName: theFirstName,
        lastName: theLastName,
        phoneNumber: thePhoneNumber
      }
    );
  }

  updatePassword(theOldPassword: string, theNewPassword: string) {
    return this.httpClient.put(
      `${this.USERS_API}/update-password`,
      {
        oldPassword: theOldPassword,
        newPassword: theNewPassword
      }
    );
  }

  confirmAccount(theEmail: string) {
    return this.httpClient.get(
      `${this.USERS_API}/send-email-confirmation?email=${theEmail}`
    );
  }

}
