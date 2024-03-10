import {Injectable} from '@angular/core';
import {TokensDto} from "../common/dto/tokens.dto";
import {jwtDecode} from "jwt-decode";

const ACCESS_TOKEN = "accessToken";
const REFRESH_TOKEN = "refreshToken";
const USER_ID = "user_id";
const USER_SUBJECT = "user_sub";
const USER_ROLE = "user_role";


@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private storage: Storage = window.localStorage;

  constructor() {
  }

  public getId(): string {
    return this.storage.getItem(USER_ID)!;
  }

  public getUsername(): string {
    return this.storage.getItem(USER_SUBJECT)!;
  }

  public getRole(): string {
    if (this.isLoggedIn()) {
      return this.storage.getItem(USER_ROLE)!;
    }
    return "ROLE_CUSTOMER";
  }

  public isLoggedIn(): boolean {
    const token = this.getRefreshToken();
    if (!token) return false;

    const decodedToken: any = jwtDecode(token);
    const isTokenExpired = decodedToken.exp * 1000 <= Date.now();

    if (isTokenExpired) {
      this.clear();
      return false;
    }

    return true;
  }

  public saveTokens(tokens: TokensDto) {
    this.storage.setItem(ACCESS_TOKEN, tokens.accessToken);
    this.storage.setItem(REFRESH_TOKEN, tokens.refreshToken);

    this.saveUserInfo(tokens.accessToken)
  }

  public refreshToken(tokens: TokensDto) {
    this.storage.setItem(ACCESS_TOKEN, tokens.accessToken);
    this.storage.setItem(REFRESH_TOKEN, tokens.refreshToken);
  }

  public getAccessToken(): string {
    return this.storage.getItem(ACCESS_TOKEN)!;
  }

  public getRefreshToken(): string {
    return this.storage.getItem(REFRESH_TOKEN)!;
  }

  public clear(): void {
    this.storage.removeItem(REFRESH_TOKEN);
    this.storage.removeItem(ACCESS_TOKEN);
    this.storage.removeItem(USER_ID);
    this.storage.removeItem(USER_SUBJECT);
    this.storage.removeItem(USER_ROLE);
  }

  private saveUserInfo(token: string): void {

    const decodedToken: any = jwtDecode(token);

    this.storage.setItem(USER_ID, decodedToken.id);
    this.storage.setItem(USER_SUBJECT, decodedToken.sub);
    this.storage.setItem(USER_ROLE, decodedToken.role);
  }

}
