import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {TokensDto} from "../common/dto/tokens.dto";
import {StorageService} from "./storage.service";


const AUTH_API = environment.panShopApiUrl + '/auth/';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'sign-in', {
      username: username,
      password: password
    }, httpOptions);
  }

  register(theFirstName: string, theLastName: string, theEmail: string, thePassword: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'sign-up',
      {
        firstName: theFirstName,
        lastName: theLastName,
        email: theEmail,
        password: thePassword
      },
      httpOptions
    );
  }

  // logout(): Observable<any> {
  //   return this.http.post(AUTH_API + 'sign-out', {}, httpOptions);
  // }

  signOut(): void {
    this.storageService.clear();
  }

  refreshToken(token: string): Observable<TokensDto> {

    return this.http.post<TokensDto>(AUTH_API + 'refresh-token', {
      refreshToken: token
    }, httpOptions);
  }

}
