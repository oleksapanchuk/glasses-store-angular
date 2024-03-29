import {ApplicationConfig, ErrorHandler} from '@angular/core';
import {provideRouter} from '@angular/router';


import {routes} from './app.routes';
import {IMAGE_CONFIG} from '@angular/common';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {authInterceptor, unAuthErrorInterceptor} from "./interceptors/auth.interceptor";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {CustomErrorHandler} from "./services/custom-error-handler.service";


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    {
      provide: IMAGE_CONFIG,
      useValue: {
        disableImageSizeWarning: true,
        disableImageLazyLoadWarning: true
      }
    },
    provideHttpClient(withInterceptors([
      authInterceptor,
      unAuthErrorInterceptor
    ])),
    provideHttpClient(),
    provideAnimationsAsync(),
    // {
    //   provide: ErrorHandler,
    //   useClass: CustomErrorHandler
    // },
    // MatSnackBarModule,
  ]
};
