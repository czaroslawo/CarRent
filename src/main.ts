import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import {RouterModule} from '@angular/router';
import {routes} from './app/app.routes';
import {importProvidersFrom} from '@angular/core';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {authInterceptor} from './app/authInterceptor';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(RouterModule.forRoot(routes)),
    provideHttpClient(withInterceptors([authInterceptor])),
  ]
})
  .catch((err) => console.error(err));
