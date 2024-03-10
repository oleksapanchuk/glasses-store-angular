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
              if (error.status === '401' || error.status == '403') {
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
