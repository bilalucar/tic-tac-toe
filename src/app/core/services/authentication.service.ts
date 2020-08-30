import { Injectable } from '@angular/core';

import { UserService } from './user.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private auth: AngularFireAuth,
              private userService: UserService) { }

  async anonymousLogin() {
    try {
      const response = await this.auth.signInAnonymously();

      this.userService.activeUser = response.user;
    } catch (error) {
      console.log('error : ', error);
    }
  }
}
