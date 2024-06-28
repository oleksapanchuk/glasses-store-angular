import {HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest} from '@angular/common/http';
import {catchError, Observable, switchMap, throwError} from "rxjs";
import {AuthService} from "../services/auth.service";
import {inject} from "@angular/core";
import {StorageService} from "../services/storage.service";
import {environment} from "../../environments/environment";

const excludedUrls: string[] = [
  environment.panShopApiUrl + '/auth/sign-in',
  environment.panShopApiUrl + '/auth/refresh-token'
];

export const authInterceptor: HttpInterceptorFn = (request: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
  const storageService = inject(StorageService);
  const urlToExclude = excludedUrls.some(url => request.url.includes(url));

  if (!urlToExclude) {
    const accessToken = storageService.getAccessToken();
    if (accessToken) {
      const clonedRequest = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${accessToken}`),
      });
      return next(clonedRequest);
    }
  }

  return next(request)
};

export const unAuthErrorInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
  const authService = inject(AuthService);
  const storageService = inject(StorageService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      console.log("NO_AUTH_INTERCEPTOR | error: ", error)
      const urlToExclude = excludedUrls.some(url => req.url.includes(url));

      if (!urlToExclude && error.status === 403) {

        if (storageService.isLoggedIn()) {
          const refreshToken = storageService.getRefreshToken();
          return authService.refreshToken(refreshToken).pipe(
            switchMap((refreshResult) => {
              storageService.refreshToken(refreshResult);
              return next(
                req.clone({
                    headers: req.headers.set('Authorization', `Bearer ${refreshResult.accessToken}`),
                  }
                ));
            }),
            catchError((error) => {
              if (error.status === '401' || error.status == '403' || error.status === '500') {
                authService.signOut();
              }
              return throwError(() => error);
            })
          );
        }
      }

      authService.signOut();
      return throwError(() => error);
    })
  );
};
