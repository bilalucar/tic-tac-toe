import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { GameService } from '../../shared/services/game.service';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  playButtonClicked = false;
  sessionKey: string;
  sessionUrl: string;
  loading = true;

  constructor(private gameService: GameService,
              private router: Router,
              private userService: UserService) { }

  ngOnInit(): void { }

  play(): void {
    this.gameService.createSession(this.userService?.activeUser?.uid).then(response => {
      this.playButtonClicked = true;
      if (response?.path?.pieces_[1]){
        this.sessionKey = response.path.pieces_[1];
        this.sessionUrl = `${window.location.origin}/${this.sessionKey}`;
      }
      this.checkSessionStatus();
    });
  }

  checkSessionStatus(): void {
    this.gameService.getSession(this.sessionKey).subscribe(response => {
      if (response.firstPlayer && response.status === 'READY') {
        this.router.navigate([this.sessionKey]);
      }
    });
  }

  copyToClipboard(urlInputElement: HTMLInputElement): void {
    urlInputElement.disabled = false;
    urlInputElement.select();
    document.execCommand('copy');
    urlInputElement.setSelectionRange(0, 0);
    urlInputElement.disabled = true;
  }
}
