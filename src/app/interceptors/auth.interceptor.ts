import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import {catchError, EMPTY, map, switchMap, throwError} from "rxjs";
import {AuthService} from "../services/auth.service";
import {inject} from "@angular/core";


interface RefreshResponse {
  accessToken: string,
  refreshToken: string
}

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const authService = inject(AuthService);

  let authReq = req;
  const token = localStorage.getItem('accessToken');

  // Перевіряємо, чи є це запит на оновлення токену
  if (req.url !== 'http://localhost:8080/api/auth/refresh-token') {

    if (token != null) {
      authReq = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + token)
      });
    }
  }

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 403) {

        // Token is expired. Try to refresh it.
        return authService.refreshToken(localStorage.getItem("refreshToken")!).pipe(
          map(response => response as RefreshResponse), // Ensure the
          switchMap((response: RefreshResponse) => {

            console.log(response)

            // Token is refreshed. Clone the request with the new token.
            const authReq = req.clone({
              headers: req.headers.set('Authorization', 'Bearer ' + response.accessToken)
            });

            console.log("here 4")

            // Handle the request with the new token.
            return next(authReq);
          }),
          catchError((refreshError: any) => {
            console.error('Error refreshing token', refreshError);
            if (refreshError.status === 403) {
              // If refresh token request also fails, stop retrying and throw an error
              console.error('Refresh token request failed. Stopping retries.');
              return EMPTY; // EMPTY is an observable that completes immediately without emitting any values
            } else {
              // If some other error occurred, rethrow the error
              return throwError(() => refreshError);
            }
          })
        );

      } else {
        // Some other error. Throw it.
        return throwError(() => error);
      }
    })
  );


};


// return next.handle(authReq).pipe(
//   catchError((error: HttpErrorResponse) => {
//     if (error.status === 401) {
//       // Token is expired. Try to refresh it.
//       return AuthService.refreshToken().pipe(
//         switchMap((newToken: string) => {
//           // Token is refreshed. Clone the request with the new token.
//           const authReq = req.clone({
//             headers: req.headers.set('Authorization', 'Bearer ' + newToken)
//           });
//           // Handle the request with the new token.
//           return next.handle(authReq);
//         })
//       );
//     } else {
//       // Some other error. Throw it.
//       return throwError(() => error);
//     }
//   })
// );
