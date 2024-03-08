import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserDto} from "../common/dto/user.dto";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = environment.panShopApiUrl + '/users';


  constructor(private httpClient: HttpClient) {
  }

  getUser(theUserId: string): Observable<UserDto> {

    const userUrl = `${this.baseUrl}/${theUserId}`;

    return this.httpClient.get<UserDto>(userUrl);
  }


}
