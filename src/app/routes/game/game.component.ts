import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { GameService } from '../../shared/services/game.service';
import { UserService } from '../../core/services/user.service';

import { calculateWinner } from '../../shared/utils/calculate-winner.util';
import { StatusEnum } from '../../shared/enums/status.enum';
import { PlayerTypeEnum } from '../../shared/enums/player-type.enum';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html'
})
export class GameComponent implements OnInit {

  session: Session.SessionModel;
  playerType: string;
  sessionId: string;
  isFirstPlayer: boolean;
  userId: string;

  statusEnum = StatusEnum;
  playerTypeEnum = PlayerTypeEnum;

  constructor(private activatedRoute: ActivatedRoute,
              private gameService: GameService,
              private router: Router,
              private userService: UserService) {
    this.sessionId = this.activatedRoute.snapshot.params.id;
    this.userId = this.userService?.activeUser?.uid;
  }

  isYourTurn = () => (this.isFirstPlayer && this.session?.isNext === this.session?.firstPlayerType)
    || (!this.isFirstPlayer && this.session?.isNext === this.session?.secondPlayerType)

  isWinner = () => this.session?.winner === this.userId;

  ngOnInit(): void {
    this.gameService.getSession(this.sessionId).subscribe((response: any) => {
      if (!response) {
        this.router.navigateByUrl('/');
        return;
      }

      this.session = response;

      if (this.session.firstPlayer !== this.userId && this.session.secondPlayer && this.session.secondPlayer !== this.userId) {
        this.router.navigateByUrl('/');
        return;
      }

      this.isFirstPlayer = this.userId === this.session.firstPlayer;

      this.playerType = this.isFirstPlayer ? this.session.firstPlayerType : this.session.secondPlayerType;

      if (!this.session.secondPlayer && !this.isFirstPlayer) {
        this.session = {
          ...this.session,
          secondPlayer: this.userId,
          status: this.statusEnum.READY
        };
        this.updateSession();
        return;
      }
    }, error => {
      console.log('error : ', error);
    });
  }

  updateSquares($event: string): void {
    if (!this.isYourTurn() || this.session.status === this.statusEnum.FINISHED) {
      return;
    }
    this.session.squares[$event] = this.playerType;
    this.session.isNext = this.isFirstPlayer ? this.session.secondPlayerType : this.session.firstPlayerType;

    const winner = calculateWinner(this.session.squares);

    if (winner) {
      this.session = {
        ...this.session,
        winner: this.userId,
        winnerSquares: winner,
        status: this.statusEnum.FINISHED
      };
    }

    this.updateSession();
  }

  updateSession(): void {
    this.gameService.updateSession(this.sessionId, this.session);
  }
}
