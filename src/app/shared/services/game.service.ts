import { Injectable } from '@angular/core';

import { SharedModule } from '../shared.module';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { PlayerTypeEnum } from '../enums/player-type.enum';
import { StatusEnum } from '../enums/status.enum';

@Injectable({
  providedIn: SharedModule
})
export class GameService {

  PATH = 'sessions';

  sessionRef;

  constructor(private angularFireDatabase: AngularFireDatabase) {
    this.sessionRef = this.angularFireDatabase.list(this.PATH);
  }

  getSession(sessionId: string): Observable<Session.SessionModel> {
    return this.angularFireDatabase.object(this.PATH + '/' + sessionId).valueChanges() as Observable<Session.SessionModel>;
  }

  async createSession(uid: string) {
    const randomBoolean = Math.random() >= 0.5;

    const session: Session.SessionModel = {
      status: StatusEnum.STARTING,
      firstPlayer: uid,
      firstPlayerType: randomBoolean ? PlayerTypeEnum.O : PlayerTypeEnum.X,
      secondPlayer: '',
      secondPlayerType: !randomBoolean ? PlayerTypeEnum.O : PlayerTypeEnum.X,
      squares: Array(9).fill(0),
      isNext: randomBoolean ? PlayerTypeEnum.O : PlayerTypeEnum.X,
      winnerSquares: [],
      winner: ''
    };

    return await this.sessionRef.push(session);
  }

  async updateSession(sessionId: string, session) {
    return await this.angularFireDatabase.object(this.PATH + '/' + sessionId).set(session);
  }

  removeSession(sessionId: string) {
    this.angularFireDatabase.object(this.PATH + '/' + sessionId).remove();
  }
}
