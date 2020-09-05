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

  checkPermission = (session): boolean => !session || (session.firstPlayer !== this.userId && session.secondPlayer && session.secondPlayer !== this.userId);

  setSecondPlayer = () => {
    this.session = {
      ...this.session,
      secondPlayer: this.userId,
      status: this.statusEnum.READY
    };
    this.updateSession();
  };

  ngOnInit(): void {
    this.gameService.getSession(this.sessionId).subscribe((response: any) => {
      if (this.checkPermission(response)) {
        this.router.navigateByUrl('/');
        return;
      }

      this.session = response;

      this.isFirstPlayer = this.userId === this.session.firstPlayer;

      this.playerType = this.isFirstPlayer ? this.session.firstPlayerType : this.session.secondPlayerType;

      if (!this.session.secondPlayer && !this.isFirstPlayer) {
        this.setSecondPlayer();
      }
    }, error => {
      console.log('error while fetching session', error);
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
        winner: winner ? this.playerType : null,
        winnerSquares: winner,
        status: this.statusEnum.FINISHED
      };
    }

    const squareCount = this.session.squares.filter(item => item);

    if (squareCount.length === 9 && !winner) {
      this.session = {
        ...this.session,
        winner: 'DRAW',
        status: this.statusEnum.FINISHED
      };
    }

    this.updateSession();
  }

  replay(): void {
    if (this.session.newSessionId) {
      window.location.href = `/${this.session.newSessionId}`;
      return;
    }

    this.gameService.createSession(this.userId).then(response => {
      if (response?.path?.pieces_[1]){
        this.session.newSessionId = response.path.pieces_[1];

        this.updateSession()
          .then(() => window.location.href = `/${this.session.newSessionId}`);
      }
    });
  }

  updateSession() {
    return this.gameService.updateSession(this.sessionId, this.session);
  }
}
