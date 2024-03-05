import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";


const AUTH_API = environment.panShopApiUrl + '/auth/';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'sign-in', {
      username: username,
      password: password
    }, httpOptions);
  }

  refreshToken(token: string) {

    console.log("here 3.5 ", token)

    return this.http.post(AUTH_API + 'refresh-token', {
      refreshToken: token
    }, httpOptions);
  }

}
