import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';


import { routes } from './app.routes';
import { IMAGE_CONFIG } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';


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
    provideHttpClient(), provideAnimationsAsync(),
  ]
};
