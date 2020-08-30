import { Component, EventEmitter, Input, Output } from '@angular/core';

import { PlayerTypeEnum } from '../../enums/player-type.enum';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html'
})
export class BoardComponent {
  @Input() squares: string[];
  @Input() winnerSquares: number[] = [];
  @Output() squareClick: EventEmitter<string> = new EventEmitter<string>();

  playerTypeEnum = PlayerTypeEnum;

  squareClickEmit(id): void {
    if (this.squares[id] === this.playerTypeEnum.X || this.squares[id] === this.playerTypeEnum.O) {
      return;
    }
    this.squareClick.emit(id);
  }
}
