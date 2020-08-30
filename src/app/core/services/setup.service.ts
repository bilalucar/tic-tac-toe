import { Injectable, Injector } from '@angular/core';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class SetupService {

  constructor(private injector: Injector,
              private authenticationService: AuthenticationService) {
  }

  initialize(): Promise<void> {
    return new Promise((resolve) => {
      this.authenticationService.anonymousLogin().then(_ => resolve());
    });
  }

}
