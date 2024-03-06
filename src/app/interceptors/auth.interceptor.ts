import {HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest} from '@angular/common/http';
import {catchError, Observable, switchMap, throwError} from "rxjs";
import {AuthService} from "../services/auth.service";
import {inject} from "@angular/core";
import {StorageService} from "../services/storage.service";

const excludedUrls: string[] = [
  'http://localhost:8080/api/auth/sign-in',
  'http://localhost:8080/api/auth/refresh-token'
];

export const authInterceptor: HttpInterceptorFn = (request: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
  const storageService = inject(StorageService);

  console.log("AUTH_INTERCEPTOR | invoked");

  const urlToExclude = excludedUrls.some(url => request.url.includes(url));

  if (!urlToExclude) {

    const accessToken = storageService.getAccessToken();

    if (accessToken) {

      const clonedRequest = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${accessToken}`),
      });

      console.log("AUTH_INTERCEPTOR | access token added");

      return next(clonedRequest);
    }

  }

  return next(request)
};

export const unAuthErrorInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
  const authService = inject(AuthService);
  const storageService = inject(StorageService);

  console.log("NO_AUTH_INTERCEPTOR | invoked");

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {

      console.log("NO_AUTH_INTERCEPTOR | ERROR CATCH FOR URL: " + req.url);

      if (
        !(req.url.includes('auth/sign-in') || req.url.includes('auth/refresh-token'))
        &&
        error.status === 403) {

        console.log("NO_AUTH_INTERCEPTOR | need refresh token");

        const refreshToken = storageService.getRefreshToken();

        if (refreshToken) {

          console.log("NO_AUTH_INTERCEPTOR | REFRESH TOKEN: " + refreshToken);

          return authService.refreshToken(refreshToken).pipe(
            switchMap((refreshResult) => {

              // assuming that tokenService.refreshToken() will return { accessToken: 'myNewAccessToken', refreshToken: 'myNewRefreshToken'}
              storageService.refreshToken(refreshResult);

              return next(
                req.clone({
                    headers: req.headers.set('Authorization', `Bearer ${refreshResult.accessToken}`),
                  }
                ));
            }),
            catchError((error) => {
              console.log('error')
              if (error.status == '403' || error.status === '401') {
                storageService.clear();
                // authService.logout();
              }
              return throwError(() => error);
            })
          );
        }
      }

      storageService.clear();
      // authService.logOut();

      return throwError(() => new Error('Unauthorized Exception'));
    })
  );
};
